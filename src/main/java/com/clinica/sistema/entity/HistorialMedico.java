package com.clinica.sistema.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Entity
@Table(name = "historiales_medicos")
public class HistorialMedico {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "paciente_id", nullable = false)
    @NotNull(message = "El paciente es obligatorio")
    private Paciente paciente;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "doctor_id", nullable = false)
    @NotNull(message = "El doctor es obligatorio")
    private Doctor doctor;
    
    @Column(name = "fecha_consulta", nullable = false)
    private LocalDateTime fechaConsulta;
    
    @NotBlank(message = "El diagnóstico es obligatorio")
    @Column(nullable = false, length = 1000)
    private String diagnostico;
    
    @Column(length = 1000)
    private String tratamiento;
    
    @Column(length = 2000)
    private String notas;
    
    @Column(length = 1000)
    private String medicamentos;
    
    // Constructors
    public HistorialMedico() {
        this.fechaConsulta = LocalDateTime.now();
    }
    
    public HistorialMedico(Paciente paciente, Doctor doctor, String diagnostico, String tratamiento, String notas, String medicamentos) {
        this.paciente = paciente;
        this.doctor = doctor;
        this.diagnostico = diagnostico;
        this.tratamiento = tratamiento;
        this.notas = notas;
        this.medicamentos = medicamentos;
        this.fechaConsulta = LocalDateTime.now();
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public Paciente getPaciente() {
        return paciente;
    }
    
    public void setPaciente(Paciente paciente) {
        this.paciente = paciente;
    }
    
    public Doctor getDoctor() {
        return doctor;
    }
    
    public void setDoctor(Doctor doctor) {
        this.doctor = doctor;
    }
    
    public LocalDateTime getFechaConsulta() {
        return fechaConsulta;
    }
    
    public void setFechaConsulta(LocalDateTime fechaConsulta) {
        this.fechaConsulta = fechaConsulta;
    }
    
    public String getDiagnostico() {
        return diagnostico;
    }
    
    public void setDiagnostico(String diagnostico) {
        this.diagnostico = diagnostico;
    }
    
    public String getTratamiento() {
        return tratamiento;
    }
    
    public void setTratamiento(String tratamiento) {
        this.tratamiento = tratamiento;
    }
    
    public String getNotas() {
        return notas;
    }
    
    public void setNotas(String notas) {
        this.notas = notas;
    }
    
    public String getMedicamentos() {
        return medicamentos;
    }
    
    public void setMedicamentos(String medicamentos) {
        this.medicamentos = medicamentos;
    }
}