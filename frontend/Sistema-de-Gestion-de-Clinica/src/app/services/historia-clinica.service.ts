import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CitaMedica } from './cita.service';

export interface HistoriaClinica {
  idHistoria?: number;
  cita: { idCita: number };
  paciente?: any;
  medico?: any;
  fechaAtencion?: string;
  sintomas: string;
  diagnostico: string;
  tratamiento: string;
  observaciones: string;
}

@Injectable({
  providedIn: 'root'
})
export class HistoriaClinicaService {
  private apiUrl = 'http://localhost:8080/api/historias';

  constructor(private http: HttpClient) { }

  crearHistoria(historia: HistoriaClinica): Observable<HistoriaClinica> {
    return this.http.post<HistoriaClinica>(this.apiUrl, historia);
  }

  getPorPaciente(idPaciente: number): Observable<HistoriaClinica[]> {
    return this.http.get<HistoriaClinica[]>(`${this.apiUrl}/paciente/${idPaciente}`);
  }

  getPorMedico(idMedico: number): Observable<HistoriaClinica[]> {
    return this.http.get<HistoriaClinica[]>(`${this.apiUrl}/medico/${idMedico}`);
  }

  getPorCita(idCita: number): Observable<HistoriaClinica> {
    return this.http.get<HistoriaClinica>(`${this.apiUrl}/cita/${idCita}`);
  }
}
