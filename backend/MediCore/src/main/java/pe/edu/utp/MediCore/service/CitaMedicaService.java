package pe.edu.utp.MediCore.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pe.edu.utp.MediCore.entity.CitaMedica;
import pe.edu.utp.MediCore.entity.Medico;
import pe.edu.utp.MediCore.repository.CitaMedicaRepository;

import java.time.LocalDateTime;

/**
 * Servicio que encapsula la lógica de negocio de reservas (control de cupos).
 * - Comprueba disponibilidad
 * - Protege contra condiciones de carrera mediante transacción y restricción única en BD
 */
@Service
public class CitaMedicaService {

    @Autowired
    private CitaMedicaRepository citaMedicaRepository;

    /**
     * Crea una cita si el cupo está disponible.
     * Lógica:
     * 1. Comprobar si ya existe una cita para el mismo médico y fecha/hora exacta.
     * 2. Si existe, lanzar ReservationConflictException (será mapeado a 409).
     * 3. Guardar la cita dentro de una transacción.
     * 4. Para condiciones de carrera, se confía además en la restricción UNIQUE a nivel BD
     *    y se captura DataIntegrityViolationException para transformar en conflicto.
     */
    @Transactional
    public CitaMedica crearCita(CitaMedica cita) {
        Medico medico = cita.getMedico();
        LocalDateTime fechaHora = cita.getFechaHora();

        if (medico == null || fechaHora == null) {
            throw new IllegalArgumentException("Médico y fecha/hora son obligatorios");
        }

        boolean existe = citaMedicaRepository.existsByMedicoAndFechaHora(medico, fechaHora);
        if (existe) {
            throw new ReservationConflictException("El horario seleccionado ya está ocupado para el médico.");
        }

        try {
            return citaMedicaRepository.save(cita);
        } catch (DataIntegrityViolationException ex) {
            // Si ocurre por la restricción de UNIQUE a nivel DB (condición de carrera), convertirlo
            throw new ReservationConflictException("No se pudo crear la cita: horario ya reservado.");
        }
    }

    /**
     * Actualiza una cita: si se modifica médico o fecha/hora, se valida disponibilidad.
     */
    @Transactional
    public CitaMedica actualizarCita(CitaMedica existente, CitaMedica actualizacion) {
        // Si cambian médico o fechaHora, validar disponibilidad
        Medico nuevoMedico = actualizacion.getMedico() != null ? actualizacion.getMedico() : existente.getMedico();
        LocalDateTime nuevaFechaHora = actualizacion.getFechaHora() != null ? actualizacion.getFechaHora() : existente.getFechaHora();

        // Si la combinación cambia y existe otra cita con la misma tupla, bloquear
        boolean cambioTupla = !nuevoMedico.equals(existente.getMedico()) || !nuevaFechaHora.equals(existente.getFechaHora());
        if (cambioTupla) {
            boolean existe = citaMedicaRepository.existsByMedicoAndFechaHora(nuevoMedico, nuevaFechaHora);
            if (existe) {
                throw new ReservationConflictException("El horario seleccionado ya está ocupado para el médico.");
            }
        }

        existente.setFechaHora(actualizacion.getFechaHora());
        existente.setEstado(actualizacion.getEstado());
        existente.setMotivo(actualizacion.getMotivo());
        existente.setObservaciones(actualizacion.getObservaciones());

        if (actualizacion.getPaciente() != null) existente.setPaciente(actualizacion.getPaciente());
        if (actualizacion.getMedico() != null) existente.setMedico(actualizacion.getMedico());

        try {
            return citaMedicaRepository.save(existente);
        } catch (DataIntegrityViolationException ex) {
            throw new ReservationConflictException("No se pudo actualizar la cita: conflicto de horario.");
        }
    }
}
