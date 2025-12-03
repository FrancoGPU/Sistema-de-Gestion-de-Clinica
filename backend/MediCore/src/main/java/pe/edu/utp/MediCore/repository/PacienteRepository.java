package pe.edu.utp.MediCore.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import pe.edu.utp.MediCore.entity.Paciente;
import pe.edu.utp.MediCore.entity.Usuario;

import java.util.Optional;

import java.util.List;
import java.util.Optional;

/**
 * Repositorio para la entidad Paciente
 * Proporciona operaciones CRUD y consultas personalizadas
 */
@Repository
public interface PacienteRepository extends JpaRepository<Paciente, Long> {
    Optional<Paciente> findByUsuario(Usuario usuario);
    Optional<Paciente> findByUsuarioUsername(String username);
    
    // Buscar paciente por DNI
    Optional<Paciente> findByDni(String dni);
    
    // Buscar paciente por correo electrónico
    Optional<Paciente> findByCorreoElectronico(String correoElectronico);
    
    // Buscar pacientes por nombre o apellido (búsqueda parcial)
    @Query("SELECT p FROM Paciente p WHERE " +
           "LOWER(p.nombre) LIKE LOWER(CONCAT('%', :busqueda, '%')) OR " +
           "LOWER(p.apellido) LIKE LOWER(CONCAT('%', :busqueda, '%'))")
    List<Paciente> buscarPorNombreOApellido(String busqueda);
    
    // Verificar si existe un paciente con un DNI específico
    boolean existsByDni(String dni);
    
    // Verificar si existe un paciente con un correo específico
    boolean existsByCorreoElectronico(String correoElectronico);
}
