import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contacto.component.html',
  styleUrl: './contacto.component.css'
})
export class ContactoComponent {
  formData = {
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    asunto: '',
    mensaje: '',
    aceptaPoliticas: false
  };

  onSubmit() {
    console.log('Formulario enviado:', this.formData);
    alert('Mensaje enviado con éxito. Nos pondremos en contacto contigo pronto.');
    // Aquí iría la lógica para enviar el formulario al backend
    this.resetForm();
  }

  resetForm() {
    this.formData = {
      nombre: '',
      apellido: '',
      email: '',
      telefono: '',
      asunto: '',
      mensaje: '',
      aceptaPoliticas: false
    };
  }
}
