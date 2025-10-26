import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-campanias',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './campanias.component.html',
  styleUrl: './campanias.component.css'
})
export class CampaniasComponent {
  suscripcionEmail: string = '';

  suscribirse() {
    if (this.suscripcionEmail) {
      console.log('Suscrito:', this.suscripcionEmail);
      alert(`¡Gracias por suscribirte! Recibirás información en ${this.suscripcionEmail}`);
      this.suscripcionEmail = '';
    }
  }
}
