package com.clinica.sistema.repository;

import com.clinica.sistema.entity.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface DoctorRepository extends JpaRepository<Doctor, Long> {
    
    Optional<Doctor> findByEmail(String email);
    
    Optional<Doctor> findByNumeroLicencia(String numeroLicencia);
    
    List<Doctor> findByEspecializacionContainingIgnoreCase(String especializacion);
    
    List<Doctor> findByNombreContainingIgnoreCase(String nombre);
    
    @Query("SELECT d FROM Doctor d WHERE " +
           "LOWER(d.nombre) LIKE LOWER(CONCAT('%', :busqueda, '%')) OR " +
           "LOWER(d.apellido) LIKE LOWER(CONCAT('%', :busqueda, '%')) OR " +
           "LOWER(d.especializacion) LIKE LOWER(CONCAT('%', :busqueda, '%'))")
    List<Doctor> buscarDoctores(@Param("busqueda") String busqueda);
    
    @Query("SELECT DISTINCT d.especializacion FROM Doctor d ORDER BY d.especializacion")
    List<String> findAllEspecializaciones();
    
    boolean existsByEmail(String email);
    
    boolean existsByNumeroLicencia(String numeroLicencia);
}