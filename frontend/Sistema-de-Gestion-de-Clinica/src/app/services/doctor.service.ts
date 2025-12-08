import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface HorarioMedico {
  idHorario?: number;
  diaSemana: string; // 'MONDAY', 'TUESDAY', etc.
  horaInicio: string; // '09:00:00'
  horaFin: string; // '13:00:00'
  duracionCitaMinutos: number;
}

export interface Doctor {
  idMedico: number;
  nombre: string;
  apellido: string;
  especialidad: string;
  horariosAtencion: string; // Deprecated or used for display summary
  numeroLicencia: string;
  telefono: string;
  email: string;
}

@Injectable({
  providedIn: 'root',
})
export class DoctorService {
  private apiUrl = 'http://localhost:8080/api/medicos';
  private horariosUrl = 'http://localhost:8080/api/horarios';

  constructor(private http: HttpClient) {}

  getDoctores(): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(this.apiUrl);
  }

  getDoctor(id: number): Observable<Doctor> {
    return this.http.get<Doctor>(`${this.apiUrl}/${id}`);
  }

  createDoctor(doctor: Doctor): Observable<Doctor> {
    return this.http.post<Doctor>(this.apiUrl, doctor);
  }

  updateDoctor(id: number, doctor: Doctor): Observable<Doctor> {
    return this.http.put<Doctor>(`${this.apiUrl}/${id}`, doctor);
  }

  deleteDoctor(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Métodos para Horarios
  getHorarios(idMedico: number): Observable<HorarioMedico[]> {
    return this.http.get<HorarioMedico[]>(`${this.horariosUrl}/medico/${idMedico}`);
  }

  addHorario(idMedico: number, horario: HorarioMedico): Observable<HorarioMedico> {
    return this.http.post<HorarioMedico>(`${this.horariosUrl}/medico/${idMedico}`, horario);
  }

  deleteHorario(idHorario: number): Observable<void> {
    return this.http.delete<void>(`${this.horariosUrl}/${idHorario}`);
  }
}
