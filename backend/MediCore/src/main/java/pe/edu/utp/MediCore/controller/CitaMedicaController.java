package pe.edu.utp.MediCore.controller;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import pe.edu.utp.MediCore.entity.CitaMedica;
import pe.edu.utp.MediCore.entity.Medico;
import pe.edu.utp.MediCore.entity.Paciente;
import pe.edu.utp.MediCore.repository.CitaMedicaRepository;
import pe.edu.utp.MediCore.repository.MedicoRepository;
import pe.edu.utp.MediCore.repository.PacienteRepository;
import pe.edu.utp.MediCore.service.CitaMedicaService;
import pe.edu.utp.MediCore.service.ReservationConflictException;

import java.time.LocalDateTime;
import java.util.List;

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
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    /**
     * Obtener citas de un paciente específico
     * GET /api/citas/paciente/{idPaciente}
     */
    @PreAuthorize("hasAnyRole('PACIENTE', 'DOCTOR', 'ADMIN')")
    @GetMapping("/paciente/{idPaciente}")
    public ResponseEntity<List<CitaMedica>> obtenerPorPaciente(@PathVariable Long idPaciente) {
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
        List<CitaMedica> citas = citaMedicaRepository.findCitasHoy();
        return ResponseEntity.ok(citas);
    }
    
    /**
     * Crear una nueva cita médica (PACIENTE, DOCTOR, ADMIN)
     * POST /api/citas
     */
    @PreAuthorize("hasAnyRole('PACIENTE', 'DOCTOR', 'ADMIN')")
    @PostMapping
    public ResponseEntity<CitaMedica> crear(@Valid @RequestBody CitaMedica cita) {
        // Verificar que el paciente existe
        if (cita.getPaciente() == null || cita.getPaciente().getIdPaciente() == null) {
            return ResponseEntity.badRequest().build();
        }
        
        Paciente paciente = pacienteRepository.findById(cita.getPaciente().getIdPaciente())
                .orElse(null);
        if (paciente == null) {
            return ResponseEntity.badRequest().build();
        }
        
        // Verificar que el médico existe
        if (cita.getMedico() == null || cita.getMedico().getIdMedico() == null) {
            return ResponseEntity.badRequest().build();
        }
        
        Medico medico = medicoRepository.findById(cita.getMedico().getIdMedico())
                .orElse(null);
        if (medico == null) {
            return ResponseEntity.badRequest().build();
        }
        
        cita.setPaciente(paciente);
        cita.setMedico(medico);

        try {
            CitaMedica nuevaCita = citaMedicaService.crearCita(cita);
            return ResponseEntity.status(HttpStatus.CREATED).body(nuevaCita);
        } catch (ReservationConflictException ex) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }
    }
    
    /**
     * Actualizar una cita médica existente
     * PUT /api/citas/{id}
     */
    /**
     * Actualizar una cita médica (DOCTOR, ADMIN)
     * PUT /api/citas/{id}
     */
    @PreAuthorize("hasAnyRole('DOCTOR', 'ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<CitaMedica> actualizar(
            @PathVariable Long id,
            @Valid @RequestBody CitaMedica citaActualizada) {
        
        var citaOpt = citaMedicaRepository.findById(id);
        if (citaOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        CitaMedica existing = citaOpt.get();
        
        // Si se proporcionan IDs, buscar y setear entidades completas
        if (citaActualizada.getPaciente() != null && citaActualizada.getPaciente().getIdPaciente() != null) {
            pacienteRepository.findById(citaActualizada.getPaciente().getIdPaciente())
                    .ifPresent(existing::setPaciente);
        }

        if (citaActualizada.getMedico() != null && citaActualizada.getMedico().getIdMedico() != null) {
            medicoRepository.findById(citaActualizada.getMedico().getIdMedico())
                    .ifPresent(existing::setMedico);
        }

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
                    citaMedicaRepository.delete(cita);
                    return ResponseEntity.ok().<Void>build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
