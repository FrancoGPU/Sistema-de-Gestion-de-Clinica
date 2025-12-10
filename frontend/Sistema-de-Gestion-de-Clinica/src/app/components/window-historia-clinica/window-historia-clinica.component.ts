import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HistoriaClinicaService, HistoriaClinica } from '../../services/historia-clinica.service';
import { PacienteService } from '../../services/paciente.service';

type PacienteView = {
  id: number;
  nombre: string;
  apellido: string;
  cedula: string;
  fechaNacimiento?: string;
  genero?: string;
  telefono?: string;
  email?: string;
};

type HistoriaView = {
  fechaCreacion: string;
  medicoNombre: string;
  motivoConsulta: string;
  diagnostico: string;
  tratamiento: string;
  observaciones: string;
  presionArterial?: string;
  temperatura?: string | number;
  peso?: string | number;
  altura?: string | number;
};

@Component({
  selector: 'app-window-historia-clinica',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="window-container">
      <header class="window-header">
        <h1>📋 Historia Clínica</h1>
        <button class="close-btn" (click)="closeWindow()">✕</button>
      </header>

      <div class="window-content">
        <!-- Selector de Paciente -->
        <div class="paciente-selector" *ngIf="!pacienteId">
          <label for="paciente">Seleccionar Paciente:</label>
          <select 
            id="paciente" 
            [(ngModel)]="selectedPacienteId" 
            (change)="cargarHistoria()"
            class="select-input"
          >
            <option value="">-- Seleccione un paciente --</option>
            <option *ngFor="let p of pacientes" [value]="p.id">
              {{ p.nombre }} {{ p.apellido }} - CI: {{ p.cedula }}
            </option>
          </select>
        </div>

        <!-- Información del Paciente -->
        <div class="paciente-info" *ngIf="pacienteActual">
          <h2>Información del Paciente</h2>
          <div class="info-grid">
            <div class="info-item">
              <span class="label">Nombre:</span>
              <span class="value">{{ pacienteActual.nombre }} {{ pacienteActual.apellido }}</span>
            </div>
            <div class="info-item">
              <span class="label">Cédula:</span>
              <span class="value">{{ pacienteActual.cedula }}</span>
            </div>
            <div class="info-item">
              <span class="label">Fecha de Nacimiento:</span>
              <span class="value">{{ formatDate(pacienteActual.fechaNacimiento) }}</span>
            </div>
            <div class="info-item">
              <span class="label">Género:</span>
              <span class="value">{{ pacienteActual.genero }}</span>
            </div>
            <div class="info-item">
              <span class="label">Teléfono:</span>
              <span class="value">{{ pacienteActual.telefono }}</span>
            </div>
            <div class="info-item">
              <span class="label">Email:</span>
              <span class="value">{{ pacienteActual.email }}</span>
            </div>
          </div>
        </div>

        <!-- Historias Clínicas -->
        <div class="historias-section" *ngIf="!loading && pacienteActual">
          <div class="section-header">
            <h2>Registros Médicos</h2>
            <button (click)="nuevaHistoria()" class="btn-add">➕ Nuevo Registro</button>
          </div>

          <div class="historias-list">
            <div class="historia-card" *ngFor="let historia of historias">
              <div class="historia-header">
                <span class="historia-date">{{ formatDateTime(historia.fechaCreacion) }}</span>
                <span class="historia-medico">Dr. {{ historia.medicoNombre || 'No asignado' }}</span>
              </div>
              
              <div class="historia-body">
                <div class="campo">
                  <strong>Motivo de Consulta:</strong>
                  <p>{{ historia.motivoConsulta || 'No especificado' }}</p>
                </div>
                
                <div class="campo">
                  <strong>Diagnóstico:</strong>
                  <p>{{ historia.diagnostico || 'Sin diagnóstico' }}</p>
                </div>
                
                <div class="campo">
                  <strong>Tratamiento:</strong>
                  <p>{{ historia.tratamiento || 'Sin tratamiento' }}</p>
                </div>
                
                <div class="campo">
                  <strong>Observaciones:</strong>
                  <p>{{ historia.observaciones || 'Sin observaciones' }}</p>
                </div>

                <div class="signos-vitales" *ngIf="historia.presionArterial || historia.temperatura">
                  <h4>Signos Vitales</h4>
                  <div class="vitales-grid">
                    <div *ngIf="historia.presionArterial">
                      <span class="vital-label">Presión:</span>
                      <span class="vital-value">{{ historia.presionArterial }}</span>
                    </div>
                    <div *ngIf="historia.temperatura">
                      <span class="vital-label">Temperatura:</span>
                      <span class="vital-value">{{ historia.temperatura }}°C</span>
                    </div>
                    <div *ngIf="historia.peso">
                      <span class="vital-label">Peso:</span>
                      <span class="vital-value">{{ historia.peso }} kg</span>
                    </div>
                    <div *ngIf="historia.altura">
                      <span class="vital-label">Altura:</span>
                      <span class="vital-value">{{ historia.altura }} cm</span>
                    </div>
                  </div>
                </div>
              </div>

              <div class="historia-actions">
                <button (click)="verDetalle(historia)" class="btn-view">👁️ Ver</button>
                <button (click)="editarHistoria(historia)" class="btn-edit">✏️ Editar</button>
                <button (click)="imprimirHistoria(historia)" class="btn-print">🖨️ Imprimir</button>
              </div>
            </div>

            <div *ngIf="historias.length === 0" class="no-data">
              <p>No hay registros médicos para este paciente</p>
            </div>
          </div>
        </div>

        <div class="loading" *ngIf="loading">
          <div class="spinner"></div>
          <p>Cargando historias clínicas...</p>
        </div>

        <div class="empty-state" *ngIf="!loading && !pacienteActual">
          <p>👆 Seleccione un paciente para ver su historia clínica</p>
        </div>
      </div>

      <footer class="window-footer" *ngIf="pacienteActual">
        <span class="window-info">
          Total de registros: {{ historias.length }}
        </span>
        <button (click)="exportarHistoria()" class="btn-export">📥 Exportar PDF</button>
      </footer>
    </div>
  `,
  styles: [`
    .window-container {
      height: 100vh;
      display: flex;
      flex-direction: column;
      background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }

    .window-header {
      background: rgba(255, 255, 255, 0.95);
      padding: 1.5rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }

    .window-header h1 {
      margin: 0;
      color: #f5576c;
      font-size: 1.8rem;
    }

    .close-btn {
      background: #ff4757;
      color: white;
      border: none;
      width: 35px;
      height: 35px;
      border-radius: 50%;
      cursor: pointer;
      font-size: 1.2rem;
      transition: all 0.3s;
    }

    .close-btn:hover {
      background: #ff3838;
      transform: rotate(90deg);
    }

    .window-content {
      flex: 1;
      padding: 1.5rem;
      overflow-y: auto;
    }

    .paciente-selector {
      background: white;
      padding: 1.5rem;
      border-radius: 12px;
      margin-bottom: 1.5rem;
      box-shadow: 0 4px 15px rgba(0,0,0,0.1);
    }

    .paciente-selector label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: bold;
      color: #2d3436;
    }

    .select-input {
      width: 100%;
      padding: 0.75rem;
      border: 2px solid #dfe6e9;
      border-radius: 8px;
      font-size: 1rem;
    }

    .paciente-info {
      background: white;
      padding: 1.5rem;
      border-radius: 12px;
      margin-bottom: 1.5rem;
      box-shadow: 0 4px 15px rgba(0,0,0,0.1);
    }

    .paciente-info h2 {
      margin-top: 0;
      color: #f5576c;
      border-bottom: 2px solid #f5576c;
      padding-bottom: 0.5rem;
    }

    .info-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1rem;
      margin-top: 1rem;
    }

    .info-item {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    .info-item .label {
      font-size: 0.85rem;
      color: #636e72;
      font-weight: 600;
    }

    .info-item .value {
      font-size: 1rem;
      color: #2d3436;
      font-weight: 500;
    }

    .historias-section {
      background: white;
      padding: 1.5rem;
      border-radius: 12px;
      box-shadow: 0 4px 15px rgba(0,0,0,0.1);
    }

    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
    }

    .section-header h2 {
      margin: 0;
      color: #2d3436;
    }

    .btn-add {
      background: #00b894;
      color: white;
      border: none;
      padding: 0.75rem 1.5rem;
      border-radius: 8px;
      cursor: pointer;
      font-weight: bold;
      transition: all 0.3s;
    }

    .btn-add:hover {
      background: #00a383;
      transform: translateY(-2px);
    }

    .historias-list {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .historia-card {
      border: 2px solid #dfe6e9;
      border-radius: 12px;
      padding: 1.5rem;
      transition: all 0.3s;
    }

    .historia-card:hover {
      border-color: #f5576c;
      box-shadow: 0 4px 15px rgba(245, 87, 108, 0.2);
    }

    .historia-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
      padding-bottom: 0.75rem;
      border-bottom: 2px solid #f0f0f0;
    }

    .historia-date {
      font-weight: bold;
      color: #f5576c;
    }

    .historia-medico {
      color: #636e72;
      font-style: italic;
    }

    .historia-body {
      margin-bottom: 1rem;
    }

    .campo {
      margin-bottom: 1rem;
    }

    .campo strong {
      color: #2d3436;
      display: block;
      margin-bottom: 0.25rem;
    }

    .campo p {
      margin: 0;
      color: #636e72;
      line-height: 1.6;
    }

    .signos-vitales {
      background: #f8f9fa;
      padding: 1rem;
      border-radius: 8px;
      margin-top: 1rem;
    }

    .signos-vitales h4 {
      margin: 0 0 0.75rem 0;
      color: #2d3436;
    }

    .vitales-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 1rem;
    }

    .vitales-grid > div {
      display: flex;
      flex-direction: column;
    }

    .vital-label {
      font-size: 0.85rem;
      color: #636e72;
    }

    .vital-value {
      font-size: 1.1rem;
      font-weight: bold;
      color: #f5576c;
    }

    .historia-actions {
      display: flex;
      gap: 0.5rem;
      flex-wrap: wrap;
    }

    .historia-actions button {
      flex: 1;
      padding: 0.6rem 1rem;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-weight: bold;
      transition: all 0.3s;
      min-width: 100px;
    }

    .btn-view {
      background: #74b9ff;
      color: white;
    }

    .btn-edit {
      background: #fdcb6e;
      color: #2d3436;
    }

    .btn-print {
      background: #a29bfe;
      color: white;
    }

    .historia-actions button:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 10px rgba(0,0,0,0.2);
    }

    .no-data, .empty-state {
      text-align: center;
      padding: 3rem;
      color: #636e72;
      font-size: 1.2rem;
    }

    .empty-state {
      background: white;
      border-radius: 12px;
      box-shadow: 0 4px 15px rgba(0,0,0,0.1);
    }

    .loading {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 3rem;
      color: white;
    }

    .spinner {
      width: 50px;
      height: 50px;
      border: 5px solid rgba(255,255,255,0.3);
      border-top-color: white;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    .window-footer {
      background: rgba(255, 255, 255, 0.95);
      padding: 1.5rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-shadow: 0 -2px 10px rgba(0,0,0,0.1);
    }

    .window-info {
      color: #2d3436;
      font-weight: bold;
    }

    .btn-export {
      background: #6c5ce7;
      color: white;
      border: none;
      padding: 1rem 2rem;
      border-radius: 8px;
      cursor: pointer;
      font-weight: bold;
      transition: all 0.3s;
    }

    .btn-export:hover {
      background: #5f4ed1;
      transform: translateY(-2px);
    }
  `]
})
export class WindowHistoriaClinicaComponent implements OnInit {
  pacienteId?: number;
  selectedPacienteId: number | string = '';
  pacienteActual: PacienteView | null = null;
  pacientes: PacienteView[] = [];
  historias: HistoriaView[] = [];
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private historiaService: HistoriaClinicaService,
    private pacienteService: PacienteService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['pacienteId']) {
        this.pacienteId = +params['pacienteId'];
        this.selectedPacienteId = this.pacienteId;
        this.cargarHistoria();
      }
    });

    this.cargarPacientes();
  }

  cargarPacientes(): void {
    this.pacienteService.getPacientes().subscribe({
      next: (data) => {
        this.pacientes = data.map((p) => this.mapPaciente(p));
      },
      error: (error) => {
        console.error('Error al cargar pacientes:', error);
      }
    });
  }

  cargarHistoria(): void {
    const id = this.selectedPacienteId || this.pacienteId;
    if (!id) return;

    this.loading = true;
    
    // Cargar información del paciente
    this.pacienteService.getPaciente(+id).subscribe({
      next: (paciente) => {
        this.pacienteActual = this.mapPaciente(paciente);
      },
      error: (error) => {
        console.error('Error al cargar paciente:', error);
      }
    });

    // Cargar historias clínicas
    this.historiaService.getPorPaciente(+id).subscribe({
      next: (data) => {
        this.historias = data.map((h) => this.mapHistoria(h));
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al cargar historias:', error);
        this.historias = [];
        this.loading = false;
      }
    });
  }

  formatDate(date?: string): string {
    if (!date) return 'N/A';
    const d = new Date(date);
    return d.toLocaleDateString('es-ES', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  }

  formatDateTime(date?: string): string {
    if (!date) return 'N/A';
    const d = new Date(date);
    return d.toLocaleString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  nuevaHistoria(): void {
    alert('Abrir formulario para nueva historia clínica\n\nSe abrirá un formulario completo.');
  }

  verDetalle(historia: any): void {
    alert(`Ver detalle completo de la historia #${historia.id}`);
  }

  editarHistoria(historia: any): void {
    alert(`Editar historia #${historia.id}`);
  }

  imprimirHistoria(historia: any): void {
    alert(`Imprimir historia #${historia.id}`);
  }

  exportarHistoria(): void {
    alert('Exportar historia clínica completa a PDF');
  }

  closeWindow(): void {
    window.close();
  }

  private mapPaciente(data: any): PacienteView {
    return {
      id: data.idPaciente ?? data.id ?? 0,
      nombre: data.nombre ?? '',
      apellido: data.apellido ?? '',
      cedula: data.dni ?? data.cedula ?? 'N/A',
      fechaNacimiento: data.fechaNacimiento,
      genero: data.genero ?? 'No especificado',
      telefono: data.numeroTelefono ?? data.telefono ?? '',
      email: data.correoElectronico ?? data.email ?? '',
    };
  }

  private mapHistoria(data: HistoriaClinica): HistoriaView {
    const fecha = (data as any).fechaCreacion
      ?? data.fechaAtencion
      ?? (data as any).fecha
      ?? (data as any).cita?.fechaHora
      ?? '';
    return {
      fechaCreacion: fecha,
      medicoNombre: (data as any).medicoNombre ?? data.medico?.nombre ?? 'No asignado',
      motivoConsulta: (data as any).motivoConsulta ?? data.sintomas ?? 'No especificado',
      diagnostico: data.diagnostico ?? 'Sin diagnóstico',
      tratamiento: data.tratamiento ?? 'Sin tratamiento',
      observaciones: data.observaciones ?? 'Sin observaciones',
      presionArterial: (data as any).presionArterial ?? (data as any).signosVitales?.presion,
      temperatura: (data as any).temperatura ?? (data as any).signosVitales?.temperatura,
      peso: (data as any).peso ?? (data as any).signosVitales?.peso,
      altura: (data as any).altura ?? (data as any).signosVitales?.altura,
    };
  }
}
