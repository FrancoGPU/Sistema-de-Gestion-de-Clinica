package com.clinica.sistema.repository;

import com.clinica.sistema.entity.Paciente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface PacienteRepository extends JpaRepository<Paciente, Long> {
    
    Optional<Paciente> findByEmail(String email);
    
    Optional<Paciente> findByDni(String dni);
    
    List<Paciente> findByNombreContainingIgnoreCase(String nombre);
    
    List<Paciente> findByApellidoContainingIgnoreCase(String apellido);
    
    @Query("SELECT p FROM Paciente p WHERE " +
           "LOWER(p.nombre) LIKE LOWER(CONCAT('%', :busqueda, '%')) OR " +
           "LOWER(p.apellido) LIKE LOWER(CONCAT('%', :busqueda, '%')) OR " +
           "p.dni LIKE CONCAT('%', :busqueda, '%')")
    List<Paciente> buscarPacientes(@Param("busqueda") String busqueda);
    
    boolean existsByEmail(String email);
    
    boolean existsByDni(String dni);
}