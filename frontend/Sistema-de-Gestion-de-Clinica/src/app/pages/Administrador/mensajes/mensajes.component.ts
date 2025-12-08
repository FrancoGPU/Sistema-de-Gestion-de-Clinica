import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactoService, MensajeContacto } from '../../../services/contacto.service';
import { AdminHeaderComponent } from '../../../shared/components/admin-header/admin-header.component';

@Component({
  selector: 'app-mensajes',
  standalone: true,
  imports: [CommonModule, AdminHeaderComponent],
  templateUrl: './mensajes.component.html',
  styleUrl: './mensajes.component.css'
})
export class MensajesComponent implements OnInit {
  mensajes: MensajeContacto[] = [];
  loading = true;

  constructor(private contactoService: ContactoService) {}

  ngOnInit(): void {
    this.cargarMensajes();
  }

  cargarMensajes() {
    this.contactoService.getMensajes().subscribe({
      next: (data) => {
        this.mensajes = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error cargando mensajes', err);
        this.loading = false;
      }
    });
  }

  responder(mensaje: MensajeContacto) {
    const respuesta = prompt('Escribe tu respuesta para ' + mensaje.nombre + ':');
    if (respuesta && mensaje.id) {
      this.contactoService.responderMensaje(mensaje.id, respuesta).subscribe({
        next: (res) => {
          alert('Respuesta enviada correctamente');
          this.cargarMensajes();
        },
        error: (err) => {
          console.error('Error enviando respuesta', err);
          alert('Error al enviar la respuesta');
        }
      });
    }
  }
}
