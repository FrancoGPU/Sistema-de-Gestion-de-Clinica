# 🪟 Sistema Multiventana - MediCore

## Descripción

Sistema de gestión de ventanas independientes implementado en Angular para el proyecto MediCore. Permite abrir múltiples ventanas del navegador que funcionan de manera independiente, mejorando la productividad y la experiencia del usuario.

## 📋 Funcionalidades Implementadas

### 1. **Ventana de Citas Médicas** 📅
- Visualización de todas las citas médicas
- Filtrado por fecha y estado
- Gestión completa de citas (ver, editar, cancelar)
- Indicadores visuales de estado
- Actualización en tiempo real

**Ruta:** `/window/citas`

### 2. **Ventana de Historia Clínica** 📋
- Consulta de historias clínicas por paciente
- Visualización de registros médicos
- Signos vitales y diagnósticos
- Tratamientos y observaciones
- Exportación a PDF

**Rutas:** 
- `/window/historia-clinica` (selector de paciente)
- `/window/historia-clinica/:pacienteId` (paciente específico)

### 3. **Ventana de Información del Paciente** 👤
- Datos personales completos
- Información médica
- Estadísticas de citas
- Historial médico resumido
- Contacto de emergencia

**Rutas:**
- `/window/paciente` (selector de paciente)
- `/window/paciente/:pacienteId` (paciente específico)

## 🚀 Uso del Sistema

### Servicio WindowService

El servicio `WindowService` proporciona métodos para gestionar las ventanas:

```typescript
import { WindowService } from './services/window.service';

constructor(private windowService: WindowService) {}

// Abrir ventana de citas
abrirCitas() {
  this.windowService.openCitasWindow();
}

// Abrir ventana de historia clínica
abrirHistoria(pacienteId: number) {
  this.windowService.openHistoriaClinicaWindow(pacienteId);
}

// Abrir ventana de paciente
abrirPaciente(pacienteId: number) {
  this.windowService.openPacienteWindow(pacienteId);
}

// Cerrar todas las ventanas
cerrarTodas() {
  this.windowService.closeAllWindows();
}
```

### Componente de Demostración

Accede a `/multiventana-demo` para ver una demostración interactiva del sistema multiventana.

## 📦 Estructura de Archivos

```
src/app/
├── services/
│   └── window.service.ts          # Servicio de gestión de ventanas
├── components/
│   ├── window-citas/
│   │   └── window-citas.component.ts
│   ├── window-historia-clinica/
│   │   └── window-historia-clinica.component.ts
│   ├── window-paciente/
│   │   └── window-paciente.component.ts
│   └── multiventana-demo/
│       └── multiventana-demo.component.ts
└── app.routes.ts                  # Configuración de rutas
```

## ⚙️ Configuración de Ventanas

Cada ventana se puede personalizar con las siguientes opciones:

```typescript
interface WindowConfig {
  width?: number;        // Ancho en píxeles
  height?: number;       // Alto en píxeles
  left?: number;         // Posición horizontal
  top?: number;          // Posición vertical
  menubar?: boolean;     // Mostrar barra de menú
  toolbar?: boolean;     // Mostrar barra de herramientas
  location?: boolean;    // Mostrar barra de direcciones
  status?: boolean;      // Mostrar barra de estado
  resizable?: boolean;   // Permitir redimensionar
  scrollbars?: boolean;  // Mostrar barras de desplazamiento
}
```

## 🎯 Características Principales

### ✨ Gestión Automática
- Control automático de ventanas abiertas
- Cierre automático al cerrar la ventana principal
- Prevención de duplicados
- Monitoreo del estado de las ventanas

### 🔄 Sincronización
- Los cambios en una ventana pueden reflejarse en otras
- Comunicación entre ventanas (si se implementa)
- Estado compartido mediante servicios

### 🎨 Diseño Independiente
- Cada ventana tiene su propio estilo
- Interfaz optimizada para el contenido específico
- Diseño responsivo dentro de cada ventana

### 💾 Persistencia
- El sistema mantiene referencias a las ventanas
- Control del estado de cada ventana
- Prevención de fugas de memoria

## 📱 Ejemplo de Integración

### En un Componente Existente

```typescript
import { Component } from '@angular/core';
import { WindowService } from '../../services/window.service';

@Component({
  selector: 'app-dashboard',
  template: `
    <button (click)="abrirCitas()">
      📅 Abrir Citas en Nueva Ventana
    </button>
    
    <button (click)="abrirHistoria(123)">
      📋 Ver Historia Clínica
    </button>
    
    <button (click)="abrirPaciente(456)">
      👤 Información del Paciente
    </button>
  `
})
export class DashboardComponent {
  constructor(private windowService: WindowService) {}

  abrirCitas() {
    const ventana = this.windowService.openCitasWindow();
    if (!ventana) {
      alert('Por favor, permite las ventanas emergentes');
    }
  }

  abrirHistoria(pacienteId: number) {
    this.windowService.openHistoriaClinicaWindow(pacienteId);
  }

  abrirPaciente(pacienteId: number) {
    this.windowService.openPacienteWindow(pacienteId);
  }
}
```

## 🛡️ Manejo de Errores

El sistema incluye manejo de errores para:
- Bloqueo de ventanas emergentes
- Ventanas cerradas manualmente
- Errores de navegación
- Referencias perdidas

## 🔧 Métodos Disponibles

### WindowService

| Método | Descripción | Parámetros |
|--------|-------------|-----------|
| `openWindow()` | Abre una ventana genérica | route, name, config |
| `openCitasWindow()` | Abre ventana de citas | - |
| `openHistoriaClinicaWindow()` | Abre ventana de historia | pacienteId? |
| `openPacienteWindow()` | Abre ventana de paciente | pacienteId? |
| `closeWindow()` | Cierra una ventana específica | windowName |
| `closeAllWindows()` | Cierra todas las ventanas | - |
| `isWindowOpen()` | Verifica si está abierta | windowName |
| `focusWindow()` | Enfoca una ventana | windowName |
| `getOpenWindowsCount()` | Cuenta ventanas abiertas | - |

## 📊 Cumplimiento de Requisitos

✅ **Mínimo 3 ventanas independientes implementadas:**
1. Ventana de Citas Médicas
2. Ventana de Historia Clínica
3. Ventana de Información del Paciente

✅ **Características adicionales:**
- Gestión centralizada mediante servicio
- Configuración personalizable
- Diseño atractivo y funcional
- Integración completa con el sistema

## 🎓 Casos de Uso

### Caso 1: Médico atendiendo múltiples pacientes
Un médico puede tener abiertas:
- Ventana de citas para ver el horario
- Historia clínica del paciente actual
- Información del siguiente paciente

### Caso 2: Personal administrativo
El personal puede gestionar:
- Ventana de citas para agendamiento
- Información de pacientes para consultas
- Historias clínicas para actualización

### Caso 3: Consulta rápida
Abrir ventanas temporales para:
- Verificar información sin perder el contexto
- Comparar datos entre pacientes
- Trabajar con múltiples registros simultáneamente

## 🚦 Cómo Probar

1. Inicia el servidor de desarrollo:
```bash
cd frontend/Sistema-de-Gestion-de-Clinica
npm start
```

2. Accede a la demostración:
```
http://localhost:4200/multiventana-demo
```

3. Haz clic en los botones para abrir las ventanas

4. Verifica que:
   - Las ventanas se abren correctamente
   - Puedes moverlas y redimensionarlas
   - El contador se actualiza
   - Las ventanas se cierran al cerrar la principal

## 📝 Notas Importantes

- **Permisos de ventanas emergentes:** Los navegadores modernos pueden bloquear ventanas emergentes. El usuario debe permitirlas.
- **Límites del navegador:** Algunos navegadores limitan el número de ventanas que se pueden abrir simultáneamente.
- **Recursos:** Cada ventana consume recursos del navegador. Usa con moderación.
- **Compatibilidad:** Funciona en todos los navegadores modernos (Chrome, Firefox, Edge, Safari).

## 🔮 Futuras Mejoras

- [ ] Comunicación bidireccional entre ventanas
- [ ] Persistencia del estado de ventanas
- [ ] Sincronización automática de datos
- [ ] Posicionamiento inteligente de ventanas
- [ ] Historial de ventanas abiertas
- [ ] Temas personalizables por ventana
- [ ] Modo de presentación para múltiples monitores

## 👥 Autor

Sistema implementado para MediCore - Sistema de Gestión de Clínica

## 📄 Licencia

Este proyecto es parte del sistema MediCore y sigue la misma licencia del proyecto principal.
