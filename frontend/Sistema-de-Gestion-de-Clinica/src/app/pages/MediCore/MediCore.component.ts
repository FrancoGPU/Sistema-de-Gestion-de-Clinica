import { Component } from '@angular/core';
import { HeroComponent } from '../../components/clientes/hero/hero.component';
import { CarouselComponent } from '../../components/clientes/carousel/carousel.component';
import { InfoImageComponent } from '../../components/clientes/info-image/info-image.component';
import { SeccionServiciosComponent } from '../../components/clientes/seccion-servicios/seccion-servicios.component';
import { PorQueElegirnosComponent } from '../../components/clientes/PorQueElegirnos/PorQueElegirnos.component';
import { EstadisticasComponent } from '../../components/clientes/Estadisticas/Estadisticas.component';

@Component({
  selector: 'app-medi-core',
  imports: [
    HeroComponent,
    CarouselComponent,
    InfoImageComponent,
    SeccionServiciosComponent,
    EstadisticasComponent,
    PorQueElegirnosComponent,
  ],
  templateUrl: './MediCore.component.html',
  styleUrl: './MediCore.component.css',
})
export class MediCoreComponent {}
