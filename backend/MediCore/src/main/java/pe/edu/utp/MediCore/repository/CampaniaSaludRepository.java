package pe.edu.utp.MediCore.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import pe.edu.utp.MediCore.entity.CampaniaSalud;

import java.time.LocalDate;
import java.util.List;

/**
 * Repositorio para la entidad CampaniaSalud
 * Proporciona operaciones CRUD y consultas personalizadas
 */
@Repository
public interface CampaniaSaludRepository extends JpaRepository<CampaniaSalud, Long> {
    
    // Buscar campañas por estado
    List<CampaniaSalud> findByEstado(CampaniaSalud.EstadoCampania estado);
    
    // Buscar campañas activas (en curso)
    @Query("SELECT c FROM CampaniaSalud c WHERE c.estado = 'EN_CURSO'")
    List<CampaniaSalud> findCampaniasActivas();
    
    // Buscar campañas vigentes (que incluyen la fecha actual)
    @Query("SELECT c FROM CampaniaSalud c WHERE " +
           "c.fechaInicio <= :fecha AND c.fechaFinalizacion >= :fecha")
    List<CampaniaSalud> findCampaniasVigentes(LocalDate fecha);
    
    // Buscar campañas futuras
    @Query("SELECT c FROM CampaniaSalud c WHERE c.fechaInicio > CURRENT_DATE " +
           "ORDER BY c.fechaInicio")
    List<CampaniaSalud> findCampaniasFuturas();
    
    // Buscar campañas por nombre (búsqueda parcial)
    List<CampaniaSalud> findByNombreCampaniaContainingIgnoreCase(String nombre);
    
    // Buscar campañas en un rango de fechas
    @Query("SELECT c FROM CampaniaSalud c WHERE " +
           "c.fechaInicio <= :fechaFin AND c.fechaFinalizacion >= :fechaInicio")
    List<CampaniaSalud> findCampaniasEnRango(LocalDate fechaInicio, LocalDate fechaFin);
}
