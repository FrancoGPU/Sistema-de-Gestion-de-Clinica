import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CampaniaService, CampaniaSalud } from '../../../services/campania.service';
import { AuthService } from '../../../services/auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-campanias',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './campanias.component.html',
  styleUrl: './campanias.component.css'
})
export class CampaniasComponent implements OnInit {
  suscripcionEmail: string = '';
  campanias: CampaniaSalud[] = [];
  loading = true;
  error = '';
  isLoggedIn = false;
  isPaciente = false;

  constructor(
    private campaniaService: CampaniaService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.checkAuthStatus();
    this.loadCampanias();
  }

  checkAuthStatus() {
    const user = this.authService.currentUserValue;
    this.isLoggedIn = !!user;
    this.isPaciente = user?.role === 'paciente';
  }

  loadCampanias() {
    this.campaniaService.getCampanias().subscribe({
      next: (data: CampaniaSalud[]) => {
        this.campanias = data;
        this.loading = false;
      },
      error: (err: any) => {
        this.error = 'Error al cargar las campañas';
        this.loading = false;
      }
    });
  }

  inscribirse(campaniaId: number) {
    if (!this.isLoggedIn) {
      this.router.navigate(['/login']);
      return;
    }

    if (!this.isPaciente) {
      alert('Solo los pacientes pueden inscribirse a campañas.');
      return;
    }

    const user = this.authService.currentUserValue;
    if (user && user.profileId) {
      this.campaniaService.inscribirPaciente(campaniaId, user.profileId).subscribe({
        next: (response) => {
          alert('Te has inscrito exitosamente a la campaña.');
          this.loadCampanias(); // Recargar para actualizar estado si es necesario
        },
        error: (err) => {
          console.error(err);
          alert('Error al inscribirse: ' + (err.error || 'Intente nuevamente.'));
        }
      });
    } else {
      alert('Error: No se pudo identificar al paciente.');
    }
  }

  suscribirse() {
    if (this.suscripcionEmail) {
      console.log('Suscrito:', this.suscripcionEmail);
      alert(`¡Gracias por suscribirte! Recibirás información en ${this.suscripcionEmail}`);
      this.suscripcionEmail = '';
    }
  }
}
