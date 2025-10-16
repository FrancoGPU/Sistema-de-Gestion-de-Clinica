import { Component, ViewEncapsulation } from '@angular/core';
import { HeroSectionComponent } from '../../../components/administrador/hero-section/hero-section.component';
import { QuickActionsCardsComponent } from '../../../components/administrador/quick-actions-cards/quick-actions-cards.component';
import { FeaturesSectionComponent } from '../../../components/administrador/features-section/features-section.component';
import { AdminHeaderComponent } from '../../../shared/components/admin-header/admin-header.component';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [
    AdminHeaderComponent,
    HeroSectionComponent,
    QuickActionsCardsComponent,
    FeaturesSectionComponent
  ],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css',
  encapsulation: ViewEncapsulation.None
})
export class IndexComponent {

}
