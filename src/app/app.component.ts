import { Component, AfterViewInit } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { BurbujaWspComponent } from './shared/components/BurbujaWsp/BurbujaWsp.component';
import { ThemeService } from './services/theme.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    BurbujaWspComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit {
  title = 'Sistema-de-Gestion-de-Clinica';
  showPublicLayout = true;

  constructor(
    private themeService: ThemeService,
    private router: Router
  ) {
    // Detectar cambios de ruta para mostrar/ocultar header y footer
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        // Mostrar header/footer solo en rutas públicas (MediCore)
        // Ocultar en rutas de admin, pacientes y login
        this.showPublicLayout = 
          event.url === '/' || 
          event.url.includes('/MediCore');
      });
  }

  ngAfterViewInit(): void {
    // Configurar los listeners para los botones de cambio de tema
    this.themeService.setupThemeListeners();
  }
}
