import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CampaniaSalud {
  id: number;
  nombre: string;
  descripcion: string;
  fechaInicio: string;
  fechaFin: string;
  ubicacion: string;
  capacidadMaxima: number;
  participantesActuales: number;
  estado: string;
}

@Injectable({
  providedIn: 'root',
})
export class CampaniaService {
  private apiUrl = 'http://localhost:8080/api/campanias';

  constructor(private http: HttpClient) {}

  getCampanias(): Observable<CampaniaSalud[]> {
    return this.http.get<CampaniaSalud[]>(this.apiUrl);
  }

  getCampania(id: number): Observable<CampaniaSalud> {
    return this.http.get<CampaniaSalud>(`${this.apiUrl}/${id}`);
  }

  createCampania(campania: CampaniaSalud): Observable<CampaniaSalud> {
    return this.http.post<CampaniaSalud>(this.apiUrl, campania);
  }

  updateCampania(id: number, campania: CampaniaSalud): Observable<CampaniaSalud> {
    return this.http.put<CampaniaSalud>(`${this.apiUrl}/${id}`, campania);
  }

  deleteCampania(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
