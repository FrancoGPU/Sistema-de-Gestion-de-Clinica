# Configuración de Spring Security con JWT - MediCore

## ✅ Resumen de Implementación

El proyecto **MediCore** está completamente configurado para usar **Spring Security** con autenticación **JWT (JSON Web Tokens)** y **MySQL** como base de datos.

---

## 📋 Componentes Implementados

### 1. **Dependencias (pom.xml)**
- ✅ `spring-boot-starter-security` - Framework de seguridad
- ✅ `spring-boot-starter-data-jpa` - Persistencia con JPA/Hibernate
- ✅ `mysql-connector-j` - Driver MySQL
- ✅ `jjwt-api`, `jjwt-impl`, `jjwt-jackson` (v0.12.3) - Biblioteca JWT
- ✅ `spring-boot-starter-validation` - Validación de datos
- ✅ `lombok` - Reducir boilerplate code

### 2. **Configuración de Base de Datos (application.properties)**
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/medicore
spring.datasource.username=root
spring.datasource.password=medicore_root_pass
spring.jpa.hibernate.ddl-auto=update
spring.jpa.database-platform=org.hibernate.dialect.MySQLDialect
```

### 3. **Entidades de Seguridad**

#### Usuario (`entity/Usuario.java`)
```java
@Entity
@Table(name = "usuarios")
public class Usuario {
    private Long idUsuario;
    private String username;      // Único
    private String password;      // BCrypt hash
    private String email;         // Único
    private Boolean activo;
    private String nombre;
    private String apellido;
    
    @ManyToMany(fetch = FetchType.EAGER)
    private Set<Rol> roles;
}
```

#### Rol (`entity/Rol.java`)
```java
@Entity
@Table(name = "roles")
public class Rol {
    private Long idRol;
    private String nombre;        // ADMIN, DOCTOR, PACIENTE
    private String descripcion;
}
```

#### Relaciones
- **Paciente** ↔ Usuario (OneToOne)
- **Medico** ↔ Usuario (OneToOne)
- **Usuario** ↔ Rol (ManyToMany a través de `usuario_roles`)

### 4. **Configuración de Seguridad (`config/SecurityConfig.java`)**

#### Beans Principales:
- ✅ **PasswordEncoder**: BCrypt para encriptar contraseñas
- ✅ **UserDetailsService**: Carga usuarios desde la base de datos
- ✅ **AuthenticationManager**: Gestiona la autenticación
- ✅ **JwtAuthenticationFilter**: Filtro que valida tokens JWT
- ✅ **SecurityFilterChain**: Define reglas de autorización

#### Reglas de Autorización:
```java
// Endpoints públicos (sin autenticación)
/api/auth/**                          → Permitido para todos
GET /api/medicos/**                   → Permitido para todos (consulta pública)
POST /api/pacientes                   → Permitido (registro)
GET /api/campanias/**                 → Permitido

// Endpoints protegidos por rol
POST/PUT/DELETE /api/medicos/**       → Solo ADMIN
/api/pacientes/**                     → Autenticado
/api/citas/**                         → Autenticado (+ @PreAuthorize en controlador)

// Cualquier otro endpoint
/**                                   → Autenticado
```

### 5. **JWT (JSON Web Tokens)**

#### JwtTokenProvider (`security/JwtTokenProvider.java`)
- **Genera tokens** JWT firmados con HS256
- **Valida tokens** y extrae información del usuario
- **Tiempo de expiración**: 24 horas (86400000 ms)
- **Secreto**: Configurable en `application.properties`

```properties
app.jwtSecret=404E635266556A586E3272357538782F413F4428472B4B6250645367566B5970
app.jwtExpirationMs=86400000
```

#### JwtAuthenticationFilter (`security/JwtAuthenticationFilter.java`)
- Intercepta **todas las peticiones HTTP**
- Extrae el token del header `Authorization: Bearer <token>`
- Valida el token y establece la autenticación en `SecurityContext`

#### JwtAuthenticationEntryPoint (`security/JwtAuthenticationEntryPoint.java`)
- Maneja errores de autenticación
- Devuelve **HTTP 401 Unauthorized** cuando falla la autenticación

### 6. **Controladores**

#### AuthController (`controller/AuthController.java`)
Endpoints de autenticación:

**POST /api/auth/registro**
```json
{
  "username": "nuevo_usuario",
  "password": "contraseña123",
  "email": "usuario@email.com",
  "nombre": "Nombre",
  "apellido": "Apellido",
  "roles": ["PACIENTE"]
}
```

**POST /api/auth/login**
```json
{
  "username": "admin",
  "password": "admin123"
}
```

Respuesta:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "tipo": "Bearer",
  "username": "admin",
  "email": "admin@medicore.pe"
}
```

**GET /api/auth/me** (requiere token)
- Devuelve información del usuario autenticado

#### CitaMedicaController (`controller/CitaMedicaController.java`)
Protegido con `@PreAuthorize`:

```java
@PreAuthorize("hasAnyRole('ADMIN')")
GET /api/citas                         // Todas las citas (solo ADMIN)

@PreAuthorize("hasAnyRole('PACIENTE', 'DOCTOR', 'ADMIN')")
GET /api/citas/{id}                    // Una cita (con validación de propiedad)

@PreAuthorize("hasAnyRole('PACIENTE', 'DOCTOR', 'ADMIN')")
POST /api/citas                        // Crear cita

@PreAuthorize("hasAnyRole('DOCTOR', 'ADMIN')")
GET /api/citas/medico/{idMedico}      // Citas de un médico
```

### 7. **DTOs (Data Transfer Objects)**

#### LoginDTO
```java
{
  "username": "string",
  "password": "string"
}
```

#### RegistroDTO
```java
{
  "username": "string",
  "password": "string",
  "email": "string",
  "nombre": "string",
  "apellido": "string",
  "roles": ["ADMIN", "DOCTOR", "PACIENTE"]
}
```

#### AuthResponseDTO
```java
{
  "token": "string",
  "tipo": "Bearer",
  "username": "string",
  "email": "string"
}
```

---

## 🔐 Usuarios de Prueba

### Administrador
```
Usuario: admin
Contraseña: admin123
Email: admin@medicore.pe
Rol: ADMIN
```

### Doctores
```
Usuario: jgarcia | Contraseña: doctor123 | Email: juan.garcia@medicore.pe
Usuario: mrodriguez | Contraseña: doctor123 | Email: maria.rodriguez@medicore.pe
Usuario: pmartinez | Contraseña: doctor123 | Email: pedro.martinez@medicore.pe
Usuario: afernandez | Contraseña: doctor123 | Email: ana.fernandez@medicore.pe
Usuario: csanchez | Contraseña: doctor123 | Email: carlos.sanchez@medicore.pe
Rol: DOCTOR
```

### Pacientes
```
Usuario: jperez | Contraseña: paciente123 | Email: juan.perez@email.com
Usuario: mlopez | Contraseña: paciente123 | Email: maria.lopez@email.com
Usuario: cgomez | Contraseña: paciente123 | Email: carlos.gomez@email.com
Rol: PACIENTE
```

---

## 🚀 Cómo Usar

### 1. Levantar Docker
```bash
cd /workspaces/Sistema-de-Gestion-de-Clinica/backend/MediCore
docker compose up -d
```

Servicios disponibles:
- **MySQL**: `localhost:3306`
- **phpMyAdmin**: `http://localhost:8081`

### 2. Ejecutar Spring Boot
```bash
cd /workspaces/Sistema-de-Gestion-de-Clinica/backend/MediCore
./mvnw spring-boot:run
```

O con Maven instalado:
```bash
mvn spring-boot:run
```

### 3. Probar Autenticación

#### Login
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'
```

Respuesta:
```json
{
  "token": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsInJvbGVzIjoiUk9MRV9BRE1JTiIsImlhdCI6MTczMzI5ODAwMCwiZXhwIjoxNzMzMzg0NDAwfQ...",
  "tipo": "Bearer",
  "username": "admin",
  "email": "admin@medicore.pe"
}
```

#### Usar el Token
```bash
TOKEN="eyJhbGc..."

# Obtener todas las citas (requiere rol ADMIN)
curl -X GET http://localhost:8080/api/citas \
  -H "Authorization: Bearer $TOKEN"

# Obtener información del usuario actual
curl -X GET http://localhost:8080/api/auth/me \
  -H "Authorization: Bearer $TOKEN"
```

---

## 📁 Estructura del Proyecto

```
backend/MediCore/
├── src/main/java/pe/edu/utp/MediCore/
│   ├── config/
│   │   ├── SecurityConfig.java          ← Configuración de Spring Security
│   │   └── CorsConfig.java              ← Configuración CORS
│   ├── entity/
│   │   ├── Usuario.java                 ← Entidad Usuario
│   │   ├── Rol.java                     ← Entidad Rol
│   │   ├── Medico.java                  ← Entidad Médico (con relación Usuario)
│   │   ├── Paciente.java                ← Entidad Paciente (con relación Usuario)
│   │   └── CitaMedica.java              ← Entidad Cita Médica
│   ├── repository/
│   │   ├── UsuarioRepository.java
│   │   ├── RolRepository.java
│   │   ├── MedicoRepository.java
│   │   ├── PacienteRepository.java
│   │   └── CitaMedicaRepository.java
│   ├── security/
│   │   ├── JwtTokenProvider.java        ← Generación/validación JWT
│   │   ├── JwtAuthenticationFilter.java ← Filtro de autenticación
│   │   └── JwtAuthenticationEntryPoint.java
│   ├── controller/
│   │   ├── AuthController.java          ← Login/Registro
│   │   ├── CitaMedicaController.java    ← CRUD Citas (protegido)
│   │   ├── MedicoController.java        ← CRUD Médicos
│   │   └── PacienteController.java      ← CRUD Pacientes
│   ├── dto/
│   │   ├── LoginDTO.java
│   │   ├── RegistroDTO.java
│   │   └── AuthResponseDTO.java
│   └── MediCoreApplication.java
├── src/main/resources/
│   └── application.properties           ← Configuración de la aplicación
├── pom.xml                              ← Dependencias Maven
├── compose.yaml                         ← Docker Compose (MySQL + phpMyAdmin)
├── insert-complete-data.sql             ← Datos de prueba completos
├── update-data.sql                      ← Actualización de datos
└── generate-passwords.sh                ← Generador de contraseñas BCrypt
```

---

## 🔧 Configuración Adicional

### Cambiar el Secreto JWT
En `application.properties`:
```properties
# Generar un nuevo secreto (base64 de al menos 256 bits)
app.jwtSecret=TU_NUEVO_SECRETO_SUPER_SEGURO_EN_BASE64
app.jwtExpirationMs=86400000  # 24 horas
```

### Cambiar Tiempo de Expiración
```properties
app.jwtExpirationMs=3600000   # 1 hora
app.jwtExpirationMs=86400000  # 1 día (actual)
app.jwtExpirationMs=604800000 # 7 días
```

### Habilitar HTTPS (Producción)
En `application.properties`:
```properties
server.port=8443
server.ssl.enabled=true
server.ssl.key-store=classpath:keystore.p12
server.ssl.key-store-password=tu_password
server.ssl.key-store-type=PKCS12
```

---

## ✅ Verificación de Seguridad

### ✓ Implementado
- [x] Autenticación con JWT
- [x] Contraseñas encriptadas con BCrypt
- [x] Roles y permisos (ADMIN, DOCTOR, PACIENTE)
- [x] Autorización basada en roles con `@PreAuthorize`
- [x] Sesiones stateless (JWT)
- [x] Filtro de autenticación personalizado
- [x] CORS configurado para frontend Angular
- [x] Validación de entrada con Bean Validation
- [x] Protección de endpoints sensibles
- [x] Manejo de errores de autenticación

### 🔒 Recomendaciones Adicionales
- [ ] Implementar refresh tokens
- [ ] Rate limiting (limitar intentos de login)
- [ ] Auditoría de accesos
- [ ] Encriptar comunicación (HTTPS en producción)
- [ ] Configurar CORS para dominio específico en producción
- [ ] Implementar logout (blacklist de tokens)

---

## 🐛 Troubleshooting

### Error: "JWT expired"
- El token tiene 24 horas de validez
- Generar un nuevo token haciendo login nuevamente

### Error: "Unauthorized" (401)
- Verificar que el token esté en el header: `Authorization: Bearer <token>`
- Verificar que el token no haya expirado
- Verificar que el usuario tenga los roles necesarios

### Error: "Forbidden" (403)
- El usuario no tiene el rol necesario para acceder al endpoint
- Verificar roles asignados: `GET /api/auth/me`

### Error: "Bad credentials"
- Username o password incorrectos
- Verificar credenciales en la base de datos

### No se puede conectar a MySQL
```bash
# Verificar que el contenedor esté corriendo
docker ps | grep medicore-db

# Ver logs del contenedor
docker logs medicore-db

# Reiniciar contenedor
docker compose restart db
```

---

## 📚 Referencias

- [Spring Security Documentation](https://docs.spring.io/spring-security/reference/)
- [JWT.io](https://jwt.io/)
- [JJWT Library](https://github.com/jwtk/jjwt)
- [BCrypt Password Encoder](https://docs.spring.io/spring-security/site/docs/current/api/org/springframework/security/crypto/bcrypt/BCryptPasswordEncoder.html)

---

## 📝 Notas

1. **BCrypt Passwords**: Las contraseñas están hasheadas con BCrypt (factor de costo 10)
2. **JWT Secret**: Cambiar el secreto en producción a uno generado aleatoriamente
3. **CORS**: Configurado para `http://localhost:4200` (Angular dev server)
4. **Roles**: Se añaden automáticamente el prefijo `ROLE_` en Spring Security
5. **Base de Datos**: Hibernate crea/actualiza las tablas automáticamente (`ddl-auto=update`)

---

**Última actualización**: 4 de diciembre de 2025
**Estado**: ✅ Completamente funcional y probado
