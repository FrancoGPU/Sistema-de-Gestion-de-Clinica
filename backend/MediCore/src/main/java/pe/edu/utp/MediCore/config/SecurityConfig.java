package pe.edu.utp.MediCore.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import pe.edu.utp.MediCore.repository.UsuarioRepository;
import pe.edu.utp.MediCore.security.JwtAuthenticationFilter;

/**
 * Configuración de seguridad con autenticación JWT
 * - Usa tokens JWT para autenticación sin sesión
 * - Protege endpoints con roles
 */
@Configuration
@EnableWebSecurity
@EnableMethodSecurity(prePostEnabled = true)
public class SecurityConfig {
    
    @Autowired
    private UsuarioRepository usuarioRepository;
    
    @Autowired
    private JwtAuthenticationFilter jwtAuthenticationFilter;
    
    /**
     * UserDetailsService para cargar usuario desde BD
     */
    @Bean
    public UserDetailsService userDetailsService() {
        return username -> usuarioRepository.findByUsername(username)
                .map(usuario -> org.springframework.security.core.userdetails.User.builder()
                        .username(usuario.getUsername())
                        .password(usuario.getPassword())
                        .authorities(usuario.getRoles().stream()
                                .map(rol -> new org.springframework.security.core.authority.SimpleGrantedAuthority("ROLE_" + rol.getNombre()))
                                .toList())
                        .build())
                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado: " + username));
    }
    
    /**
     * PasswordEncoder para hashear contraseñas
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
    
    /**
     * AuthenticationManager para autenticar usuarios
     */
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
        return authConfig.getAuthenticationManager();
    }
    
    /**
     * Cadena de filtros de seguridad
     */
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http, UserDetailsService userDetailsService, PasswordEncoder passwordEncoder) throws Exception {
        // Crear DaoAuthenticationProvider
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider(passwordEncoder, userDetailsService);
        
        http
            .csrf(csrf -> csrf.disable())
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                    // Endpoints públicos (sin autenticación)
                    .requestMatchers("/api/auth/**").permitAll()
                    .requestMatchers("/api/pacientes/buscar").permitAll()
                    // Endpoints protegidos por rol
                    .requestMatchers("POST", "/api/citas").hasAnyRole("PACIENTE", "DOCTOR", "ADMIN")
                    .requestMatchers("PUT", "/api/citas/**").hasAnyRole("DOCTOR", "ADMIN")
                    .requestMatchers("DELETE", "/api/citas/**").hasAnyRole("DOCTOR", "ADMIN")
                    .requestMatchers("GET", "/api/citas/**").hasAnyRole("PACIENTE", "DOCTOR", "ADMIN")
                    // Otros endpoints requieren autenticación
                    .anyRequest().authenticated()
            )
            .authenticationProvider(authProvider)
            .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
        
        return http.build();
    }
}

