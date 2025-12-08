package pe.edu.utp.MediCore.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pe.edu.utp.MediCore.entity.HistoriaClinica;
import java.util.List;
import java.util.Optional;

@Repository
public interface HistoriaClinicaRepository extends JpaRepository<HistoriaClinica, Long> {
    List<HistoriaClinica> findByPacienteIdPaciente(Long idPaciente);
    List<HistoriaClinica> findByMedicoIdMedico(Long idMedico);
    Optional<HistoriaClinica> findByCitaIdCita(Long idCita);
}
