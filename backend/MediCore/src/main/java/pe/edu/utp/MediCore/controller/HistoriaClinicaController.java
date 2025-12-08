package pe.edu.utp.MediCore.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pe.edu.utp.MediCore.entity.HistoriaClinica;
import pe.edu.utp.MediCore.entity.CitaMedica;
import pe.edu.utp.MediCore.repository.HistoriaClinicaRepository;
import pe.edu.utp.MediCore.repository.CitaMedicaRepository;

import java.util.List;

@RestController
@RequestMapping("/api/historias")
@CrossOrigin(origins = "http://localhost:4200")
public class HistoriaClinicaController {

    @Autowired
    private HistoriaClinicaRepository historiaRepository;
    
    @Autowired
    private CitaMedicaRepository citaRepository;

    @PostMapping
    public ResponseEntity<?> crearHistoria(@RequestBody HistoriaClinica historia) {
        // Verificar si la cita existe
        if (historia.getCita() != null && historia.getCita().getIdCita() != null) {
            CitaMedica cita = citaRepository.findById(historia.getCita().getIdCita())
                    .orElseThrow(() -> new RuntimeException("Cita no encontrada"));
            
            // Actualizar estado de la cita a COMPLETADA
            cita.setEstado(CitaMedica.EstadoCita.COMPLETADA);
            citaRepository.save(cita);
            
            historia.setCita(cita);
            historia.setPaciente(cita.getPaciente());
            historia.setMedico(cita.getMedico());
        }
        
        return ResponseEntity.ok(historiaRepository.save(historia));
    }

    @GetMapping("/paciente/{idPaciente}")
    public ResponseEntity<List<HistoriaClinica>> obtenerPorPaciente(@PathVariable Long idPaciente) {
        return ResponseEntity.ok(historiaRepository.findByPacienteIdPaciente(idPaciente));
    }
    
    @GetMapping("/medico/{idMedico}")
    public ResponseEntity<List<HistoriaClinica>> obtenerPorMedico(@PathVariable Long idMedico) {
        return ResponseEntity.ok(historiaRepository.findByMedicoIdMedico(idMedico));
    }
    
    @GetMapping("/cita/{idCita}")
    public ResponseEntity<HistoriaClinica> obtenerPorCita(@PathVariable Long idCita) {
        return historiaRepository.findByCitaIdCita(idCita)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
