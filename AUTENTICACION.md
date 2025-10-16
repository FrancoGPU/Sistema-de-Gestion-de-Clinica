# 🔐 Sistema de Autenticación con Roles

## 📋 Descripción General

El sistema implementa autenticación basada en roles que permite distinguir entre **Administradores** y **Pacientes**, redirigiendo a cada usuario a la página correspondiente según su rol.

---

## 👥 Usuarios de Demostración

### 1. **Administrador**
```typescript
Email: administrador@administrador.com
Contraseña: admin123
Redirección: /admin/index
```

**Acceso a:**
- ✅ Panel Administrativo (`/admin/index`)
- ✅ Dashboard de estadísticas (`/admin/dashboard`)
- ✅ Gestión de pacientes (`/pacientes/lista`)
- ✅ Formularios de pacientes (`/pacientes/formulario`)

### 2. **Paciente**
```typescript
Email: paciente@paciente.com
Contraseña: paciente123
Redirección: /MediCore
```

**Acceso a:**
- ✅ Página pública MediCore (`/MediCore`)
- ❌ Panel administrativo (protegido)
- ❌ Gestión de pacientes (protegido)

---

## 🏗️ Arquitectura del Sistema

### 1. **AuthService** (`services/auth.service.ts`)

Servicio principal que gestiona:
- Autenticación de usuarios
- Almacenamiento de sesión (localStorage)
- Validación de roles
- Redirección según rol
- Cierre de sesión

#### Métodos Principales:

```typescript
// Iniciar sesión
login(email: string, password: string): { success: boolean; message?: string; user?: User }

// Cerrar sesión
logout(): void

// Verificar si está autenticado
isAuthenticated(): boolean

// Obtener rol del usuario actual
getUserRole(): 'administrador' | 'paciente' | null

// Obtener nombre del usuario
getUserName(): string

// Verificar si es administrador
isAdmin(): boolean

// Verificar si es paciente
isPaciente(): boolean
```

#### Interfaz User:

```typescript
interface User {
  email: string;
  role: 'administrador' | 'paciente';
  nombre: string;
}
```

---

### 2. **AuthGuard** (`guards/auth.guard.ts`)

Guard funcional que protege las rutas según el rol requerido.

#### Funcionamiento:

1. **Verifica autenticación**: Si no está autenticado → redirecciona a `/login`
2. **Verifica rol**: Si la ruta requiere un rol específico, valida que el usuario tenga ese rol
3. **Redirección inteligente**: Si el usuario tiene un rol diferente, lo redirige a su área correspondiente

```typescript
export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    const requiredRole = route.data['role'];
    
    if (requiredRole) {
      const userRole = authService.getUserRole();
      
      if (userRole === requiredRole) {
        return true; // Acceso permitido
      } else {
        // Redirigir al área correspondiente
        if (userRole === 'administrador') {
          router.navigate(['/admin/index']);
        } else if (userRole === 'paciente') {
          router.navigate(['/MediCore']);
        }
        return false;
      }
    }
    
    return true;
  }

  // No autenticado
  router.navigate(['/login']);
  return false;
};
```

---

### 3. **LoginComponent** (`pages/login/login.component.ts`)

Componente de inicio de sesión con diseño moderno y botones de acceso rápido.

#### Características:

- ✅ Formulario de login con validación
- ✅ Toggle para mostrar/ocultar contraseña
- ✅ Tarjetas de acceso rápido para cuentas demo
- ✅ Mensajes de error amigables
- ✅ Animaciones y efectos visuales
- ✅ Responsive design

#### Propiedades:

```typescript
email: string = '';
password: string = '';
errorMessage: string = '';
isLoading: boolean = false;
showPassword: boolean = false;

demoUsers = [
  {
    email: 'administrador@administrador.com',
    password: 'admin123',
    role: 'Administrador',
    icon: 'fa-user-shield'
  },
  {
    email: 'paciente@paciente.com',
    password: 'paciente123',
    role: 'Paciente',
    icon: 'fa-user'
  }
];
```

#### Métodos:

```typescript
// Procesar login
onSubmit(): void

// Usar cuenta demo
useDemoUser(userIndex: number): void

// Alternar visibilidad de contraseña
togglePasswordVisibility(): void
```

---

### 4. **AdminHeaderComponent** (`shared/components/admin-header/admin-header.component.ts`)

Header para el área administrativa con información del usuario y botón de logout.

#### Características:

- ✅ Logo y nombre del sistema
- ✅ Avatar del usuario
- ✅ Nombre y rol del usuario actual
- ✅ Botón de cerrar sesión con confirmación
- ✅ Sticky header (se mantiene visible al hacer scroll)
- ✅ Diseño responsive

#### Métodos:

```typescript
// Cerrar sesión con confirmación
logout(): void {
  if (confirm('¿Está seguro que desea cerrar sesión?')) {
    this.authService.logout();
  }
}
```

---

## 🛣️ Configuración de Rutas

### Rutas Públicas

```typescript
// Login (acceso sin autenticación)
{
  path: 'login',
  loadComponent: () => import('./pages/login/login.component')
}

// MediCore (página pública para pacientes)
{
  path: 'MediCore',
  loadComponent: () => import('./pages/MediCore/MediCore.component')
}
```

### Rutas Protegidas (Solo Administradores)

```typescript
// Área administrativa
{
  path: 'admin',
  canActivate: [authGuard],
  data: { role: 'administrador' },
  children: [
    {
      path: 'dashboard',
      loadComponent: () => import('./pages/Administrador/dashboard/dashboard.component')
    },
    {
      path: 'index',
      loadComponent: () => import('./pages/Administrador/index/index.component')
    }
  ]
}

// Gestión de pacientes
{
  path: 'pacientes',
  canActivate: [authGuard],
  data: { role: 'administrador' },
  children: [
    {
      path: 'lista',
      loadComponent: () => import('./pages/Pacientes/lista/lista.component')
    },
    {
      path: 'formulario',
      loadComponent: () => import('./pages/Pacientes/formulario/formulario.component')
    },
    {
      path: 'formulario/:id',
      loadComponent: () => import('./pages/Pacientes/formulario/formulario.component')
    }
  ]
}
```

### Redirecciones

```typescript
// Ruta por defecto → Login
{
  path: '',
  redirectTo: 'login',
  pathMatch: 'full'
}

// Rutas no encontradas → Login
{
  path: '**',
  redirectTo: 'login'
}
```

---

## 🔄 Flujo de Autenticación

### 1. Usuario NO Autenticado

```
1. Usuario accede a la aplicación
   ↓
2. Redirección automática a /login
   ↓
3. Usuario ingresa credenciales o usa cuenta demo
   ↓
4. AuthService valida credenciales
   ↓
5. Si es válido:
   - Guarda usuario en localStorage
   - Emite nuevo estado en BehaviorSubject
   - Redirige según rol:
     * Administrador → /admin/index
     * Paciente → /MediCore
   ↓
6. Si es inválido:
   - Muestra mensaje de error
   - Usuario permanece en /login
```

### 2. Usuario Autenticado Intenta Acceder a Ruta Protegida

```
1. Usuario navega a /admin/dashboard
   ↓
2. authGuard se ejecuta automáticamente
   ↓
3. Verifica isAuthenticated()
   ↓
4. Si está autenticado:
   - Verifica role requerido (data: { role: 'administrador' })
   - Compara con getUserRole()
   - Si coincide → Permite acceso ✅
   - Si no coincide → Redirige a su área correspondiente ❌
   ↓
5. Si NO está autenticado:
   - Redirige a /login ❌
```

### 3. Usuario Cierra Sesión

```
1. Usuario hace clic en "Cerrar Sesión"
   ↓
2. Aparece confirmación: "¿Está seguro que desea cerrar sesión?"
   ↓
3. Si confirma:
   - AuthService.logout() se ejecuta
   - Elimina usuario de localStorage
   - Emite null en currentUserSubject
   - Redirige a /login
   ↓
4. Si cancela:
   - Usuario permanece en la página actual
```

---

## 💾 Persistencia de Sesión

### LocalStorage

El sistema usa `localStorage` para mantener la sesión del usuario entre recargas de página.

```typescript
// Al hacer login
localStorage.setItem('currentUser', JSON.stringify(userData));

// Al inicializar la app
const storedUser = localStorage.getItem('currentUser');
this.currentUserSubject = new BehaviorSubject<User | null>(
  storedUser ? JSON.parse(storedUser) : null
);

// Al hacer logout
localStorage.removeItem('currentUser');
```

### BehaviorSubject (RxJS)

Permite observar cambios en el estado de autenticación en tiempo real.

```typescript
// En AuthService
private currentUserSubject: BehaviorSubject<User | null>;
public currentUser: Observable<User | null>;

// En componentes que necesiten observar
this.authService.currentUser.subscribe(user => {
  if (user) {
    console.log('Usuario autenticado:', user.nombre);
  } else {
    console.log('Usuario no autenticado');
  }
});
```

---

## 🧪 Ejemplos de Uso

### Ejemplo 1: Login como Administrador

```
1. Navegar a: http://localhost:4200
   → Redirección automática a /login

2. Hacer clic en la tarjeta "Administrador"
   → Campos se llenan automáticamente:
      Email: administrador@administrador.com
      Contraseña: admin123

3. Hacer clic en "Iniciar Sesión"
   → Validación exitosa
   → Redirección a /admin/index

4. Ver header con:
   - Logo MediCore
   - Avatar de administrador
   - Nombre: "Administrador Sistema"
   - Rol: "Administrador"
   - Botón "Cerrar Sesión"

5. Navegar libremente entre:
   - /admin/index
   - /admin/dashboard
   - /pacientes/lista
   - /pacientes/formulario
```

### Ejemplo 2: Login como Paciente

```
1. Navegar a: http://localhost:4200/login

2. Hacer clic en la tarjeta "Paciente"
   → Campos se llenan automáticamente:
      Email: paciente@paciente.com
      Contraseña: paciente123

3. Hacer clic en "Iniciar Sesión"
   → Validación exitosa
   → Redirección a /MediCore

4. Intentar acceder a /admin/dashboard
   → authGuard detecta rol incorrecto
   → Redirección automática a /MediCore
   (no se permite el acceso)
```

### Ejemplo 3: Intento de Acceso Sin Autenticación

```
1. Usuario NO autenticado intenta acceder a:
   http://localhost:4200/admin/dashboard

2. authGuard se ejecuta:
   → isAuthenticated() === false
   → Redirección automática a /login

3. Usuario debe autenticarse para continuar
```

### Ejemplo 4: Cerrar Sesión

```
1. Usuario autenticado (admin o paciente)

2. Hacer clic en botón "Cerrar Sesión" en el header

3. Aparece confirmación:
   "¿Está seguro que desea cerrar sesión?"

4. Si confirma:
   → localStorage.removeItem('currentUser')
   → currentUserSubject.next(null)
   → Redirección a /login

5. Intentar volver atrás (browser back button):
   → authGuard detecta NO autenticado
   → Redirección nuevamente a /login
```

---

## 🔒 Seguridad

### Validaciones Implementadas

✅ **Validación de Email**: Regex para formato válido
✅ **Campos Requeridos**: Email y contraseña obligatorios
✅ **Protección de Rutas**: authGuard en rutas administrativas
✅ **Verificación de Roles**: Solo admin accede a gestión
✅ **Persistencia Segura**: localStorage con JSON.stringify/parse
✅ **Confirmación de Logout**: Previene cierres accidentales

### ⚠️ Consideraciones para Producción

Este es un sistema de **demostración con usuarios hardcodeados**. Para producción se recomienda:

1. **Backend API**:
   - Endpoint `/api/auth/login` para autenticación
   - JWT (JSON Web Tokens) para sesiones
   - Refresh tokens para renovación automática
   - HTTPS obligatorio

2. **Encriptación**:
   - Contraseñas hasheadas (bcrypt, argon2)
   - Tokens firmados y encriptados
   - No almacenar contraseñas en frontend

3. **Validaciones Adicionales**:
   - Rate limiting (prevenir fuerza bruta)
   - CAPTCHA en login
   - 2FA (autenticación de dos factores)
   - Bloqueo de cuenta tras X intentos fallidos

4. **Expiración de Sesión**:
   - Timeout automático por inactividad
   - Expiración de tokens
   - Re-autenticación para operaciones críticas

5. **Auditoría**:
   - Logs de acceso
   - Registro de intentos fallidos
   - Alertas de seguridad

---

## 🎨 Diseño del Login

### Características Visuales

- ✨ Gradiente violeta moderno (#667eea → #764ba2)
- 🎯 Animaciones suaves (slide-in, pulse, float)
- 📱 Totalmente responsive
- 🎨 Círculos decorativos animados en el fondo
- 💳 Tarjetas de acceso rápido con hover effects
- 👁️ Toggle de visibilidad de contraseña
- ⚡ Estados de loading con spinner
- ❌ Mensajes de error con animación shake
- ✅ Validación visual en inputs

### Paleta de Colores

```css
--primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
--background: #f7fafc;
--text-primary: #2d3748;
--text-secondary: #718096;
--error: #fc8181;
--success: #48bb78;
```

---

## 📝 Tareas Pendientes (Futuras Mejoras)

### Funcionalidades

- [ ] Recuperación de contraseña
- [ ] Registro de nuevos usuarios
- [ ] Perfil de usuario editable
- [ ] Cambio de contraseña
- [ ] Historial de sesiones
- [ ] Notificaciones de nuevo inicio de sesión

### Seguridad

- [ ] Integración con backend API
- [ ] Implementar JWT
- [ ] 2FA (autenticación de dos factores)
- [ ] Prevención de fuerza bruta
- [ ] Expiración automática de sesión

### UX/UI

- [ ] Recordar credenciales (con encriptación)
- [ ] Dark mode
- [ ] Indicador de fortaleza de contraseña
- [ ] Sugerencias de contraseñas seguras

---

## ✅ Estado Actual del Sistema

| Componente | Estado | Descripción |
|-----------|--------|-------------|
| AuthService | ✅ Completo | Login, logout, validaciones |
| AuthGuard | ✅ Completo | Protección de rutas por rol |
| LoginComponent | ✅ Completo | UI moderna con demo users |
| AdminHeaderComponent | ✅ Completo | Header con logout |
| Rutas Protegidas | ✅ Configuradas | Admin y pacientes protegidos |
| Persistencia | ✅ Implementada | LocalStorage + BehaviorSubject |
| Redirección por Rol | ✅ Funcional | Admin → /admin/index, Paciente → /MediCore |

---

## 🚀 Cómo Probar

1. **Iniciar el servidor de desarrollo**:
   ```bash
   ng serve
   ```

2. **Abrir en el navegador**:
   ```
   http://localhost:4200
   ```

3. **Probar login como Administrador**:
   - Hacer clic en tarjeta "Administrador"
   - Click en "Iniciar Sesión"
   - Verificar redirección a `/admin/index`
   - Navegar entre páginas del admin
   - Hacer logout

4. **Probar login como Paciente**:
   - Hacer clic en tarjeta "Paciente"
   - Click en "Iniciar Sesión"
   - Verificar redirección a `/MediCore`
   - Intentar acceder a `/admin/dashboard` (debería redirigir a `/MediCore`)

5. **Probar protección de rutas**:
   - Sin login, intentar acceder a `/admin/dashboard`
   - Verificar redirección a `/login`

---

## 📚 Referencias y Recursos

- [Angular Router Guards](https://angular.io/guide/router#preventing-unauthorized-access)
- [Angular Reactive Forms](https://angular.io/guide/reactive-forms)
- [RxJS BehaviorSubject](https://rxjs.dev/api/index/class/BehaviorSubject)
- [LocalStorage API](https://developer.mozilla.org/es/docs/Web/API/Window/localStorage)
- [JWT Introduction](https://jwt.io/introduction)

---

**¡Sistema de autenticación con roles completamente funcional!** 🎉

**Última actualización**: 16 de octubre de 2025  
**Versión**: 1.0.0  
**Estado**: ✅ Funcional y Listo para Pruebas
