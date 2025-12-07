import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CitaService, CitaMedica } from '../../../services/cita.service';

@Component({
  selector: 'app-system-status',
  imports: [CommonModule, RouterLink],
  templateUrl: './system-status.component.html',
  styleUrl: './system-status.component.css',
  encapsulation: ViewEncapsulation.None
})
export class SystemStatusComponent implements OnInit {
  proximasCitas: CitaMedica[] = [];
  loading = true;

  constructor(private citaService: CitaService) {}

  ngOnInit(): void {
    this.cargarProximasCitas();
  }

  cargarProximasCitas(): void {
    this.citaService.getCitas().subscribe({
      next: (data) => {
        // Filtrar citas futuras (desde el inicio del día de hoy) y ordenarlas por fecha
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        this.proximasCitas = data
          .filter(cita => new Date(cita.fechaHora) >= today && (cita.estado === 'PROGRAMADA' || cita.estado === 'CONFIRMADA'))
          .sort((a, b) => new Date(a.fechaHora).getTime() - new Date(b.fechaHora).getTime())
          .slice(0, 5); // Mostrar solo las próximas 5
        this.loading = false;
      },
      error: (err) => {
        console.error('Error cargando próximas citas', err);
        this.loading = false;
      }
    });
  }
}
