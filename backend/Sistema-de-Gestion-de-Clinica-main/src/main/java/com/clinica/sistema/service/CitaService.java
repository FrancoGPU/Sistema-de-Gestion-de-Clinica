package com.clinica.sistema.service;

import com.clinica.sistema.entity.Cita;
import com.clinica.sistema.entity.Doctor;
import com.clinica.sistema.entity.Paciente;
import com.clinica.sistema.repository.CitaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class CitaService {
    
    @Autowired
    private CitaRepository citaRepository;
    
    public List<Cita> findAll() {
        return citaRepository.findAll();
    }
    
    public Optional<Cita> findById(Long id) {
        return citaRepository.findById(id);
    }
    
    public Cita save(Cita cita) {
        return citaRepository.save(cita);
    }
    
    public void deleteById(Long id) {
        citaRepository.deleteById(id);
    }
    
    public List<Cita> findByPaciente(Paciente paciente) {
        return citaRepository.findByPacienteOrderByFechaHoraDesc(paciente);
    }
    
    public List<Cita> findByDoctor(Doctor doctor) {
        return citaRepository.findByDoctorOrderByFechaHoraAsc(doctor);
    }
    
    public List<Cita> findByEstado(Cita.EstadoCita estado) {
        return citaRepository.findByEstado(estado);
    }
    
    public List<Cita> findByFechaHoraBetween(LocalDateTime inicio, LocalDateTime fin) {
        return citaRepository.findByFechaHoraBetween(inicio, fin);
    }
    
    public List<Cita> findByDoctorAndFechaHoraBetween(Doctor doctor, LocalDateTime inicio, LocalDateTime fin) {
        return citaRepository.findByDoctorAndFechaHoraBetween(doctor, inicio, fin);
    }
    
    public List<Cita> findCitasHoy() {
        return citaRepository.findCitasHoy();
    }
    
    public List<Cita> findCitasHoyByDoctor(Doctor doctor) {
        return citaRepository.findCitasHoyByDoctor(doctor);
    }
    
    public void cancelarCita(Long citaId) {
        Optional<Cita> citaOpt = findById(citaId);
        if (citaOpt.isPresent()) {
            Cita cita = citaOpt.get();
            cita.setEstado(Cita.EstadoCita.CANCELADA);
            save(cita);
        }
    }
    
    public void confirmarCita(Long citaId) {
        Optional<Cita> citaOpt = findById(citaId);
        if (citaOpt.isPresent()) {
            Cita cita = citaOpt.get();
            cita.setEstado(Cita.EstadoCita.CONFIRMADA);
            save(cita);
        }
    }
    
    public void completarCita(Long citaId) {
        Optional<Cita> citaOpt = findById(citaId);
        if (citaOpt.isPresent()) {
            Cita cita = citaOpt.get();
            cita.setEstado(Cita.EstadoCita.COMPLETADA);
            save(cita);
        }
    }
}