import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-stats-cards',
  imports: [RouterLink],
  templateUrl: './stats-cards.component.html',
  styleUrl: './stats-cards.component.css',
  encapsulation: ViewEncapsulation.None
})
export class StatsCardsComponent {
  totalPacientes: number = 0;
  totalDoctores: number = 0;
  citasHoy: number = 0;
  totalCitas: number = 0;
}
