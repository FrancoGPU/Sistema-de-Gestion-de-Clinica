package pe.edu.utp.MediCore.controller;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pe.edu.utp.MediCore.entity.Paciente;
import pe.edu.utp.MediCore.repository.PacienteRepository;

import java.util.List;

/**
 * Controlador REST para la entidad Paciente
 * Proporciona endpoints para operaciones CRUD
 */
@RestController
@RequestMapping("/api/pacientes")
@CrossOrigin(origins = "http://localhost:4200")
public class PacienteController {
    
    @Autowired
    private PacienteRepository pacienteRepository;
    
    /**
     * Obtener todos los pacientes
     * GET /api/pacientes
     */
    @GetMapping
    public ResponseEntity<List<Paciente>> obtenerTodos() {
        List<Paciente> pacientes = pacienteRepository.findAll();
        return ResponseEntity.ok(pacientes);
    }
    
    /**
     * Obtener un paciente por ID
     * GET /api/pacientes/{id}
     */
    @GetMapping("/{id}")
    public ResponseEntity<Paciente> obtenerPorId(@PathVariable Long id) {
        return pacienteRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    /**
     * Buscar paciente por DNI
     * GET /api/pacientes/dni/{dni}
     */
    @GetMapping("/dni/{dni}")
    public ResponseEntity<Paciente> obtenerPorDni(@PathVariable String dni) {
        return pacienteRepository.findByDni(dni)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    /**
     * Buscar pacientes por nombre o apellido
     * GET /api/pacientes/buscar?q={busqueda}
     */
    @GetMapping("/buscar")
    public ResponseEntity<List<Paciente>> buscar(@RequestParam String q) {
        List<Paciente> pacientes = pacienteRepository.buscarPorNombreOApellido(q);
        return ResponseEntity.ok(pacientes);
    }
    
    /**
     * Crear un nuevo paciente
     * POST /api/pacientes
     */
    @PostMapping
    public ResponseEntity<Paciente> crear(@Valid @RequestBody Paciente paciente) {
        // Verificar que no exista ya un paciente con el mismo DNI
        if (pacienteRepository.existsByDni(paciente.getDni())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }
        
        // Verificar que no exista ya un paciente con el mismo email
        if (pacienteRepository.existsByCorreoElectronico(paciente.getCorreoElectronico())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }
        
        Paciente nuevoPaciente = pacienteRepository.save(paciente);
        return ResponseEntity.status(HttpStatus.CREATED).body(nuevoPaciente);
    }
    
    /**
     * Actualizar un paciente existente
     * PUT /api/pacientes/{id}
     */
    @PutMapping("/{id}")
    public ResponseEntity<Paciente> actualizar(
            @PathVariable Long id,
            @Valid @RequestBody Paciente pacienteActualizado) {
        
        return pacienteRepository.findById(id)
                .map(paciente -> {
                    paciente.setNombre(pacienteActualizado.getNombre());
                    paciente.setApellido(pacienteActualizado.getApellido());
                    paciente.setDni(pacienteActualizado.getDni());
                    paciente.setCorreoElectronico(pacienteActualizado.getCorreoElectronico());
                    paciente.setNumeroTelefono(pacienteActualizado.getNumeroTelefono());
                    
                    Paciente guardado = pacienteRepository.save(paciente);
                    return ResponseEntity.ok(guardado);
                })
                .orElse(ResponseEntity.notFound().build());
    }
    
    /**
     * Eliminar un paciente
     * DELETE /api/pacientes/{id}
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        return pacienteRepository.findById(id)
                .map(paciente -> {
                    pacienteRepository.delete(paciente);
                    return ResponseEntity.ok().<Void>build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
