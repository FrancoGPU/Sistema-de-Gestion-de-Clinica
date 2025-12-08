import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { PacienteService, Paciente } from '../../../services/paciente.service';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent implements OnInit {
  paciente: Paciente = {
    idPaciente: 0,
    nombre: '',
    apellido: '',
    dni: '',
    correoElectronico: '',
    numeroTelefono: '',
    fechaNacimiento: ''
  };
  
  loading = true;
  saving = false;
  error = '';
  success = '';
  editMode = false;

  constructor(
    private authService: AuthService,
    private pacienteService: PacienteService
  ) {}

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    const user = this.authService.currentUserValue;
    if (user && user.profileId) {
      this.loading = true;
      this.pacienteService.getPaciente(user.profileId).subscribe({
        next: (data) => {
          this.paciente = data;
          this.loading = false;
        },
        error: (err) => {
          console.error('Error cargando perfil', err);
          this.error = 'No se pudo cargar la información del perfil.';
          this.loading = false;
        }
      });
    } else {
      this.error = 'No se encontró información de sesión.';
      this.loading = false;
    }
  }

  toggleEdit(): void {
    this.editMode = !this.editMode;
    if (!this.editMode) {
      // Si cancela la edición, recargar datos originales
      this.cargarDatos();
      this.error = '';
      this.success = '';
    }
  }

  onSubmit(): void {
    this.saving = true;
    this.error = '';
    this.success = '';

    this.pacienteService.updatePaciente(this.paciente.idPaciente, this.paciente).subscribe({
      next: (updatedPaciente) => {
        this.paciente = updatedPaciente;
        this.saving = false;
        this.editMode = false;
        this.success = 'Perfil actualizado correctamente.';
      },
      error: (err) => {
        console.error('Error actualizando perfil', err);
        this.error = 'Error al actualizar el perfil. Intente nuevamente.';
        this.saving = false;
      }
    });
  }
}
