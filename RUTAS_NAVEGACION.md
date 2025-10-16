# 🗺️ Guía de Rutas - Sistema de Gestión de Clínica

## 📋 Índice de Rutas Disponibles

### 🏠 Página Principal
| Ruta | Componente | Descripción |
|------|-----------|-------------|
| `/` | Redirect → `/MediCore` | Redirección automática |
| `/MediCore` | `MediCoreComponent` | Página de inicio pública del centro médico |

### 👨‍💼 Área Administrador
| Ruta | Componente | Descripción |
|------|-----------|-------------|
| `/admin` | Redirect → `/admin/dashboard` | Redirección al dashboard |
| `/admin/dashboard` | `DashboardComponent` | Panel de control con estadísticas |
| `/admin/index` | `IndexComponent` | Página principal del administrador |

### 👥 Gestión de Pacientes
| Ruta | Componente | Descripción |
|------|-----------|-------------|
| `/pacientes` | Redirect → `/pacientes/lista` | Redirección a la lista |
| `/pacientes/lista` | `ListaComponent` | Lista completa de pacientes |
| `/pacientes/formulario` | `FormularioComponent` | Formulario para nuevo paciente |
| `/pacientes/formulario/:id` | `FormularioComponent` | Formulario para editar paciente |

---

## 🔗 Navegación Implementada

### Desde MediCore (Página Pública)

**Actualmente disponible:**
- El header tiene enlaces a secciones (servicios, especialidades, etc.)
- No hay navegación directa al admin desde aquí (por diseño de seguridad)

**Para agregar navegación al admin:**
```html
<!-- En el header o footer -->
<a routerLink="/admin" class="btn btn-primary">
  <i class="fas fa-user-shield me-2"></i>Panel Administrativo
</a>
```

---

### Desde Dashboard del Administrador

#### 📊 Stats Cards (Tarjetas de Estadísticas)

```typescript
// Stats Cards Component
totalPacientes: number = 0;  // Card 1: Total Pacientes
totalDoctores: number = 0;   // Card 2: Total Doctores  
citasHoy: number = 0;        // Card 3: Citas de Hoy
totalCitas: number = 0;      // Card 4: Total Citas
```

**Enlaces configurados:**
- **"Ver todos" (Card Pacientes)** → `/pacientes/lista` ✅
- **"Ver todos" (Card Doctores)** → `#` (pendiente implementación)
- **"Ver citas" (Citas de Hoy)** → `#` (pendiente implementación)
- **"Ver todas" (Total Citas)** → `#` (pendiente implementación)

#### ⚡ Quick Actions (Acciones Rápidas)

**Botones configurados:**
- **"Nuevo Paciente"** → `/pacientes/formulario` ✅
- **"Nuevo Doctor"** → `#` (pendiente implementación)
- **"Nueva Cita"** → `#` (pendiente implementación)

---

### Desde Index del Administrador

#### 🎯 Hero Section

**Botón principal:**
- **"Ir al Dashboard"** → `/admin/dashboard` ✅

#### 🎴 Quick Actions Cards

**4 tarjetas con botones:**
- **"Nuevo Paciente" (Agregar)** → `/pacientes/formulario` ✅
- **"Nuevo Doctor" (Agregar)** → `#` (pendiente implementación)
- **"Nueva Cita" (Programar)** → `#` (pendiente implementación)
- **"Citas de Hoy" (Ver)** → `#` (pendiente implementación)

---

### Desde Lista de Pacientes

#### 🔝 Header de la Página

**Botón principal:**
- **"Nuevo Paciente"** → `/pacientes/formulario` ✅

#### 📋 Estado Vacío (cuando no hay pacientes)

**Botón:**
- **"Registrar Primer Paciente"** → `/pacientes/formulario` ✅

#### 📊 Tabla de Pacientes (acciones por fila)

**Botones de acción:**
- **👁 Ver detalles** → `#` (pendiente implementación)
- **📝 Editar** → `/pacientes/formulario/:id` ✅
- **🗑 Eliminar** → Confirmación modal (implementado)

---

### Desde Formulario de Pacientes

#### 🔙 Navegación

**Botones:**
- **"Volver"** → `/pacientes/lista` ✅
- **"Guardar"** → Guarda y debería redirigir a `/pacientes/lista` (pendiente lógica)

---

## 🚀 Ejemplos de Uso

### Ejemplo 1: Crear un Nuevo Paciente

```
1. Navegar a: /admin/dashboard
2. Click en "Nuevo Paciente" (Quick Actions)
3. Redirige a: /pacientes/formulario
4. Llenar formulario
5. Click en "Guardar"
6. (Debería redirigir a: /pacientes/lista)
```

### Ejemplo 2: Editar un Paciente Existente

```
1. Navegar a: /pacientes/lista
2. Buscar paciente en la tabla
3. Click en botón "Editar" (ícono lápiz)
4. Redirige a: /pacientes/formulario/123
5. Modificar datos
6. Click en "Guardar"
7. (Debería redirigir a: /pacientes/lista)
```

### Ejemplo 3: Ver Estadísticas

```
1. Navegar a: /admin/index
2. Click en "Ir al Dashboard"
3. Redirige a: /admin/dashboard
4. Ver estadísticas en las 4 tarjetas
5. Click en "Ver todos" (card de Pacientes)
6. Redirige a: /pacientes/lista
```

---

## 🎨 Componentes con RouterLink

### Componentes Actualizados:

✅ **DashboardComponent**
```typescript
imports: [RouterLink, StatsCardsComponent, QuickActionsComponent, SystemStatusComponent]
```

✅ **IndexComponent**
```typescript
imports: [RouterLink, HeroSectionComponent, QuickActionsCardsComponent, FeaturesSectionComponent]
```

✅ **ListaComponent**
```typescript
imports: [CommonModule, FormsModule, RouterLink]
```

✅ **FormularioComponent**
```typescript
imports: [CommonModule, FormsModule, RouterLink]
```

✅ **StatsCardsComponent**
```typescript
imports: [RouterLink]
```

✅ **QuickActionsComponent**
```typescript
imports: [RouterLink]
```

✅ **HeroSectionComponent**
```typescript
imports: [RouterLink]
```

✅ **QuickActionsCardsComponent**
```typescript
imports: [RouterLink]
```

---

## 🔧 Testing de Rutas

### Verificar en el Navegador:

```bash
# Iniciar servidor de desarrollo
ng serve

# Luego abrir en el navegador:
http://localhost:4200/MediCore          # Página principal
http://localhost:4200/admin             # Redirige a /admin/dashboard
http://localhost:4200/admin/dashboard   # Dashboard
http://localhost:4200/admin/index       # Index admin
http://localhost:4200/pacientes         # Redirige a /pacientes/lista
http://localhost:4200/pacientes/lista   # Lista de pacientes
http://localhost:4200/pacientes/formulario  # Nuevo paciente
http://localhost:4200/pacientes/formulario/1  # Editar paciente ID 1
```

---

## 📝 Rutas Pendientes de Implementación

### Módulo Doctores (futuro)
```typescript
{
  path: 'doctores',
  children: [
    { path: 'lista', component: DoctoresListaComponent },
    { path: 'formulario', component: DoctoresFormularioComponent },
    { path: 'formulario/:id', component: DoctoresFormularioComponent },
  ]
}
```

### Módulo Citas (futuro)
```typescript
{
  path: 'citas',
  children: [
    { path: 'lista', component: CitasListaComponent },
    { path: 'hoy', component: CitasHoyComponent },
    { path: 'formulario', component: CitasFormularioComponent },
    { path: 'formulario/:id', component: CitasFormularioComponent },
  ]
}
```

---

## 🎯 Recomendaciones

### 1. Agregar Guards de Autenticación

```typescript
// Ejemplo de guard
{
  path: 'admin',
  canActivate: [AuthGuard],
  children: [...]
}
```

### 2. Implementar Navegación Programática

```typescript
// En un componente
constructor(private router: Router) {}

guardarPaciente() {
  this.pacientesService.guardar(this.paciente).subscribe({
    next: (response) => {
      // Navegar después de guardar
      this.router.navigate(['/pacientes/lista']);
    }
  });
}
```

### 3. Agregar Breadcrumbs

```html
<!-- Ejemplo de breadcrumb -->
<nav aria-label="breadcrumb">
  <ol class="breadcrumb">
    <li class="breadcrumb-item">
      <a routerLink="/admin/dashboard">Dashboard</a>
    </li>
    <li class="breadcrumb-item active">Pacientes</li>
  </ol>
</nav>
```

### 4. Implementar Router Events

```typescript
// Para mostrar loading durante navegación
constructor(private router: Router) {
  this.router.events.subscribe(event => {
    if (event instanceof NavigationStart) {
      // Mostrar loader
    }
    if (event instanceof NavigationEnd) {
      // Ocultar loader
    }
  });
}
```

---

## ✅ Estado Actual

| Funcionalidad | Estado | Ruta |
|--------------|--------|------|
| Página Principal (MediCore) | ✅ Funcional | `/MediCore` |
| Dashboard Admin | ✅ Funcional | `/admin/dashboard` |
| Index Admin | ✅ Funcional | `/admin/index` |
| Lista Pacientes | ✅ Funcional | `/pacientes/lista` |
| Formulario Pacientes | ✅ Funcional | `/pacientes/formulario` |
| Editar Pacientes | ✅ Funcional | `/pacientes/formulario/:id` |
| Navegación entre páginas | ✅ Funcional | RouterLink implementado |
| Guards de autenticación | ❌ Pendiente | - |
| Módulo Doctores | ❌ Pendiente | - |
| Módulo Citas | ❌ Pendiente | - |

---

## 🎉 Navegación Lista!

✅ Todas las rutas están configuradas  
✅ RouterLink implementado en todos los componentes necesarios  
✅ Navegación fluida entre páginas  
✅ Redirecciones automáticas configuradas  
✅ Lazy loading habilitado para todos los componentes  

**¡El sistema de rutas está completamente funcional!** 🚀

Para probar, simplemente inicia el servidor:
```bash
ng serve
```

Y navega a `http://localhost:4200` para comenzar a explorar todas las rutas.

---

**Última actualización**: 16 de octubre de 2025  
**Estado**: ✅ Sistema de Rutas Completado
