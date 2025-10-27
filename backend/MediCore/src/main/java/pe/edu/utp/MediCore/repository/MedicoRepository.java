package pe.edu.utp.MediCore.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import pe.edu.utp.MediCore.entity.Medico;

import java.util.List;
import java.util.Optional;

/**
 * Repositorio para la entidad Medico
 * Proporciona operaciones CRUD y consultas personalizadas
 */
@Repository
public interface MedicoRepository extends JpaRepository<Medico, Long> {
    
    // Buscar médicos por especialidad
    List<Medico> findByEspecialidadContainingIgnoreCase(String especialidad);
    
    // Buscar médico por número de licencia
    Optional<Medico> findByNumeroLicencia(String numeroLicencia);
    
    // Buscar médico por email
    Optional<Medico> findByEmail(String email);
    
    // Buscar médicos por nombre o apellido
    @Query("SELECT m FROM Medico m WHERE " +
           "LOWER(m.nombre) LIKE LOWER(CONCAT('%', :busqueda, '%')) OR " +
           "LOWER(m.apellido) LIKE LOWER(CONCAT('%', :busqueda, '%')) OR " +
           "LOWER(m.especialidad) LIKE LOWER(CONCAT('%', :busqueda, '%'))")
    List<Medico> buscarMedicos(String busqueda);
    
    // Obtener todas las especialidades únicas
    @Query("SELECT DISTINCT m.especialidad FROM Medico m ORDER BY m.especialidad")
    List<String> findAllEspecialidades();
    
    // Verificar existencia por email
    boolean existsByEmail(String email);
    
    // Verificar existencia por número de licencia
    boolean existsByNumeroLicencia(String numeroLicencia);
}
