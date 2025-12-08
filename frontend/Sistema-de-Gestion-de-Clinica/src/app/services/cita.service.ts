import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CitaMedica {
  idCita: number;
  paciente: {
    idPaciente: number;
    nombre: string;
    apellido: string;
  };
  medico: {
    idMedico: number;
    nombre: string;
    especialidad: string;
  };
  fechaHora: string;
  motivo: string;
  estado: string;
  observaciones?: string;
}

@Injectable({
  providedIn: 'root',
})
export class CitaService {
  private apiUrl = 'http://localhost:8080/api/citas';

  constructor(private http: HttpClient) {}

  getCitas(): Observable<CitaMedica[]> {
    return this.http.get<CitaMedica[]>(this.apiUrl);
  }

  getCitasMedico(idMedico: number): Observable<CitaMedica[]> {
    return this.http.get<CitaMedica[]>(`${this.apiUrl}/medico/${idMedico}`);
  }

  getCitasByPaciente(idPaciente: number): Observable<CitaMedica[]> {
    return this.http.get<CitaMedica[]>(`${this.apiUrl}/paciente/${idPaciente}`);
  }

  getCitasHoy(): Observable<CitaMedica[]> {
    return this.http.get<CitaMedica[]>(`${this.apiUrl}/hoy`);
  }

  getCita(id: number): Observable<CitaMedica> {
    return this.http.get<CitaMedica>(`${this.apiUrl}/${id}`);
  }

  createCita(cita: any): Observable<CitaMedica> {
    return this.http.post<CitaMedica>(this.apiUrl, cita);
  }

  updateCita(id: number, cita: any): Observable<CitaMedica> {
    return this.http.put<CitaMedica>(`${this.apiUrl}/${id}`, cita);
  }

  deleteCita(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getDisponibilidad(medicoId: number, fecha: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/disponibilidad?medicoId=${medicoId}&fecha=${fecha}`);
  }
}
