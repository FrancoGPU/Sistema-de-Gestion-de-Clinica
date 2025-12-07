package pe.edu.utp.MediCore.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import pe.edu.utp.MediCore.entity.Medico;
import pe.edu.utp.MediCore.entity.Paciente;
import pe.edu.utp.MediCore.entity.Rol;
import pe.edu.utp.MediCore.entity.Usuario;
import pe.edu.utp.MediCore.entity.CampaniaSalud;
import pe.edu.utp.MediCore.repository.MedicoRepository;
import pe.edu.utp.MediCore.repository.PacienteRepository;
import pe.edu.utp.MediCore.repository.UsuarioRepository;
import pe.edu.utp.MediCore.repository.CampaniaSaludRepository;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner initDatabase(UsuarioRepository usuarioRepository, 
                                   PacienteRepository pacienteRepository, 
                                   MedicoRepository medicoRepository,
                                   CampaniaSaludRepository campaniaSaludRepository) {
        return args -> {
            // 1. Crear Admin
            if (!usuarioRepository.existsByUsername("admin")) {
                Usuario admin = new Usuario();
                admin.setUsername("admin");
                admin.setPassword("admin123"); // En producción usar encoder
                admin.setRol(Rol.ADMIN);
                usuarioRepository.save(admin);
                System.out.println("Usuario Admin creado: admin / admin123");
            }

            // 2. Crear Médico
            if (!usuarioRepository.existsByUsername("doctor")) {
                Usuario usuarioMedico = new Usuario();
                usuarioMedico.setUsername("doctor");
                usuarioMedico.setPassword("doctor123");
                usuarioMedico.setRol(Rol.MEDICO);
                
                Medico medico = new Medico();
                medico.setNombre("Gregory");
                medico.setApellido("House");
                medico.setEspecialidad("Diagnóstico");
                medico.setEmail("house@medicore.com");
                medico.setTelefono("987654321");
                medico.setNumeroLicencia("CMP-12345");
                medico.setHorariosAtencion("Lunes a Viernes 9am - 5pm");
                
                // Vincular
                medico.setUsuario(usuarioMedico);
                usuarioMedico.setMedico(medico);
                
                usuarioRepository.save(usuarioMedico); // Cascade guarda el médico
                System.out.println("Usuario Médico creado: doctor / doctor123");
            }

            // 3. Crear Paciente
            if (!usuarioRepository.existsByUsername("paciente")) {
                Usuario usuarioPaciente = new Usuario();
                usuarioPaciente.setUsername("paciente");
                usuarioPaciente.setPassword("paciente123");
                usuarioPaciente.setRol(Rol.PACIENTE);
                
                Paciente paciente = new Paciente();
                paciente.setNombre("Juan");
                paciente.setApellido("Pérez");
                paciente.setDni("12345678");
                paciente.setCorreoElectronico("juan.perez@email.com");
                paciente.setNumeroTelefono("912345678");
                paciente.setFechaNacimiento(LocalDate.of(1990, 5, 15));
                
                // Vincular
                paciente.setUsuario(usuarioPaciente);
                usuarioPaciente.setPaciente(paciente);
                
                usuarioRepository.save(usuarioPaciente); // Cascade guarda el paciente
                System.out.println("Usuario Paciente creado: paciente / paciente123");
            }

            // 4. Crear Campañas de Salud
            if (campaniaSaludRepository.count() == 0) {
                Medico doctor = medicoRepository.findAll().stream()
                        .filter(m -> m.getUsuario() != null && "doctor".equals(m.getUsuario().getUsername()))
                        .findFirst()
                        .orElse(null);

                Set<Medico> medicos = new HashSet<>();
                if (doctor != null) {
                    medicos.add(doctor);
                }

                // Campaña 1
                CampaniaSalud campania1 = new CampaniaSalud();
                campania1.setNombreCampania("Campaña de Vacunación Antigripal");
                campania1.setDescripcion("Vacunación gratuita contra la influenza para adultos mayores y niños.");
                campania1.setFechaInicio(LocalDate.now().plusDays(5));
                campania1.setFechaFinalizacion(LocalDate.now().plusDays(10));
                campania1.setLugarRealizacion("Sede Central - Patio Principal");
                campania1.setEstado(CampaniaSalud.EstadoCampania.EN_CURSO);
                campania1.setImagenUrl("assets/images/campana-de-salud.jpg");
                campania1.setMedicos(new HashSet<>(medicos));
                campaniaSaludRepository.save(campania1);

                // Campaña 2
                CampaniaSalud campania2 = new CampaniaSalud();
                campania2.setNombreCampania("Chequeo Cardiológico Gratuito");
                campania2.setDescripcion("Evaluación preventiva de riesgo cardiovascular y toma de presión arterial.");
                campania2.setFechaInicio(LocalDate.now().plusDays(15));
                campania2.setFechaFinalizacion(LocalDate.now().plusDays(20));
                campania2.setLugarRealizacion("Consultorios Externos");
                campania2.setEstado(CampaniaSalud.EstadoCampania.PLANIFICADA);
                campania2.setImagenUrl("assets/images/campaign_BOTÓN-WEB---PAPÁ-CANGURO.png");
                campania2.setMedicos(new HashSet<>(medicos));
                campaniaSaludRepository.save(campania2);

                // Campaña 3
                CampaniaSalud campania3 = new CampaniaSalud();
                campania3.setNombreCampania("Campaña de Salud Dental");
                campania3.setDescripcion("Fluorización y revisión dental para niños menores de 12 años.");
                campania3.setFechaInicio(LocalDate.now().plusDays(25));
                campania3.setFechaFinalizacion(LocalDate.now().plusDays(30));
                campania3.setLugarRealizacion("Área de Odontología");
                campania3.setEstado(CampaniaSalud.EstadoCampania.PLANIFICADA);
                campania3.setImagenUrl("assets/images/grils-boys.jpg");
                campania3.setMedicos(new HashSet<>(medicos));
                campaniaSaludRepository.save(campania3);

                System.out.println("Campañas de salud creadas.");
            }
        };
    }
}
