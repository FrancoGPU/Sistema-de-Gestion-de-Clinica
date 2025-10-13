<<<<<<< HEAD
# Sistema de Gestión de Clínica

Un sistema completo de gestión de clínica desarrollado con **Angular 19** para el frontend y **Spring Boot** para el backend. El sistema cuenta con autenticación basada en roles, gestión de pacientes, doctores y citas médicas.

## 🚀 Características

### Frontend (Angular)
- **Sistema de Autenticación**: Login con roles (Administrador/Paciente) + acceso invitado
- **Layouts Separados**: Interfaces distintas para público y administrador
- **Gestión de Pacientes**: Registro, edición y listado
- **Interfaz Responsive**: Diseño moderno con Bootstrap 5
- **Tema Dinámico**: Selector de tema claro/oscuro
- **Guards de Ruta**: Protección de rutas por autenticación y rol

### Backend (Spring Boot)
- **Gestión de Pacientes**: CRUD completo
- **Gestión de Doctores**: Administración de médicos y especialidades
- **Sistema de Citas**: Programación y gestión de citas médicas
- **Historial Médico**: Registro de consultas y tratamientos
- **Base de Datos**: H2 para desarrollo, PostgreSQL para producción

## 🛠️ Tecnologías Utilizadas

### Frontend
- **Angular 19.2.17**: Framework principal
- **TypeScript 5.7.2**: Lenguaje de programación
- **Bootstrap 5.3.7**: Framework CSS
- **Font Awesome 6.4.0**: Iconografía
- **RxJS**: Programación reactiva
- **Standalone Components**: Arquitectura moderna de Angular

### Backend
- **Spring Boot 3.1.5**: Framework principal
- **Spring Data JPA**: Persistencia de datos
- **Spring MVC**: Controladores web
- **H2 Database**: Base de datos en memoria para desarrollo
- **PostgreSQL**: Base de datos para producción

## 📋 Requisitos

### Frontend
- Node.js 18 o superior
- npm 9 o superior
- Angular CLI 19.2.17

### Backend
- Java 17 o superior
- Maven 3.6 o superior
- PostgreSQL (opcional, para producción)

## 🚀 Instalación y Ejecución

### Frontend

#### 1. Clonar el repositorio
```bash
git clone https://github.com/FrancoGPU/Sistema-de-Gestion-de-Clinica.git
cd Sistema-de-Gestion-de-Clinica
```

#### 2. Instalar dependencias
```bash
npm install
```

#### 3. Ejecutar en modo desarrollo
```bash
ng serve
```

La aplicación estará disponible en: `http://localhost:4200`

#### 4. Compilar para producción
```bash
ng build
```

### Backend

#### 1. Ejecutar en modo desarrollo (H2)
```bash
cd backend
mvn spring-boot:run
```

La API estará disponible en: `http://localhost:8080`

#### 2. Consola H2 (desarrollo)
- URL: `http://localhost:8080/h2-console`
- JDBC URL: `jdbc:h2:mem:clinica`
- Usuario: `sa`
- Contraseña: (vacía)

## � Usuarios de Prueba

### Administrador
- **Email**: admin@administrador.com
- **Contraseña**: admin123

### Paciente
- **Email**: paciente@paciente.com
- **Contraseña**: paciente123

### Invitado
- Click en "Continuar como Invitado" (sin autenticación)

## � Estructura del Proyecto

```
Sistema-de-Gestion-de-Clinica/
├── frontend/                    # Aplicación Angular
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/     # Componentes reutilizables
│   │   │   ├── pages/          # Páginas principales
│   │   │   ├── services/       # Servicios (Auth, Theme)
│   │   │   ├── guards/         # Guards de autenticación
│   │   │   └── shared/         # Componentes compartidos
│   │   ├── assets/             # Imágenes y recursos
│   │   └── styles.css          # Estilos globales
│   ├── *.md                    # Documentación
│   └── angular.json
└── backend/                     # API Spring Boot
    └── src/main/
        ├── java/com/clinica/
        └── resources/
```

## 🌐 Rutas de la Aplicación

### Rutas Públicas
- `/` → Redirige a MediCore
- `/MediCore` → Página principal pública
- `/login` → Página de inicio de sesión

### Rutas Protegidas (Administrador)
- `/admin/index` → Dashboard de administrador
- `/admin/dashboard` → Panel de estadísticas
- `/pacientes/lista` → Lista de pacientes
- `/pacientes/formulario` → Crear/editar paciente

## 📚 Documentación Adicional

El proyecto incluye documentación detallada en archivos `.md`:

- `AUTENTICACION.md` - Sistema de autenticación y guards
- `LAYOUTS.md` - Arquitectura de layouts
- `RUTAS_NAVEGACION.md` - Configuración de rutas
- `HEADER_NAVEGACION.md` - Menú de navegación
- `MENU_USUARIO_HEADER.md` - Menú desplegable de usuario
- `FIX_LOGIN_DEMO_CARDS.md` - Tarjetas de demo
- `BOTON_INVITADO.md` - Acceso como invitado
- `RESUMEN_IMPLEMENTACION.md` - Resumen completo

## 🧪 Testing

### Frontend
```bash
ng test
```

### Backend
```bash
mvn test
```

## 📈 Próximas Mejoras

- [ ] Integración completa Frontend-Backend
- [ ] Implementar JWT para autenticación
- [ ] Completar módulo de Doctores
- [ ] Sistema completo de Citas
- [ ] Reportes y estadísticas
- [ ] Notificaciones por email
- [ ] Dashboard con gráficos en tiempo real
- [ ] Tests E2E

## 🤝 Contribución

1. Fork el proyecto
2. Crear branch para feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push al branch (`git push origin feature/nueva-funcionalidad`)
5. Crear Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.

## 👥 Autor

**FrancoGPU** - [GitHub](https://github.com/FrancoGPU)

---

⭐ Si este proyecto te fue útil, ¡dale una estrella!

=======
# SistemaDeGestionDeClinica

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.17.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
>>>>>>> f0bb075 (initial commit)
