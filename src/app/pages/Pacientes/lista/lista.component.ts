import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AdminHeaderComponent } from '../../../shared/components/admin-header/admin-header.component';

interface Paciente {
  id: number;
  nombreCompleto: string;
  dni: string;
  email: string;
  telefono: string;
  fechaNacimiento: Date;
}

@Component({
  selector: 'app-lista',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, AdminHeaderComponent],
  templateUrl: './lista.component.html',
  styleUrl: './lista.component.css',
  encapsulation: ViewEncapsulation.None
})
export class ListaComponent {
  busqueda: string = '';
  pacientes: Paciente[] = [];

  eliminarPaciente(id: number) {
    if (confirm('¿Está seguro de eliminar este paciente?')) {
      console.log('Eliminando paciente:', id);
      // Aquí iría la lógica de eliminación
    }
  }
}
