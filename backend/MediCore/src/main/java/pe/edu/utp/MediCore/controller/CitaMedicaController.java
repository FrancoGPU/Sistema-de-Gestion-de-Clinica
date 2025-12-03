package pe.edu.utp.MediCore.controller;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import pe.edu.utp.MediCore.entity.CitaMedica;
import pe.edu.utp.MediCore.entity.Medico;
import pe.edu.utp.MediCore.entity.Paciente;
import pe.edu.utp.MediCore.repository.CitaMedicaRepository;
import pe.edu.utp.MediCore.repository.MedicoRepository;
import pe.edu.utp.MediCore.repository.PacienteRepository;
import pe.edu.utp.MediCore.service.CitaMedicaService;
import pe.edu.utp.MediCore.service.ReservationConflictException;

import java.util.List;
import java.util.Objects;

/**
 * Controlador REST para la entidad CitaMedica
 * Proporciona endpoints para operaciones CRUD con protección JWT/roles
 */
@RestController
@RequestMapping("/api/citas")
@CrossOrigin(origins = "http://localhost:4200")
public class CitaMedicaController {
    
    @Autowired
    private CitaMedicaRepository citaMedicaRepository;
    
    @Autowired
    private PacienteRepository pacienteRepository;
    
    @Autowired
    private MedicoRepository medicoRepository;

    @Autowired
    private CitaMedicaService citaMedicaService;
    
    /**
     * Helper para obtener el usuario autenticado
     */
    private String getCurrentUsername() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication.getName();
    }

    /**
     * Helper para verificar si es ADMIN
     */
    private boolean isAdmin() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));
    }

    /**
     * Obtener todas las citas médicas (solo ADMIN)
     * GET /api/citas
     */
    @PreAuthorize("hasAnyRole('ADMIN')")
    @GetMapping
    public ResponseEntity<List<CitaMedica>> obtenerTodas() {
        List<CitaMedica> citas = citaMedicaRepository.findAll();
        return ResponseEntity.ok(citas);
    }
    
    /**
     * Obtener una cita por ID (requiere autenticación)
     * GET /api/citas/{id}
     */
    @PreAuthorize("hasAnyRole('PACIENTE', 'DOCTOR', 'ADMIN')")
    @GetMapping("/{id}")
    public ResponseEntity<CitaMedica> obtenerPorId(@PathVariable Long id) {
        return citaMedicaRepository.findById(id)
                .map(cita -> {
                    // Autorización: Verificar propiedad
                    String username = getCurrentUsername();
                    boolean esPacientePropio = cita.getPaciente().getUsuario() != null && 
                                               cita.getPaciente().getUsuario().getUsername().equals(username);
                    boolean esMedicoPropio = cita.getMedico().getUsuario() != null && 
                                             cita.getMedico().getUsuario().getUsername().equals(username);
                    
                    if (isAdmin() || esPacientePropio || esMedicoPropio) {
                        return ResponseEntity.ok(cita);
                    } else {
                        return ResponseEntity.status(HttpStatus.FORBIDDEN).<CitaMedica>build();
                    }
                })
                .orElse(ResponseEntity.notFound().build());
    }
    
    /**
     * Obtener citas de un paciente específico
     * GET /api/citas/paciente/{idPaciente}
     */
    @PreAuthorize("hasAnyRole('PACIENTE', 'DOCTOR', 'ADMIN')")
    @GetMapping("/paciente/{idPaciente}")
    public ResponseEntity<List<CitaMedica>> obtenerPorPaciente(@PathVariable Long idPaciente) {
        // Validación de seguridad
        if (!isAdmin()) {
            Paciente paciente = pacienteRepository.findById(idPaciente).orElse(null);
            if (paciente == null) return ResponseEntity.notFound().build();
            
            String username = getCurrentUsername();
            // Si es paciente, solo puede ver sus propias citas
            if (SecurityContextHolder.getContext().getAuthentication().getAuthorities().stream()
                    .anyMatch(a -> a.getAuthority().equals("ROLE_PACIENTE"))) {
                if (paciente.getUsuario() == null || !paciente.getUsuario().getUsername().equals(username)) {
                    return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
                }
            }
            // Doctores pueden ver historial de pacientes (regla de negocio asumida: si tienen relación, 
            // pero por simplicidad permitimos ver historial si conocen ID, o restringimos solo a sus citas con ese paciente)
            // Para este caso, mantenemos simple: Paciente ve lo suyo, Admin todo. Doctor ve lo suyo en otro endpoint.
        }

        return pacienteRepository.findById(idPaciente)
                .map(paciente -> {
                    List<CitaMedica> citas = citaMedicaRepository
                            .findByPacienteOrderByFechaHoraDesc(paciente);
                    return ResponseEntity.ok(citas);
                })
                .orElse(ResponseEntity.notFound().build());
    }
    
    /**
     * Obtener citas de un médico específico
     * GET /api/citas/medico/{idMedico}
     */
    @PreAuthorize("hasAnyRole('DOCTOR', 'ADMIN')")
    @GetMapping("/medico/{idMedico}")
    public ResponseEntity<List<CitaMedica>> obtenerPorMedico(@PathVariable Long idMedico) {
        // Validación de seguridad
        if (!isAdmin()) {
            Medico medico = medicoRepository.findById(idMedico).orElse(null);
            if (medico == null) return ResponseEntity.notFound().build();
            
            String username = getCurrentUsername();
            if (medico.getUsuario() == null || !medico.getUsuario().getUsername().equals(username)) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
            }
        }

        return medicoRepository.findById(idMedico)
                .map(medico -> {
                    List<CitaMedica> citas = citaMedicaRepository.findByMedico(medico);
                    return ResponseEntity.ok(citas);
                })
                .orElse(ResponseEntity.notFound().build());
    }
    
    /**
     * Obtener citas por estado (solo ADMIN)
     * GET /api/citas/estado/{estado}
     */
    @PreAuthorize("hasAnyRole('ADMIN')")
    @GetMapping("/estado/{estado}")
    public ResponseEntity<List<CitaMedica>> obtenerPorEstado(@PathVariable String estado) {
        try {
            CitaMedica.EstadoCita estadoCita = CitaMedica.EstadoCita.valueOf(estado.toUpperCase());
            List<CitaMedica> citas = citaMedicaRepository.findByEstado(estadoCita);
            return ResponseEntity.ok(citas);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    /**
     * Obtener citas del día actual (solo DOCTOR, ADMIN)
     * GET /api/citas/hoy
     */
    @PreAuthorize("hasAnyRole('DOCTOR', 'ADMIN')")
    @GetMapping("/hoy")
    public ResponseEntity<List<CitaMedica>> obtenerCitasHoy() {
        if (isAdmin()) {
            return ResponseEntity.ok(citaMedicaRepository.findCitasHoy());
        } else {
            // Si es doctor, solo sus citas de hoy
            String username = getCurrentUsername();
            return medicoRepository.findByUsuarioUsername(username)
                    .map(medico -> ResponseEntity.ok(citaMedicaRepository.findCitasHoyByMedico(medico)))
                    .orElse(ResponseEntity.status(HttpStatus.FORBIDDEN).build());
        }
    }
    
    /**
     * Crear una nueva cita médica (PACIENTE, DOCTOR, ADMIN)
     * POST /api/citas
     */
    @PreAuthorize("hasAnyRole('PACIENTE', 'DOCTOR', 'ADMIN')")
    @PostMapping
    public ResponseEntity<CitaMedica> crear(@Valid @RequestBody CitaMedica cita) {
        String username = getCurrentUsername();
        
        // Lógica para asignar Paciente automáticamente si es rol PACIENTE
        if (!isAdmin() && !SecurityContextHolder.getContext().getAuthentication().getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_DOCTOR"))) {
            // Es PACIENTE
            Paciente pacienteAuth = pacienteRepository.findByUsuarioUsername(username)
                    .orElseThrow(() -> new RuntimeException("Perfil de paciente no encontrado para usuario: " + username));
            
            // Forzar que la cita sea para este paciente
            cita.setPaciente(pacienteAuth);
        } else {
            // Es ADMIN o DOCTOR, verificar que se envió un paciente válido
            if (cita.getPaciente() == null || cita.getPaciente().getIdPaciente() == null) {
                return ResponseEntity.badRequest().build();
            }
            Paciente p = pacienteRepository.findById(cita.getPaciente().getIdPaciente()).orElse(null);
            if (p == null) return ResponseEntity.badRequest().build();
            cita.setPaciente(p);
        }
        
        // Verificar Médico
        if (cita.getMedico() == null || cita.getMedico().getIdMedico() == null) {
            return ResponseEntity.badRequest().build();
        }
        Medico medico = medicoRepository.findById(cita.getMedico().getIdMedico()).orElse(null);
        if (medico == null) return ResponseEntity.badRequest().build();
        cita.setMedico(medico);

        try {
            CitaMedica nuevaCita = citaMedicaService.crearCita(cita);
            return ResponseEntity.status(HttpStatus.CREATED).body(nuevaCita);
        } catch (ReservationConflictException ex) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }
    }
    
    /**
     * Actualizar una cita médica (DOCTOR, ADMIN, PACIENTE - limitado)
     * PUT /api/citas/{id}
     */
    @PreAuthorize("hasAnyRole('PACIENTE', 'DOCTOR', 'ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<CitaMedica> actualizar(
            @PathVariable Long id,
            @Valid @RequestBody CitaMedica citaActualizada) {
        
        var citaOpt = citaMedicaRepository.findById(id);
        if (citaOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        CitaMedica existing = citaOpt.get();
        String username = getCurrentUsername();
        
        // Autorización
        boolean esAdmin = isAdmin();
        boolean esPacientePropio = existing.getPaciente().getUsuario() != null && 
                                   existing.getPaciente().getUsuario().getUsername().equals(username);
        boolean esMedicoPropio = existing.getMedico().getUsuario() != null && 
                                 existing.getMedico().getUsuario().getUsername().equals(username);
        
        if (!esAdmin && !esPacientePropio && !esMedicoPropio) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
        
        // Restricciones por rol
        if (esPacientePropio && !esAdmin && !esMedicoPropio) {
            // Paciente solo puede cancelar o reprogramar (si la lógica de negocio lo permite)
            // Aquí permitimos actualizar fecha (reprogramar) pero no cambiar médico ni paciente
            if (citaActualizada.getMedico() != null && !citaActualizada.getMedico().getIdMedico().equals(existing.getMedico().getIdMedico())) {
                 return ResponseEntity.status(HttpStatus.FORBIDDEN).build(); // No puede cambiar médico
            }
        }

        // Si se proporcionan IDs, buscar y setear entidades completas
        if (citaActualizada.getPaciente() != null && citaActualizada.getPaciente().getIdPaciente() != null) {
             // Solo admin puede cambiar paciente de una cita existente
             if (esAdmin) {
                 pacienteRepository.findById(citaActualizada.getPaciente().getIdPaciente())
                    .ifPresent(existing::setPaciente);
             }
        }

        if (citaActualizada.getMedico() != null && citaActualizada.getMedico().getIdMedico() != null) {
            medicoRepository.findById(citaActualizada.getMedico().getIdMedico())
                    .ifPresent(existing::setMedico);
        }
        
        // Actualizar campos permitidos
        if (citaActualizada.getEstado() != null) existing.setEstado(citaActualizada.getEstado());
        if (citaActualizada.getFechaHora() != null) existing.setFechaHora(citaActualizada.getFechaHora());
        if (citaActualizada.getMotivo() != null) existing.setMotivo(citaActualizada.getMotivo());
        if (citaActualizada.getObservaciones() != null) existing.setObservaciones(citaActualizada.getObservaciones());

        // Delega la lógica de validación de disponibilidad al servicio
        try {
            CitaMedica guardada = citaMedicaService.actualizarCita(existing, citaActualizada);
            return ResponseEntity.ok(guardada);
        } catch (ReservationConflictException ex) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }
    }
    
    /**
     * Eliminar una cita médica (DOCTOR, ADMIN)
     * DELETE /api/citas/{id}
     */
    @PreAuthorize("hasAnyRole('DOCTOR', 'ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        return citaMedicaRepository.findById(id)
                .map(cita -> {
                    // Verificar propiedad si es doctor
                    if (!isAdmin()) {
                        String username = getCurrentUsername();
                        if (cita.getMedico().getUsuario() == null || !cita.getMedico().getUsuario().getUsername().equals(username)) {
                            return ResponseEntity.status(HttpStatus.FORBIDDEN).<Void>build();
                        }
                    }
                    
                    citaMedicaRepository.delete(cita);
                    return ResponseEntity.ok().<Void>build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
