import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { ThemeService } from '../../../services/theme.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  isAuthenticated = false;
  userName = '';
  userRole = '';
  searchQuery = '';

  @ViewChild('searchInput') searchInput!: ElementRef;

  constructor(
    private authService: AuthService, 
    private router: Router,
    private themeService: ThemeService
  ) {}

  ngOnInit(): void {
    // Verificar estado de autenticación
    this.updateAuthStatus();

    // Suscribirse a cambios en la autenticación
    this.authService.currentUser.subscribe((user) => {
      this.updateAuthStatus();
    });
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
      event.preventDefault();
      this.searchInput.nativeElement.focus();
    }
  }

  search(): void {
    if (this.searchQuery.trim()) {
      // Redirigir a la página de servicios con el término de búsqueda
      // Asumiendo que ServiciosComponent puede filtrar o que implementaremos eso después
      // Por ahora, redirigimos a servicios
      this.router.navigate(['/MediCore/servicios'], { queryParams: { q: this.searchQuery } });
    }
  }

  private updateAuthStatus(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
    if (this.isAuthenticated) {
      this.userName = this.authService.getUserName();
      const role = this.authService.getUserRole();
      // Mapeo de roles para mostrar en la UI
      if (role === 'administrador') {
        this.userRole = 'Administrador';
      } else if (role === 'medico') {
        this.userRole = 'Médico';
      } else {
        this.userRole = 'Paciente';
      }
    }
  }

  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }

  navigateToRegister(): void {
    this.router.navigate(['/registro']);
  }

  logout(): void {
    if (confirm('¿Está seguro que desea cerrar sesión?')) {
      this.authService.logout();
    }
  }

  changeTheme(theme: 'light' | 'dark' | 'auto'): void {
    this.themeService.setTheme(theme);
  }
}
