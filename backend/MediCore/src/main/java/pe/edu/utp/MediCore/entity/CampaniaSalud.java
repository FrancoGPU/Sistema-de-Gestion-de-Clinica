package pe.edu.utp.MediCore.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.ToString;
import lombok.EqualsAndHashCode;

import java.time.LocalDate;

/**
 * Entidad Campaña de Salud
 * Contiene: idCampaña, nombreCampaña, descripción, fecha de inicio y fecha de finalización
 */
@Entity
@Table(name = "campanias_salud")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CampaniaSalud {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idCampania;
    
    @NotBlank(message = "El nombre de la campaña es obligatorio")
    @Column(nullable = false, length = 200)
    private String nombreCampania;
    
    @Column(length = 1000)
    private String descripcion;
    
    @NotNull(message = "La fecha de inicio es obligatoria")
    @Column(nullable = false)
    private LocalDate fechaInicio;
    
    @NotNull(message = "La fecha de finalización es obligatoria")
    @Column(nullable = false)
    private LocalDate fechaFinalizacion;
    
    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private EstadoCampania estado = EstadoCampania.PLANIFICADA;
    
    @Column(length = 200)
    private String lugarRealizacion;
    
        @Column(length = 500)
    private String publicoObjetivo;

    @Column(length = 255)
    private String imagenUrl;

    @ManyToMany
    @JoinTable(
        name = "campania_medicos",
        joinColumns = @JoinColumn(name = "campania_id"),
        inverseJoinColumns = @JoinColumn(name = "medico_id")
    )
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private java.util.Set<Medico> medicos;

    @ManyToMany
    @JoinTable(
        name = "campania_pacientes",
        joinColumns = @JoinColumn(name = "campania_id"),
        inverseJoinColumns = @JoinColumn(name = "paciente_id")
    )
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private java.util.Set<Paciente> pacientes;
    
    public enum EstadoCampania {
        PLANIFICADA,
        EN_CURSO,
        FINALIZADA,
        CANCELADA
    }
    
    // Validación personalizada
    @PrePersist
    @PreUpdate
    private void validarFechas() {
        if (fechaInicio != null && fechaFinalizacion != null && fechaFinalizacion.isBefore(fechaInicio)) {
            throw new IllegalArgumentException("La fecha de finalización no puede ser anterior a la fecha de inicio");
        }
    }
}
