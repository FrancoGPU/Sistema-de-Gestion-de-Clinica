package pe.edu.utp.MediCore.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pe.edu.utp.MediCore.entity.MensajeContacto;
import pe.edu.utp.MediCore.repository.MensajeContactoRepository;

import java.util.List;

@RestController
@RequestMapping("/api/contacto")
@CrossOrigin(origins = "http://localhost:4200")
public class MensajeContactoController {

    @Autowired
    private MensajeContactoRepository mensajeRepository;

    @PostMapping
    public ResponseEntity<MensajeContacto> enviarMensaje(@RequestBody MensajeContacto mensaje) {
        return ResponseEntity.ok(mensajeRepository.save(mensaje));
    }

    @GetMapping
    public ResponseEntity<List<MensajeContacto>> obtenerMensajes() {
        return ResponseEntity.ok(mensajeRepository.findAll());
    }

    @GetMapping("/usuario/{usuarioId}")
    public ResponseEntity<List<MensajeContacto>> obtenerMensajesPorUsuario(@PathVariable Long usuarioId) {
        return ResponseEntity.ok(mensajeRepository.findByUsuarioId(usuarioId));
    }

    @PutMapping("/{id}/responder")
    public ResponseEntity<MensajeContacto> responderMensaje(@PathVariable Long id, @RequestBody String respuesta) {
        return mensajeRepository.findById(id)
                .map(mensaje -> {
                    mensaje.setRespuesta(respuesta);
                    mensaje.setFechaRespuesta(java.time.LocalDateTime.now());
                    return ResponseEntity.ok(mensajeRepository.save(mensaje));
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
