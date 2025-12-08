import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface MensajeContacto {
  id?: number;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  asunto: string;
  mensaje: string;
  fechaEnvio?: string;
  respuesta?: string;
  fechaRespuesta?: string;
  usuarioId?: number;
}

@Injectable({
  providedIn: 'root'
})
export class ContactoService {
  private apiUrl = 'http://localhost:8080/api/contacto';

  constructor(private http: HttpClient) { }

  enviarMensaje(mensaje: MensajeContacto): Observable<MensajeContacto> {
    return this.http.post<MensajeContacto>(this.apiUrl, mensaje);
  }

  getMensajes(): Observable<MensajeContacto[]> {
    return this.http.get<MensajeContacto[]>(this.apiUrl);
  }

  getMensajesPorUsuario(usuarioId: number): Observable<MensajeContacto[]> {
    return this.http.get<MensajeContacto[]>(`${this.apiUrl}/usuario/${usuarioId}`);
  }

  responderMensaje(id: number, respuesta: string): Observable<MensajeContacto> {
    return this.http.put<MensajeContacto>(`${this.apiUrl}/${id}/responder`, respuesta);
  }
}
