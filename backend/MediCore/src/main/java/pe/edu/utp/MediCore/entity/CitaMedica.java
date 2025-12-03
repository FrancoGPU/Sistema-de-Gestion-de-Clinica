package pe.edu.utp.MediCore.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDateTime;

/**
 * Entidad Cita Médica
 * Contiene: idCita, fecha, hora, idPaciente y idMedico
 */
@Entity
@Table(name = "citas_medicas", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"id_medico", "fecha_hora"})
})
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CitaMedica {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idCita;
    
    @NotNull(message = "La fecha y hora son obligatorias")
    @jakarta.validation.constraints.Future(message = "La fecha de la cita debe ser en el futuro")
    @Column(name = "fecha_hora", nullable = false)
    private LocalDateTime fechaHora;
    
    @NotNull(message = "El paciente es obligatorio")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_paciente", nullable = false)
    private Paciente paciente;
    
    @NotNull(message = "El médico es obligatorio")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_medico", nullable = false)
    private Medico medico;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private EstadoCita estado = EstadoCita.PROGRAMADA;
    
    @Column(length = 500)
    private String motivo;
    
    @Column(length = 1000)
    private String observaciones;
    
    public enum EstadoCita {
        PROGRAMADA,
        CONFIRMADA,
        EN_CURSO,
        COMPLETADA,
        CANCELADA,
        NO_ASISTIO
    }
}
