import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminHeaderComponent } from '../../../shared/components/admin-header/admin-header.component';
import { PacienteService, Paciente } from '../../../services/paciente.service';

@Component({
  selector: 'app-pacientes',
  standalone: true,
  imports: [CommonModule, AdminHeaderComponent, FormsModule],
  templateUrl: './pacientes.component.html',
  styleUrl: './pacientes.component.css',
})
export class PacientesComponent implements OnInit {
  pacientes: Paciente[] = [];
  loading = true;
  error = '';
  
  // Para el modal de detalles
  pacienteSeleccionado: Paciente | null = null;
  
  // Para el modal de edición
  modoEdicion = false;
  pacienteEditando: Paciente | null = null;
  
  // Para el modal de creación
  showCreateModal = false;
  nuevoPaciente: Partial<Paciente> = {
    nombre: '',
    apellido: '',
    dni: '',
    numeroTelefono: '',
    correoElectronico: ''
  };

  constructor(private pacienteService: PacienteService) {}

  ngOnInit(): void {
    this.cargarPacientes();
  }

  cargarPacientes(): void {
    this.loading = true;
    this.pacienteService.getPacientes().subscribe({
      next: (data: Paciente[]) => {
        this.pacientes = data;
        this.loading = false;
      },
      error: (err: any) => {
        this.error = 'Error al cargar los pacientes';
        this.loading = false;
      }
    });
  }

  verDetalles(paciente: Paciente): void {
    this.pacienteSeleccionado = paciente;
  }

  cerrarDetalles(): void {
    this.pacienteSeleccionado = null;
  }

  abrirModalEditar(paciente: Paciente): void {
    this.modoEdicion = true;
    this.pacienteEditando = { ...paciente }; // Clonar el objeto
  }

  cerrarModalEditar(): void {
    this.modoEdicion = false;
    this.pacienteEditando = null;
  }

  guardarEdicion(): void {
    if (!this.pacienteEditando) return;

    this.pacienteService.updatePaciente(
      this.pacienteEditando.idPaciente,
      this.pacienteEditando
    ).subscribe({
      next: () => {
        alert('Paciente actualizado exitosamente');
        this.cargarPacientes();
        this.cerrarModalEditar();
      },
      error: (err: any) => {
        alert('Error al actualizar el paciente');
        console.error('Error al actualizar paciente', err);
      }
    });
  }

  eliminarPaciente(paciente: Paciente): void {
    if (confirm(`¿Estás seguro de eliminar al paciente ${paciente.nombre} ${paciente.apellido}?`)) {
      this.pacienteService.deletePaciente(paciente.idPaciente).subscribe({
        next: () => {
          alert('Paciente eliminado exitosamente');
          this.cargarPacientes();
        },
        error: (err: any) => {
          alert('Error al eliminar el paciente. Puede que tenga citas asociadas.');
          console.error('Error al eliminar paciente', err);
        }
      });
    }
  }

  abrirModalCrear(): void {
    this.showCreateModal = true;
    this.nuevoPaciente = {
      nombre: '',
      apellido: '',
      dni: '',
      numeroTelefono: '',
      correoElectronico: ''
    };
  }

  cerrarModalCrear(): void {
    this.showCreateModal = false;
  }

  crearPaciente(): void {
    this.pacienteService.createPaciente(this.nuevoPaciente as Paciente).subscribe({
      next: () => {
        alert('Paciente creado exitosamente');
        this.cargarPacientes();
        this.cerrarModalCrear();
      },
      error: (err: any) => {
        if (err.status === 409) {
          alert('Ya existe un paciente con ese DNI o correo electrónico');
        } else {
          alert('Error al crear el paciente');
        }
        console.error('Error al crear paciente', err);
      }
    });
  }
}
