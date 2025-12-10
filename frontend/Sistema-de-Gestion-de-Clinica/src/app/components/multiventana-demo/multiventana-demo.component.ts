import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WindowService } from '../../services/window.service';

@Component({
  selector: 'app-multiventana-demo',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="demo-container">
      <div class="header">
        <h1>🪟 Sistema Multiventana</h1>
        <p>Gestión de ventanas independientes para MediCore</p>
      </div>

      <div class="info-section">
        <div class="info-card">
          <div class="info-icon">📊</div>
          <div class="info-content">
            <h3>Ventanas Abiertas</h3>
            <p class="big-number">{{ getOpenWindowsCount() }}</p>
          </div>
        </div>
      </div>

      <div class="buttons-grid">
        <div class="button-card">
          <div class="button-header">
            <span class="icon">📅</span>
            <h3>Citas Médicas</h3>
          </div>
          <p>Gestiona todas las citas médicas en una ventana independiente</p>
          <button 
            (click)="abrirCitas()" 
            class="btn-primary"
            [disabled]="isWindowOpen('CitasMedicasWindow')"
          >
            {{ isWindowOpen('CitasMedicasWindow') ? '✓ Ventana Abierta' : '🚀 Abrir Ventana' }}
          </button>
          <button 
            *ngIf="isWindowOpen('CitasMedicasWindow')"
            (click)="cerrarVentana('CitasMedicasWindow')"
            class="btn-secondary"
          >
            ✕ Cerrar
          </button>
        </div>

        <div class="button-card">
          <div class="button-header">
            <span class="icon">📋</span>
            <h3>Historia Clínica</h3>
          </div>
          <p>Consulta y gestiona historias clínicas de los pacientes</p>
          <button 
            (click)="abrirHistoriaClinica()" 
            class="btn-primary"
            [disabled]="isWindowOpen('HistoriaClinicaWindow')"
          >
            {{ isWindowOpen('HistoriaClinicaWindow') ? '✓ Ventana Abierta' : '🚀 Abrir Ventana' }}
          </button>
          <button 
            *ngIf="isWindowOpen('HistoriaClinicaWindow')"
            (click)="cerrarVentana('HistoriaClinicaWindow')"
            class="btn-secondary"
          >
            ✕ Cerrar
          </button>
        </div>

        <div class="button-card">
          <div class="button-header">
            <span class="icon">👤</span>
            <h3>Información del Paciente</h3>
          </div>
          <p>Visualiza información detallada de pacientes</p>
          <button 
            (click)="abrirPaciente()" 
            class="btn-primary"
            [disabled]="isWindowOpen('PacienteInfoWindow')"
          >
            {{ isWindowOpen('PacienteInfoWindow') ? '✓ Ventana Abierta' : '🚀 Abrir Ventana' }}
          </button>
          <button 
            *ngIf="isWindowOpen('PacienteInfoWindow')"
            (click)="cerrarVentana('PacienteInfoWindow')"
            class="btn-secondary"
          >
            ✕ Cerrar
          </button>
        </div>
      </div>

      <div class="actions-section">
        <button (click)="abrirTodasLasVentanas()" class="btn-action btn-open-all">
          🚀 Abrir Todas las Ventanas
        </button>
        <button (click)="cerrarTodasLasVentanas()" class="btn-action btn-close-all">
          🔒 Cerrar Todas las Ventanas
        </button>
      </div>

      <div class="instructions">
        <h3>📖 Instrucciones de Uso</h3>
        <ul>
          <li>Haz clic en "Abrir Ventana" para abrir una ventana independiente</li>
          <li>Cada ventana puede ser redimensionada y movida libremente</li>
          <li>Las ventanas se cierran automáticamente al cerrar la ventana principal</li>
          <li>Puedes tener múltiples ventanas abiertas simultáneamente</li>
          <li>El contador muestra cuántas ventanas están actualmente abiertas</li>
        </ul>
      </div>

      <div class="features">
        <h3>✨ Características del Sistema Multiventana</h3>
        <div class="features-grid">
          <div class="feature-item">
            <span class="feature-icon">🎯</span>
            <h4>Gestión Independiente</h4>
            <p>Cada ventana opera de forma independiente con su propia interfaz</p>
          </div>
          <div class="feature-item">
            <span class="feature-icon">🔄</span>
            <h4>Sincronización</h4>
            <p>Los cambios se reflejan automáticamente en todas las ventanas</p>
          </div>
          <div class="feature-item">
            <span class="feature-icon">💾</span>
            <h4>Persistencia</h4>
            <p>El sistema mantiene el control de todas las ventanas abiertas</p>
          </div>
          <div class="feature-item">
            <span class="feature-icon">🎨</span>
            <h4>Diseño Responsivo</h4>
            <p>Cada ventana se adapta a diferentes tamaños de pantalla</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .demo-container {
      max-width: 1400px;
      margin: 0 auto;
      padding: 2rem;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
    }

    .header {
      text-align: center;
      color: white;
      margin-bottom: 3rem;
    }

    .header h1 {
      font-size: 3rem;
      margin: 0 0 1rem 0;
      text-shadow: 2px 2px 4px rgba(0,0,0,0.2);
    }

    .header p {
      font-size: 1.3rem;
      opacity: 0.9;
    }

    .info-section {
      display: flex;
      justify-content: center;
      margin-bottom: 2rem;
    }

    .info-card {
      background: white;
      padding: 2rem;
      border-radius: 12px;
      box-shadow: 0 8px 20px rgba(0,0,0,0.2);
      display: flex;
      align-items: center;
      gap: 1.5rem;
      min-width: 300px;
    }

    .info-icon {
      font-size: 3rem;
    }

    .info-content h3 {
      margin: 0 0 0.5rem 0;
      color: #2d3436;
    }

    .big-number {
      font-size: 2.5rem;
      font-weight: bold;
      color: #667eea;
      margin: 0;
    }

    .buttons-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: 2rem;
      margin-bottom: 2rem;
    }

    .button-card {
      background: white;
      padding: 2rem;
      border-radius: 12px;
      box-shadow: 0 8px 20px rgba(0,0,0,0.2);
      transition: all 0.3s;
    }

    .button-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 12px 30px rgba(0,0,0,0.3);
    }

    .button-header {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 1rem;
    }

    .button-header .icon {
      font-size: 2.5rem;
    }

    .button-header h3 {
      margin: 0;
      color: #2d3436;
      font-size: 1.5rem;
    }

    .button-card p {
      color: #636e72;
      margin-bottom: 1.5rem;
      line-height: 1.6;
    }

    .btn-primary, .btn-secondary {
      width: 100%;
      padding: 1rem;
      border: none;
      border-radius: 8px;
      font-weight: bold;
      font-size: 1rem;
      cursor: pointer;
      transition: all 0.3s;
      margin-bottom: 0.5rem;
    }

    .btn-primary {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
    }

    .btn-primary:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 6px 15px rgba(102, 126, 234, 0.4);
    }

    .btn-primary:disabled {
      background: #b2bec3;
      cursor: not-allowed;
    }

    .btn-secondary {
      background: #ff7675;
      color: white;
    }

    .btn-secondary:hover {
      background: #d63031;
    }

    .actions-section {
      display: flex;
      justify-content: center;
      gap: 1rem;
      margin-bottom: 2rem;
    }

    .btn-action {
      padding: 1.2rem 2.5rem;
      border: none;
      border-radius: 12px;
      font-weight: bold;
      font-size: 1.1rem;
      cursor: pointer;
      transition: all 0.3s;
      color: white;
    }

    .btn-open-all {
      background: linear-gradient(135deg, #00b894 0%, #00cec9 100%);
    }

    .btn-close-all {
      background: linear-gradient(135deg, #d63031 0%, #ff7675 100%);
    }

    .btn-action:hover {
      transform: translateY(-3px);
      box-shadow: 0 8px 20px rgba(0,0,0,0.3);
    }

    .instructions {
      background: white;
      padding: 2rem;
      border-radius: 12px;
      box-shadow: 0 8px 20px rgba(0,0,0,0.2);
      margin-bottom: 2rem;
    }

    .instructions h3 {
      margin-top: 0;
      color: #667eea;
      font-size: 1.5rem;
    }

    .instructions ul {
      line-height: 2;
      color: #2d3436;
    }

    .instructions li {
      margin-bottom: 0.5rem;
    }

    .features {
      background: white;
      padding: 2rem;
      border-radius: 12px;
      box-shadow: 0 8px 20px rgba(0,0,0,0.2);
    }

    .features h3 {
      margin-top: 0;
      color: #667eea;
      font-size: 1.5rem;
      margin-bottom: 1.5rem;
    }

    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;
    }

    .feature-item {
      text-align: center;
      padding: 1.5rem;
      background: #f8f9fa;
      border-radius: 8px;
      transition: all 0.3s;
    }

    .feature-item:hover {
      background: #e9ecef;
      transform: translateY(-3px);
    }

    .feature-icon {
      font-size: 2.5rem;
      display: block;
      margin-bottom: 1rem;
    }

    .feature-item h4 {
      margin: 0 0 0.5rem 0;
      color: #2d3436;
    }

    .feature-item p {
      margin: 0;
      color: #636e72;
      font-size: 0.9rem;
      line-height: 1.6;
    }
  `]
})
export class MultiventanaDemoComponent {
  constructor(private windowService: WindowService) {}

  abrirCitas(): void {
    const ventana = this.windowService.openCitasWindow();
    if (!ventana) {
      alert('No se pudo abrir la ventana. Asegúrate de permitir ventanas emergentes.');
    }
  }

  abrirHistoriaClinica(): void {
    const ventana = this.windowService.openHistoriaClinicaWindow();
    if (!ventana) {
      alert('No se pudo abrir la ventana. Asegúrate de permitir ventanas emergentes.');
    }
  }

  abrirPaciente(): void {
    const ventana = this.windowService.openPacienteWindow();
    if (!ventana) {
      alert('No se pudo abrir la ventana. Asegúrate de permitir ventanas emergentes.');
    }
  }

  abrirTodasLasVentanas(): void {
    this.abrirCitas();
    setTimeout(() => this.abrirHistoriaClinica(), 300);
    setTimeout(() => this.abrirPaciente(), 600);
  }

  cerrarTodasLasVentanas(): void {
    this.windowService.closeAllWindows();
  }

  cerrarVentana(nombre: string): void {
    this.windowService.closeWindow(nombre);
  }

  isWindowOpen(nombre: string): boolean {
    return this.windowService.isWindowOpen(nombre);
  }

  getOpenWindowsCount(): number {
    return this.windowService.getOpenWindowsCount();
  }
}
