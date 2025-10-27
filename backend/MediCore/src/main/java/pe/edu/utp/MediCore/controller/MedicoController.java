package pe.edu.utp.MediCore.controller;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pe.edu.utp.MediCore.entity.Medico;
import pe.edu.utp.MediCore.repository.MedicoRepository;

import java.util.List;

/**
 * Controlador REST para la entidad Medico
 * Proporciona endpoints para operaciones CRUD
 */
@RestController
@RequestMapping("/api/medicos")
@CrossOrigin(origins = "http://localhost:4200")
public class MedicoController {
    
    @Autowired
    private MedicoRepository medicoRepository;
    
    /**
     * Obtener todos los médicos
     * GET /api/medicos
     */
    @GetMapping
    public ResponseEntity<List<Medico>> obtenerTodos() {
        List<Medico> medicos = medicoRepository.findAll();
        return ResponseEntity.ok(medicos);
    }
    
    /**
     * Obtener un médico por ID
     * GET /api/medicos/{id}
     */
    @GetMapping("/{id}")
    public ResponseEntity<Medico> obtenerPorId(@PathVariable Long id) {
        return medicoRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    /**
     * Buscar médicos por especialidad
     * GET /api/medicos/especialidad/{especialidad}
     */
    @GetMapping("/especialidad/{especialidad}")
    public ResponseEntity<List<Medico>> obtenerPorEspecialidad(@PathVariable String especialidad) {
        List<Medico> medicos = medicoRepository.findByEspecialidadContainingIgnoreCase(especialidad);
        return ResponseEntity.ok(medicos);
    }
    
    /**
     * Obtener todas las especialidades disponibles
     * GET /api/medicos/especialidades
     */
    @GetMapping("/especialidades")
    public ResponseEntity<List<String>> obtenerEspecialidades() {
        List<String> especialidades = medicoRepository.findAllEspecialidades();
        return ResponseEntity.ok(especialidades);
    }
    
    /**
     * Buscar médicos por nombre, apellido o especialidad
     * GET /api/medicos/buscar?q={busqueda}
     */
    @GetMapping("/buscar")
    public ResponseEntity<List<Medico>> buscar(@RequestParam String q) {
        List<Medico> medicos = medicoRepository.buscarMedicos(q);
        return ResponseEntity.ok(medicos);
    }
    
    /**
     * Crear un nuevo médico
     * POST /api/medicos
     */
    @PostMapping
    public ResponseEntity<Medico> crear(@Valid @RequestBody Medico medico) {
        // Verificar que no exista ya un médico con el mismo email
        if (medico.getEmail() != null && medicoRepository.existsByEmail(medico.getEmail())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }
        
        // Verificar que no exista ya un médico con el mismo número de licencia
        if (medico.getNumeroLicencia() != null && 
            medicoRepository.existsByNumeroLicencia(medico.getNumeroLicencia())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }
        
        Medico nuevoMedico = medicoRepository.save(medico);
        return ResponseEntity.status(HttpStatus.CREATED).body(nuevoMedico);
    }
    
    /**
     * Actualizar un médico existente
     * PUT /api/medicos/{id}
     */
    @PutMapping("/{id}")
    public ResponseEntity<Medico> actualizar(
            @PathVariable Long id,
            @Valid @RequestBody Medico medicoActualizado) {
        
        return medicoRepository.findById(id)
                .map(medico -> {
                    medico.setNombre(medicoActualizado.getNombre());
                    medico.setApellido(medicoActualizado.getApellido());
                    medico.setEspecialidad(medicoActualizado.getEspecialidad());
                    medico.setHorariosAtencion(medicoActualizado.getHorariosAtencion());
                    medico.setNumeroLicencia(medicoActualizado.getNumeroLicencia());
                    medico.setTelefono(medicoActualizado.getTelefono());
                    medico.setEmail(medicoActualizado.getEmail());
                    
                    Medico guardado = medicoRepository.save(medico);
                    return ResponseEntity.ok(guardado);
                })
                .orElse(ResponseEntity.notFound().build());
    }
    
    /**
     * Eliminar un médico
     * DELETE /api/medicos/{id}
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        return medicoRepository.findById(id)
                .map(medico -> {
                    medicoRepository.delete(medico);
                    return ResponseEntity.ok().<Void>build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
