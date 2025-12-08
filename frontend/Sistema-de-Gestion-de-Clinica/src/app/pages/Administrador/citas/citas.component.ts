import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminHeaderComponent } from '../../../shared/components/admin-header/admin-header.component';
import { CitaService, CitaMedica } from '../../../services/cita.service';
import { PacienteService, Paciente } from '../../../services/paciente.service';
import { DoctorService, Doctor } from '../../../services/doctor.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-citas',
  standalone: true,
  imports: [CommonModule, AdminHeaderComponent, FormsModule],
  templateUrl: './citas.component.html',
  styleUrl: './citas.component.css',
})
export class CitasComponent implements OnInit {
  citas: CitaMedica[] = [];
  pacientes: Paciente[] = [];
  doctores: Doctor[] = [];
  loading = true;
  error = '';
  
  // Permisos
  isMedico = false;
  currentProfileId: number | undefined;

  // Modal Creación
  showCreateModal = false;
  nuevaCita: any = {
    pacienteId: null,
    medicoId: null,
    fechaHora: '',
    motivo: '',
    estado: 'PROGRAMADA'
  };

  // Modal Edición
  modoEdicion = false;
  citaEditando: any = null;

  // Modal Detalles
  citaSeleccionada: CitaMedica | null = null;

  constructor(
    private citaService: CitaService,
    private pacienteService: PacienteService,
    private doctorService: DoctorService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.isMedico = this.authService.getUserRole() === 'medico';
    this.currentProfileId = this.authService.currentUserValue?.profileId;
    this.cargarCitas();
    this.cargarPacientes();
    this.cargarDoctores();
  }

  canEdit(cita: CitaMedica): boolean {
    if (!this.isMedico) return true; // Admin puede editar todo
    return cita.medico.idMedico === this.currentProfileId;
  }

  canDelete(cita: CitaMedica): boolean {
    return !this.isMedico; // Solo administradores pueden eliminar
  }

  cargarCitas(): void {
    this.loading = true;
    
    if (this.isMedico && this.currentProfileId) {
      this.citaService.getCitasMedico(this.currentProfileId).subscribe({
        next: (data: CitaMedica[]) => {
          this.citas = data;
          this.loading = false;
        },
        error: (err: any) => {
          this.error = 'Error al cargar las citas';
          this.loading = false;
        }
      });
    } else {
      this.citaService.getCitas().subscribe({
        next: (data: CitaMedica[]) => {
          this.citas = data;
          this.loading = false;
        },
        error: (err: any) => {
          this.error = 'Error al cargar las citas';
          this.loading = false;
        }
      });
    }
  }

  cargarPacientes(): void {
    this.pacienteService.getPacientes().subscribe(data => this.pacientes = data);
  }

  cargarDoctores(): void {
    this.doctorService.getDoctores().subscribe(data => this.doctores = data);
  }

  abrirModalCrear(): void {
    this.showCreateModal = true;
    this.nuevaCita = {
      pacienteId: null,
      medicoId: this.isMedico ? this.currentProfileId : null,
      fechaHora: '',
      motivo: '',
      estado: 'PROGRAMADA'
    };
  }

  cerrarModalCrear(): void {
    this.showCreateModal = false;
  }

  crearCita(): void {
    // Construir el objeto que espera el backend
    // Asumiendo que el backend espera objetos completos de Paciente y Medico o sus IDs
    // Ajustar según la API real. Si la API espera IDs en el cuerpo:
    
    // Asegurar formato de fecha correcto (añadir segundos si faltan)
    let fechaFormateada = this.nuevaCita.fechaHora;
    if (fechaFormateada && fechaFormateada.length === 16) {
        fechaFormateada += ':00';
    }

    const citaParaEnviar = {
      paciente: { idPaciente: this.nuevaCita.pacienteId },
      medico: { idMedico: this.nuevaCita.medicoId },
      fechaHora: fechaFormateada,
      motivo: this.nuevaCita.motivo,
      estado: this.nuevaCita.estado
    };

    this.citaService.createCita(citaParaEnviar).subscribe({
      next: () => {
        alert('Cita creada exitosamente');
        this.cargarCitas();
        this.cerrarModalCrear();
      },
      error: (err) => {
        alert('Error al crear la cita');
        console.error(err);
      }
    });
  }

  abrirModalEditar(cita: CitaMedica): void {
    this.modoEdicion = true;
    // Mapear la cita existente al formato del formulario
    this.citaEditando = {
      idCita: cita.idCita,
      pacienteId: cita.paciente.idPaciente,
      medicoId: cita.medico.idMedico,
      fechaHora: cita.fechaHora,
      motivo: cita.motivo,
      estado: cita.estado
    };
  }

  cerrarModalEditar(): void {
    this.modoEdicion = false;
    this.citaEditando = null;
  }

  guardarEdicion(): void {
    if (!this.citaEditando) return;
    
    // Asegurar formato de fecha correcto (añadir segundos si faltan)
    let fechaFormateada = this.citaEditando.fechaHora;
    if (fechaFormateada && fechaFormateada.length === 16) {
        fechaFormateada += ':00';
    }

    const citaParaEnviar = {
      idCita: this.citaEditando.idCita,
      paciente: { idPaciente: this.citaEditando.pacienteId },
      medico: { idMedico: this.citaEditando.medicoId },
      fechaHora: fechaFormateada,
      motivo: this.citaEditando.motivo,
      estado: this.citaEditando.estado
    };

    this.citaService.updateCita(this.citaEditando.idCita, citaParaEnviar).subscribe({
      next: () => {
        alert('Cita actualizada exitosamente');
        this.cargarCitas();
        this.cerrarModalEditar();
      },
      error: (err) => {
        alert('Error al actualizar la cita');
        console.error(err);
      }
    });
  }

  eliminarCita(cita: CitaMedica): void {
    if (confirm(`¿Estás seguro de eliminar la cita?`)) {
      this.citaService.deleteCita(cita.idCita).subscribe({
        next: () => {
          alert('Cita eliminada exitosamente');
          this.cargarCitas();
        },
        error: (err) => {
          alert('Error al eliminar la cita');
          console.error(err);
        }
      });
    }
  }

  verDetalles(cita: CitaMedica): void {
    this.citaSeleccionada = cita;
  }

  cerrarDetalles(): void {
    this.citaSeleccionada = null;
  }
}
