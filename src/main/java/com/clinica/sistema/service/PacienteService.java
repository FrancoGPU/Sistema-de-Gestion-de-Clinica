package com.clinica.sistema.service;

import com.clinica.sistema.entity.Paciente;
import com.clinica.sistema.repository.PacienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class PacienteService {
    
    @Autowired
    private PacienteRepository pacienteRepository;
    
    public List<Paciente> findAll() {
        return pacienteRepository.findAll();
    }
    
    public Optional<Paciente> findById(Long id) {
        return pacienteRepository.findById(id);
    }
    
    public Paciente save(Paciente paciente) {
        return pacienteRepository.save(paciente);
    }
    
    public void deleteById(Long id) {
        pacienteRepository.deleteById(id);
    }
    
    public Optional<Paciente> findByEmail(String email) {
        return pacienteRepository.findByEmail(email);
    }
    
    public Optional<Paciente> findByDni(String dni) {
        return pacienteRepository.findByDni(dni);
    }
    
    public List<Paciente> buscarPacientes(String busqueda) {
        if (busqueda == null || busqueda.trim().isEmpty()) {
            return findAll();
        }
        return pacienteRepository.buscarPacientes(busqueda.trim());
    }
    
    public boolean existsByEmail(String email) {
        return pacienteRepository.existsByEmail(email);
    }
    
    public boolean existsByDni(String dni) {
        return pacienteRepository.existsByDni(dni);
    }
    
    public boolean isEmailAvailable(String email, Long pacienteId) {
        Optional<Paciente> existingPaciente = findByEmail(email);
        return existingPaciente.isEmpty() || existingPaciente.get().getId().equals(pacienteId);
    }
    
    public boolean isDniAvailable(String dni, Long pacienteId) {
        Optional<Paciente> existingPaciente = findByDni(dni);
        return existingPaciente.isEmpty() || existingPaciente.get().getId().equals(pacienteId);
    }
}