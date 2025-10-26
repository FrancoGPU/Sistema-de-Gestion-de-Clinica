import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { ThemeService } from '../../../services/theme.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  isAuthenticated = false;
  userName = '';
  userRole = '';

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

  private updateAuthStatus(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
    if (this.isAuthenticated) {
      this.userName = this.authService.getUserName();
      const role = this.authService.getUserRole();
      this.userRole = role === 'administrador' ? 'Administrador' : 'Paciente';
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
