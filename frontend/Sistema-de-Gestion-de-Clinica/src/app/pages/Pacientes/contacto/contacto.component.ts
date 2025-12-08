import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContactoService } from '../../../services/contacto.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contacto.component.html',
  styleUrl: './contacto.component.css'
})
export class ContactoComponent implements OnInit {
  formData = {
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    asunto: '',
    mensaje: '',
    aceptaPoliticas: false,
    usuarioId: undefined as number | undefined
  };
  
  loading = false;

  constructor(
    private contactoService: ContactoService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const currentUser = this.authService.currentUserValue;
    if (currentUser) {
      this.formData.usuarioId = currentUser.id;
      // Pre-fill data if available
      if (currentUser.nombre) {
        const parts = currentUser.nombre.split(' ');
        if (parts.length > 1) {
          this.formData.nombre = parts[0];
          this.formData.apellido = parts.slice(1).join(' ');
        } else {
          this.formData.nombre = currentUser.nombre;
        }
      }
      if (currentUser.email) this.formData.email = currentUser.email;
    }
  }

  onSubmit() {
    if (!this.formData.aceptaPoliticas) {
      alert('Debes aceptar las políticas de privacidad para enviar el mensaje.');
      return;
    }

    this.loading = true;
    this.contactoService.enviarMensaje(this.formData).subscribe({
      next: (res) => {
        alert('Mensaje enviado con éxito. Nos pondremos en contacto contigo pronto.');
        this.resetForm();
        this.loading = false;
      },
      error: (err) => {
        console.error('Error enviando mensaje', err);
        alert('Hubo un error al enviar el mensaje. Por favor intenta nuevamente.');
        this.loading = false;
      }
    });
  }

  resetForm() {
    const currentUser = this.authService.currentUserValue;
    let nombre = '';
    let apellido = '';

    if (currentUser?.nombre) {
      const parts = currentUser.nombre.split(' ');
      if (parts.length > 1) {
        nombre = parts[0];
        apellido = parts.slice(1).join(' ');
      } else {
        nombre = currentUser.nombre;
      }
    }

    this.formData = {
      nombre: nombre,
      apellido: apellido,
      email: currentUser?.email || '',
      telefono: '',
      asunto: '',
      mensaje: '',
      aceptaPoliticas: false,
      usuarioId: currentUser?.id
    };
  }
}
