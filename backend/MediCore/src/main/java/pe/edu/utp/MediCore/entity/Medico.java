package pe.edu.utp.MediCore.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.util.List;

/**
 * Entidad Médico
 * Contiene: idMedico, nombre, especialidad y horarios de atención
 */
@Entity
@Table(name = "medicos")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Medico {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idMedico;
    
    @NotBlank(message = "El nombre es obligatorio")
    @Column(nullable = false, length = 100)
    private String nombre;
    
    @NotBlank(message = "El apellido es obligatorio")
    @Column(nullable = false, length = 100)
    private String apellido;
    
    @NotBlank(message = "La especialidad es obligatoria")
    @Column(nullable = false, length = 100)
    private String especialidad;
    
    @Column(length = 500)
    private String horariosAtencion;
    
    @Column(unique = true, length = 50)
    private String numeroLicencia;
    
    @Column(length = 20)
    private String telefono;
    
    @Column(unique = true)
    private String email;
    
    // Relación uno a muchos con CitaMedica
    @JsonIgnore
    @OneToMany(mappedBy = "medico", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CitaMedica> citas;
    
    // Método auxiliar para obtener el nombre completo
    public String getNombreCompleto() {
        return "Dr. " + nombre + " " + apellido;
    }
}
