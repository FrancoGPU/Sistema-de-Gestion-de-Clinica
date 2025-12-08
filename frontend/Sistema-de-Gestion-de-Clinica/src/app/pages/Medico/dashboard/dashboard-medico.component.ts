import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { CitaService, CitaMedica } from '../../../services/cita.service';
import { MedicoHeaderComponent } from '../../../shared/components/medico-header/medico-header.component';

@Component({
  selector: 'app-dashboard-medico',
  standalone: true,
  imports: [CommonModule, RouterLink, MedicoHeaderComponent],
  templateUrl: './dashboard-medico.component.html',
  styleUrl: './dashboard-medico.component.css'
})
export class DashboardMedicoComponent implements OnInit {
  citas: CitaMedica[] = [];
  loading = true;
  doctorName = '';
  today = new Date();

  constructor(
    private authService: AuthService,
    private citaService: CitaService
  ) {}

  ngOnInit(): void {
    const user = this.authService.currentUserValue;
    if (user) {
      this.doctorName = user.nombre;
      if (user.profileId) {
        this.cargarCitas(user.profileId);
      }
    }
  }

  cargarCitas(idMedico: number) {
    this.citaService.getCitasMedico(idMedico).subscribe({
      next: (data) => {
        // Filtrar citas que no estén canceladas
        this.citas = data.filter(c => c.estado !== 'CANCELADA');
        // Ordenar por fecha
        this.citas.sort((a, b) => new Date(a.fechaHora).getTime() - new Date(b.fechaHora).getTime());
        this.loading = false;
      },
      error: (err) => {
        console.error('Error cargando citas', err);
        this.loading = false;
      }
    });
  }

  esHoy(fecha: string): boolean {
    const fechaCita = new Date(fecha);
    const hoy = new Date();
    return fechaCita.getDate() === hoy.getDate() &&
           fechaCita.getMonth() === hoy.getMonth() &&
           fechaCita.getFullYear() === hoy.getFullYear();
  }
}
