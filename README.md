# Sistema de Gestión de Clínica - MediCore

Bienvenido al repositorio de **MediCore**, un sistema integral para la gestión de clínicas médicas. Este proyecto combina un backend robusto en Spring Boot con un frontend moderno en Angular, diseñado para facilitar la administración de citas, historiales médicos y la gestión de doctores y pacientes.

## 🚀 Tecnologías Utilizadas

### Backend
*   **Java 21**
*   **Spring Boot 3.x** (Web, Data JPA, Security, Validation)
*   **Spring Security + JWT** (Autenticación y Autorización)
*   **Maven** (Gestor de dependencias)
*   **MySQL** (Base de datos)

### Frontend
*   **Angular 17+** (Standalone Components)
*   **TypeScript**
*   **Bootstrap 5** (Estilos y componentes UI)
*   **FontAwesome** (Iconos)

### Infraestructura & Herramientas
*   **Docker & Docker Compose** (Contenedorización de Base de Datos)
*   **VS Code Dev Containers** (Entorno de desarrollo estandarizado)

---

## 📋 Requisitos Previos

Si no estás usando Codespaces, asegúrate de tener instalado:
*   [Docker Desktop](https://www.docker.com/products/docker-desktop/)
*   [Java JDK 21](https://adoptium.net/)
*   [Node.js (LTS)](https://nodejs.org/)
*   [Angular CLI](https://angular.io/cli) (`npm install -g @angular/cli`)

---

## 🛠️ Cómo Iniciar el Proyecto

### Opción A: Usando VS Code (Recomendado)

Este proyecto está configurado con **Tasks** de VS Code para automatizar el inicio.

1.  Abre el proyecto en VS Code.
2.  Presiona `Ctrl + Shift + P` (o `Cmd + Shift + P` en Mac).
3.  Escribe **"Tasks: Run Task"** y selecciona esa opción.
4.  Elige **"🚀 INICIAR TODO"**.

> **¿Qué hace esto?**
> *   Levanta el contenedor de MySQL en Docker.
> *   Inicia el servidor Backend (Spring Boot).
> *   Inicia el servidor Frontend (Angular).

### Opción B: Manualmente desde la Terminal

Si prefieres usar la terminal, sigue estos pasos en orden:

#### 1. Base de Datos
Inicia el contenedor de MySQL:
```bash
docker compose up -d
```

#### 2. Backend (Spring Boot)
Navega a la carpeta del backend y ejecútalo:
```bash
cd backend/MediCore
./mvnw spring-boot:run
```
*El backend correrá en: `http://localhost:8080`*

#### 3. Frontend (Angular)
En una nueva terminal, navega a la carpeta del frontend, instala dependencias (solo la primera vez) y arranca:
```bash
cd frontend/Sistema-de-Gestion-de-Clinica
npm install  # Solo si es la primera vez
npm start
```
*El frontend correrá en: `http://localhost:4200`*

---

## 🔐 Credenciales de Acceso (Demo)

El sistema viene con datos iniciales para pruebas (ver `DataInitializer.java`):

| Rol | Usuario | Contraseña |
| :--- | :--- | :--- |
| **Administrador** | `admin` | `admin123` |
| **Doctor** | `doctor` | `doctor123` |
| **Paciente** | `paciente` | `paciente123` |

---

## 📂 Estructura del Proyecto

```
/
├── backend/
│   └── MediCore/          # Código fuente Spring Boot
│       ├── src/main/java  # Controladores, Servicios, Entidades, Seguridad
│       └── pom.xml        # Dependencias Maven
├── frontend/
│   └── Sistema-de-Gestion-de-Clinica/
│       ├── src/app/       # Componentes, Servicios, Guards, Interceptors
│       └── package.json   # Dependencias NPM
├── database/              # Scripts o archivos relacionados a la DB
├── compose.yaml           # Configuración de Docker Compose
└── .devcontainer/         # Configuración para GitHub Codespaces
```

## ✨ Funcionalidades Principales

1.  **Portal del Paciente:**
    *   Registro e inicio de sesión seguro.
    *   Reserva de citas médicas.
    *   Visualización de historial médico personal.
    *   Gestión de perfil.

2.  **Portal del Doctor:**
    *   Dashboard con próximas citas.
    *   Gestión de horarios de atención.
    *   Atención de citas (Diagnóstico, Tratamiento).
    *   Acceso al historial médico de sus pacientes.

3.  **Panel Administrativo:**
    *   Gestión de usuarios (Doctores, Pacientes).
    *   Gestión de especialidades y sedes.
    *   Reportes y estadísticas.

4.  **Seguridad:**
    *   Autenticación basada en **JWT**.
    *   Rutas protegidas por Roles (Admin, Doctor, Paciente).
    *   Encriptación de contraseñas con BCrypt.

5.  **🪟 Sistema Multiventana (NUEVO):**
    *   **3 Ventanas Independientes Implementadas:**
        *   📅 **Gestión de Citas Médicas** - Visualización y administración completa
        *   📋 **Historia Clínica** - Consulta detallada de registros médicos
        *   👤 **Información del Paciente** - Datos completos y estadísticas
    *   Gestión centralizada mediante servicio dedicado
    *   Configuración personalizable de ventanas
    *   Cierre automático al cerrar ventana principal
    *   Demo interactiva en `/multiventana-demo`
    *   [📖 Ver documentación completa](./MULTIVENTANA.md)

---
Desarrollado por [FrancoGPU](https://github.com/FrancoGPU)
