# Sistema de Gestión de Clínica

Un sistema completo de gestión de clínica desarrollado con **Spring Boot**, **JPA** y **Bootstrap** para el frontend. El sistema está diseñado inicialmente como una aplicación estática que puede ser fácilmente migrada a PostgreSQL para producción.

## 🚀 Características

- **Gestión de Pacientes**: Registro, edición, búsqueda y eliminación de pacientes
- **Gestión de Doctores**: Administración completa de médicos y especialidades
- **Sistema de Citas**: Programación y gestión de citas médicas
- **Historial Médico**: Registro de consultas y tratamientos
- **Interfaz Responsive**: Diseño moderno con Bootstrap 5
- **Base de Datos**: H2 para desarrollo, PostgreSQL para producción

## 🛠️ Tecnologías Utilizadas

### Backend
- **Spring Boot 3.1.5**: Framework principal
- **Spring Data JPA**: Persistencia de datos
- **Spring MVC**: Controladores web
- **Spring Validation**: Validación de formularios
- **H2 Database**: Base de datos en memoria para desarrollo
- **PostgreSQL**: Base de datos para producción (configuración incluida)

### Frontend
- **Thymeleaf**: Motor de plantillas
- **Bootstrap 5**: Framework CSS
- **Font Awesome**: Iconografía
- **JavaScript**: Funcionalidades dinámicas

### Herramientas
- **Maven**: Gestión de dependencias
- **Spring Boot DevTools**: Desarrollo ágil
- **Java 17**: Versión de Java

## 📋 Requisitos

- Java 17 o superior
- Maven 3.6 o superior
- PostgreSQL (opcional, para producción)

## 🚀 Instalación y Ejecución

### 1. Clonar el repositorio
```bash
git clone https://github.com/FrancoGPU/Sistema-de-Gestion-de-Clinica.git
cd Sistema-de-Gestion-de-Clinica
```

### 2. Ejecutar en modo desarrollo (H2)
```bash
mvn spring-boot:run
```

La aplicación estará disponible en: `http://localhost:8080`

### 3. Consola H2 (desarrollo)
- URL: `http://localhost:8080/h2-console`
- JDBC URL: `jdbc:h2:mem:clinica`
- Usuario: `sa`
- Contraseña: (vacía)

## 🗄️ Configuración de Base de Datos

### Desarrollo (H2)
La configuración por defecto utiliza H2 en memoria. Los datos se recrean en cada reinicio.

### Producción (PostgreSQL)
Para usar PostgreSQL, descomentar en `application.properties`:

```properties
# Configuración para producción con PostgreSQL
spring.datasource.url=jdbc:postgresql://localhost:5432/clinica_db
spring.datasource.username=postgres
spring.datasource.password=password
spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect
spring.jpa.hibernate.ddl-auto=update
```

Y comentar la configuración de H2.

## 📊 Modelo de Datos

### Entidades Principales

#### Paciente
- ID, Nombre, Apellido, DNI, Email, Teléfono
- Dirección, Fecha de Nacimiento
- Relaciones: Citas, Historiales Médicos

#### Doctor
- ID, Nombre, Apellido, Especialización
- Email, Teléfono, Número de Licencia
- Relaciones: Citas, Historiales Médicos

#### Cita
- ID, Fecha y Hora, Estado, Motivo, Observaciones
- Relaciones: Paciente, Doctor

#### Historial Médico
- ID, Fecha de Consulta, Diagnóstico
- Tratamiento, Notas, Medicamentos
- Relaciones: Paciente, Doctor

## 🔧 Estructura del Proyecto

```
src/
├── main/
│   ├── java/com/clinica/sistema/
│   │   ├── entity/          # Entidades JPA
│   │   ├── repository/      # Repositorios Spring Data
│   │   ├── service/         # Capa de servicios
│   │   ├── controller/      # Controladores MVC
│   │   └── SistemaGestionClinicaApplication.java
│   └── resources/
│       ├── static/          # CSS, JS, imágenes
│       ├── templates/       # Plantillas Thymeleaf
│       └── application.properties
└── test/                    # Tests unitarios
```

## 🌐 Funcionalidades Web

### Páginas Principales
- **Inicio**: Página principal con acciones rápidas
- **Dashboard**: Panel de control con estadísticas
- **Pacientes**: Lista, crear, editar, ver detalles
- **Doctores**: Gestión completa de médicos
- **Citas**: Programación y gestión de citas

### Características de la UI
- ✅ Diseño responsive con Bootstrap
- ✅ Navegación intuitiva
- ✅ Formularios con validación
- ✅ Mensajes de éxito/error
- ✅ Búsqueda y filtrado
- ✅ Confirmaciones de eliminación

## 🧪 Testing

### Ejecutar tests
```bash
mvn test
```

### Compilar proyecto
```bash
mvn clean compile
```

### Crear JAR
```bash
mvn clean package
```

## 📈 Próximas Mejoras

- [ ] Completar plantillas de Doctores
- [ ] Implementar gestión completa de Citas
- [ ] Añadir reportes y estadísticas
- [ ] Implementar autenticación y autorización
- [ ] Añadir tests unitarios e integración
- [ ] API REST para integración externa
- [ ] Notificaciones por email
- [ ] Dashboard con gráficos

## 🤝 Contribución

1. Fork el proyecto
2. Crear branch para feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push al branch (`git push origin feature/nueva-funcionalidad`)
5. Crear Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## 👥 Autor

**FrancoGPU** - [GitHub](https://github.com/FrancoGPU)

---

⭐ Si este proyecto te fue útil, ¡dale una estrella!
