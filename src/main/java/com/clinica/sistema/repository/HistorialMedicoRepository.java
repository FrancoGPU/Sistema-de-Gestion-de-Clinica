package com.clinica.sistema.repository;

import com.clinica.sistema.entity.HistorialMedico;
import com.clinica.sistema.entity.Doctor;
import com.clinica.sistema.entity.Paciente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface HistorialMedicoRepository extends JpaRepository<HistorialMedico, Long> {
    
    List<HistorialMedico> findByPaciente(Paciente paciente);
    
    List<HistorialMedico> findByDoctor(Doctor doctor);
    
    @Query("SELECT h FROM HistorialMedico h WHERE h.paciente = :paciente ORDER BY h.fechaConsulta DESC")
    List<HistorialMedico> findByPacienteOrderByFechaConsultaDesc(@Param("paciente") Paciente paciente);
    
    @Query("SELECT h FROM HistorialMedico h WHERE h.doctor = :doctor ORDER BY h.fechaConsulta DESC")
    List<HistorialMedico> findByDoctorOrderByFechaConsultaDesc(@Param("doctor") Doctor doctor);
    
    @Query("SELECT h FROM HistorialMedico h WHERE h.fechaConsulta BETWEEN :inicio AND :fin ORDER BY h.fechaConsulta DESC")
    List<HistorialMedico> findByFechaConsultaBetween(@Param("inicio") LocalDateTime inicio, @Param("fin") LocalDateTime fin);
    
    @Query("SELECT h FROM HistorialMedico h WHERE h.paciente = :paciente AND h.fechaConsulta BETWEEN :inicio AND :fin ORDER BY h.fechaConsulta DESC")
    List<HistorialMedico> findByPacienteAndFechaConsultaBetween(@Param("paciente") Paciente paciente, @Param("inicio") LocalDateTime inicio, @Param("fin") LocalDateTime fin);
}