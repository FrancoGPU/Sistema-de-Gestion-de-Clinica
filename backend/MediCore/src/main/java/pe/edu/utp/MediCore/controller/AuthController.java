package pe.edu.utp.MediCore.controller;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import pe.edu.utp.MediCore.dto.AuthResponseDTO;
import pe.edu.utp.MediCore.dto.LoginDTO;
import pe.edu.utp.MediCore.dto.RegistroDTO;
import pe.edu.utp.MediCore.entity.Rol;
import pe.edu.utp.MediCore.entity.Usuario;
import pe.edu.utp.MediCore.repository.RolRepository;
import pe.edu.utp.MediCore.repository.UsuarioRepository;
import pe.edu.utp.MediCore.security.JwtTokenProvider;

import java.util.HashSet;
import java.util.Set;

/**
 * Controlador REST para autenticación y autorización
 * Proporciona endpoints para login y registro de usuarios
 */
@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:4200")
public class AuthController {
    
    @Autowired
    private UsuarioRepository usuarioRepository;
    
    @Autowired
    private RolRepository rolRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Autowired
    private AuthenticationManager authenticationManager;
    
    @Autowired
    private JwtTokenProvider jwtTokenProvider;
    
    /**
     * Endpoint para registrar un nuevo usuario
     * POST /api/auth/registro
     */
    @PostMapping("/registro")
    public ResponseEntity<?> registrar(@Valid @RequestBody RegistroDTO registroDTO) {
        // Validar que el usuario no exista
        if (usuarioRepository.existsByUsername(registroDTO.getUsername())) {
            return ResponseEntity.badRequest().body("El nombre de usuario ya está en uso");
        }
        
        if (usuarioRepository.existsByEmail(registroDTO.getEmail())) {
            return ResponseEntity.badRequest().body("El correo ya está registrado");
        }
        
        // Crear nuevo usuario
        Usuario usuario = new Usuario();
        usuario.setUsername(registroDTO.getUsername());
        usuario.setEmail(registroDTO.getEmail());
        usuario.setPassword(passwordEncoder.encode(registroDTO.getPassword()));
        usuario.setNombre(registroDTO.getNombre());
        usuario.setApellido(registroDTO.getApellido());
        usuario.setActivo(true);
        
        // Asignar rol
        Set<Rol> roles = new HashSet<>();
        Rol rol = rolRepository.findByNombre(registroDTO.getRol())
                .orElseThrow(() -> new RuntimeException("Rol no encontrado: " + registroDTO.getRol()));
        roles.add(rol);
        usuario.setRoles(roles);
        
        usuarioRepository.save(usuario);
        
        return ResponseEntity.status(HttpStatus.CREATED).body("Usuario registrado exitosamente");
    }
    
    /**
     * Endpoint para login de usuario
     * POST /api/auth/login
     */
    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginDTO loginDTO) {
        try {
            // Autenticar usuario
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginDTO.getUsername(),
                            loginDTO.getPassword()
                    )
            );
            
            // Generar token JWT
            String token = jwtTokenProvider.generateToken(authentication);
            
            // Obtener datos del usuario
            Usuario usuario = usuarioRepository.findByUsername(loginDTO.getUsername())
                    .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
            
            return ResponseEntity.ok(new AuthResponseDTO(token, usuario.getUsername(), usuario.getEmail()));
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciales inválidas");
        }
    }
    
    /**
     * Endpoint para verificar que el usuario está autenticado (requiere token)
     * GET /api/auth/me
     */
    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser() {
        // El usuario actual se obtiene del SecurityContext gracias al filtro JWT
        var authentication = org.springframework.security.core.context.SecurityContextHolder
                .getContext()
                .getAuthentication();
        
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("No autenticado");
        }
        
        String username = authentication.getName();
        Usuario usuario = usuarioRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        
        return ResponseEntity.ok(usuario);
    }
}
