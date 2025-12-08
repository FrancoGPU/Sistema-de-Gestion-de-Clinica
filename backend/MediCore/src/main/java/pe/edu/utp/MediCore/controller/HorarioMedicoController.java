package pe.edu.utp.MediCore.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pe.edu.utp.MediCore.entity.HorarioMedico;
import pe.edu.utp.MediCore.repository.HorarioMedicoRepository;
import pe.edu.utp.MediCore.repository.MedicoRepository;

import java.util.List;

@RestController
@RequestMapping("/api/horarios")
@CrossOrigin(origins = "http://localhost:4200")
public class HorarioMedicoController {

    @Autowired
    private HorarioMedicoRepository horarioRepository;

    @Autowired
    private MedicoRepository medicoRepository;

    @GetMapping("/medico/{idMedico}")
    public ResponseEntity<List<HorarioMedico>> getHorariosByMedico(@PathVariable Long idMedico) {
        return ResponseEntity.ok(horarioRepository.findByMedicoIdMedico(idMedico));
    }

    @PostMapping("/medico/{idMedico}")
    public ResponseEntity<?> createHorario(@PathVariable Long idMedico, @RequestBody HorarioMedico horario) {
        return medicoRepository.findById(idMedico).map(medico -> {
            horario.setMedico(medico);
            return ResponseEntity.ok(horarioRepository.save(horario));
        }).orElse(ResponseEntity.notFound().build());
    }
    
    @DeleteMapping("/{idHorario}")
    public ResponseEntity<?> deleteHorario(@PathVariable Long idHorario) {
        return horarioRepository.findById(idHorario).map(horario -> {
            horarioRepository.delete(horario);
            return ResponseEntity.ok().build();
        }).orElse(ResponseEntity.notFound().build());
    }
}
