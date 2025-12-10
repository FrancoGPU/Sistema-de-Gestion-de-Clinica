import { Injectable } from '@angular/core';

export interface WindowConfig {
  width?: number;
  height?: number;
  left?: number;
  top?: number;
  menubar?: boolean;
  toolbar?: boolean;
  location?: boolean;
  status?: boolean;
  resizable?: boolean;
  scrollbars?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class WindowService {
  private openWindows: Map<string, Window> = new Map();
  private readonly baseUrl = window.location.origin;

  constructor() {
    // Limpiar ventanas cerradas al cerrar la ventana principal
    window.addEventListener('beforeunload', () => {
      this.closeAllWindows();
    });
  }

  /**
   * Abre una nueva ventana con la configuración especificada
   */
  openWindow(
    route: string,
    windowName: string,
    config?: WindowConfig
  ): Window | null {
    // Cerrar ventana existente con el mismo nombre si está abierta
    this.closeWindow(windowName);

    const defaultConfig: WindowConfig = {
      width: 1000,
      height: 700,
      left: 100,
      top: 100,
      menubar: false,
      toolbar: false,
      location: false,
      status: true,
      resizable: true,
      scrollbars: true,
      ...config
    };

    const features = this.buildFeatures(defaultConfig);
    const url = `${this.baseUrl}${route}`;

    try {
      const newWindow = window.open(url, windowName, features);
      
      if (newWindow) {
        this.openWindows.set(windowName, newWindow);
        
        // Monitorear si la ventana se cierra manualmente
        const checkClosed = setInterval(() => {
          if (newWindow.closed) {
            clearInterval(checkClosed);
            this.openWindows.delete(windowName);
          }
        }, 1000);

        // Enfocar la nueva ventana
        newWindow.focus();
        
        return newWindow;
      }
    } catch (error) {
      console.error('Error al abrir ventana:', error);
    }

    return null;
  }

  /**
   * Cierra una ventana específica por su nombre
   */
  closeWindow(windowName: string): void {
    const win = this.openWindows.get(windowName);
    if (win && !win.closed) {
      win.close();
    }
    this.openWindows.delete(windowName);
  }

  /**
   * Cierra todas las ventanas abiertas
   */
  closeAllWindows(): void {
    this.openWindows.forEach((win, name) => {
      if (!win.closed) {
        win.close();
      }
    });
    this.openWindows.clear();
  }

  /**
   * Verifica si una ventana específica está abierta
   */
  isWindowOpen(windowName: string): boolean {
    const win = this.openWindows.get(windowName);
    return win !== undefined && !win.closed;
  }

  /**
   * Enfoca una ventana si está abierta
   */
  focusWindow(windowName: string): boolean {
    const win = this.openWindows.get(windowName);
    if (win && !win.closed) {
      win.focus();
      return true;
    }
    return false;
  }

  /**
   * Obtiene el número de ventanas abiertas
   */
  getOpenWindowsCount(): number {
    // Limpiar referencias a ventanas cerradas
    this.openWindows.forEach((win, name) => {
      if (win.closed) {
        this.openWindows.delete(name);
      }
    });
    return this.openWindows.size;
  }

  /**
   * Construye la cadena de características para window.open()
   */
  private buildFeatures(config: WindowConfig): string {
    const features: string[] = [];

    if (config.width) features.push(`width=${config.width}`);
    if (config.height) features.push(`height=${config.height}`);
    if (config.left !== undefined) features.push(`left=${config.left}`);
    if (config.top !== undefined) features.push(`top=${config.top}`);
    
    features.push(`menubar=${config.menubar ? 'yes' : 'no'}`);
    features.push(`toolbar=${config.toolbar ? 'yes' : 'no'}`);
    features.push(`location=${config.location ? 'yes' : 'no'}`);
    features.push(`status=${config.status ? 'yes' : 'no'}`);
    features.push(`resizable=${config.resizable ? 'yes' : 'no'}`);
    features.push(`scrollbars=${config.scrollbars ? 'yes' : 'no'}`);

    return features.join(',');
  }

  /**
   * Abre la ventana de citas médicas
   */
  openCitasWindow(): Window | null {
    return this.openWindow(
      '/window/citas',
      'CitasMedicasWindow',
      {
        width: 1200,
        height: 800,
        resizable: true,
        scrollbars: true
      }
    );
  }

  /**
   * Abre la ventana de historia clínica
   */
  openHistoriaClinicaWindow(pacienteId?: number): Window | null {
    const route = pacienteId 
      ? `/window/historia-clinica/${pacienteId}`
      : '/window/historia-clinica';
    
    return this.openWindow(
      route,
      'HistoriaClinicaWindow',
      {
        width: 1100,
        height: 750,
        resizable: true,
        scrollbars: true
      }
    );
  }

  /**
   * Abre la ventana de información del paciente
   */
  openPacienteWindow(pacienteId?: number): Window | null {
    const route = pacienteId 
      ? `/window/paciente/${pacienteId}`
      : '/window/paciente';
    
    return this.openWindow(
      route,
      'PacienteInfoWindow',
      {
        width: 900,
        height: 700,
        resizable: true,
        scrollbars: true
      }
    );
  }
}
