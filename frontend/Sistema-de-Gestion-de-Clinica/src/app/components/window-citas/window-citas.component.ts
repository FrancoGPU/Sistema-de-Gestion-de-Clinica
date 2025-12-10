import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CitaMedica, CitaService } from '../../services/cita.service';

type CitaView = {
  id: number;
  pacienteNombre: string;
  medicoNombre: string;
  fechaISO: string;
  fechaTexto: string;
  horaTexto: string;
  motivo: string;
  estado: string;
};

@Component({
  selector: 'app-window-citas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="window-container">
      <header class="window-header">
        <h1>📅 Gestión de Citas Médicas</h1>
        <button class="close-btn" (click)="closeWindow()">✕</button>
      </header>

      <div class="window-content">
        <div class="filters">
          <input 
            type="date" 
            [(ngModel)]="fechaFiltro"
            (change)="filtrarCitas()"
            class="date-input"
          >
          <select [(ngModel)]="estadoFiltro" (change)="filtrarCitas()" class="select-input">
            <option value="">Todos los estados</option>
            <option value="PENDIENTE">Pendiente</option>
            <option value="CONFIRMADA">Confirmada</option>
            <option value="COMPLETADA">Completada</option>
            <option value="CANCELADA">Cancelada</option>
          </select>
          <button (click)="refrescar()" class="btn-refresh">🔄 Refrescar</button>
        </div>

        <div class="citas-list" *ngIf="!loading">
          <div class="cita-card" *ngFor="let cita of citasFiltradas">
            <div class="cita-header">
              <span class="cita-id">#{{ cita.id }}</span>
              <span class="cita-estado" [class]="'estado-' + cita.estado.toLowerCase()">
                {{ cita.estado }}
              </span>
            </div>
            <div class="cita-body">
              <p><strong>Paciente:</strong> {{ cita.pacienteNombre || 'N/A' }}</p>
              <p><strong>Médico:</strong> {{ cita.medicoNombre || 'N/A' }}</p>
              <p><strong>Fecha:</strong> {{ cita.fechaTexto }}</p>
              <p><strong>Hora:</strong> {{ cita.horaTexto }}</p>
              <p><strong>Motivo:</strong> {{ cita.motivo || 'No especificado' }}</p>
            </div>
            <div class="cita-actions">
              <button (click)="verDetalle(cita)" class="btn-detail">Ver Detalle</button>
              <button (click)="editarCita(cita)" class="btn-edit">Editar</button>
              <button (click)="cancelarCita(cita)" class="btn-cancel" 
                      *ngIf="cita.estado !== 'CANCELADA'">
                Cancelar
              </button>
            </div>
          </div>

          <div *ngIf="citasFiltradas.length === 0" class="no-data">
            <p>No hay citas registradas</p>
          </div>
        </div>

        <div class="loading" *ngIf="loading">
          <div class="spinner"></div>
          <p>Cargando citas...</p>
        </div>
      </div>

      <footer class="window-footer">
        <button (click)="nuevaCita()" class="btn-new">➕ Nueva Cita</button>
        <span class="window-info">Total de citas: {{ citasFiltradas.length }}</span>
      </footer>
    </div>
  `,
  styles: [`
    .window-container {
      height: 100vh;
      display: flex;
      flex-direction: column;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
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
      color: #667eea;
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

    .filters {
      display: flex;
      gap: 1rem;
      margin-bottom: 1.5rem;
      flex-wrap: wrap;
    }

    .date-input, .select-input {
      padding: 0.75rem;
      border: 2px solid rgba(255,255,255,0.3);
      border-radius: 8px;
      background: rgba(255,255,255,0.9);
      font-size: 1rem;
      flex: 1;
      min-width: 150px;
    }

    .btn-refresh {
      padding: 0.75rem 1.5rem;
      background: rgba(255,255,255,0.9);
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-weight: bold;
      transition: all 0.3s;
    }

    .btn-refresh:hover {
      background: white;
      transform: translateY(-2px);
    }

    .citas-list {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: 1.5rem;
    }

    .cita-card {
      background: white;
      border-radius: 12px;
      padding: 1.5rem;
      box-shadow: 0 4px 15px rgba(0,0,0,0.1);
      transition: all 0.3s;
    }

    .cita-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 25px rgba(0,0,0,0.15);
    }

    .cita-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
      padding-bottom: 0.75rem;
      border-bottom: 2px solid #f0f0f0;
    }

    .cita-id {
      font-weight: bold;
      color: #667eea;
      font-size: 1.1rem;
    }

    .cita-estado {
      padding: 0.4rem 1rem;
      border-radius: 20px;
      font-size: 0.85rem;
      font-weight: bold;
      text-transform: uppercase;
    }

    .estado-pendiente {
      background: #ffeaa7;
      color: #d63031;
    }

    .estado-confirmada {
      background: #81ecec;
      color: #00b894;
    }

    .estado-completada {
      background: #b2bec3;
      color: #2d3436;
    }

    .estado-cancelada {
      background: #fab1a0;
      color: #d63031;
    }

    .cita-body p {
      margin: 0.5rem 0;
      color: #2d3436;
    }

    .cita-actions {
      display: flex;
      gap: 0.5rem;
      margin-top: 1rem;
      flex-wrap: wrap;
    }

    .cita-actions button {
      flex: 1;
      padding: 0.6rem;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-weight: bold;
      transition: all 0.3s;
      min-width: 80px;
    }

    .btn-detail {
      background: #667eea;
      color: white;
    }

    .btn-edit {
      background: #fdcb6e;
      color: #2d3436;
    }

    .btn-cancel {
      background: #ff7675;
      color: white;
    }

    .cita-actions button:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 10px rgba(0,0,0,0.2);
    }

    .no-data {
      text-align: center;
      padding: 3rem;
      color: white;
      font-size: 1.2rem;
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

    .btn-new {
      background: #00b894;
      color: white;
      border: none;
      padding: 1rem 2rem;
      border-radius: 8px;
      cursor: pointer;
      font-weight: bold;
      font-size: 1rem;
      transition: all 0.3s;
    }

    .btn-new:hover {
      background: #00a383;
      transform: translateY(-2px);
      box-shadow: 0 4px 10px rgba(0,0,0,0.2);
    }

    .window-info {
      color: #2d3436;
      font-weight: bold;
    }
  `]
})
export class WindowCitasComponent implements OnInit {
  citas: CitaView[] = [];
  citasFiltradas: CitaView[] = [];
  loading = true;
  fechaFiltro = '';
  estadoFiltro = '';

  constructor(private citaService: CitaService) {}

  ngOnInit(): void {
    this.cargarCitas();
  }

  cargarCitas(): void {
    this.loading = true;
    this.citaService.getCitas().subscribe({
      next: (data) => {
        this.citas = data.map((cita) => this.mapCitaToView(cita));
        this.citasFiltradas = this.citas;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al cargar citas:', error);
        this.loading = false;
      }
    });
  }

  filtrarCitas(): void {
    this.citasFiltradas = this.citas.filter((cita) => {
      const coincideFecha = this.fechaFiltro ? cita.fechaISO === this.fechaFiltro : true;
      const coincideEstado = this.estadoFiltro ? cita.estado === this.estadoFiltro : true;
      return coincideFecha && coincideEstado;
    });
  }

  refrescar(): void {
    this.cargarCitas();
  }

  formatDate(date: string): string {
    if (!date) return 'N/A';
    const d = new Date(date);
    return d.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  verDetalle(cita: any): void {
    alert(`Detalle de la cita #${cita.id}\n\nEsta funcionalidad se puede expandir con un modal o navegación.`);
  }

  editarCita(cita: any): void {
    alert(`Editar cita #${cita.id}\n\nEsta funcionalidad abrirá un formulario de edición.`);
  }

  cancelarCita(cita: any): void {
    if (confirm(`¿Está seguro de cancelar la cita #${cita.id}?`)) {
      // Lógica para cancelar la cita
      alert('Cita cancelada correctamente');
    }
  }

  nuevaCita(): void {
    alert('Abrir formulario para crear nueva cita\n\nEsta funcionalidad se puede implementar con un formulario completo.');
  }

  closeWindow(): void {
    window.close();
  }

  private mapCitaToView(cita: CitaMedica): CitaView {
    const fecha = cita.fechaHora ? new Date(cita.fechaHora) : undefined;
    const fechaISO = fecha ? fecha.toISOString().split('T')[0] : '';

    return {
      id: cita.idCita ?? (cita as any).id ?? 0,
      pacienteNombre: cita.paciente
        ? `${cita.paciente.nombre} ${cita.paciente.apellido}`
        : 'N/A',
      medicoNombre: cita.medico?.nombre ?? 'N/A',
      fechaISO,
      fechaTexto: fecha
        ? fecha.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })
        : 'N/A',
      horaTexto: fecha ? fecha.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }) : '',
      motivo: cita.motivo ?? 'No especificado',
      estado: cita.estado ?? 'PENDIENTE',
    };
  }
}
