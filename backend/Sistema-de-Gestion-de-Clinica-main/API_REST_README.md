# API REST - Sistema de Gestión de Clínica

## Arquitectura MVC con Spring Boot

Este proyecto implementa un **patrón MVC (Model-View-Controller)** usando Spring Boot para crear una API REST que sirve datos a un frontend Angular.

### Estructura del Proyecto

```
src/main/java/com/clinica/sistema/
├── controller/          # Controladores REST (C en MVC)
│   ├── DoctorRestController.java
│   └── CitaRestController.java
├── entity/             # Entidades/Models (M en MVC)
│   ├── Doctor.java
│   ├── Cita.java
│   └── Paciente.java
├── repository/         # Repositorios (acceso a datos)
│   ├── DoctorRepository.java
│   └── CitaRepository.java
└── service/            # Servicios (lógica de negocio)
    └── DataLoader.java
```

### Base de Datos

- **Desarrollo**: H2 (en memoria)
- **Datos iniciales**: Se cargan desde `database/db.json`
- **Consola H2**: http://localhost:8080/h2-console

### Endpoints de la API

#### Doctores

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/doctores` | Obtener todos los doctores |
| GET | `/api/doctores/{id}` | Obtener doctor por ID |
| GET | `/api/doctores/especialidad/{especialidad}` | Filtrar por especialidad |
| GET | `/api/doctores/search?q={termino}` | Buscar doctores |
| GET | `/api/doctores/especialidades` | Lista de especialidades |
| GET | `/api/doctores/count` | Total de doctores |
| POST | `/api/doctores` | Crear nuevo doctor |
| PUT | `/api/doctores/{id}` | Actualizar doctor |
| DELETE | `/api/doctores/{id}` | Eliminar doctor |

#### Citas

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/citas` | Obtener todas las citas |
| GET | `/api/citas/{id}` | Obtener cita por ID |
| GET | `/api/citas/hoy` | Citas del día actual |
| GET | `/api/citas/doctor/{doctorId}` | Citas por doctor |
| GET | `/api/citas/doctor/{doctorId}/hoy` | Citas de hoy por doctor |
| GET | `/api/citas/rango?inicio=...&fin=...` | Citas en rango de fechas |
| GET | `/api/citas/estado/{estado}` | Filtrar por estado |
| GET | `/api/citas/count` | Total de citas |
| GET | `/api/citas/count/estado/{estado}` | Total por estado |
| POST | `/api/citas` | Crear nueva cita |
| PUT | `/api/citas/{id}` | Actualizar cita |
| PATCH | `/api/citas/{id}/estado?estado={ESTADO}` | Actualizar solo estado |
| DELETE | `/api/citas/{id}` | Eliminar cita |

### Estados de Cita

- `PROGRAMADA`
- `CONFIRMADA`
- `EN_CURSO`
- `COMPLETADA`
- `CANCELADA`
- `NO_ASISTIO`

### Cómo ejecutar

1. **Instalar dependencias**:
   ```bash
   mvn clean install
   ```

2. **Ejecutar la aplicación**:
   ```bash
   mvn spring-boot:run
   ```

3. **Acceder a la API**:
   - API: http://localhost:8080/api
   - H2 Console: http://localhost:8080/h2-console
     - JDBC URL: `jdbc:h2:mem:clinica`
     - User: `sa`
     - Password: (vacío)

### Integración con Angular

El backend está configurado con CORS para permitir peticiones desde Angular (http://localhost:4200).

**Ejemplo de consumo desde Angular**:

```typescript
// doctor.service.ts
@Injectable()
export class DoctorService {
  private apiUrl = 'http://localhost:8080/api/doctores';

  constructor(private http: HttpClient) {}

  getAllDoctores(): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(this.apiUrl);
  }

  getDoctorById(id: number): Observable<Doctor> {
    return this.http.get<Doctor>(`${this.apiUrl}/${id}`);
  }
}
```

### Ejemplo de Peticiones

**Obtener todos los doctores**:
```bash
curl http://localhost:8080/api/doctores
```

**Buscar doctores**:
```bash
curl http://localhost:8080/api/doctores/search?q=cardio
```

**Crear un doctor**:
```bash
curl -X POST http://localhost:8080/api/doctores \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Pedro",
    "apellido": "Castillo",
    "especializacion": "Dermatología",
    "email": "pedro.castillo@medicore.com",
    "telefono": "+51 987 654 327",
    "numeroLicencia": "CMP-12347"
  }'
```

**Obtener citas del día**:
```bash
curl http://localhost:8080/api/citas/hoy
```

**Actualizar estado de cita**:
```bash
curl -X PATCH "http://localhost:8080/api/citas/1/estado?estado=CONFIRMADA"
```

### Tecnologías Utilizadas

- **Spring Boot 3.1.5**
- **Spring Data JPA** - Persistencia
- **H2 Database** - Base de datos en memoria
- **Hibernate** - ORM
- **Jakarta Validation** - Validación
- **Jackson** - JSON
- **Lombok** - Reducción de boilerplate
- **Maven** - Gestión de dependencias

### Próximos Pasos

1. Implementar autenticación con JWT
2. Agregar paginación a los endpoints
3. Implementar DTOs para separar entidades de respuestas
4. Agregar pruebas unitarias
5. Documentación con Swagger/OpenAPI
