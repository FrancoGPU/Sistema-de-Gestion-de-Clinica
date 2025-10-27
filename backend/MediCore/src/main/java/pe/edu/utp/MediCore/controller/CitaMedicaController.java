package pe.edu.utp.MediCore.controller;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pe.edu.utp.MediCore.entity.CitaMedica;
import pe.edu.utp.MediCore.entity.Medico;
import pe.edu.utp.MediCore.entity.Paciente;
import pe.edu.utp.MediCore.repository.CitaMedicaRepository;
import pe.edu.utp.MediCore.repository.MedicoRepository;
import pe.edu.utp.MediCore.repository.PacienteRepository;

import java.time.LocalDateTime;
import java.util.List;

/**
 * Controlador REST para la entidad CitaMedica
 * Proporciona endpoints para operaciones CRUD
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
    
    /**
     * Obtener todas las citas médicas
     * GET /api/citas
     */
    @GetMapping
    public ResponseEntity<List<CitaMedica>> obtenerTodas() {
        List<CitaMedica> citas = citaMedicaRepository.findAll();
        return ResponseEntity.ok(citas);
    }
    
    /**
     * Obtener una cita por ID
     * GET /api/citas/{id}
     */
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
     * Obtener citas por estado
     * GET /api/citas/estado/{estado}
     */
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
     * Obtener citas del día actual
     * GET /api/citas/hoy
     */
    @GetMapping("/hoy")
    public ResponseEntity<List<CitaMedica>> obtenerCitasHoy() {
        List<CitaMedica> citas = citaMedicaRepository.findCitasHoy();
        return ResponseEntity.ok(citas);
    }
    
    /**
     * Crear una nueva cita médica
     * POST /api/citas
     */
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
        
        CitaMedica nuevaCita = citaMedicaRepository.save(cita);
        return ResponseEntity.status(HttpStatus.CREATED).body(nuevaCita);
    }
    
    /**
     * Actualizar una cita médica existente
     * PUT /api/citas/{id}
     */
    @PutMapping("/{id}")
    public ResponseEntity<CitaMedica> actualizar(
            @PathVariable Long id,
            @Valid @RequestBody CitaMedica citaActualizada) {
        
        return citaMedicaRepository.findById(id)
                .map(cita -> {
                    cita.setFechaHora(citaActualizada.getFechaHora());
                    cita.setEstado(citaActualizada.getEstado());
                    cita.setMotivo(citaActualizada.getMotivo());
                    cita.setObservaciones(citaActualizada.getObservaciones());
                    
                    // Actualizar paciente si se proporciona
                    if (citaActualizada.getPaciente() != null && 
                        citaActualizada.getPaciente().getIdPaciente() != null) {
                        pacienteRepository.findById(citaActualizada.getPaciente().getIdPaciente())
                                .ifPresent(cita::setPaciente);
                    }
                    
                    // Actualizar médico si se proporciona
                    if (citaActualizada.getMedico() != null && 
                        citaActualizada.getMedico().getIdMedico() != null) {
                        medicoRepository.findById(citaActualizada.getMedico().getIdMedico())
                                .ifPresent(cita::setMedico);
                    }
                    
                    CitaMedica guardada = citaMedicaRepository.save(cita);
                    return ResponseEntity.ok(guardada);
                })
                .orElse(ResponseEntity.notFound().build());
    }
    
    /**
     * Eliminar una cita médica
     * DELETE /api/citas/{id}
     */
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
