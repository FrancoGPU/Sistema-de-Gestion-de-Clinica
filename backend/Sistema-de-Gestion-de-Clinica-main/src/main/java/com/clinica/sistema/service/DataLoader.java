package com.clinica.sistema.service;

import com.clinica.sistema.entity.Doctor;
import com.clinica.sistema.entity.Cita;
import com.clinica.sistema.entity.Paciente;
import com.clinica.sistema.repository.DoctorRepository;
import com.clinica.sistema.repository.CitaRepository;
import com.clinica.sistema.repository.PacienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class DataLoader implements CommandLineRunner {

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private CitaRepository citaRepository;

    @Autowired
    private PacienteRepository pacienteRepository;

    @Override
    public void run(String... args) throws Exception {
        // Solo cargar datos si la BD está vacía
        if (doctorRepository.count() == 0) {
            System.out.println("Cargando datos de ejemplo...");
            loadSampleData();
            System.out.println("Datos cargados exitosamente!");
        } else {
            System.out.println("La base de datos ya contiene datos.");
        }
    }

    private void loadSampleData() {
        // Crear doctores
        Doctor doctor1 = new Doctor();
        doctor1.setNombre("Carlos");
        doctor1.setApellido("Mendoza");
        doctor1.setEspecializacion("Cardiología");
        doctor1.setEmail("carlos.mendoza@medicore.com");
        doctor1.setTelefono("555-0101");
        doctor1.setNumeroLicencia("MED-2024-001");
        doctorRepository.save(doctor1);

        Doctor doctor2 = new Doctor();
        doctor2.setNombre("Ana");
        doctor2.setApellido("Rodríguez");
        doctor2.setEspecializacion("Pediatría");
        doctor2.setEmail("ana.rodriguez@medicore.com");
        doctor2.setTelefono("555-0102");
        doctor2.setNumeroLicencia("MED-2024-002");
        doctorRepository.save(doctor2);

        Doctor doctor3 = new Doctor();
        doctor3.setNombre("Luis");
        doctor3.setApellido("García");
        doctor3.setEspecializacion("Medicina General");
        doctor3.setEmail("luis.garcia@medicore.com");
        doctor3.setTelefono("555-0103");
        doctor3.setNumeroLicencia("MED-2024-003");
        doctorRepository.save(doctor3);

        Doctor doctor4 = new Doctor();
        doctor4.setNombre("María");
        doctor4.setApellido("López");
        doctor4.setEspecializacion("Ginecología");
        doctor4.setEmail("maria.lopez@medicore.com");
        doctor4.setTelefono("555-0104");
        doctor4.setNumeroLicencia("MED-2024-004");
        doctorRepository.save(doctor4);

        Doctor doctor5 = new Doctor();
        doctor5.setNombre("Roberto");
        doctor5.setApellido("Martínez");
        doctor5.setEspecializacion("Traumatología");
        doctor5.setEmail("roberto.martinez@medicore.com");
        doctor5.setTelefono("555-0105");
        doctor5.setNumeroLicencia("MED-2024-005");
        doctorRepository.save(doctor5);

        Doctor doctor6 = new Doctor();
        doctor6.setNombre("Laura");
        doctor6.setApellido("Sánchez");
        doctor6.setEspecializacion("Oftalmología");
        doctor6.setEmail("laura.sanchez@medicore.com");
        doctor6.setTelefono("555-0106");
        doctor6.setNumeroLicencia("MED-2024-006");
        doctorRepository.save(doctor6);

        System.out.println("Se crearon " + doctorRepository.count() + " doctores");

        // Crear pacientes
        Paciente paciente1 = new Paciente();
        paciente1.setNombre("Juan");
        paciente1.setApellido("Pérez");
        paciente1.setEmail("juan.perez@email.com");
        paciente1.setTelefono("555-1001");
        paciente1.setDni("12345678");
        pacienteRepository.save(paciente1);

        Paciente paciente2 = new Paciente();
        paciente2.setNombre("María");
        paciente2.setApellido("García");
        paciente2.setEmail("maria.garcia@email.com");
        paciente2.setTelefono("555-1002");
        paciente2.setDni("23456789");
        pacienteRepository.save(paciente2);

        Paciente paciente3 = new Paciente();
        paciente3.setNombre("Pedro");
        paciente3.setApellido("Martínez");
        paciente3.setEmail("pedro.martinez@email.com");
        paciente3.setTelefono("555-1003");
        paciente3.setDni("34567890");
        pacienteRepository.save(paciente3);

        System.out.println("Se crearon " + pacienteRepository.count() + " pacientes");

        // Crear citas
        Cita cita1 = new Cita();
        cita1.setPaciente(paciente1);
        cita1.setDoctor(doctor1);
        cita1.setFechaHora(LocalDateTime.now().plusDays(1).withHour(10).withMinute(0));
        cita1.setMotivo("Revisión general");
        cita1.setEstado(Cita.EstadoCita.CONFIRMADA);
        citaRepository.save(cita1);

        Cita cita2 = new Cita();
        cita2.setPaciente(paciente2);
        cita2.setDoctor(doctor2);
        cita2.setFechaHora(LocalDateTime.now().plusDays(1).withHour(14).withMinute(0));
        cita2.setMotivo("Control pediátrico");
        cita2.setEstado(Cita.EstadoCita.PROGRAMADA);
        citaRepository.save(cita2);

        Cita cita3 = new Cita();
        cita3.setPaciente(paciente3);
        cita3.setDoctor(doctor3);
        cita3.setFechaHora(LocalDateTime.now().plusDays(2).withHour(9).withMinute(0));
        cita3.setMotivo("Consulta general");
        cita3.setEstado(Cita.EstadoCita.PROGRAMADA);
        citaRepository.save(cita3);

        Cita cita4 = new Cita();
        cita4.setPaciente(paciente1);
        cita4.setDoctor(doctor4);
        cita4.setFechaHora(LocalDateTime.now().plusDays(3).withHour(11).withMinute(0));
        cita4.setMotivo("Revisión ginecológica");
        cita4.setEstado(Cita.EstadoCita.PROGRAMADA);
        citaRepository.save(cita4);

        System.out.println("Se crearon " + citaRepository.count() + " citas");
    }
}
