import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CitaService, CitaMedica } from '../../../services/cita.service';
import { AuthService } from '../../../services/auth.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-mis-citas',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './mis-citas.component.html',
  styleUrl: './mis-citas.component.css'
})
export class MisCitasComponent implements OnInit {
  citas: CitaMedica[] = [];
  loading = true;
  error = '';

  constructor(
    private citaService: CitaService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.cargarCitas();
  }

  cargarCitas(): void {
    const user = this.authService.currentUserValue;
    if (user && user.profileId) {
      this.citaService.getCitasByPaciente(user.profileId).subscribe({
        next: (data) => {
          this.citas = data;
          this.loading = false;
        },
        error: (err) => {
          console.error(err);
          this.error = 'Error al cargar tus citas.';
          this.loading = false;
        }
      });
    } else {
      this.error = 'No se pudo identificar al paciente. Por favor inicia sesión nuevamente.';
      this.loading = false;
    }
  }
}
