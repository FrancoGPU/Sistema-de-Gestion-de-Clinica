# Pruebas de Casos de Creación de Citas Médicas

## Resumen de Resultados

### ✅ Caso 1: Crear cita exitosamente (201 Created)
**Estado**: EXITOSO  
**HTTP Status**: 201 Created

**Request**:
```bash
POST /api/citas
Authorization: Bearer [JWT_TOKEN]
Content-Type: application/json

{
  "fechaHora": "2025-12-05T10:00:00",
  "paciente": {
    "idPaciente": 6
  },
  "medico": {
    "idMedico": 21
  },
  "motivo": "Consulta general",
  "estado": "PROGRAMADA"
}
```

**Response**:
```json
{
  "idCita": 3,
  "fechaHora": "2025-12-05T10:00:00",
  "paciente": {
    "idPaciente": 6,
    "nombre": "Test",
    "apellido": "Paciente Citas",
    "dni": "99813674",
    "correoElectronico": "test.citas.1764813674@medicore.pe",
    "numeroTelefono": "999888777"
  },
  "medico": {
    "idMedico": 21,
    "nombre": "Juan Carlos",
    "apellido": "García Pérez",
    "especialidad": "Cardiología",
    "horariosAtencion": "Lunes a Viernes: 8:00 AM - 2:00 PM",
    "numeroLicencia": "CMP-12345",
    "telefono": "987654321",
    "email": "juan.garcia@medicore.pe"
  },
  "estado": "PROGRAMADA",
  "motivo": "Consulta general",
  "observaciones": null
}
```

**Validaciones aplicadas**:
- ✓ Token JWT válido requerido
- ✓ Fecha/hora en el futuro (@Future)
- ✓ Paciente válido y existente
- ✓ Médico válido y existente
- ✓ No hay conflicto de horario

---

### ✅ Caso 2: Intentar reservar la misma hora (409 Conflict)
**Estado**: EXITOSO  
**HTTP Status**: 409 Conflict

**Request**:
```bash
POST /api/citas
Authorization: Bearer [JWT_TOKEN]
Content-Type: application/json

{
  "fechaHora": "2025-12-05T10:00:00",  # Misma fecha/hora que Caso 1
  "paciente": {
    "idPaciente": 6
  },
  "medico": {
    "idMedico": 21  # Mismo médico que Caso 1
  },
  "motivo": "Intento de reserva duplicada",
  "estado": "PROGRAMADA"
}
```

**Response**: (vacío)

**Validaciones aplicadas**:
- ✓ Detección de conflicto de horario
- ✓ Constraint único en BD: `@UniqueConstraint(columnNames = {"id_medico", "fecha_hora"})`
- ✓ Servicio `CitaMedicaService` previene doble reserva
- ✓ El sistema rechaza correctamente citas duplicadas para el mismo médico en el mismo horario

**Log del backend**:
```
ReservationConflictException: El médico ya tiene una cita programada en este horario
```

---

### ⚠️ Caso 3: Validación fallida (400 Bad Request)
**Estado**: PARCIALMENTE EXITOSO (validación funciona, pero HTTP status incorrecto)  
**HTTP Status esperado**: 400 Bad Request  
**HTTP Status obtenido**: 401 Unauthorized

**Request**:
```bash
POST /api/citas
Authorization: Bearer [JWT_TOKEN]
Content-Type: application/json

{
  "fechaHora": "2025-12-06T14:00:00",
  "paciente": {
    "idPaciente": 6
  },
  "motivo": "Cita sin médico"
  # Nota: falta el campo "medico" que es @NotNull
}
```

**Response**: (vacío)

**Validaciones aplicadas**:
- ✓ Validación `@NotNull` en campo `medico` funciona correctamente
- ✗ HTTP Status incorrecto (devuelve 401 en lugar de 400)

**Log del backend**:
```
WARN DefaultHandlerExceptionResolver : Resolved [org.springframework.web.bind.MethodArgumentNotValidException: 
Validation failed for argument [0] in public org.springframework.http.ResponseEntity<pe.edu.utp.MediCore.entity.CitaMedica> 
pe.edu.utp.MediCore.controller.CitaMedicaController.crear(pe.edu.utp.MediCore.entity.CitaMedica): 
[Field error in object 'citaMedica' on field 'medico': rejected value [null]; 
codes [NotNull.citaMedica.medico,NotNull.medico,NotNull.pe.edu.utp.MediCore.entity.Medico,NotNull]; 
default message [El médico es obligatorio]]
```

**Nota técnica**: La validación Jakarta Bean Validation funciona correctamente y lanza `MethodArgumentNotValidException`. Sin embargo, el `DefaultHandlerExceptionResolver` de Spring está siendo interceptado por el filtro JWT (`JwtAuthenticationFilter`), lo que causa que el error de validación se transforme en un 401. 

**Solución sugerida**: Implementar un `@ControllerAdvice` con `@ExceptionHandler` para manejar `MethodArgumentNotValidException` y devolver el HTTP 400 correcto con detalles de validación.

---

## Cómo ejecutar las pruebas

### Prerrequisitos
1. Backend corriendo en `http://localhost:8080`
2. Base de datos MySQL con roles inicializados:
   ```sql
   INSERT INTO roles (nombre, descripcion) VALUES 
   ('ADMIN', 'Administrador del sistema'), 
   ('DOCTOR', 'Médico profesional'), 
   ('PACIENTE', 'Paciente del sistema');
   ```
3. Al menos un médico en la base de datos
4. `jq` instalado para parsear JSON

### Ejecutar script de pruebas
```bash
cd /workspaces/Sistema-de-Gestion-de-Clinica/backend/MediCore
./test-citas.sh
```

### Limpiar datos de prueba (opcional)
```bash
# Limpiar citas de prueba
docker exec medicore-db mysql -uroot -pmedicore_root_pass medicore \
  -e "DELETE FROM citas_medicas WHERE fecha_hora >= '2025-12-05 00:00:00';"

# Limpiar pacientes de prueba
docker exec medicore-db mysql -uroot -pmedicore_root_pass medicore \
  -e "DELETE FROM pacientes WHERE dni LIKE '99%';"
```

---

## Pruebas manuales con curl

### Caso 1: Crear cita exitosamente
```bash
# 1. Obtener token
TOKEN=$(curl -s -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"test_citas","password":"Test123!"}' | jq -r '.token')

# 2. Crear cita
curl -X POST http://localhost:8080/api/citas \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "fechaHora": "2025-12-05T10:00:00",
    "paciente": {"idPaciente": 1},
    "medico": {"idMedico": 21},
    "motivo": "Consulta general",
    "estado": "PROGRAMADA"
  }'
```

### Caso 2: Conflicto de horario
```bash
# Intentar crear cita con misma fecha/hora y médico
curl -X POST http://localhost:8080/api/citas \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "fechaHora": "2025-12-05T10:00:00",
    "paciente": {"idPaciente": 1},
    "medico": {"idMedico": 21},
    "motivo": "Intento duplicado"
  }'
```

### Caso 3: Validación fallida
```bash
# Cita sin médico (campo requerido)
curl -X POST http://localhost:8080/api/citas \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "fechaHora": "2025-12-06T14:00:00",
    "paciente": {"idPaciente": 1},
    "motivo": "Cita sin médico"
  }'
```

---

## Conclusiones

- ✅ **Caso 1** funciona perfectamente: La API permite crear citas válidas y devuelve HTTP 201 con todos los datos de la cita creada
- ✅ **Caso 2** funciona perfectamente: La API detecta y previene conflictos de horario, devolviendo HTTP 409
- ⚠️ **Caso 3** funciona parcialmente: Las validaciones Jakarta Bean Validation se ejecutan correctamente, pero el HTTP status es incorrecto (401 en lugar de 400)

**Recomendación**: Implementar un manejador de excepciones global (`@ControllerAdvice`) para mejorar el manejo de errores de validación y asegurar que se devuelvan los HTTP status codes correctos.
