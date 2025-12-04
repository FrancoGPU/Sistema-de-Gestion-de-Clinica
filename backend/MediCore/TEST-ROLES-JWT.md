# Pruebas de Autorización JWT por Rol

## Configuración de Seguridad Implementada

### 🔐 Resumen de Permisos por Rol

| Recurso | GET | POST | PUT | DELETE |
|---------|-----|------|-----|--------|
| **Médicos** | 🌐 Público | 👑 ADMIN | 👑 ADMIN | 👑 ADMIN |
| **Pacientes (lista)** | 👑🩺 ADMIN/DOCTOR | 🌐 Público (registro) | 👑🤒 ADMIN/PACIENTE | 👑 ADMIN |
| **Pacientes (individual)** | 👑🩺🤒 Todos autenticados | - | 👑🤒 ADMIN/PACIENTE | 👑 ADMIN |
| **Citas (lista)** | 👑 ADMIN | 🌐 Público / 🔒 Auth | 👑🩺 ADMIN/DOCTOR | 👑 ADMIN |
| **Citas (por paciente)** | 👑🤒 ADMIN/PACIENTE | - | 👑🩺 ADMIN/DOCTOR | 👑 ADMIN |
| **Citas (por médico)** | 👑🩺 ADMIN/DOCTOR | - | 👑🩺 ADMIN/DOCTOR | 👑 ADMIN |
| **Campañas** | 🌐 Público | 👑 ADMIN | 👑 ADMIN | 👑 ADMIN |

**Leyenda:**
- 🌐 Público (sin autenticación)
- 🔒 Autenticado (cualquier rol)
- 👑 ADMIN
- 🩺 DOCTOR
- 🤒 PACIENTE

---

## 📋 Usuarios de Prueba

### Admin
```bash
USERNAME: admin
PASSWORD: admin123
ROLES: ROLE_ADMIN
```

### Doctores (con cuenta de usuario)
```bash
# Doctor 1
USERNAME: jgarcia
PASSWORD: doctor123
ROLES: ROLE_DOCTOR

# Doctor 2
USERNAME: mgomez
PASSWORD: doctor123
ROLES: ROLE_DOCTOR
```

### Pacientes (con cuenta de usuario)
```bash
# Paciente 1
USERNAME: jperez
PASSWORD: paciente123
ROLES: ROLE_PACIENTE

# Paciente 2
USERNAME: mrodriguez
PASSWORD: paciente123
ROLES: ROLE_PACIENTE
```

---

## 🧪 Scripts de Prueba

### 1. Obtener Tokens JWT

```bash
# Token ADMIN
ADMIN_TOKEN=$(curl -s -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}' | jq -r '.token')

# Token DOCTOR
DOCTOR_TOKEN=$(curl -s -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"jgarcia","password":"doctor123"}' | jq -r '.token')

# Token PACIENTE
PACIENTE_TOKEN=$(curl -s -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"jperez","password":"paciente123"}' | jq -r '.token')

echo "ADMIN_TOKEN: $ADMIN_TOKEN"
echo "DOCTOR_TOKEN: $DOCTOR_TOKEN"
echo "PACIENTE_TOKEN: $PACIENTE_TOKEN"
```

---

### 2. Pruebas de Médicos

#### ✅ GET Médicos (Público)
```bash
curl -X GET http://localhost:8080/api/medicos
# Esperado: 200 OK - Lista de médicos
```

#### ✅ POST Médico (Solo ADMIN)
```bash
# Con token ADMIN (debe funcionar)
curl -X POST http://localhost:8080/api/medicos \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Carlos",
    "apellido": "Mendoza",
    "especialidad": "Traumatología",
    "numeroLicencia": "LIC-99999",
    "telefono": "987654321",
    "email": "cmendoza@test.com",
    "horariosAtencion": "Lun-Vie 14:00-18:00"
  }'
# Esperado: 201 CREATED

# Con token DOCTOR (debe fallar)
curl -X POST http://localhost:8080/api/medicos \
  -H "Authorization: Bearer $DOCTOR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Carlos",
    "apellido": "Mendoza",
    "especialidad": "Traumatología",
    "numeroLicencia": "LIC-88888",
    "telefono": "987654321",
    "email": "cmendoza2@test.com",
    "horariosAtencion": "Lun-Vie 14:00-18:00"
  }'
# Esperado: 403 FORBIDDEN
```

#### ✅ DELETE Médico (Solo ADMIN)
```bash
# Con token ADMIN (debe funcionar)
curl -X DELETE http://localhost:8080/api/medicos/11 \
  -H "Authorization: Bearer $ADMIN_TOKEN"
# Esperado: 200 OK

# Con token DOCTOR (debe fallar)
curl -X DELETE http://localhost:8080/api/medicos/1 \
  -H "Authorization: Bearer $DOCTOR_TOKEN"
# Esperado: 403 FORBIDDEN
```

---

### 3. Pruebas de Pacientes

#### ✅ GET Lista de Pacientes (ADMIN y DOCTOR)
```bash
# Con token ADMIN (debe funcionar)
curl -X GET http://localhost:8080/api/pacientes \
  -H "Authorization: Bearer $ADMIN_TOKEN"
# Esperado: 200 OK - Lista completa

# Con token DOCTOR (debe funcionar)
curl -X GET http://localhost:8080/api/pacientes \
  -H "Authorization: Bearer $DOCTOR_TOKEN"
# Esperado: 200 OK - Lista completa

# Con token PACIENTE (debe fallar)
curl -X GET http://localhost:8080/api/pacientes \
  -H "Authorization: Bearer $PACIENTE_TOKEN"
# Esperado: 403 FORBIDDEN
```

#### ✅ GET Paciente por DNI (Público)
```bash
curl -X GET http://localhost:8080/api/pacientes/dni/12345678
# Esperado: 200 OK - Datos del paciente
```

#### ✅ POST Paciente (Público - Registro)
```bash
curl -X POST http://localhost:8080/api/pacientes \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Nuevo",
    "apellido": "Paciente",
    "dni": "99999999",
    "correoElectronico": "nuevo@test.com",
    "numeroTelefono": "999888777"
  }'
# Esperado: 201 CREATED
```

#### ✅ DELETE Paciente (Solo ADMIN)
```bash
# Con token ADMIN (debe funcionar)
curl -X DELETE http://localhost:8080/api/pacientes/9 \
  -H "Authorization: Bearer $ADMIN_TOKEN"
# Esperado: 200 OK

# Con token PACIENTE (debe fallar)
curl -X DELETE http://localhost:8080/api/pacientes/2 \
  -H "Authorization: Bearer $PACIENTE_TOKEN"
# Esperado: 403 FORBIDDEN
```

---

### 4. Pruebas de Citas Médicas

#### ✅ POST Cita (Público - Registro rápido)
```bash
curl -X POST http://localhost:8080/api/citas \
  -H "Content-Type: application/json" \
  -d '{
    "paciente": {"id": 1},
    "medico": {"id": 1},
    "fechaHora": "2025-12-15T10:00:00",
    "motivo": "Consulta general"
  }'
# Esperado: 201 CREATED
```

#### ✅ GET Lista de Citas (Solo ADMIN)
```bash
# Con token ADMIN (debe funcionar)
curl -X GET http://localhost:8080/api/citas \
  -H "Authorization: Bearer $ADMIN_TOKEN"
# Esperado: 200 OK - Todas las citas

# Con token DOCTOR (debe fallar)
curl -X GET http://localhost:8080/api/citas \
  -H "Authorization: Bearer $DOCTOR_TOKEN"
# Esperado: 403 FORBIDDEN

# Con token PACIENTE (debe fallar)
curl -X GET http://localhost:8080/api/citas \
  -H "Authorization: Bearer $PACIENTE_TOKEN"
# Esperado: 403 FORBIDDEN
```

#### ✅ GET Citas por Paciente (ADMIN y PACIENTE)
```bash
# Con token ADMIN (debe funcionar)
curl -X GET http://localhost:8080/api/citas/paciente/1 \
  -H "Authorization: Bearer $ADMIN_TOKEN"
# Esperado: 200 OK

# Con token PACIENTE (debe funcionar para sus propias citas)
curl -X GET http://localhost:8080/api/citas/paciente/1 \
  -H "Authorization: Bearer $PACIENTE_TOKEN"
# Esperado: 200 OK

# Con token DOCTOR (debe fallar)
curl -X GET http://localhost:8080/api/citas/paciente/1 \
  -H "Authorization: Bearer $DOCTOR_TOKEN"
# Esperado: 403 FORBIDDEN
```

#### ✅ GET Citas por Médico (ADMIN y DOCTOR)
```bash
# Con token ADMIN (debe funcionar)
curl -X GET http://localhost:8080/api/citas/medico/1 \
  -H "Authorization: Bearer $ADMIN_TOKEN"
# Esperado: 200 OK

# Con token DOCTOR (debe funcionar para sus propias citas)
curl -X GET http://localhost:8080/api/citas/medico/1 \
  -H "Authorization: Bearer $DOCTOR_TOKEN"
# Esperado: 200 OK

# Con token PACIENTE (debe fallar)
curl -X GET http://localhost:8080/api/citas/medico/1 \
  -H "Authorization: Bearer $PACIENTE_TOKEN"
# Esperado: 403 FORBIDDEN
```

#### ✅ PUT Cita (ADMIN y DOCTOR)
```bash
# Con token ADMIN (debe funcionar)
curl -X PUT http://localhost:8080/api/citas/1 \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "paciente": {"id": 1},
    "medico": {"id": 1},
    "fechaHora": "2025-12-20T11:00:00",
    "motivo": "Control actualizado",
    "estado": "CONFIRMADA"
  }'
# Esperado: 200 OK

# Con token DOCTOR (debe funcionar)
curl -X PUT http://localhost:8080/api/citas/2 \
  -H "Authorization: Bearer $DOCTOR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "paciente": {"id": 2},
    "medico": {"id": 2},
    "fechaHora": "2025-12-21T14:00:00",
    "motivo": "Seguimiento",
    "estado": "COMPLETADA"
  }'
# Esperado: 200 OK

# Con token PACIENTE (debe fallar)
curl -X PUT http://localhost:8080/api/citas/1 \
  -H "Authorization: Bearer $PACIENTE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "paciente": {"id": 1},
    "medico": {"id": 1},
    "fechaHora": "2025-12-22T10:00:00",
    "motivo": "Intento no autorizado",
    "estado": "PENDIENTE"
  }'
# Esperado: 403 FORBIDDEN
```

#### ✅ DELETE Cita (Solo ADMIN)
```bash
# Con token ADMIN (debe funcionar)
curl -X DELETE http://localhost:8080/api/citas/6 \
  -H "Authorization: Bearer $ADMIN_TOKEN"
# Esperado: 200 OK

# Con token DOCTOR (debe fallar)
curl -X DELETE http://localhost:8080/api/citas/2 \
  -H "Authorization: Bearer $DOCTOR_TOKEN"
# Esperado: 403 FORBIDDEN

# Con token PACIENTE (debe fallar)
curl -X DELETE http://localhost:8080/api/citas/3 \
  -H "Authorization: Bearer $PACIENTE_TOKEN"
# Esperado: 403 FORBIDDEN
```

---

### 5. Pruebas de Campañas de Salud

#### ✅ GET Campañas (Público)
```bash
curl -X GET http://localhost:8080/api/campanias
# Esperado: 200 OK - Lista de campañas
```

#### ✅ POST Campaña (Solo ADMIN)
```bash
# Con token ADMIN (debe funcionar)
curl -X POST http://localhost:8080/api/campanias \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Campaña Test",
    "descripcion": "Prueba de autorización",
    "fechaInicio": "2025-12-10",
    "fechaFin": "2025-12-20",
    "estado": "ACTIVA"
  }'
# Esperado: 201 CREATED

# Con token DOCTOR (debe fallar)
curl -X POST http://localhost:8080/api/campanias \
  -H "Authorization: Bearer $DOCTOR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Campaña No Autorizada",
    "descripcion": "Intento de doctor",
    "fechaInicio": "2025-12-10",
    "fechaFin": "2025-12-20",
    "estado": "ACTIVA"
  }'
# Esperado: 403 FORBIDDEN
```

#### ✅ DELETE Campaña (Solo ADMIN)
```bash
# Con token ADMIN (debe funcionar)
curl -X DELETE http://localhost:8080/api/campanias/4 \
  -H "Authorization: Bearer $ADMIN_TOKEN"
# Esperado: 200 OK

# Con token DOCTOR (debe fallar)
curl -X DELETE http://localhost:8080/api/campanias/1 \
  -H "Authorization: Bearer $DOCTOR_TOKEN"
# Esperado: 403 FORBIDDEN
```

---

## 📊 Resumen de Reglas de Negocio

### 👑 ADMIN (Acceso Total)
- ✅ Gestión completa de médicos (CRUD)
- ✅ Gestión completa de pacientes (CRUD)
- ✅ Gestión completa de citas (CRUD)
- ✅ Gestión completa de campañas (CRUD)
- ✅ Puede ver todas las listas y registros

### 🩺 DOCTOR (Gestión de Consultas)
- ❌ No puede crear/editar/eliminar médicos
- ✅ Puede ver lista de pacientes
- ✅ Puede ver información individual de pacientes
- ❌ No puede eliminar pacientes
- ✅ Puede ver sus propias citas
- ✅ Puede actualizar estado de citas
- ❌ No puede eliminar citas
- ❌ No puede gestionar campañas

### 🤒 PACIENTE (Autogestión)
- ❌ No puede ver lista completa de pacientes
- ✅ Puede ver su propia información
- ✅ Puede actualizar su propia información
- ❌ No puede eliminar su cuenta (solo ADMIN)
- ✅ Puede ver sus propias citas
- ❌ No puede actualizar ni eliminar citas
- ❌ No puede gestionar campañas

### 🌐 PÚBLICO (Sin Autenticación)
- ✅ Puede ver lista de médicos
- ✅ Puede buscar paciente por DNI
- ✅ Puede registrarse como nuevo paciente
- ✅ Puede agendar citas (registro rápido)
- ✅ Puede ver campañas de salud

---

## 🔍 Verificación Rápida

Ejecuta este script para verificar todos los permisos:

```bash
#!/bin/bash

echo "=== OBTENIENDO TOKENS ==="
ADMIN_TOKEN=$(curl -s -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}' | jq -r '.token')
  
DOCTOR_TOKEN=$(curl -s -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"jgarcia","password":"doctor123"}' | jq -r '.token')
  
PACIENTE_TOKEN=$(curl -s -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"jperez","password":"paciente123"}' | jq -r '.token')

echo "Tokens obtenidos ✓"
echo ""

echo "=== TEST 1: DOCTOR intenta eliminar médico (debe fallar) ==="
curl -s -X DELETE http://localhost:8080/api/medicos/1 \
  -H "Authorization: Bearer $DOCTOR_TOKEN" -w "\nStatus: %{http_code}\n"

echo ""
echo "=== TEST 2: ADMIN elimina médico (debe funcionar) ==="
curl -s -X DELETE http://localhost:8080/api/medicos/11 \
  -H "Authorization: Bearer $ADMIN_TOKEN" -w "\nStatus: %{http_code}\n"

echo ""
echo "=== TEST 3: PACIENTE intenta ver lista de pacientes (debe fallar) ==="
curl -s -X GET http://localhost:8080/api/pacientes \
  -H "Authorization: Bearer $PACIENTE_TOKEN" -w "\nStatus: %{http_code}\n"

echo ""
echo "=== TEST 4: DOCTOR ve lista de pacientes (debe funcionar) ==="
curl -s -X GET http://localhost:8080/api/pacientes \
  -H "Authorization: Bearer $DOCTOR_TOKEN" | jq 'length'

echo ""
echo "=== TEST 5: PACIENTE intenta eliminar otro paciente (debe fallar) ==="
curl -s -X DELETE http://localhost:8080/api/pacientes/2 \
  -H "Authorization: Bearer $PACIENTE_TOKEN" -w "\nStatus: %{http_code}\n"

echo ""
echo "=== TEST 6: ADMIN elimina paciente (debe funcionar) ==="
curl -s -X DELETE http://localhost:8080/api/pacientes/9 \
  -H "Authorization: Bearer $ADMIN_TOKEN" -w "\nStatus: %{http_code}\n"

echo ""
echo "=== PRUEBAS COMPLETADAS ==="
```

Guarda este script como `test-roles.sh` y ejecútalo:
```bash
chmod +x test-roles.sh
./test-roles.sh
```
