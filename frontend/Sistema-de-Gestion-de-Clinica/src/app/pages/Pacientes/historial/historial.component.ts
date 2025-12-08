import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { HistoriaClinicaService, HistoriaClinica } from '../../../services/historia-clinica.service';

@Component({
  selector: 'app-historial',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './historial.component.html',
  styleUrl: './historial.component.css'
})
export class HistorialComponent implements OnInit {
  historias: HistoriaClinica[] = [];
  loading = true;

  constructor(
    private authService: AuthService,
    private historiaService: HistoriaClinicaService
  ) {}

  ngOnInit(): void {
    const user = this.authService.currentUserValue;
    if (user && user.profileId) {
      this.historiaService.getPorPaciente(user.profileId).subscribe({
        next: (data) => {
          this.historias = data;
          // Ordenar por fecha descendente
          this.historias.sort((a, b) => {
            const dateA = a.fechaAtencion ? new Date(a.fechaAtencion).getTime() : 0;
            const dateB = b.fechaAtencion ? new Date(b.fechaAtencion).getTime() : 0;
            return dateB - dateA;
          });
          this.loading = false;
        },
        error: (err) => {
          console.error('Error cargando historial', err);
          this.loading = false;
        }
      });
    } else {
      this.loading = false;
    }
  }
}
