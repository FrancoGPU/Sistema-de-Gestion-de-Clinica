package pe.edu.utp.MediCore.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pe.edu.utp.MediCore.dto.LoginRequest;
import pe.edu.utp.MediCore.dto.LoginResponse;
import pe.edu.utp.MediCore.dto.RegisterRequest;
import pe.edu.utp.MediCore.entity.Paciente;
import pe.edu.utp.MediCore.entity.Rol;
import pe.edu.utp.MediCore.entity.Usuario;
import pe.edu.utp.MediCore.repository.PacienteRepository;
import pe.edu.utp.MediCore.repository.UsuarioRepository;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:4200")
public class AuthController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PacienteRepository pacienteRepository;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        // Validar si el usuario ya existe
        if (usuarioRepository.findByUsername(request.getEmail()).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("El correo electrónico ya está registrado como usuario");
        }

        // Validar si el paciente ya existe por DNI o Email
        if (pacienteRepository.findByDni(request.getDni()).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("El DNI ya está registrado");
        }
        if (pacienteRepository.findByCorreoElectronico(request.getEmail()).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("El correo electrónico ya está registrado como paciente");
        }

        try {
            // Crear Usuario
            Usuario usuario = new Usuario();
            usuario.setUsername(request.getEmail());
            usuario.setPassword(request.getPassword()); // En producción, encriptar contraseña
            usuario.setRol(Rol.PACIENTE);
            
            // Crear Paciente
            Paciente paciente = new Paciente();
            paciente.setNombre(request.getNombre());
            paciente.setApellido(request.getApellido());
            paciente.setDni(request.getDni());
            paciente.setNumeroTelefono(request.getTelefono());
            paciente.setCorreoElectronico(request.getEmail());
            paciente.setFechaNacimiento(request.getFechaNacimiento());
            
            // Relacionar
            usuario.setPaciente(paciente);
            paciente.setUsuario(usuario);
            
            // Guardar (CascadeType.ALL en Usuario debería guardar Paciente también, pero a veces es mejor guardar explícitamente si la relación es bidireccional compleja)
            // Dado que Usuario es el dueño de la relación en el código que vi (mappedBy en Usuario? No, mappedBy está en Usuario para paciente... espera)
            
            // Revisemos Usuario.java:
            // @OneToOne(mappedBy = "usuario", cascade = CascadeType.ALL)
            // private Paciente paciente;
            
            // Revisemos Paciente.java:
            // @OneToOne(cascade = CascadeType.ALL)
            // @JoinColumn(name = "usuario_id", referencedColumnName = "idUsuario")
            // private Usuario usuario;
            
            // Paciente es el dueño de la relación (tiene @JoinColumn).
            // Entonces debemos guardar Paciente.
            
            pacienteRepository.save(paciente);
            
            return ResponseEntity.ok("Usuario registrado exitosamente");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al registrar usuario: " + e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        Optional<Usuario> usuarioOpt = usuarioRepository.findByUsername(request.getUsername());

        if (usuarioOpt.isPresent()) {
            Usuario usuario = usuarioOpt.get();
            // En producción, usar passwordEncoder.matches()
            if (usuario.getPassword().equals(request.getPassword())) {
                
                String nombre = "Usuario";
                if (usuario.getPaciente() != null) {
                    nombre = usuario.getPaciente().getNombre() + " " + usuario.getPaciente().getApellido();
                } else if (usuario.getMedico() != null) {
                    nombre = "Dr. " + usuario.getMedico().getNombre() + " " + usuario.getMedico().getApellido();
                } else if (usuario.getRol().name().equals("ADMIN")) {
                    nombre = "Administrador";
                }

                String role = usuario.getRol().name().toLowerCase();
                if (role.equals("admin")) {
                    role = "administrador";
                }

                Long profileId = null;
                if (usuario.getPaciente() != null) {
                    profileId = usuario.getPaciente().getIdPaciente();
                } else if (usuario.getMedico() != null) {
                    profileId = usuario.getMedico().getIdMedico();
                }

                LoginResponse response = new LoginResponse(
                    usuario.getIdUsuario(),
                    usuario.getUsername(),
                    role,
                    nombre,
                    profileId
                );
                return ResponseEntity.ok(response);
            }
        }
        
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciales inválidas");
    }
}
