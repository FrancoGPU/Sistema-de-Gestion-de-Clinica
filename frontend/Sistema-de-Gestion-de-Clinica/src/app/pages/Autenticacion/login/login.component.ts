import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  isLoading: boolean = false;
  showPassword: boolean = false;
  selectedDemoUser: number = -1;

  // Usuarios de demostración para mostrar en la UI
  demoUsers = [
    {
      email: 'administrador@administrador.com',
      password: 'admin123',
      role: 'Administrador',
      icon: 'fa-user-shield',
    },
    {
      email: 'paciente@paciente.com',
      password: 'paciente123',
      role: 'Paciente',
      icon: 'fa-user',
    },
  ];

  constructor(private authService: AuthService, private router: Router) {
    // Si ya está autenticado, redirigir según el rol
    if (this.authService.isAuthenticated()) {
      const role = this.authService.getUserRole();
      if (role === 'administrador') {
        this.router.navigate(['/admin/index']);
      } else if (role === 'paciente') {
        this.router.navigate(['/MediCore']);
      }
    }
  }

  /**
   * Manejar el envío del formulario
   */
  onSubmit(): void {
    this.errorMessage = '';

    // Validaciones básicas
    if (!this.email || !this.password) {
      this.errorMessage = 'Por favor, complete todos los campos';
      return;
    }

    if (!this.isValidEmail(this.email)) {
      this.errorMessage = 'Por favor, ingrese un email válido';
      return;
    }

    this.isLoading = true;

    // Realizar login asíncrono
    this.authService.login(this.email, this.password).subscribe({
      next: (result) => {
        if (result.success && result.user) {
          // Redirigir según el rol
          if (result.user.role === 'administrador') {
            this.router.navigate(['/admin/index']);
          } else if (result.user.role === 'paciente') {
            this.router.navigate(['/MediCore']);
          }
        } else {
          this.errorMessage = result.message || 'Error al iniciar sesión';
          this.isLoading = false;
        }
      },
      error: (err) => {
        this.errorMessage = 'Error al conectar con el servidor';
        this.isLoading = false;
        console.error('Error en login:', err);
      }
    });
  }

  /**
   * Llenar el formulario con un usuario de demostración
   */
  useDemoUser(userIndex: number): void {
    const user = this.demoUsers[userIndex];

    // Marcar como seleccionado
    this.selectedDemoUser = userIndex;

    // Limpiar cualquier error previo
    this.errorMessage = '';

    // Llenar los campos
    this.email = user.email;
    this.password = user.password;

    // Quitar la selección visual después de un momento
    setTimeout(() => {
      this.selectedDemoUser = -1;
    }, 1000);

    // Opcional: Auto-submit después de un pequeño delay para mejor UX
    // Descomenta la siguiente línea si quieres que se loguee automáticamente
    setTimeout(() => this.onSubmit(), 800);
  }

  /**
   * Continuar como invitado (sin autenticación)
   */
  continueAsGuest(): void {
    // Redirigir directamente a MediCore sin autenticación
    this.router.navigate(['/MediCore']);
  }

  /**
   * Alternar visibilidad de la contraseña
   */
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  /**
   * Validar formato de email
   */
  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
