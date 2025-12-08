import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CitaService, CitaMedica } from '../../../services/cita.service';
import { HistoriaClinicaService, HistoriaClinica } from '../../../services/historia-clinica.service';
import { MedicoHeaderComponent } from '../../../shared/components/medico-header/medico-header.component';

@Component({
  selector: 'app-atencion-cita',
  standalone: true,
  imports: [CommonModule, FormsModule, MedicoHeaderComponent],
  templateUrl: './atencion-cita.component.html',
  styleUrl: './atencion-cita.component.css'
})
export class AtencionCitaComponent implements OnInit {
  cita: CitaMedica | null = null;
  loading = true;
  saving = false;
  historialPaciente: HistoriaClinica[] = [];
  mostrarHistorial = false;
  
  historia: HistoriaClinica = {
    cita: { idCita: 0 },
    sintomas: '',
    diagnostico: '',
    tratamiento: '',
    observaciones: ''
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private citaService: CitaService,
    private historiaService: HistoriaClinicaService
  ) {}

  ngOnInit(): void {
    const idCita = this.route.snapshot.paramMap.get('id');
    if (idCita) {
      this.cargarCita(+idCita);
    }
  }

  cargarCita(id: number) {
    this.citaService.getCita(id).subscribe({
      next: (data) => {
        this.cita = data;
        this.historia.cita.idCita = data.idCita;
        this.loading = false;
        
        // Cargar historial del paciente
        if (this.cita.paciente && this.cita.paciente.idPaciente) {
          this.cargarHistorialPaciente(this.cita.paciente.idPaciente);
        }
      },
      error: (err) => {
        console.error('Error cargando cita', err);
        alert('Error al cargar la información de la cita');
        this.router.navigate(['/medico/dashboard']);
      }
    });
  }

  cargarHistorialPaciente(idPaciente: number) {
    this.historiaService.getPorPaciente(idPaciente).subscribe({
      next: (data) => {
        // Filtrar la historia actual si ya existiera (aunque es nueva) y ordenar por fecha descendente
        this.historialPaciente = data.sort((a, b) => {
          const dateA = a.fechaAtencion ? new Date(a.fechaAtencion).getTime() : 0;
          const dateB = b.fechaAtencion ? new Date(b.fechaAtencion).getTime() : 0;
          return dateB - dateA;
        });
      },
      error: (err) => console.error('Error cargando historial', err)
    });
  }

  toggleHistorial() {
    this.mostrarHistorial = !this.mostrarHistorial;
  }

  onSubmit() {
    if (!this.cita) return;
    
    this.saving = true;
    this.historiaService.crearHistoria(this.historia).subscribe({
      next: (res) => {
        alert('Atención registrada correctamente');
        this.router.navigate(['/medico/dashboard']);
      },
      error: (err) => {
        console.error('Error guardando historia clínica', err);
        alert('Error al guardar la historia clínica');
        this.saving = false;
      }
    });
  }
  
  cancelar() {
    if (confirm('¿Estás seguro de cancelar? Se perderán los datos ingresados.')) {
      this.router.navigate(['/medico/dashboard']);
    }
  }
}
