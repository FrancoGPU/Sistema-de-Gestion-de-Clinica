package com.clinica.sistema.controller;

import com.clinica.sistema.entity.Cita;
import com.clinica.sistema.entity.Doctor;
import com.clinica.sistema.repository.CitaRepository;
import com.clinica.sistema.repository.DoctorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/citas")
@CrossOrigin(origins = "http://localhost:4200") // Permitir peticiones desde Angular
public class CitaRestController {

    @Autowired
    private CitaRepository citaRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    /**
     * GET /api/citas
     * Obtiene todas las citas
     */
    @GetMapping
    public ResponseEntity<List<Cita>> getAllCitas() {
        List<Cita> citas = citaRepository.findAll();
        return ResponseEntity.ok(citas);
    }

    /**
     * GET /api/citas/{id}
     * Obtiene una cita por ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<Cita> getCitaById(@PathVariable Long id) {
        Optional<Cita> cita = citaRepository.findById(id);
        return cita.map(ResponseEntity::ok)
                  .orElse(ResponseEntity.notFound().build());
    }

    /**
     * GET /api/citas/hoy
     * Obtiene las citas del día actual
     */
    @GetMapping("/hoy")
    public ResponseEntity<List<Cita>> getCitasHoy() {
        List<Cita> citas = citaRepository.findCitasHoy();
        return ResponseEntity.ok(citas);
    }

    /**
     * GET /api/citas/doctor/{doctorId}
     * Obtiene citas por doctor
     */
    @GetMapping("/doctor/{doctorId}")
    public ResponseEntity<List<Cita>> getCitasByDoctor(@PathVariable Long doctorId) {
        Optional<Doctor> doctor = doctorRepository.findById(doctorId);
        if (doctor.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        
        List<Cita> citas = citaRepository.findByDoctorOrderByFechaHoraAsc(doctor.get());
        return ResponseEntity.ok(citas);
    }

    /**
     * GET /api/citas/doctor/{doctorId}/hoy
     * Obtiene citas del día para un doctor específico
     */
    @GetMapping("/doctor/{doctorId}/hoy")
    public ResponseEntity<List<Cita>> getCitasHoyByDoctor(@PathVariable Long doctorId) {
        Optional<Doctor> doctor = doctorRepository.findById(doctorId);
        if (doctor.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        
        List<Cita> citas = citaRepository.findCitasHoyByDoctor(doctor.get());
        return ResponseEntity.ok(citas);
    }

    /**
     * GET /api/citas/rango?inicio=...&fin=...
     * Obtiene citas en un rango de fechas
     */
    @GetMapping("/rango")
    public ResponseEntity<List<Cita>> getCitasByRango(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime inicio,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime fin) {
        
        List<Cita> citas = citaRepository.findByFechaHoraBetween(inicio, fin);
        return ResponseEntity.ok(citas);
    }

    /**
     * GET /api/citas/estado/{estado}
     * Obtiene citas por estado
     */
    @GetMapping("/estado/{estado}")
    public ResponseEntity<List<Cita>> getCitasByEstado(@PathVariable String estado) {
        try {
            Cita.EstadoCita estadoCita = Cita.EstadoCita.valueOf(estado.toUpperCase());
            List<Cita> citas = citaRepository.findByEstado(estadoCita);
            return ResponseEntity.ok(citas);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    /**
     * POST /api/citas
     * Crea una nueva cita
     */
    @PostMapping
    public ResponseEntity<Cita> createCita(@Valid @RequestBody Cita cita) {
        // Validar que el doctor existe
        if (cita.getDoctor() != null && cita.getDoctor().getId() != null) {
            Optional<Doctor> doctor = doctorRepository.findById(cita.getDoctor().getId());
            if (doctor.isEmpty()) {
                return ResponseEntity.badRequest().build();
            }
            cita.setDoctor(doctor.get());
        }
        
        Cita savedCita = citaRepository.save(cita);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedCita);
    }

    /**
     * PUT /api/citas/{id}
     * Actualiza una cita existente
     */
    @PutMapping("/{id}")
    public ResponseEntity<Cita> updateCita(
            @PathVariable Long id,
            @Valid @RequestBody Cita citaDetails) {
        
        Optional<Cita> citaOptional = citaRepository.findById(id);
        
        if (citaOptional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        
        Cita cita = citaOptional.get();
        cita.setFechaHora(citaDetails.getFechaHora());
        cita.setMotivo(citaDetails.getMotivo());
        cita.setEstado(citaDetails.getEstado());
        cita.setObservaciones(citaDetails.getObservaciones());
        
        // Actualizar doctor si se proporciona
        if (citaDetails.getDoctor() != null && citaDetails.getDoctor().getId() != null) {
            Optional<Doctor> doctor = doctorRepository.findById(citaDetails.getDoctor().getId());
            doctor.ifPresent(cita::setDoctor);
        }
        
        Cita updatedCita = citaRepository.save(cita);
        return ResponseEntity.ok(updatedCita);
    }

    /**
     * PATCH /api/citas/{id}/estado
     * Actualiza solo el estado de una cita
     */
    @PatchMapping("/{id}/estado")
    public ResponseEntity<Cita> updateEstado(
            @PathVariable Long id,
            @RequestParam String estado) {
        
        Optional<Cita> citaOptional = citaRepository.findById(id);
        
        if (citaOptional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        
        try {
            Cita.EstadoCita estadoCita = Cita.EstadoCita.valueOf(estado.toUpperCase());
            Cita cita = citaOptional.get();
            cita.setEstado(estadoCita);
            
            Cita updatedCita = citaRepository.save(cita);
            return ResponseEntity.ok(updatedCita);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    /**
     * DELETE /api/citas/{id}
     * Elimina una cita
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCita(@PathVariable Long id) {
        if (!citaRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        
        citaRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    /**
     * GET /api/citas/count
     * Obtiene el total de citas
     */
    @GetMapping("/count")
    public ResponseEntity<Long> countCitas() {
        long count = citaRepository.count();
        return ResponseEntity.ok(count);
    }

    /**
     * GET /api/citas/count/estado/{estado}
     * Obtiene el total de citas por estado
     */
    @GetMapping("/count/estado/{estado}")
    public ResponseEntity<Long> countCitasByEstado(@PathVariable String estado) {
        try {
            Cita.EstadoCita estadoCita = Cita.EstadoCita.valueOf(estado.toUpperCase());
            long count = citaRepository.findByEstado(estadoCita).size();
            return ResponseEntity.ok(count);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
