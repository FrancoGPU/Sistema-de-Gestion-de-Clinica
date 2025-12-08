package pe.edu.utp.MediCore.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "historias_clinicas")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class HistoriaClinica {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idHistoria;
    
    @OneToOne
    @JoinColumn(name = "id_cita", nullable = false, unique = true)
    private CitaMedica cita;
    
    @ManyToOne
    @JoinColumn(name = "id_paciente", nullable = false)
    private Paciente paciente;
    
    @ManyToOne
    @JoinColumn(name = "id_medico", nullable = false)
    private Medico medico;
    
    @Column(nullable = false)
    private LocalDateTime fechaAtencion;
    
    @Column(columnDefinition = "TEXT")
    private String sintomas;
    
    @Column(columnDefinition = "TEXT")
    private String diagnostico;
    
    @Column(columnDefinition = "TEXT")
    private String tratamiento;
    
    @Column(columnDefinition = "TEXT")
    private String observaciones;
    
    @PrePersist
    public void prePersist() {
        if (this.fechaAtencion == null) {
            this.fechaAtencion = LocalDateTime.now();
        }
    }
}
