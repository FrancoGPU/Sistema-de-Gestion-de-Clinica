import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

export interface User {
  email: string;
  role: 'administrador' | 'paciente';
  nombre: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;

  // Usuarios de ejemplo (simulación)
  private readonly DEMO_USERS = [
    {
      email: 'administrador@administrador.com',
      password: 'admin123',
      role: 'administrador' as const,
      nombre: 'Administrador Sistema'
    },
    {
      email: 'paciente@paciente.com',
      password: 'paciente123',
      role: 'paciente' as const,
      nombre: 'Juan Pérez'
    }
  ];

  constructor(private router: Router) {
    // Intentar recuperar usuario del localStorage
    const storedUser = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<User | null>(
      storedUser ? JSON.parse(storedUser) : null
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  /**
   * Obtener el valor actual del usuario
   */
  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  /**
   * Iniciar sesión
   */
  login(email: string, password: string): { success: boolean; message?: string; user?: User } {
    // Buscar usuario en la lista de demo
    const user = this.DEMO_USERS.find(
      u => u.email === email && u.password === password
    );

    if (user) {
      const userData: User = {
        email: user.email,
        role: user.role,
        nombre: user.nombre
      };

      // Guardar en localStorage
      localStorage.setItem('currentUser', JSON.stringify(userData));
      this.currentUserSubject.next(userData);

      // Redirigir según el rol
      this.redirectByRole(user.role);

      return { success: true, user: userData };
    }

    return { success: false, message: 'Email o contraseña incorrectos' };
  }

  /**
   * Cerrar sesión
   */
  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  /**
   * Verificar si está autenticado
   */
  isAuthenticated(): boolean {
    return this.currentUserValue !== null;
  }

  /**
   * Obtener el rol del usuario actual
   */
  getUserRole(): 'administrador' | 'paciente' | null {
    return this.currentUserValue?.role || null;
  }

  /**
   * Obtener el nombre del usuario actual
   */
  getUserName(): string {
    return this.currentUserValue?.nombre || '';
  }

  /**
   * Verificar si el usuario es administrador
   */
  isAdmin(): boolean {
    return this.getUserRole() === 'administrador';
  }

  /**
   * Verificar si el usuario es paciente
   */
  isPaciente(): boolean {
    return this.getUserRole() === 'paciente';
  }

  /**
   * Redirigir según el rol del usuario
   */
  private redirectByRole(role: 'administrador' | 'paciente'): void {
    if (role === 'administrador') {
      this.router.navigate(['/admin/index']);
    } else if (role === 'paciente') {
      this.router.navigate(['/MediCore']);
    }
  }
}
