package pe.edu.utp.MediCore.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import pe.edu.utp.MediCore.entity.CitaMedica;
import pe.edu.utp.MediCore.entity.Medico;
import pe.edu.utp.MediCore.entity.Paciente;

import java.time.LocalDateTime;
import java.util.List;

/**
 * Repositorio para la entidad CitaMedica
 * Proporciona operaciones CRUD y consultas personalizadas
 */
@Repository
public interface CitaMedicaRepository extends JpaRepository<CitaMedica, Long> {
    
    // Buscar citas por paciente
    List<CitaMedica> findByPaciente(Paciente paciente);
    
    // Buscar citas por médico
    List<CitaMedica> findByMedico(Medico medico);
    
    // Buscar citas por estado
    List<CitaMedica> findByEstado(CitaMedica.EstadoCita estado);
    
    // Buscar citas en un rango de fechas
    List<CitaMedica> findByFechaHoraBetween(LocalDateTime inicio, LocalDateTime fin);
    
    // Buscar citas de un médico en un rango de fechas
    List<CitaMedica> findByMedicoAndFechaHoraBetween(
        Medico medico, 
        LocalDateTime inicio, 
        LocalDateTime fin
    );

    // Verificar existencia de cita para un médico en fecha y hora exacta
    boolean existsByMedicoAndFechaHora(Medico medico, LocalDateTime fechaHora);
    
    // Buscar citas de un paciente ordenadas por fecha
    @Query("SELECT c FROM CitaMedica c WHERE c.paciente = :paciente ORDER BY c.fechaHora DESC")
    List<CitaMedica> findByPacienteOrderByFechaHoraDesc(Paciente paciente);
    
    // Buscar citas del día actual
    @Query("SELECT c FROM CitaMedica c WHERE " +
           "DATE(c.fechaHora) = CURRENT_DATE " +
           "ORDER BY c.fechaHora")
    List<CitaMedica> findCitasHoy();
    
    // Buscar citas del día actual por médico
    @Query("SELECT c FROM CitaMedica c WHERE " +
           "c.medico = :medico AND " +
           "DATE(c.fechaHora) = CURRENT_DATE " +
           "ORDER BY c.fechaHora")
    List<CitaMedica> findCitasHoyByMedico(Medico medico);
}
