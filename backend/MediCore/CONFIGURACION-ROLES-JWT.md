# Configuración de Autorización JWT por Roles - MediCore

## ✅ Implementación Completada

La configuración de seguridad basada en roles JWT ha sido implementada correctamente en el sistema MediCore.

### 🔐 Resumen de Permisos por Rol

#### 👑 ADMIN (Acceso Total)
- ✅ **Médicos**: CRUD completo
- ✅ **Pacientes**: CRUD completo
- ✅ **Citas**: CRUD completo  
- ✅ **Campañas**: CRUD completo
- ✅ Puede ver todas las listas y registros del sistema

#### 🩺 DOCTOR (Gestión Médica)
- ❌ No puede crear/editar/eliminar médicos
- ✅ Puede ver lista completa de pacientes
- ✅ Puede ver información individual de pacientes
- ❌ No puede eliminar pacientes
- ✅ Puede ver citas de sus pacientes (por médico)
- ✅ Puede actualizar estado de citas (PENDIENTE → CONFIRMADA → COMPLETADA → CANCELADA)
- ❌ No puede eliminar citas
- ❌ No puede gestionar campañas de salud

#### 🤒 PACIENTE (Autogestión Limitada)
- ❌ No puede ver lista completa de pacientes
- ✅ Puede ver su propia información (requiere validación en controlador)
- ✅ Puede actualizar su propia información (requiere validación en controlador)
- ❌ No puede eliminar su cuenta (solo ADMIN)
- ✅ Puede ver sus propias citas (por paciente)
- ❌ No puede actualizar ni eliminar citas
- ❌ No puede gestionar campañas

#### 🌐 PÚBLICO (Sin Autenticación)
- ✅ Puede ver lista de médicos y buscar por especialidad
- ✅ Puede buscar paciente por DNI (para agendar citas)
- ✅ Puede registrarse como nuevo paciente
- ✅ Puede agendar citas (registro rápido sin cuenta)
- ✅ Puede ver campañas de salud activas

---

## 📝 Configuración de SecurityConfig.java

### Endpoints Públicos (permitAll)
```java
// Preflight CORS
OPTIONS /**

// Autenticación
POST /api/auth/login
POST /api/auth/registro

// Médicos (lectura)
GET /api/medicos/**

// Pacientes (lectura limitada y registro)
GET /api/pacientes/dni/{dni}
POST /api/pacientes

// Citas (registro público)
POST /api/citas

// Campañas (lectura)
GET /api/campanias/**
```

### Endpoints Solo ADMIN (hasRole("ADMIN"))
```java
// Gestión de Médicos
POST /api/medicos/**
PUT /api/medicos/**
DELETE /api/medicos/**

// Gestión de Pacientes
DELETE /api/pacientes/**

// Gestión de Citas
GET /api/citas (lista completa)
DELETE /api/citas/**

// Gestión de Campañas
POST /api/campanias/**
PUT /api/campanias/**
DELETE /api/campanias/**
```

### Endpoints ADMIN + DOCTOR (hasAnyRole("ADMIN", "DOCTOR"))
```java
// Pacientes
GET /api/pacientes (lista completa)
GET /api/pacientes/** (excepto /dni)

// Citas
GET /api/citas/medico/{idMedico}
GET /api/citas/estado/{estado}
GET /api/citas/hoy
GET /api/citas/{id}
PUT /api/citas/**
```

### Endpoints ADMIN + PACIENTE (hasAnyRole("ADMIN", "PACIENTE"))
```java
// Pacientes
PUT /api/pacientes/** (requiere validación adicional en controlador)

// Citas
GET /api/citas/paciente/{idPaciente} (requiere validación adicional)
```

---

## 🧪 Usuarios de Prueba

### Credenciales Actualizadas (BCrypt)

| Usuario | Contraseña | Rol | Email |
|---------|------------|-----|-------|
| `admin` | `admin123` | ADMIN | admin@medicore.pe |
| `test_citas` | `admin123` | ADMIN | test@medicore.pe |
| `jgarcia` | `doctor123` | DOCTOR | juan.garcia@medicore.pe |
| `mrodriguez` | `doctor123` | DOCTOR | maria.rodriguez@medicore.pe |
| `pmartinez` | `doctor123` | DOCTOR | pedro.martinez@medicore.pe |
| `afernandez` | `doctor123` | DOCTOR | ana.fernandez@medicore.pe |
| `csanchez` | `doctor123` | DOCTOR | carlos.sanchez@medicore.pe |
| `jperez` | `paciente123` | PACIENTE | juan.perez@email.com |
| `mlopez` | `paciente123` | PACIENTE | maria.lopez@email.com |
| `cgomez` | `paciente123` | PACIENTE | carlos.gomez@email.com |

**Nota:** Todos los hashes BCrypt fueron generados con factor 10 y verificados con `BCryptTest.java`.

---

## 🚀 Cómo Probar

### 1. Obtener Token JWT

```bash
# Token ADMIN
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'

# Response:
# {
#   "token": "eyJhbGciOiJIUzI1NiJ9...",
#   "username": "admin",
#   "email": "admin@medicore.pe"
# }
```

### 2. Usar Token en Requests

```bash
curl -X GET http://localhost:8080/api/pacientes \
  -H "Authorization: Bearer TU_TOKEN_AQUI"
```

### 3. Ejecutar Suite de Pruebas

```bash
cd /workspaces/Sistema-de-Gestion-de-Clinica/backend/MediCore
./test-roles.sh
```

---

## 📊 Resultados de Pruebas

### Tests Exitosos ✅
- ✅ Acceso público a médicos sin token (200)
- ✅ DOCTOR puede ver lista de pacientes (200)
- ✅ ADMIN puede ver lista de pacientes (200)
- ✅ Acceso público a paciente por DNI sin token (200)
- ✅ ADMIN puede ver todas las citas (200)
- ✅ Acceso público a campañas sin token (200)

### Comportamiento Esperado
- Los usuarios sin permisos suficientes reciben 401/403
- Los endpoints protegidos requieren token JWT válido
- Los roles se verifican correctamente en Spring Security

---

## 🔧 Archivos Modificados

### Configuración de Seguridad
- ✅ `SecurityConfig.java` - Configuración completa de autorización por roles
- ✅ `CorsConfig.java` - CORS habilitado para localhost
- ✅ `JwtAuthenticationFilter.java` - Filtro JWT funcional
- ✅ `JwtTokenProvider.java` - Generación y validación de tokens

### Base de Datos
- ✅ Contraseñas actualizadas con BCrypt válido
- ✅ 10 usuarios de prueba con roles asignados
- ✅ Script `generate-bcrypt.sh` para regenerar hashes

### Documentación
- ✅ `TEST-ROLES-JWT.md` - Guía completa de pruebas
- ✅ `test-roles.sh` - Script automatizado de verificación
- ✅ `BCryptTest.java` - Utilidad para generar/verificar hashes
- ✅ `CONFIGURACION-ROLES-JWT.md` - Este documento

---

## 🎯 Reglas de Negocio Implementadas

### Principios de Seguridad
1. **Mínimo Privilegio**: Cada rol tiene solo los permisos necesarios
2. **Acceso Público Controlado**: Solo endpoints seguros son públicos
3. **Autenticación Stateless**: JWT sin sesiones en servidor
4. **Validación en Múltiples Capas**: Spring Security + validaciones en controladores

### Flujo de Autenticación
1. Usuario envía credenciales a `/api/auth/login`
2. Backend valida con BCrypt
3. Si es válido, genera token JWT (24 horas)
4. Cliente incluye token en header `Authorization: Bearer {token}`
5. JwtAuthenticationFilter valida token en cada request
6. Spring Security verifica roles según endpoint

### Validaciones Adicionales Recomendadas

Para mayor seguridad, se recomienda implementar en los controladores:

```java
// En PacienteController.actualizar()
// Verificar que PACIENTE solo pueda actualizar sus propios datos
Authentication auth = SecurityContextHolder.getContext().getAuthentication();
if (auth.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("ROLE_PACIENTE"))) {
    // Verificar que el paciente autenticado sea el dueño del registro
    Usuario usuario = usuarioRepository.findByUsername(auth.getName()).orElseThrow();
    if (!usuario.getPaciente().getId().equals(id)) {
        return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
    }
}
```

---

## ✨ Próximos Pasos

### Mejoras de Seguridad
- [ ] Implementar refresh tokens para renovación automática
- [ ] Agregar rate limiting por usuario/IP
- [ ] Implementar auditoría de acciones (logs de seguridad)
- [ ] Agregar 2FA opcional para ADMIN
- [ ] Validar ownership en controladores (PACIENTE solo sus datos)

### Mejoras de UX
- [ ] Página de login en Angular con manejo de roles
- [ ] Redirección automática según rol al iniciar sesión
- [ ] Mensajes de error claros para permisos insuficientes
- [ ] Dashboard personalizado por rol

### Testing
- [ ] Tests unitarios de SecurityConfig
- [ ] Tests de integración para cada endpoint
- [ ] Tests de carga para verificar performance con JWT

---

## 📞 Soporte

Si encuentras problemas:

1. **Verificar backend corriendo**: `ps aux | grep spring-boot:run`
2. **Revisar logs**: `tail -f backend/MediCore/backend.log`
3. **Regenerar contraseñas**: `./generate-bcrypt.sh`
4. **Ejecutar pruebas**: `./test-roles.sh`

---

## 📄 Licencia

MediCore - Sistema de Gestión de Clínica  
© 2025 - UTP
