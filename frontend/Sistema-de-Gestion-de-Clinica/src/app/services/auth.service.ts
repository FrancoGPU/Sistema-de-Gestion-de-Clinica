import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap, map, catchError, of } from 'rxjs';

export interface User {
  email: string; // Mapeado desde username
  role: 'administrador' | 'paciente' | 'medico';
  nombre: string;
  id?: number;
  profileId?: number;
  token?: string;
}

interface LoginResponse {
  id: number;
  username: string;
  role: string;
  nombre: string;
  profileId?: number;
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;
  private apiUrl = 'http://localhost:8080/api/auth';

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
   * Obtener el token actual
   */
  public getToken(): string | null {
    return this.currentUserValue?.token || null;
  }

  /**
   * Iniciar sesión
   */
  login(username: string, password: string): Observable<{ success: boolean; message?: string; user?: User }> {
    console.log('Intentando login con:', username); // Debug
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, { username, password }).pipe(
      tap(response => console.log('Respuesta del servidor:', response)), // Debug
      map(response => {
        const userData: User = {
          email: response.username,
          role: response.role as 'administrador' | 'paciente' | 'medico',
          nombre: response.nombre,
          id: response.id,
          profileId: response.profileId,
          token: response.token
        };

        // Guardar en localStorage
        localStorage.setItem('currentUser', JSON.stringify(userData));
        this.currentUserSubject.next(userData);

        // Redirigir según el rol
        this.redirectByRole(userData.role);

        return { success: true, user: userData };
      }),
      catchError(error => {
        console.error('Error en login:', error); // Debug
        return of({ success: false, message: 'Credenciales incorrectas o error de servidor' });
      })
    );
  }

  /**
   * Registrar nuevo paciente
   */
  register(data: any): Observable<{ success: boolean; message?: string }> {
    return this.http.post(`${this.apiUrl}/register`, data, { responseType: 'text' }).pipe(
      map(response => {
        return { success: true, message: response };
      }),
      catchError(error => {
        console.error('Error en registro:', error);
        let errorMessage = 'Error al registrar usuario';
        if (error.status === 409) {
          errorMessage = error.error || 'El usuario o DNI ya existe';
        }
        return of({ success: false, message: errorMessage });
      })
    );
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
  getUserRole(): 'administrador' | 'paciente' | 'medico' | null {
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
  private redirectByRole(role: 'administrador' | 'paciente' | 'medico'): void {
    if (role === 'administrador') {
      this.router.navigate(['/admin/index']);
    } else if (role === 'paciente') {
      this.router.navigate(['/MediCore']);
    } else if (role === 'medico') {
      this.router.navigate(['/medico/dashboard']);
    }
  }
}
