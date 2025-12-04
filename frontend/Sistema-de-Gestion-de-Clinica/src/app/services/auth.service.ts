import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface User {
  email: string;
  role: 'administrador' | 'paciente';
  nombre: string;
}

interface LoginResponse {
  token: string;
  username: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;
  private apiUrl = 'http://localhost:8080/api/auth';

  // Usuarios de ejemplo (simulación - mantener para demo)
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

  constructor(private router: Router, private http: HttpClient) {
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
   * Iniciar sesión con el backend
   */
  loginBackend(username: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, { username, password });
  }

  /**
   * Iniciar sesión (asíncrono - retorna Observable)
   */
  login(email: string, password: string): Observable<{ success: boolean; message?: string; user?: User }> {
    return new Observable(observer => {
      // Buscar usuario en demo
      const user = this.DEMO_USERS.find(
        u => u.email === email && u.password === password
      );

      if (!user) {
        observer.next({
          success: false,
          message: 'Credenciales incorrectas'
        });
        observer.complete();
        return;
      }

      const userData: User = {
        email: user.email,
        role: user.role,
        nombre: user.nombre
      };

      // Si es administrador, obtener token real del backend primero
      if (user.role === 'administrador') {
        this.loginBackend('admin', 'admin123').subscribe({
          next: (response) => {
            localStorage.setItem('token', response.token);
            localStorage.setItem('currentUser', JSON.stringify(userData));
            this.currentUserSubject.next(userData);
            console.log('Token JWT guardado correctamente:', response.token);
            observer.next({ success: true, user: userData });
            observer.complete();
          },
          error: (err) => {
            console.error('Error al obtener token del backend:', err);
            observer.next({
              success: false,
              message: 'Error al conectar con el servidor'
            });
            observer.complete();
          }
        });
      } else {
        // Para pacientes, no necesitamos token JWT
        localStorage.setItem('currentUser', JSON.stringify(userData));
        this.currentUserSubject.next(userData);
        observer.next({ success: true, user: userData });
        observer.complete();
      }
    });
  }

  /**
   * Cerrar sesión
   */
  logout(): void {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
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
