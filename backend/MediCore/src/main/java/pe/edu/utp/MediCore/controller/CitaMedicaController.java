package pe.edu.utp.MediCore.controller;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pe.edu.utp.MediCore.entity.CitaMedica;
import pe.edu.utp.MediCore.entity.Medico;
import pe.edu.utp.MediCore.entity.Paciente;
import pe.edu.utp.MediCore.entity.HorarioMedico;
import pe.edu.utp.MediCore.repository.CitaMedicaRepository;
import pe.edu.utp.MediCore.repository.MedicoRepository;
import pe.edu.utp.MediCore.repository.PacienteRepository;
import pe.edu.utp.MediCore.repository.HorarioMedicoRepository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.HashMap;

/**
 * Controlador REST para la entidad CitaMedica
 * Proporciona endpoints para operaciones CRUD
 */
@RestController
@RequestMapping("/api/citas")
@CrossOrigin(origins = "http://localhost:4200")
public class CitaMedicaController {
    
    @Autowired
    private CitaMedicaRepository citaMedicaRepository;
    
    @Autowired
    private PacienteRepository pacienteRepository;
    
    @Autowired
    private MedicoRepository medicoRepository;

    @Autowired
    private HorarioMedicoRepository horarioMedicoRepository;
    
    /**
     * Obtener todas las citas médicas
     * GET /api/citas
     */
    @GetMapping
    public ResponseEntity<List<CitaMedica>> obtenerTodas() {
        List<CitaMedica> citas = citaMedicaRepository.findAll();
        return ResponseEntity.ok(citas);
    }
    
    /**
     * Obtener una cita por ID
     * GET /api/citas/{id}
     */
    @GetMapping("/{id}")
    public ResponseEntity<CitaMedica> obtenerPorId(@PathVariable Long id) {
        return citaMedicaRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    /**
     * Obtener citas de un paciente específico
     * GET /api/citas/paciente/{idPaciente}
     */
    @GetMapping("/paciente/{idPaciente}")
    public ResponseEntity<List<CitaMedica>> obtenerPorPaciente(@PathVariable Long idPaciente) {
        return pacienteRepository.findById(idPaciente)
                .map(paciente -> {
                    List<CitaMedica> citas = citaMedicaRepository
                            .findByPacienteOrderByFechaHoraDesc(paciente);
                    return ResponseEntity.ok(citas);
                })
                .orElse(ResponseEntity.notFound().build());
    }
    
    /**
     * Obtener citas de un médico específico
     * GET /api/citas/medico/{idMedico}
     */
    @GetMapping("/medico/{idMedico}")
    public ResponseEntity<List<CitaMedica>> obtenerPorMedico(@PathVariable Long idMedico) {
        return medicoRepository.findById(idMedico)
                .map(medico -> {
                    List<CitaMedica> citas = citaMedicaRepository.findByMedico(medico);
                    return ResponseEntity.ok(citas);
                })
                .orElse(ResponseEntity.notFound().build());
    }
    
    /**
     * Obtener citas por estado
     * GET /api/citas/estado/{estado}
     */
    @GetMapping("/estado/{estado}")
    public ResponseEntity<List<CitaMedica>> obtenerPorEstado(@PathVariable CitaMedica.EstadoCita estado) {
        List<CitaMedica> citas = citaMedicaRepository.findByEstado(estado);
        return ResponseEntity.ok(citas);
    }


    /**
     * Crear una nueva cita médica
     * POST /api/citas
     */
    
    /**
     * Obtener citas del día actual
     * GET /api/citas/hoy
     */
    @GetMapping("/hoy")
    public ResponseEntity<List<CitaMedica>> obtenerCitasHoy() {
        List<CitaMedica> citas = citaMedicaRepository.findCitasHoy();
        return ResponseEntity.ok(citas);
    }
    
    /**
     * Obtener horarios disponibles para un médico en una fecha específica
     * GET /api/citas/disponibilidad?medicoId=1&fecha=2023-10-27
     */
    @GetMapping("/disponibilidad")
    public ResponseEntity<?> obtenerHorariosDisponibles(
            @RequestParam Long medicoId,
            @RequestParam String fecha) {
        
        try {
            LocalDate fechaConsulta = LocalDate.parse(fecha);
            
            if (fechaConsulta.isBefore(LocalDate.now())) {
                return ResponseEntity.badRequest().body("No se pueden agendar citas en fechas pasadas");
            }

            Medico medico = medicoRepository.findById(medicoId)
                    .orElseThrow(() -> new RuntimeException("Médico no encontrado"));

            // Obtener horario del médico para ese día de la semana
            List<HorarioMedico> horarios = horarioMedicoRepository.findByMedicoAndDiaSemana(
                    medico, fechaConsulta.getDayOfWeek());

            if (horarios.isEmpty()) {
                return ResponseEntity.ok(new ArrayList<>()); // No atiende ese día
            }

            List<String> slotsDisponibles = new ArrayList<>();

            // Obtener citas existentes para ese médico en esa fecha
            LocalDateTime inicioDia = fechaConsulta.atStartOfDay();
            LocalDateTime finDia = fechaConsulta.atTime(LocalTime.MAX);
            List<CitaMedica> citasExistentes = citaMedicaRepository.findByMedicoAndFechaHoraBetween(
                    medico, inicioDia, finDia);

            for (HorarioMedico horario : horarios) {
                LocalTime horaActual = horario.getHoraInicio();
                LocalTime horaFin = horario.getHoraFin();
                int duracion = horario.getDuracionCitaMinutos();

                while (horaActual.plusMinutes(duracion).isBefore(horaFin) || horaActual.plusMinutes(duracion).equals(horaFin)) {
                    LocalDateTime slotInicio = fechaConsulta.atTime(horaActual);
                    
                    // Verificar si el slot está ocupado
                    boolean ocupado = false;
                    for (CitaMedica cita : citasExistentes) {
                        if (cita.getFechaHora().isEqual(slotInicio)) {
                            ocupado = true;
                            break;
                        }
                    }

                    if (!ocupado) {
                        slotsDisponibles.add(horaActual.toString());
                    }

                    horaActual = horaActual.plusMinutes(duracion);
                }
            }

            return ResponseEntity.ok(slotsDisponibles);

        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error al consultar disponibilidad: " + e.getMessage());
        }
    }

    /**
     * Crear una nueva cita médica
     * POST /api/citas
     */
    @PostMapping
    public ResponseEntity<?> crear(@Valid @RequestBody CitaMedica cita) {
        // Verificar que el paciente existe
        if (cita.getPaciente() == null || cita.getPaciente().getIdPaciente() == null) {
            return ResponseEntity.badRequest().body("Paciente es requerido");
        }
        
        Paciente paciente = pacienteRepository.findById(cita.getPaciente().getIdPaciente())
                .orElse(null);
        if (paciente == null) {
            return ResponseEntity.badRequest().body("Paciente no encontrado");
        }
        
        // Verificar que el médico existe
        if (cita.getMedico() == null || cita.getMedico().getIdMedico() == null) {
            return ResponseEntity.badRequest().body("Médico es requerido");
        }
        
        Medico medico = medicoRepository.findById(cita.getMedico().getIdMedico())
                .orElse(null);
        if (medico == null) {
            return ResponseEntity.badRequest().body("Médico no encontrado");
        }

        // VALIDACIONES DE NEGOCIO
        String error = validarReglasNegocio(cita.getFechaHora(), medico, null);
        if (error != null) {
            return ResponseEntity.badRequest().body(error);
        }
        
        cita.setPaciente(paciente);
        cita.setMedico(medico);
        
        // Establecer estado inicial si no viene
        if (cita.getEstado() == null) {
            cita.setEstado(CitaMedica.EstadoCita.PROGRAMADA);
        }
        
        CitaMedica nuevaCita = citaMedicaRepository.save(cita);
        return ResponseEntity.status(HttpStatus.CREATED).body(nuevaCita);
    }
    
    /**
     * Actualizar una cita médica existente
     * PUT /api/citas/{id}
     */
    @PutMapping("/{id}")
    public ResponseEntity<?> actualizar(
            @PathVariable Long id,
            @Valid @RequestBody CitaMedica citaActualizada) {
        
        return citaMedicaRepository.findById(id)
                .map(cita -> {
                    // Si la fecha cambia, validar reglas
                    if (!cita.getFechaHora().equals(citaActualizada.getFechaHora())) {
                        // Necesitamos el médico (puede ser el actual o uno nuevo)
                        Medico medico = cita.getMedico();
                        if (citaActualizada.getMedico() != null && citaActualizada.getMedico().getIdMedico() != null) {
                             medico = medicoRepository.findById(citaActualizada.getMedico().getIdMedico()).orElse(medico);
                        }
                        
                        String error = validarReglasNegocio(citaActualizada.getFechaHora(), medico, id);
                        if (error != null) {
                            return ResponseEntity.badRequest().body(error);
                        }
                    }

                    cita.setFechaHora(citaActualizada.getFechaHora());
                    cita.setEstado(citaActualizada.getEstado());
                    cita.setMotivo(citaActualizada.getMotivo());
                    cita.setObservaciones(citaActualizada.getObservaciones());
                    
                    // Actualizar paciente si se proporciona
                    if (citaActualizada.getPaciente() != null && 
                        citaActualizada.getPaciente().getIdPaciente() != null) {
                        pacienteRepository.findById(citaActualizada.getPaciente().getIdPaciente())
                                .ifPresent(cita::setPaciente);
                    }
                    
                    // Actualizar médico si se proporciona
                    if (citaActualizada.getMedico() != null && 
                        citaActualizada.getMedico().getIdMedico() != null) {
                        medicoRepository.findById(citaActualizada.getMedico().getIdMedico())
                                .ifPresent(cita::setMedico);
                    }
                    
                    CitaMedica guardada = citaMedicaRepository.save(cita);
                    return ResponseEntity.ok(guardada);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    private String validarReglasNegocio(LocalDateTime fechaHora, Medico medico, Long idCitaExcluir) {
        // 1. Validar fecha futura (al menos 24 horas)
        if (fechaHora.isBefore(LocalDateTime.now().plusHours(24))) {
             return "La cita debe agendarse con al menos 24 horas de anticipación.";
        }

        // 2. Validar que el médico atiende ese día y hora
        List<HorarioMedico> horarios = horarioMedicoRepository.findByMedicoAndDiaSemana(
                medico, fechaHora.getDayOfWeek());
        
        boolean horarioValido = false;
        LocalTime horaCita = fechaHora.toLocalTime();

        for (HorarioMedico horario : horarios) {
            // Verifica si la hora de la cita está dentro del rango [inicio, fin)
            if (!horaCita.isBefore(horario.getHoraInicio()) && horaCita.isBefore(horario.getHoraFin())) {
                horarioValido = true;
                break;
            }
        }

        if (!horarioValido) {
            return "El médico no atiende en el horario seleccionado.";
        }

        // 3. Validar disponibilidad (que no haya otra cita)
        List<CitaMedica> citasConflicto = citaMedicaRepository.findByMedicoAndFechaHoraBetween(
                medico, fechaHora, fechaHora.plusMinutes(1)); 
        
        for (CitaMedica c : citasConflicto) {
            if (idCitaExcluir == null || !c.getIdCita().equals(idCitaExcluir)) {
                return "El horario seleccionado ya está ocupado.";
            }
        }
        
        return null; // Todo OK
    }
    
    /**
     * Eliminar una cita médica
     * DELETE /api/citas/{id}
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        return citaMedicaRepository.findById(id)
                .map(cita -> {
                    citaMedicaRepository.delete(cita);
                    return ResponseEntity.ok().<Void>build();
                })
                .orElse(ResponseEntity.notFound().build());
    }


}
