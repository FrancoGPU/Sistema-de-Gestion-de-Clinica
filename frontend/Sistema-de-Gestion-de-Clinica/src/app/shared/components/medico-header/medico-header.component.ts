import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { ThemeService } from '../../../services/theme.service';

@Component({
  selector: 'app-medico-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './medico-header.component.html',
  styleUrl: './medico-header.component.css'
})
export class MedicoHeaderComponent implements OnInit {
  userName: string = '';
  mobileMenuOpen = false;
  currentTheme: 'light' | 'dark' = 'light';

  constructor(
    private authService: AuthService,
    private themeService: ThemeService
  ) {}

  ngOnInit(): void {
    this.userName = this.authService.getUserName();
    this.currentTheme = (this.themeService.getSavedTheme() as 'light' | 'dark') || 'light';
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
    this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen = false;
  }

  logout(): void {
    if (confirm('¿Está seguro que desea cerrar sesión?')) {
      this.authService.logout();
    }
  }
}
