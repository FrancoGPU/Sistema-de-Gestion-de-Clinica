import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AdminHeaderComponent } from '../../../shared/components/admin-header/admin-header.component';

interface Paciente {
  id?: number;
  nombre: string;
  apellido: string;
  dni: string;
  fechaNacimiento: string;
  email: string;
  telefono: string;
  direccion: string;
}

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, AdminHeaderComponent],
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.css',
  encapsulation: ViewEncapsulation.None
})
export class FormularioComponent {
  paciente: Paciente = {
    nombre: '',
    apellido: '',
    dni: '',
    fechaNacimiento: '',
    email: '',
    telefono: '',
    direccion: ''
  };

  guardarPaciente() {
    console.log('Guardando paciente:', this.paciente);
    // Aquí iría la lógica para guardar
  }
}
