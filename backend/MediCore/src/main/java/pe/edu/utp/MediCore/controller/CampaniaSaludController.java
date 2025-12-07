package pe.edu.utp.MediCore.controller;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pe.edu.utp.MediCore.entity.CampaniaSalud;
import pe.edu.utp.MediCore.entity.Paciente;
import pe.edu.utp.MediCore.repository.CampaniaSaludRepository;
import pe.edu.utp.MediCore.repository.PacienteRepository;

import java.time.LocalDate;
import java.util.List;

/**
 * Controlador REST para la entidad CampaniaSalud
 * Proporciona endpoints para operaciones CRUD
 */
@RestController
@RequestMapping("/api/campanias")
@CrossOrigin(origins = "http://localhost:4200")
public class CampaniaSaludController {
    
    @Autowired
    private CampaniaSaludRepository campaniaSaludRepository;

    @Autowired
    private PacienteRepository pacienteRepository;
    
    /**
     * Obtener todas las campañas de salud
     * GET /api/campanias
     */
    @GetMapping
    public ResponseEntity<List<CampaniaSalud>> obtenerTodas() {
        List<CampaniaSalud> campanias = campaniaSaludRepository.findAll();
        return ResponseEntity.ok(campanias);
    }
    
    /**
     * Obtener una campaña por ID
     * GET /api/campanias/{id}
     */
    @GetMapping("/{id}")
    public ResponseEntity<CampaniaSalud> obtenerPorId(@PathVariable Long id) {
        return campaniaSaludRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    /**
     * Obtener campañas activas (estado EN_CURSO)
     * GET /api/campanias/activas
     */
    @GetMapping("/activas")
    public ResponseEntity<List<CampaniaSalud>> obtenerCampaniasActivas() {
        List<CampaniaSalud> campanias = campaniaSaludRepository.findCampaniasActivas();
        return ResponseEntity.ok(campanias);
    }
    
    /**
     * Obtener campañas vigentes para la fecha actual
     * GET /api/campanias/vigentes
     */
    @GetMapping("/vigentes")
    public ResponseEntity<List<CampaniaSalud>> obtenerCampaniasVigentes() {
        List<CampaniaSalud> campanias = campaniaSaludRepository
                .findCampaniasVigentes(LocalDate.now());
        return ResponseEntity.ok(campanias);
    }
    
    /**
     * Obtener campañas futuras
     * GET /api/campanias/futuras
     */
    @GetMapping("/futuras")
    public ResponseEntity<List<CampaniaSalud>> obtenerCampaniasFuturas() {
        List<CampaniaSalud> campanias = campaniaSaludRepository.findCampaniasFuturas();
        return ResponseEntity.ok(campanias);
    }
    
    /**
     * Obtener campañas por estado
     * GET /api/campanias/estado/{estado}
     */
    @GetMapping("/estado/{estado}")
    public ResponseEntity<List<CampaniaSalud>> obtenerPorEstado(@PathVariable String estado) {
        try {
            CampaniaSalud.EstadoCampania estadoCampania = 
                    CampaniaSalud.EstadoCampania.valueOf(estado.toUpperCase());
            List<CampaniaSalud> campanias = campaniaSaludRepository.findByEstado(estadoCampania);
            return ResponseEntity.ok(campanias);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    /**
     * Buscar campañas por nombre
     * GET /api/campanias/buscar?q={query}
     */
    @GetMapping("/buscar")
    public ResponseEntity<List<CampaniaSalud>> buscar(@RequestParam String q) {
        List<CampaniaSalud> campanias = campaniaSaludRepository
                .findByNombreCampaniaContainingIgnoreCase(q);
        return ResponseEntity.ok(campanias);
    }
    
    /**
     * Crear una nueva campaña de salud
     * POST /api/campanias
     */
    @PostMapping
    public ResponseEntity<CampaniaSalud> crear(@Valid @RequestBody CampaniaSalud campania) {
        // Validar que la fecha de finalización sea posterior a la fecha de inicio
        if (campania.getFechaFinalizacion().isBefore(campania.getFechaInicio())) {
            return ResponseEntity.badRequest().build();
        }
        
        CampaniaSalud nuevaCampania = campaniaSaludRepository.save(campania);
        return ResponseEntity.status(HttpStatus.CREATED).body(nuevaCampania);
    }
    
    /**
     * Actualizar una campaña de salud existente
     * PUT /api/campanias/{id}
     */
    @PutMapping("/{id}")
    public ResponseEntity<CampaniaSalud> actualizar(
            @PathVariable Long id,
            @Valid @RequestBody CampaniaSalud campaniaActualizada) {
        
        return campaniaSaludRepository.findById(id)
                .map(campania -> {
                    campania.setNombreCampania(campaniaActualizada.getNombreCampania());
                    campania.setDescripcion(campaniaActualizada.getDescripcion());
                    campania.setFechaInicio(campaniaActualizada.getFechaInicio());
                    campania.setFechaFinalizacion(campaniaActualizada.getFechaFinalizacion());
                    campania.setEstado(campaniaActualizada.getEstado());
                    campania.setLugarRealizacion(campaniaActualizada.getLugarRealizacion());
                    campania.setPublicoObjetivo(campaniaActualizada.getPublicoObjetivo());
                    
                    CampaniaSalud guardada = campaniaSaludRepository.save(campania);
                    return ResponseEntity.ok(guardada);
                })
                .orElse(ResponseEntity.notFound().build());
    }
    
    /**
     * Eliminar una campaña de salud
     * DELETE /api/campanias/{id}
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        return campaniaSaludRepository.findById(id)
                .map(campania -> {
                    campaniaSaludRepository.delete(campania);
                    return ResponseEntity.ok().<Void>build();
                })
                .orElse(ResponseEntity.notFound().build());
    }

    /**
     * Inscribir un paciente a una campaña
     * POST /api/campanias/{id}/inscribir/{pacienteId}
     */
    @PostMapping("/{id}/inscribir/{pacienteId}")
    public ResponseEntity<?> inscribirPaciente(@PathVariable Long id, @PathVariable Long pacienteId) {
        return campaniaSaludRepository.findById(id)
                .map(campania -> {
                    return pacienteRepository.findById(pacienteId)
                            .map(paciente -> {
                                if (campania.getPacientes().contains(paciente)) {
                                    return ResponseEntity.badRequest().body("El paciente ya está inscrito en esta campaña");
                                }
                                campania.getPacientes().add(paciente);
                                campaniaSaludRepository.save(campania);
                                return ResponseEntity.ok("Paciente inscrito exitosamente");
                            })
                            .orElse(ResponseEntity.notFound().build());
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
