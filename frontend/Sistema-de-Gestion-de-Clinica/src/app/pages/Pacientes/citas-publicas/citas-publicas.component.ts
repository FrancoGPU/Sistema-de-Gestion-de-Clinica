import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-citas-publicas',
  imports: [CommonModule, FormsModule],
  templateUrl: './citas-publicas.component.html',
  styleUrl: './citas-publicas.component.css'
})
export class CitasPublicasComponent implements OnInit {
  formData = {
    nombre: '',
    telefono: '',
    email: '',
    especialidad: '',
    fecha: '',
    hora: '',
    motivo: ''
  };

  minDate: string = '';

  ngOnInit() {
    // Configurar fecha mínima (hoy)
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];
  }

  onSubmit() {
    console.log('Cita agendada:', this.formData);
    alert('¡Cita agendada exitosamente! Te contactaremos para confirmar.');
    this.resetForm();
  }

  resetForm() {
    this.formData = {
      nombre: '',
      telefono: '',
      email: '',
      especialidad: '',
      fecha: '',
      hora: '',
      motivo: ''
    };
  }
}
