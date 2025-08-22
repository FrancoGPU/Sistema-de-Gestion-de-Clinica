package com.clinica.sistema.service;

import com.clinica.sistema.entity.HistorialMedico;
import com.clinica.sistema.entity.Doctor;
import com.clinica.sistema.entity.Paciente;
import com.clinica.sistema.repository.HistorialMedicoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class HistorialMedicoService {
    
    @Autowired
    private HistorialMedicoRepository historialMedicoRepository;
    
    public List<HistorialMedico> findAll() {
        return historialMedicoRepository.findAll();
    }
    
    public Optional<HistorialMedico> findById(Long id) {
        return historialMedicoRepository.findById(id);
    }
    
    public HistorialMedico save(HistorialMedico historialMedico) {
        return historialMedicoRepository.save(historialMedico);
    }
    
    public void deleteById(Long id) {
        historialMedicoRepository.deleteById(id);
    }
    
    public List<HistorialMedico> findByPaciente(Paciente paciente) {
        return historialMedicoRepository.findByPacienteOrderByFechaConsultaDesc(paciente);
    }
    
    public List<HistorialMedico> findByDoctor(Doctor doctor) {
        return historialMedicoRepository.findByDoctorOrderByFechaConsultaDesc(doctor);
    }
    
    public List<HistorialMedico> findByFechaConsultaBetween(LocalDateTime inicio, LocalDateTime fin) {
        return historialMedicoRepository.findByFechaConsultaBetween(inicio, fin);
    }
    
    public List<HistorialMedico> findByPacienteAndFechaConsultaBetween(Paciente paciente, LocalDateTime inicio, LocalDateTime fin) {
        return historialMedicoRepository.findByPacienteAndFechaConsultaBetween(paciente, inicio, fin);
    }
}