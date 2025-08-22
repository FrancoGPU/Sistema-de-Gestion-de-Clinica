package com.clinica.sistema.repository;

import com.clinica.sistema.entity.Cita;
import com.clinica.sistema.entity.Doctor;
import com.clinica.sistema.entity.Paciente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface CitaRepository extends JpaRepository<Cita, Long> {
    
    List<Cita> findByPaciente(Paciente paciente);
    
    List<Cita> findByDoctor(Doctor doctor);
    
    List<Cita> findByEstado(Cita.EstadoCita estado);
    
    @Query("SELECT c FROM Cita c WHERE c.fechaHora BETWEEN :inicio AND :fin ORDER BY c.fechaHora")
    List<Cita> findByFechaHoraBetween(@Param("inicio") LocalDateTime inicio, @Param("fin") LocalDateTime fin);
    
    @Query("SELECT c FROM Cita c WHERE c.doctor = :doctor AND c.fechaHora BETWEEN :inicio AND :fin ORDER BY c.fechaHora")
    List<Cita> findByDoctorAndFechaHoraBetween(@Param("doctor") Doctor doctor, @Param("inicio") LocalDateTime inicio, @Param("fin") LocalDateTime fin);
    
    @Query("SELECT c FROM Cita c WHERE c.paciente = :paciente ORDER BY c.fechaHora DESC")
    List<Cita> findByPacienteOrderByFechaHoraDesc(@Param("paciente") Paciente paciente);
    
    @Query("SELECT c FROM Cita c WHERE c.doctor = :doctor ORDER BY c.fechaHora ASC")
    List<Cita> findByDoctorOrderByFechaHoraAsc(@Param("doctor") Doctor doctor);
    
    @Query("SELECT c FROM Cita c WHERE DATE(c.fechaHora) = CURRENT_DATE ORDER BY c.fechaHora")
    List<Cita> findCitasHoy();
    
    @Query("SELECT c FROM Cita c WHERE c.doctor = :doctor AND DATE(c.fechaHora) = CURRENT_DATE ORDER BY c.fechaHora")
    List<Cita> findCitasHoyByDoctor(@Param("doctor") Doctor doctor);
}