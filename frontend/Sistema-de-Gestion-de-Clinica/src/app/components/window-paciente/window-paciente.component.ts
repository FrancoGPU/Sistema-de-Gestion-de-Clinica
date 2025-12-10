import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PacienteService } from '../../services/paciente.service';
import { CitaMedica, CitaService } from '../../services/cita.service';
import { HistoriaClinicaService } from '../../services/historia-clinica.service';

type PacienteView = {
  id: number;
  nombre: string;
  apellido: string;
  cedula: string;
  telefono: string;
  email: string;
  fechaNacimiento?: string;
  genero?: string;
  grupoSanguineo?: string;
  direccion?: string;
  alergias?: string;
  medicacionActual?: string;
  enfermedadesCronicas?: string;
  fechaRegistro?: string;
  activo?: boolean;
  contactoEmergenciaNombre?: string;
  contactoEmergenciaTelefono?: string;
  contactoEmergenciaRelacion?: string;
};

type CitaResumen = {
  fechaCita: string;
  medicoNombre: string;
  motivo: string;
  estado: string;
};

@Component({
  selector: 'app-window-paciente',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="window-container">
      <header class="window-header">
        <h1>👤 Información del Paciente</h1>
        <button class="close-btn" (click)="closeWindow()">✕</button>
      </header>

      <div class="window-content">
        <!-- Selector de Paciente -->
        <div class="paciente-selector" *ngIf="!pacienteId">
          <label for="paciente">Buscar Paciente:</label>
          <select 
            id="paciente" 
            [(ngModel)]="selectedPacienteId" 
            (change)="cargarPaciente()"
            class="select-input"
          >
            <option value="">-- Seleccione un paciente --</option>
            <option *ngFor="let p of pacientes" [value]="p.id">
              {{ p.nombre }} {{ p.apellido }} - CI: {{ p.cedula }}
            </option>
          </select>
        </div>

        <!-- Información Principal del Paciente -->
        <div class="paciente-card" *ngIf="paciente && !loading">
          <div class="card-header">
            <div class="avatar">
              {{ getInitials(paciente.nombre, paciente.apellido) }}
            </div>
            <div class="header-info">
              <h2>{{ paciente.nombre }} {{ paciente.apellido }}</h2>
              <p class="cedula">CI: {{ paciente.cedula }}</p>
            </div>
            <div class="status-badge" [class.activo]="paciente.activo">
              {{ paciente.activo ? '✓ Activo' : '✗ Inactivo' }}
            </div>
          </div>

          <div class="card-body">
            <div class="section">
              <h3>📋 Datos Personales</h3>
              <div class="data-grid">
                <div class="data-item">
                  <span class="label">Fecha de Nacimiento:</span>
                  <span class="value">{{ formatDate(paciente.fechaNacimiento) }}</span>
                </div>
                <div class="data-item">
                  <span class="label">Edad:</span>
                  <span class="value">{{ calcularEdad(paciente.fechaNacimiento) }} años</span>
                </div>
                <div class="data-item">
                  <span class="label">Género:</span>
                  <span class="value">{{ paciente.genero }}</span>
                </div>
                <div class="data-item">
                  <span class="label">Grupo Sanguíneo:</span>
                  <span class="value">{{ paciente.grupoSanguineo || 'No registrado' }}</span>
                </div>
              </div>
            </div>

            <div class="section">
              <h3>📞 Contacto</h3>
              <div class="data-grid">
                <div class="data-item">
                  <span class="label">Teléfono:</span>
                  <span class="value">{{ paciente.telefono }}</span>
                </div>
                <div class="data-item">
                  <span class="label">Email:</span>
                  <span class="value">{{ paciente.email }}</span>
                </div>
                <div class="data-item full-width">
                  <span class="label">Dirección:</span>
                  <span class="value">{{ paciente.direccion || 'No registrada' }}</span>
                </div>
              </div>
            </div>

            <div class="section">
              <h3>🏥 Información Médica</h3>
              <div class="data-grid">
                <div class="data-item">
                  <span class="label">Alergias:</span>
                  <span class="value">{{ paciente.alergias || 'Ninguna registrada' }}</span>
                </div>
                <div class="data-item">
                  <span class="label">Medicación Actual:</span>
                  <span class="value">{{ paciente.medicacionActual || 'Ninguna' }}</span>
                </div>
                <div class="data-item full-width">
                  <span class="label">Enfermedades Crónicas:</span>
                  <span class="value">{{ paciente.enfermedadesCronicas || 'Ninguna' }}</span>
                </div>
              </div>
            </div>

            <div class="section">
              <h3>📊 Estadísticas</h3>
              <div class="stats-grid">
                <div class="stat-card">
                  <div class="stat-icon">📅</div>
                  <div class="stat-number">{{ totalCitas }}</div>
                  <div class="stat-label">Citas Totales</div>
                </div>
                <div class="stat-card">
                  <div class="stat-icon">⏰</div>
                  <div class="stat-number">{{ citasPendientes }}</div>
                  <div class="stat-label">Citas Pendientes</div>
                </div>
                <div class="stat-card">
                  <div class="stat-icon">📋</div>
                  <div class="stat-number">{{ totalHistorias }}</div>
                  <div class="stat-label">Registros Médicos</div>
                </div>
                <div class="stat-card">
                  <div class="stat-icon">📅</div>
                  <div class="stat-number">{{ formatDate(paciente.fechaRegistro) }}</div>
                  <div class="stat-label">Fecha de Registro</div>
                </div>
              </div>
            </div>

            <!-- Últimas Citas -->
            <div class="section" *ngIf="ultimasCitas.length > 0">
              <h3>🗓️ Últimas Citas</h3>
              <div class="citas-recientes">
                <div class="cita-item" *ngFor="let cita of ultimasCitas">
                  <div class="cita-date">{{ formatDate(cita.fechaCita) }}</div>
                  <div class="cita-info">
                    <strong>{{ cita.medicoNombre }}</strong>
                    <span>{{ cita.motivo }}</span>
                  </div>
                  <div class="cita-status" [class]="'status-' + cita.estado.toLowerCase()">
                    {{ cita.estado }}
                  </div>
                </div>
              </div>
            </div>

            <!-- Contacto de Emergencia -->
            <div class="section" *ngIf="paciente.contactoEmergenciaNombre">
              <h3>🚨 Contacto de Emergencia</h3>
              <div class="emergency-contact">
                <div class="data-item">
                  <span class="label">Nombre:</span>
                  <span class="value">{{ paciente.contactoEmergenciaNombre }}</span>
                </div>
                <div class="data-item">
                  <span class="label">Teléfono:</span>
                  <span class="value">{{ paciente.contactoEmergenciaTelefono }}</span>
                </div>
                <div class="data-item">
                  <span class="label">Relación:</span>
                  <span class="value">{{ paciente.contactoEmergenciaRelacion }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="loading" *ngIf="loading">
          <div class="spinner"></div>
          <p>Cargando información del paciente...</p>
        </div>

        <div class="empty-state" *ngIf="!loading && !paciente">
          <p>👆 Seleccione un paciente para ver su información</p>
        </div>
      </div>

      <footer class="window-footer" *ngIf="paciente">
        <button (click)="editarPaciente()" class="btn-edit">✏️ Editar</button>
        <button (click)="verHistoriaCompleta()" class="btn-historia">📋 Historia Completa</button>
        <button (click)="nuevaCita()" class="btn-cita">➕ Nueva Cita</button>
      </footer>
    </div>
  `,
  styles: [`
    .window-container {
      height: 100vh;
      display: flex;
      flex-direction: column;
      background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
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
      color: #4facfe;
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

    .paciente-card {
      background: white;
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.1);
      overflow: hidden;
    }

    .card-header {
      background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
      padding: 2rem;
      display: flex;
      align-items: center;
      gap: 1.5rem;
      color: white;
    }

    .avatar {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      background: rgba(255,255,255,0.3);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2rem;
      font-weight: bold;
      border: 3px solid white;
    }

    .header-info {
      flex: 1;
    }

    .header-info h2 {
      margin: 0;
      font-size: 1.8rem;
    }

    .cedula {
      margin: 0.5rem 0 0 0;
      opacity: 0.9;
      font-size: 1.1rem;
    }

    .status-badge {
      padding: 0.5rem 1.5rem;
      border-radius: 20px;
      background: rgba(255,255,255,0.3);
      font-weight: bold;
    }

    .status-badge.activo {
      background: rgba(0, 184, 148, 0.3);
    }

    .card-body {
      padding: 2rem;
    }

    .section {
      margin-bottom: 2rem;
    }

    .section h3 {
      color: #2d3436;
      border-bottom: 2px solid #4facfe;
      padding-bottom: 0.5rem;
      margin-bottom: 1rem;
    }

    .data-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1rem;
    }

    .data-item {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    .data-item.full-width {
      grid-column: 1 / -1;
    }

    .data-item .label {
      font-size: 0.85rem;
      color: #636e72;
      font-weight: 600;
    }

    .data-item .value {
      font-size: 1rem;
      color: #2d3436;
      font-weight: 500;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
    }

    .stat-card {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 1.5rem;
      border-radius: 12px;
      text-align: center;
      transition: all 0.3s;
    }

    .stat-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 20px rgba(0,0,0,0.2);
    }

    .stat-icon {
      font-size: 2rem;
      margin-bottom: 0.5rem;
    }

    .stat-number {
      font-size: 2rem;
      font-weight: bold;
      margin-bottom: 0.25rem;
    }

    .stat-label {
      font-size: 0.9rem;
      opacity: 0.9;
    }

    .citas-recientes {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .cita-item {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem;
      background: #f8f9fa;
      border-radius: 8px;
      border-left: 4px solid #4facfe;
    }

    .cita-date {
      font-weight: bold;
      color: #4facfe;
      min-width: 100px;
    }

    .cita-info {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    .cita-info strong {
      color: #2d3436;
    }

    .cita-info span {
      color: #636e72;
      font-size: 0.9rem;
    }

    .cita-status {
      padding: 0.4rem 1rem;
      border-radius: 20px;
      font-size: 0.85rem;
      font-weight: bold;
      text-transform: uppercase;
    }

    .status-pendiente {
      background: #ffeaa7;
      color: #d63031;
    }

    .status-confirmada {
      background: #81ecec;
      color: #00b894;
    }

    .status-completada {
      background: #b2bec3;
      color: #2d3436;
    }

    .emergency-contact {
      background: #fff5f5;
      border: 2px solid #ff6b6b;
      border-radius: 8px;
      padding: 1rem;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
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

    .empty-state {
      text-align: center;
      padding: 3rem;
      color: white;
      font-size: 1.2rem;
      background: rgba(255,255,255,0.2);
      border-radius: 12px;
    }

    .window-footer {
      background: rgba(255, 255, 255, 0.95);
      padding: 1.5rem;
      display: flex;
      justify-content: center;
      gap: 1rem;
      box-shadow: 0 -2px 10px rgba(0,0,0,0.1);
    }

    .window-footer button {
      padding: 1rem 2rem;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-weight: bold;
      font-size: 1rem;
      transition: all 0.3s;
    }

    .btn-edit {
      background: #fdcb6e;
      color: #2d3436;
    }

    .btn-historia {
      background: #6c5ce7;
      color: white;
    }

    .btn-cita {
      background: #00b894;
      color: white;
    }

    .window-footer button:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 10px rgba(0,0,0,0.2);
    }
  `]
})
export class WindowPacienteComponent implements OnInit {
  pacienteId?: number;
  selectedPacienteId: number | string = '';
  paciente: PacienteView | null = null;
  pacientes: PacienteView[] = [];
  ultimasCitas: CitaResumen[] = [];
  totalCitas = 0;
  citasPendientes = 0;
  totalHistorias = 0;
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private pacienteService: PacienteService,
    private citaService: CitaService,
    private historiaService: HistoriaClinicaService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['pacienteId']) {
        this.pacienteId = +params['pacienteId'];
        this.selectedPacienteId = this.pacienteId;
        this.cargarPaciente();
      }
    });

    this.cargarListaPacientes();
  }

  cargarListaPacientes(): void {
    this.pacienteService.getPacientes().subscribe({
      next: (data) => {
        this.pacientes = data.map((p) => this.mapPacienteResponse(p));
      },
      error: (error) => {
        console.error('Error al cargar lista de pacientes:', error);
      }
    });
  }

  cargarPaciente(): void {
    const id = this.selectedPacienteId || this.pacienteId;
    if (!id) return;

    this.loading = true;

    // Cargar información del paciente
    this.pacienteService.getPaciente(+id).subscribe({
      next: (data) => {
        this.paciente = this.mapPacienteResponse(data);
        this.cargarEstadisticas(+id);
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al cargar paciente:', error);
        this.loading = false;
      }
    });
  }

  cargarEstadisticas(pacienteId: number): void {
    // Cargar citas
    this.citaService.getCitasByPaciente(pacienteId).subscribe({
      next: (citas) => {
        const citasView = citas.map((c) => this.mapCitaResumen(c));
        this.totalCitas = citasView.length;
        this.citasPendientes = citasView.filter(c => 
          c.estado === 'PENDIENTE' || c.estado === 'CONFIRMADA'
        ).length;
        this.ultimasCitas = citasView.slice(0, 5);
      },
      error: (error) => {
        console.error('Error al cargar citas:', error);
      }
    });

    // Cargar historias clínicas
    this.historiaService.getPorPaciente(pacienteId).subscribe({
      next: (historias) => {
        this.totalHistorias = historias.length;
      },
      error: (error) => {
        console.error('Error al cargar historias:', error);
      }
    });
  }

  getInitials(nombre: string, apellido: string): string {
    return `${nombre?.charAt(0) || ''}${apellido?.charAt(0) || ''}`.toUpperCase();
  }

  calcularEdad(fechaNacimiento?: string): number {
    if (!fechaNacimiento) return 0;
    const hoy = new Date();
    const nacimiento = new Date(fechaNacimiento);
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mes = hoy.getMonth() - nacimiento.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
      edad--;
    }
    return edad;
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

  editarPaciente(): void {
    if (!this.paciente) return;
    alert(`Editar información del paciente #${this.paciente.id}\n\nSe abrirá el formulario de edición.`);
  }

  verHistoriaCompleta(): void {
    if (!this.paciente) return;
    alert(`Ver historia clínica completa del paciente #${this.paciente.id}\n\nSe puede abrir en otra ventana.`);
  }

  nuevaCita(): void {
    if (!this.paciente) return;
    alert(`Crear nueva cita para ${this.paciente.nombre} ${this.paciente.apellido}\n\nSe abrirá el formulario de citas.`);
  }

  closeWindow(): void {
    window.close();
  }

  private mapPacienteResponse(data: any): PacienteView {
    return {
      id: data.idPaciente ?? data.id ?? 0,
      nombre: data.nombre ?? '',
      apellido: data.apellido ?? '',
      cedula: data.dni ?? data.cedula ?? data.documento ?? 'N/A',
      telefono: data.numeroTelefono ?? data.telefono ?? 'N/A',
      email: data.correoElectronico ?? data.email ?? 'N/A',
      fechaNacimiento: data.fechaNacimiento,
      genero: data.genero ?? 'No especificado',
      grupoSanguineo: data.grupoSanguineo ?? data.grupo ?? 'No registrado',
      direccion: data.direccion ?? '',
      alergias: data.alergias ?? '',
      medicacionActual: data.medicacionActual ?? '',
      enfermedadesCronicas: data.enfermedadesCronicas ?? '',
      fechaRegistro: data.fechaRegistro ?? data.createdAt ?? '',
      activo: data.activo ?? true,
      contactoEmergenciaNombre: data.contactoEmergenciaNombre,
      contactoEmergenciaTelefono: data.contactoEmergenciaTelefono,
      contactoEmergenciaRelacion: data.contactoEmergenciaRelacion,
    };
  }

  private mapCitaResumen(cita: CitaMedica): CitaResumen {
    const fecha = cita.fechaHora ? new Date(cita.fechaHora) : undefined;
    return {
      fechaCita: fecha ? fecha.toISOString().split('T')[0] : '',
      medicoNombre: cita.medico?.nombre ?? 'N/A',
      motivo: cita.motivo ?? 'Sin motivo',
      estado: cita.estado ?? 'PENDIENTE',
    };
  }
}
