import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CampaniaService, CampaniaSalud } from '../../../services/campania.service';

@Component({
  selector: 'app-campanias',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './campanias.component.html',
  styleUrl: './campanias.component.css'
})
export class CampaniasComponent implements OnInit {
  suscripcionEmail: string = '';
  campanias: CampaniaSalud[] = [];
  loading = true;
  error = '';

  constructor(private campaniaService: CampaniaService) {}

  ngOnInit(): void {
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

  suscribirse() {
    if (this.suscripcionEmail) {
      console.log('Suscrito:', this.suscripcionEmail);
      alert(`¡Gracias por suscribirte! Recibirás información en ${this.suscripcionEmail}`);
      this.suscripcionEmail = '';
    }
  }
}
