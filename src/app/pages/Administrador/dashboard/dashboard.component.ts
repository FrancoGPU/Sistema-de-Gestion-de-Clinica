import { Component, ViewEncapsulation } from '@angular/core';
import { StatsCardsComponent } from '../../../components/administrador/stats-cards/stats-cards.component';
import { QuickActionsComponent } from '../../../components/administrador/quick-actions/quick-actions.component';
import { SystemStatusComponent } from '../../../components/administrador/system-status/system-status.component';
import { AdminHeaderComponent } from '../../../shared/components/admin-header/admin-header.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    AdminHeaderComponent,
    StatsCardsComponent,
    QuickActionsComponent,
    SystemStatusComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent {

}
