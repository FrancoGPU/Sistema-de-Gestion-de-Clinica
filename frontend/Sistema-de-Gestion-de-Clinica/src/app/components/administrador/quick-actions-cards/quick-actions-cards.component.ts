import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-quick-actions-cards',
  imports: [RouterLink],
  templateUrl: './quick-actions-cards.component.html',
  styleUrl: './quick-actions-cards.component.css',
  encapsulation: ViewEncapsulation.None
})
export class QuickActionsCardsComponent {

}
