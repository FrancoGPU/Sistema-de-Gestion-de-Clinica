import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-quick-actions',
  imports: [RouterLink],
  templateUrl: './quick-actions.component.html',
  styleUrl: './quick-actions.component.css',
  encapsulation: ViewEncapsulation.None
})
export class QuickActionsComponent {

}
