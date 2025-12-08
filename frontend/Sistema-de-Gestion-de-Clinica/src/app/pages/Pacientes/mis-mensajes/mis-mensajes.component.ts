import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactoService, MensajeContacto } from '../../../services/contacto.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-mis-mensajes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mis-mensajes.component.html',
  styleUrl: './mis-mensajes.component.css'
})
export class MisMensajesComponent implements OnInit {
  mensajes: MensajeContacto[] = [];
  loading = true;

  constructor(
    private contactoService: ContactoService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const currentUser = this.authService.currentUserValue;
    if (currentUser && currentUser.id) {
      this.contactoService.getMensajesPorUsuario(currentUser.id).subscribe({
        next: (data) => {
          this.mensajes = data;
          this.loading = false;
        },
        error: (err) => {
          console.error('Error cargando mis mensajes', err);
          this.loading = false;
        }
      });
    } else {
      this.loading = false;
    }
  }
}
