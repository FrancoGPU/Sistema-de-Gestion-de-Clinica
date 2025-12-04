import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminHeaderComponent } from '../../../shared/components/admin-header/admin-header.component';
import { CitaService, CitaMedica } from '../../../services/cita.service';
import { DoctorService, Doctor } from '../../../services/doctor.service';
import { PacienteService, Paciente } from '../../../services/paciente.service';

@Component({
  selector: 'app-citas',
  standalone: true,
  imports: [CommonModule, AdminHeaderComponent, FormsModule],
  templateUrl: './citas.component.html',
  styleUrl: './citas.component.css',
})
export class CitasComponent implements OnInit {
  citas: CitaMedica[] = [];
  doctores: Doctor[] = [];
  pacientes: Paciente[] = [];
  loading = true;
  error = '';

  // Modal control
  showCreateModal = false;
  modoEdicion = false;
  
  citaEditando: any = this.getEmptyCita();
  nuevaCitaObj: any = this.getEmptyCita();

  constructor(
    private citaService: CitaService,
    private doctorService: DoctorService,
    private pacienteService: PacienteService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.loading = true;
    this.citaService.getCitas().subscribe({
      next: (data) => {
        this.citas = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar las citas';
        this.loading = false;
      }
    });

    // Load auxiliary data
    this.doctorService.getDoctores().subscribe(data => this.doctores = data);
    this.pacienteService.getPacientes().subscribe(data => this.pacientes = data);
  }

  getEmptyCita(): any {
    return {
      idCita: 0,
      pacienteId: null,
      medicoId: null,
      fechaHora: '',
      motivo: '',
      estado: 'PENDIENTE',
      observaciones: ''
    };
  }

  // Create Modal
  abrirModalCrear(): void {
    this.nuevaCitaObj = this.getEmptyCita();
    this.showCreateModal = true;
  }

  cerrarModalCrear(): void {
    this.showCreateModal = false;
  }

  crearCita(): void {
    const citaToSave = {
      fechaHora: this.nuevaCitaObj.fechaHora,
      motivo: this.nuevaCitaObj.motivo,
      estado: this.nuevaCitaObj.estado,
      observaciones: this.nuevaCitaObj.observaciones,
      paciente: { idPaciente: this.nuevaCitaObj.pacienteId },
      medico: { idMedico: this.nuevaCitaObj.medicoId }
    };

    this.citaService.createCita(citaToSave).subscribe({
      next: () => {
        alert('Cita creada exitosamente');
        this.loadData();
        this.cerrarModalCrear();
      },
      error: (err) => {
        console.error('Error creando cita', err);
        alert('Error al crear la cita');
      }
    });
  }

  // Edit Modal
  abrirModalEditar(cita: CitaMedica): void {
    this.citaEditando = {
      idCita: cita.idCita,
      pacienteId: cita.paciente.id,
      medicoId: cita.medico.id,
      fechaHora: cita.fechaHora,
      motivo: cita.motivo,
      estado: cita.estado,
      observaciones: cita.observaciones
    };
    this.modoEdicion = true;
  }

  cerrarModalEditar(): void {
    this.modoEdicion = false;
    this.citaEditando = this.getEmptyCita();
  }

  guardarEdicion(): void {
    const citaToSave = {
      fechaHora: this.citaEditando.fechaHora,
      motivo: this.citaEditando.motivo,
      estado: this.citaEditando.estado,
      observaciones: this.citaEditando.observaciones,
      paciente: { idPaciente: this.citaEditando.pacienteId },
      medico: { idMedico: this.citaEditando.medicoId }
    };

    this.citaService.updateCita(this.citaEditando.idCita, citaToSave).subscribe({
      next: () => {
        alert('Cita actualizada exitosamente');
        this.loadData();
        this.cerrarModalEditar();
      },
      error: (err) => {
        console.error('Error actualizando cita', err);
        alert('Error al actualizar la cita');
      }
    });
  }

  eliminarCita(id: number): void {
    if (confirm('¿Está seguro de que desea eliminar esta cita?')) {
      this.citaService.deleteCita(id).subscribe({
        next: () => {
          alert('Cita eliminada exitosamente');
          this.loadData();
        },
        error: (err) => {
          console.error('Error eliminando cita', err);
          alert('Error al eliminar la cita');
        }
      });
    }
  }
}
