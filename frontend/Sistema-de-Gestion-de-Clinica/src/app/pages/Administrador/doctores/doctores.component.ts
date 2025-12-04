
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminHeaderComponent } from '../../../shared/components/admin-header/admin-header.component';
import { DoctorService, Doctor } from '../../../services/doctor.service';

@Component({
  selector: 'app-doctores',
  standalone: true,
  imports: [CommonModule, AdminHeaderComponent, FormsModule],
  templateUrl: './doctores.component.html',
  styleUrl: './doctores.component.css',
})
export class DoctoresComponent implements OnInit {
  doctores: Doctor[] = [];
  loading = true;
  error = '';
  
  // Modal control
  showCreateModal = false;
  modoEdicion = false;
  
  doctorEditando: Doctor = this.getEmptyDoctor();
  nuevoDoctor: Doctor = this.getEmptyDoctor();

  constructor(private doctorService: DoctorService) {}

  ngOnInit(): void {
    this.loadDoctores();
  }

  loadDoctores(): void {
    this.loading = true;
    this.doctorService.getDoctores().subscribe({
      next: (data) => {
        this.doctores = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar los doctores';
        this.loading = false;
      }
    });
  }

  getEmptyDoctor(): Doctor {
    return {
      idMedico: 0,
      nombre: '',
      apellido: '',
      especialidad: '',
      horariosAtencion: '',
      numeroLicencia: '',
      telefono: '',
      email: ''
    };
  }

  // Create Modal
  abrirModalCrear(): void {
    this.nuevoDoctor = this.getEmptyDoctor();
    this.showCreateModal = true;
  }

  cerrarModalCrear(): void {
    this.showCreateModal = false;
  }

  crearDoctor(): void {
    // Crear una copia sin el idMedico para el POST
    const doctorToSave = {
      nombre: this.nuevoDoctor.nombre,
      apellido: this.nuevoDoctor.apellido,
      especialidad: this.nuevoDoctor.especialidad,
      horariosAtencion: this.nuevoDoctor.horariosAtencion,
      numeroLicencia: this.nuevoDoctor.numeroLicencia,
      telefono: this.nuevoDoctor.telefono,
      email: this.nuevoDoctor.email
    };
    
    this.doctorService.createDoctor(doctorToSave).subscribe({
      next: () => {
        alert('Doctor creado exitosamente');
        this.loadDoctores();
        this.cerrarModalCrear();
      },
      error: (err) => {
        console.error('Error creando doctor', err);
        alert('Error al crear el doctor');
      }
    });
  }

  // Edit Modal
  abrirModalEditar(doctor: Doctor): void {
    this.doctorEditando = { ...doctor };
    this.modoEdicion = true;
  }

  cerrarModalEditar(): void {
    this.modoEdicion = false;
    this.doctorEditando = this.getEmptyDoctor();
  }

  guardarEdicion(): void {
    this.doctorService.updateDoctor(this.doctorEditando.idMedico, this.doctorEditando).subscribe({
      next: () => {
        alert('Doctor actualizado exitosamente');
        this.loadDoctores();
        this.cerrarModalEditar();
      },
      error: (err) => {
        console.error('Error actualizando doctor', err);
        alert('Error al actualizar el doctor');
      }
    });
  }

  eliminarDoctor(id: number): void {
    if (confirm('¿Está seguro de que desea eliminar este doctor?')) {
      this.doctorService.deleteDoctor(id).subscribe({
        next: () => {
          alert('Doctor eliminado exitosamente');
          this.loadDoctores();
        },
        error: (err) => {
          console.error('Error eliminando doctor', err);
          alert('Error al eliminar el doctor');
        }
      });
    }
  }
}
