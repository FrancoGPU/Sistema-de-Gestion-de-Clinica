package pe.edu.utp.MediCore.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
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
import pe.edu.utp.MediCore.security.JwtAuthenticationEntryPoint;
import pe.edu.utp.MediCore.security.JwtAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private JwtAuthenticationEntryPoint unauthorizedHandler;

    @Bean
    public JwtAuthenticationFilter jwtAuthenticationFilter() {
        return new JwtAuthenticationFilter();
    }

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

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
        return authConfig.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf(csrf -> csrf.disable())
            .exceptionHandling(exception -> exception.authenticationEntryPoint(unauthorizedHandler))
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                // Preflight requests (OPTIONS) - siempre permitir
                .requestMatchers(org.springframework.http.HttpMethod.OPTIONS, "/**").permitAll()
                
                // Endpoints públicos (no requieren autenticación)
                .requestMatchers("/api/auth/**").permitAll()
                
                // ============ MÉDICOS ============
                // GET - Público (para agendar citas)
                .requestMatchers(org.springframework.http.HttpMethod.GET, "/api/medicos/**").permitAll()
                // POST/PUT/DELETE - Solo ADMIN
                .requestMatchers(org.springframework.http.HttpMethod.POST, "/api/medicos/**").hasRole("ADMIN")
                .requestMatchers(org.springframework.http.HttpMethod.PUT, "/api/medicos/**").hasRole("ADMIN")
                .requestMatchers(org.springframework.http.HttpMethod.DELETE, "/api/medicos/**").hasRole("ADMIN")
                
                // ============ PACIENTES ============
                // GET por DNI - Público (para agendar citas)
                .requestMatchers(org.springframework.http.HttpMethod.GET, "/api/pacientes/dni/**").permitAll()
                // POST - Público (registro de nuevos pacientes)
                .requestMatchers(org.springframework.http.HttpMethod.POST, "/api/pacientes").permitAll()
                // GET lista completa - Solo ADMIN y DOCTOR
                .requestMatchers(org.springframework.http.HttpMethod.GET, "/api/pacientes").hasAnyRole("ADMIN", "DOCTOR")
                // GET por ID - ADMIN, DOCTOR o el propio PACIENTE
                .requestMatchers(org.springframework.http.HttpMethod.GET, "/api/pacientes/**").hasAnyRole("ADMIN", "DOCTOR", "PACIENTE")
                // PUT - ADMIN o el propio PACIENTE (validación en controlador)
                .requestMatchers(org.springframework.http.HttpMethod.PUT, "/api/pacientes/**").hasAnyRole("ADMIN", "PACIENTE")
                // DELETE - Solo ADMIN
                .requestMatchers(org.springframework.http.HttpMethod.DELETE, "/api/pacientes/**").hasRole("ADMIN")
                
                // ============ CITAS MÉDICAS ============
                // POST sin auth - Público (para registro rápido)
                .requestMatchers(org.springframework.http.HttpMethod.POST, "/api/citas").permitAll()
                // POST con auth - Usuarios autenticados
                .requestMatchers(org.springframework.http.HttpMethod.POST, "/api/citas/auth").authenticated()
                // GET lista completa - Solo ADMIN
                .requestMatchers(org.springframework.http.HttpMethod.GET, "/api/citas").hasRole("ADMIN")
                // GET por paciente - ADMIN o el propio PACIENTE
                .requestMatchers(org.springframework.http.HttpMethod.GET, "/api/citas/paciente/**").hasAnyRole("ADMIN", "PACIENTE")
                // GET por médico - ADMIN o el propio DOCTOR
                .requestMatchers(org.springframework.http.HttpMethod.GET, "/api/citas/medico/**").hasAnyRole("ADMIN", "DOCTOR")
                // GET por estado, hoy, por ID - ADMIN, DOCTOR
                .requestMatchers(org.springframework.http.HttpMethod.GET, "/api/citas/**").hasAnyRole("ADMIN", "DOCTOR")
                // PUT - ADMIN o DOCTOR (para actualizar estado de cita)
                .requestMatchers(org.springframework.http.HttpMethod.PUT, "/api/citas/**").hasAnyRole("ADMIN", "DOCTOR")
                // DELETE - Solo ADMIN
                .requestMatchers(org.springframework.http.HttpMethod.DELETE, "/api/citas/**").hasRole("ADMIN")
                
                // ============ CAMPAÑAS DE SALUD ============
                // GET - Público
                .requestMatchers(org.springframework.http.HttpMethod.GET, "/api/campanias/**").permitAll()
                // POST/PUT/DELETE - Solo ADMIN
                .requestMatchers(org.springframework.http.HttpMethod.POST, "/api/campanias/**").hasRole("ADMIN")
                .requestMatchers(org.springframework.http.HttpMethod.PUT, "/api/campanias/**").hasRole("ADMIN")
                .requestMatchers(org.springframework.http.HttpMethod.DELETE, "/api/campanias/**").hasRole("ADMIN")
                
                // Test - Público para desarrollo
                .requestMatchers("/api/test/**").permitAll()
                
                // Cualquier otra petición requiere autenticación
                .anyRequest().authenticated()
            );

        http.addFilterBefore(jwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
