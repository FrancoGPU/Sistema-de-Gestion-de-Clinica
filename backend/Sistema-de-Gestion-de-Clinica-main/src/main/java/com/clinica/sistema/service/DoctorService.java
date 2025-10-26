package com.clinica.sistema.service;

import com.clinica.sistema.entity.Doctor;
import com.clinica.sistema.repository.DoctorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class DoctorService {
    
    @Autowired
    private DoctorRepository doctorRepository;
    
    public List<Doctor> findAll() {
        return doctorRepository.findAll();
    }
    
    public Optional<Doctor> findById(Long id) {
        return doctorRepository.findById(id);
    }
    
    public Doctor save(Doctor doctor) {
        return doctorRepository.save(doctor);
    }
    
    public void deleteById(Long id) {
        doctorRepository.deleteById(id);
    }
    
    public Optional<Doctor> findByEmail(String email) {
        return doctorRepository.findByEmail(email);
    }
    
    public Optional<Doctor> findByNumeroLicencia(String numeroLicencia) {
        return doctorRepository.findByNumeroLicencia(numeroLicencia);
    }
    
    public List<Doctor> findByEspecializacion(String especializacion) {
        return doctorRepository.findByEspecializacionContainingIgnoreCase(especializacion);
    }
    
    public List<Doctor> buscarDoctores(String busqueda) {
        if (busqueda == null || busqueda.trim().isEmpty()) {
            return findAll();
        }
        return doctorRepository.buscarDoctores(busqueda.trim());
    }
    
    public List<String> findAllEspecializaciones() {
        return doctorRepository.findAllEspecializaciones();
    }
    
    public boolean existsByEmail(String email) {
        return doctorRepository.existsByEmail(email);
    }
    
    public boolean existsByNumeroLicencia(String numeroLicencia) {
        return doctorRepository.existsByNumeroLicencia(numeroLicencia);
    }
    
    public boolean isEmailAvailable(String email, Long doctorId) {
        Optional<Doctor> existingDoctor = findByEmail(email);
        return existingDoctor.isEmpty() || existingDoctor.get().getId().equals(doctorId);
    }
    
    public boolean isNumeroLicenciaAvailable(String numeroLicencia, Long doctorId) {
        Optional<Doctor> existingDoctor = findByNumeroLicencia(numeroLicencia);
        return existingDoctor.isEmpty() || existingDoctor.get().getId().equals(doctorId);
    }
}