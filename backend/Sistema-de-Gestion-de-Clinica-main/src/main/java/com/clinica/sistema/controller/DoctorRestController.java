package com.clinica.sistema.controller;

import com.clinica.sistema.entity.Doctor;
import com.clinica.sistema.repository.DoctorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/doctores")
@CrossOrigin(origins = "http://localhost:4200") // Permitir peticiones desde Angular
public class DoctorRestController {

    @Autowired
    private DoctorRepository doctorRepository;

    /**
     * GET /api/doctores
     * Obtiene todos los doctores
     */
    @GetMapping
    public ResponseEntity<List<Doctor>> getAllDoctores() {
        List<Doctor> doctores = doctorRepository.findAll();
        return ResponseEntity.ok(doctores);
    }

    /**
     * GET /api/doctores/{id}
     * Obtiene un doctor por ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<Doctor> getDoctorById(@PathVariable Long id) {
        Optional<Doctor> doctor = doctorRepository.findById(id);
        return doctor.map(ResponseEntity::ok)
                    .orElse(ResponseEntity.notFound().build());
    }

    /**
     * GET /api/doctores/especialidad/{especialidad}
     * Obtiene doctores por especialidad
     */
    @GetMapping("/especialidad/{especialidad}")
    public ResponseEntity<List<Doctor>> getDoctoresByEspecialidad(@PathVariable String especialidad) {
        List<Doctor> doctores = doctorRepository.findByEspecializacionContainingIgnoreCase(especialidad);
        return ResponseEntity.ok(doctores);
    }

    /**
     * GET /api/doctores/search?q={termino}
     * Busca doctores por nombre, apellido o especialidad
     */
    @GetMapping("/search")
    public ResponseEntity<List<Doctor>> searchDoctores(@RequestParam("q") String termino) {
        List<Doctor> doctores = doctorRepository.buscarDoctores(termino);
        return ResponseEntity.ok(doctores);
    }

    /**
     * GET /api/doctores/especialidades
     * Obtiene lista de todas las especialidades
     */
    @GetMapping("/especialidades")
    public ResponseEntity<List<String>> getEspecialidades() {
        List<String> especialidades = doctorRepository.findAllEspecializaciones();
        return ResponseEntity.ok(especialidades);
    }

    /**
     * POST /api/doctores
     * Crea un nuevo doctor
     */
    @PostMapping
    public ResponseEntity<Doctor> createDoctor(@Valid @RequestBody Doctor doctor) {
        // Verificar si el email ya existe
        if (doctorRepository.existsByEmail(doctor.getEmail())) {
            return ResponseEntity.badRequest().build();
        }
        
        // Verificar si el número de licencia ya existe
        if (doctor.getNumeroLicencia() != null && 
            doctorRepository.existsByNumeroLicencia(doctor.getNumeroLicencia())) {
            return ResponseEntity.badRequest().build();
        }
        
        Doctor savedDoctor = doctorRepository.save(doctor);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedDoctor);
    }

    /**
     * PUT /api/doctores/{id}
     * Actualiza un doctor existente
     */
    @PutMapping("/{id}")
    public ResponseEntity<Doctor> updateDoctor(
            @PathVariable Long id,
            @Valid @RequestBody Doctor doctorDetails) {
        
        Optional<Doctor> doctorOptional = doctorRepository.findById(id);
        
        if (doctorOptional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        
        Doctor doctor = doctorOptional.get();
        doctor.setNombre(doctorDetails.getNombre());
        doctor.setApellido(doctorDetails.getApellido());
        doctor.setEspecializacion(doctorDetails.getEspecializacion());
        doctor.setEmail(doctorDetails.getEmail());
        doctor.setTelefono(doctorDetails.getTelefono());
        doctor.setNumeroLicencia(doctorDetails.getNumeroLicencia());
        
        Doctor updatedDoctor = doctorRepository.save(doctor);
        return ResponseEntity.ok(updatedDoctor);
    }

    /**
     * DELETE /api/doctores/{id}
     * Elimina un doctor
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDoctor(@PathVariable Long id) {
        if (!doctorRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        
        doctorRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    /**
     * GET /api/doctores/count
     * Obtiene el total de doctores
     */
    @GetMapping("/count")
    public ResponseEntity<Long> countDoctores() {
        long count = doctorRepository.count();
        return ResponseEntity.ok(count);
    }
}
