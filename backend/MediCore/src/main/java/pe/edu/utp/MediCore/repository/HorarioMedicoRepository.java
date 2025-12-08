package pe.edu.utp.MediCore.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pe.edu.utp.MediCore.entity.HorarioMedico;
import pe.edu.utp.MediCore.entity.Medico;

import java.time.DayOfWeek;
import java.util.List;

@Repository
public interface HorarioMedicoRepository extends JpaRepository<HorarioMedico, Long> {
    List<HorarioMedico> findByMedicoIdMedico(Long idMedico);
    List<HorarioMedico> findByMedico(Medico medico);
    List<HorarioMedico> findByMedicoAndDiaSemana(Medico medico, DayOfWeek diaSemana);
}
