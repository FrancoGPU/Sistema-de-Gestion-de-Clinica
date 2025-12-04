-- ===============================================
-- SCRIPT DE CONFIGURACIÓN COMPLETA PARA MYSQL WORKBENCH
-- MediCore - Sistema de Gestión de Clínica
-- ===============================================
-- Ejecutar este script completo en MySQL Workbench
-- Base de datos: medicore
-- Usuario: root / medicore_root_pass
-- ===============================================

-- 1. CREAR BASE DE DATOS (si no existe)
CREATE DATABASE IF NOT EXISTS medicore
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE medicore;

-- 2. ELIMINAR TABLAS EXISTENTES (para reiniciar limpio)
-- Comentar esta sección si quieres mantener datos existentes
SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS citas_medicas;
DROP TABLE IF EXISTS usuario_roles;
DROP TABLE IF EXISTS campanias_salud;
DROP TABLE IF EXISTS pacientes;
DROP TABLE IF EXISTS medicos;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS usuarios;
SET FOREIGN_KEY_CHECKS = 1;

-- ===============================================
-- 3. CREAR TABLAS
-- ===============================================

-- Tabla: usuarios
CREATE TABLE usuarios (
    id_usuario BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    activo BOOLEAN NOT NULL DEFAULT TRUE,
    nombre VARCHAR(100),
    apellido VARCHAR(100),
    CONSTRAINT UK_username UNIQUE (username),
    CONSTRAINT UK_email UNIQUE (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla: roles
CREATE TABLE roles (
    id_rol BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE,
    descripcion VARCHAR(200),
    CONSTRAINT UK_nombre_rol UNIQUE (nombre)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla: usuario_roles (relación muchos a muchos)
CREATE TABLE usuario_roles (
    id_usuario BIGINT NOT NULL,
    id_rol BIGINT NOT NULL,
    PRIMARY KEY (id_usuario, id_rol),
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario) ON DELETE CASCADE,
    FOREIGN KEY (id_rol) REFERENCES roles(id_rol) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla: medicos
CREATE TABLE medicos (
    id_medico BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    especialidad VARCHAR(100) NOT NULL,
    horarios_atencion VARCHAR(500),
    numero_licencia VARCHAR(50) UNIQUE,
    telefono VARCHAR(20),
    email VARCHAR(255) UNIQUE,
    id_usuario BIGINT,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla: pacientes
CREATE TABLE pacientes (
    id_paciente BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    dni VARCHAR(8) NOT NULL UNIQUE,
    correo_electronico VARCHAR(255) NOT NULL UNIQUE,
    numero_telefono VARCHAR(9) NOT NULL,
    id_usuario BIGINT,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla: citas_medicas
CREATE TABLE citas_medicas (
    id_cita BIGINT AUTO_INCREMENT PRIMARY KEY,
    fecha_hora DATETIME NOT NULL,
    motivo VARCHAR(500) NOT NULL,
    estado VARCHAR(20) NOT NULL DEFAULT 'PROGRAMADA',
    notas TEXT,
    id_paciente BIGINT NOT NULL,
    id_medico BIGINT NOT NULL,
    FOREIGN KEY (id_paciente) REFERENCES pacientes(id_paciente) ON DELETE CASCADE,
    FOREIGN KEY (id_medico) REFERENCES medicos(id_medico) ON DELETE CASCADE,
    CONSTRAINT CHK_estado CHECK (estado IN ('PROGRAMADA', 'COMPLETADA', 'CANCELADA'))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla: campanias_salud
CREATE TABLE campanias_salud (
    id_campania BIGINT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(200) NOT NULL,
    descripcion TEXT,
    fecha_inicio DATE,
    fecha_fin DATE,
    activa BOOLEAN DEFAULT TRUE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ===============================================
-- 4. INSERTAR ROLES
-- ===============================================
INSERT INTO roles (nombre, descripcion) VALUES
('ADMIN', 'Administrador del sistema con acceso completo'),
('DOCTOR', 'Médico con acceso a gestión de citas y pacientes'),
('PACIENTE', 'Paciente con acceso limitado a sus propias citas');

-- ===============================================
-- 5. INSERTAR USUARIOS
-- ===============================================
-- NOTA: Contraseñas encriptadas con BCrypt
-- admin123: $2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy
-- doctor123: $2a$10$xn3LI/AjqicFYZFruSwve.681477XaVNaUQbr98gPxZIBQ/7eqmYu
-- paciente123: $2a$10$GlQQHKdVOxBWRxvlj/XUkeHDfYKvQr5D4spN4hDx1WNmNZKQC9CzW

-- Usuario Administrador
INSERT INTO usuarios (username, password, email, activo, nombre, apellido) VALUES
('admin', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'admin@medicore.pe', true, 'Administrador', 'Sistema');

-- Usuarios Doctores
INSERT INTO usuarios (username, password, email, activo, nombre, apellido) VALUES
('jgarcia', '$2a$10$xn3LI/AjqicFYZFruSwve.681477XaVNaUQbr98gPxZIBQ/7eqmYu', 'juan.garcia@medicore.pe', true, 'Juan Carlos', 'García Pérez'),
('mrodriguez', '$2a$10$xn3LI/AjqicFYZFruSwve.681477XaVNaUQbr98gPxZIBQ/7eqmYu', 'maria.rodriguez@medicore.pe', true, 'María Elena', 'Rodríguez López'),
('pmartinez', '$2a$10$xn3LI/AjqicFYZFruSwve.681477XaVNaUQbr98gPxZIBQ/7eqmYu', 'pedro.martinez@medicore.pe', true, 'Pedro José', 'Martínez Silva'),
('afernandez', '$2a$10$xn3LI/AjqicFYZFruSwve.681477XaVNaUQbr98gPxZIBQ/7eqmYu', 'ana.fernandez@medicore.pe', true, 'Ana Patricia', 'Fernández Torres'),
('csanchez', '$2a$10$xn3LI/AjqicFYZFruSwve.681477XaVNaUQbr98gPxZIBQ/7eqmYu', 'carlos.sanchez@medicore.pe', true, 'Carlos Alberto', 'Sánchez Díaz');

-- Usuarios Pacientes
INSERT INTO usuarios (username, password, email, activo, nombre, apellido) VALUES
('jperez', '$2a$10$GlQQHKdVOxBWRxvlj/XUkeHDfYKvQr5D4spN4hDx1WNmNZKQC9CzW', 'juan.perez@email.com', true, 'Juan', 'Pérez'),
('mlopez', '$2a$10$GlQQHKdVOxBWRxvlj/XUkeHDfYKvQr5D4spN4hDx1WNmNZKQC9CzW', 'maria.lopez@email.com', true, 'María', 'López'),
('cgomez', '$2a$10$GlQQHKdVOxBWRxvlj/XUkeHDfYKvQr5D4spN4hDx1WNmNZKQC9CzW', 'carlos.gomez@email.com', true, 'Carlos', 'Gómez');

-- ===============================================
-- 6. ASIGNAR ROLES A USUARIOS
-- ===============================================
-- Asignar rol ADMIN al administrador
INSERT INTO usuario_roles (id_usuario, id_rol)
SELECT u.id_usuario, r.id_rol
FROM usuarios u, roles r
WHERE u.username = 'admin' AND r.nombre = 'ADMIN';

-- Asignar rol DOCTOR a médicos
INSERT INTO usuario_roles (id_usuario, id_rol)
SELECT u.id_usuario, r.id_rol
FROM usuarios u
CROSS JOIN roles r
WHERE u.username IN ('jgarcia', 'mrodriguez', 'pmartinez', 'afernandez', 'csanchez') 
AND r.nombre = 'DOCTOR';

-- Asignar rol PACIENTE a pacientes
INSERT INTO usuario_roles (id_usuario, id_rol)
SELECT u.id_usuario, r.id_rol
FROM usuarios u
CROSS JOIN roles r
WHERE u.username IN ('jperez', 'mlopez', 'cgomez')
AND r.nombre = 'PACIENTE';

-- ===============================================
-- 7. INSERTAR MÉDICOS
-- ===============================================
-- Médicos vinculados a usuarios
INSERT INTO medicos (nombre, apellido, especialidad, horarios_atencion, numero_licencia, telefono, email, id_usuario) 
VALUES
('Juan Carlos', 'García Pérez', 'Cardiología', 'Lunes a Viernes: 8:00 AM - 2:00 PM', 'CMP-12345', '987654321', 'juan.garcia@medicore.pe',
 (SELECT id_usuario FROM usuarios WHERE username = 'jgarcia')),
 
('María Elena', 'Rodríguez López', 'Pediatría', 'Lunes a Viernes: 2:00 PM - 8:00 PM', 'CMP-23456', '987654322', 'maria.rodriguez@medicore.pe',
 (SELECT id_usuario FROM usuarios WHERE username = 'mrodriguez')),
 
('Pedro José', 'Martínez Silva', 'Traumatología', 'Lunes a Viernes: 8:00 AM - 4:00 PM, Sábados: 8:00 AM - 12:00 PM', 'CMP-34567', '987654323', 'pedro.martinez@medicore.pe',
 (SELECT id_usuario FROM usuarios WHERE username = 'pmartinez')),
 
('Ana Patricia', 'Fernández Torres', 'Ginecología', 'Martes a Sábado: 9:00 AM - 3:00 PM', 'CMP-45678', '987654324', 'ana.fernandez@medicore.pe',
 (SELECT id_usuario FROM usuarios WHERE username = 'afernandez')),
 
('Carlos Alberto', 'Sánchez Díaz', 'Neurología', 'Lunes a Viernes: 10:00 AM - 6:00 PM', 'CMP-56789', '987654325', 'carlos.sanchez@medicore.pe',
 (SELECT id_usuario FROM usuarios WHERE username = 'csanchez'));

-- Médicos adicionales sin usuarios (acceso público)
INSERT INTO medicos (nombre, apellido, especialidad, horarios_atencion, numero_licencia, telefono, email, id_usuario) VALUES
('Laura Sofía', 'González Ramírez', 'Dermatología', 'Lunes, Miércoles, Viernes: 8:00 AM - 2:00 PM', 'CMP-67890', '987654326', 'laura.gonzalez@medicore.pe', NULL),
('Roberto Miguel', 'Vargas Castro', 'Oftalmología', 'Martes a Sábado: 10:00 AM - 4:00 PM', 'CMP-78901', '987654327', 'roberto.vargas@medicore.pe', NULL),
('Carmen Rosa', 'Flores Mendoza', 'Psiquiatría', 'Lunes a Viernes: 3:00 PM - 9:00 PM', 'CMP-89012', '987654328', 'carmen.flores@medicore.pe', NULL),
('José Luis', 'Rojas Paredes', 'Medicina General', 'Lunes a Sábado: 7:00 AM - 1:00 PM', 'CMP-90123', '987654329', 'jose.rojas@medicore.pe', NULL),
('Isabel Cristina', 'Cruz Delgado', 'Endocrinología', 'Lunes a Viernes: 9:00 AM - 5:00 PM', 'CMP-01234', '987654330', 'isabel.cruz@medicore.pe', NULL);

-- ===============================================
-- 8. INSERTAR PACIENTES
-- ===============================================
-- Pacientes vinculados a usuarios
INSERT INTO pacientes (nombre, apellido, dni, correo_electronico, numero_telefono, id_usuario) 
VALUES
('Juan', 'Pérez', '12345678', 'juan.perez@email.com', '987654331',
 (SELECT id_usuario FROM usuarios WHERE username = 'jperez')),
 
('María', 'López', '23456789', 'maria.lopez@email.com', '987654332',
 (SELECT id_usuario FROM usuarios WHERE username = 'mlopez')),
 
('Carlos', 'Gómez', '34567890', 'carlos.gomez@email.com', '987654333',
 (SELECT id_usuario FROM usuarios WHERE username = 'cgomez'));

-- Pacientes adicionales sin usuarios (registro público)
INSERT INTO pacientes (nombre, apellido, dni, correo_electronico, numero_telefono, id_usuario) VALUES
('Ana', 'Martínez', '45678901', 'ana.martinez@email.com', '987654334', NULL),
('Luis', 'Fernández', '56789012', 'luis.fernandez@email.com', '987654335', NULL),
('Carmen', 'Torres', '67890123', 'carmen.torres@email.com', '987654336', NULL),
('Roberto', 'Sánchez', '78901234', 'roberto.sanchez@email.com', '987654337', NULL),
('Patricia', 'Ramírez', '89012345', 'patricia.ramirez@email.com', '987654338', NULL);

-- ===============================================
-- 9. INSERTAR CITAS DE EJEMPLO
-- ===============================================
INSERT INTO citas_medicas (fecha_hora, motivo, estado, id_paciente, id_medico) VALUES
('2024-12-10 10:00:00', 'Control de presión arterial', 'PROGRAMADA', 1, 1),
('2024-12-10 15:00:00', 'Consulta pediátrica', 'PROGRAMADA', 2, 2),
('2024-12-11 09:00:00', 'Revisión de resultados', 'PROGRAMADA', 3, 3),
('2024-12-05 11:00:00', 'Control post-operatorio', 'COMPLETADA', 1, 3),
('2024-12-04 16:00:00', 'Consulta general', 'CANCELADA', 2, 1);

-- ===============================================
-- 10. INSERTAR CAMPAÑAS DE SALUD
-- ===============================================
INSERT INTO campanias_salud (titulo, descripcion, fecha_inicio, fecha_fin, activa) VALUES
('Vacunación contra la Gripe 2024', 'Campaña anual de vacunación contra la influenza para toda la familia', '2024-12-01', '2025-02-28', true),
('Control Preventivo Cardiovascular', 'Evaluación gratuita de presión arterial y colesterol', '2024-12-15', '2025-01-15', true),
('Mes de la Salud Mental', 'Consultas psicológicas con descuento especial', '2025-01-01', '2025-01-31', true);

-- ===============================================
-- 11. VERIFICACIÓN DE DATOS
-- ===============================================
SELECT '===================================================' AS '';
SELECT 'VERIFICACIÓN DE DATOS INSERTADOS' AS '';
SELECT '===================================================' AS '';

SELECT '' AS '';
SELECT 'USUARIOS:' AS '';
SELECT u.id_usuario, u.username, u.email, u.nombre, u.apellido, GROUP_CONCAT(r.nombre) as roles
FROM usuarios u
LEFT JOIN usuario_roles ur ON u.id_usuario = ur.id_usuario
LEFT JOIN roles r ON ur.id_rol = r.id_rol
GROUP BY u.id_usuario, u.username, u.email, u.nombre, u.apellido;

SELECT '' AS '';
SELECT 'MÉDICOS:' AS '';
SELECT m.id_medico, m.nombre, m.apellido, m.especialidad, u.username as usuario_vinculado
FROM medicos m
LEFT JOIN usuarios u ON m.id_usuario = u.id_usuario;

SELECT '' AS '';
SELECT 'PACIENTES:' AS '';
SELECT p.id_paciente, p.nombre, p.apellido, p.dni, u.username as usuario_vinculado
FROM pacientes p
LEFT JOIN usuarios u ON p.id_usuario = u.id_usuario;

SELECT '' AS '';
SELECT 'CITAS MÉDICAS:' AS '';
SELECT COUNT(*) as total_citas FROM citas_medicas;

SELECT '' AS '';
SELECT 'CAMPAÑAS DE SALUD:' AS '';
SELECT COUNT(*) as total_campanias FROM campanias_salud;

SELECT '' AS '';
SELECT '===================================================' AS '';
SELECT 'CREDENCIALES DE ACCESO' AS '';
SELECT '===================================================' AS '';
SELECT '' AS '';
SELECT 'ADMINISTRADOR:' AS '';
SELECT '  Usuario: admin' AS '';
SELECT '  Contraseña: admin123' AS '';
SELECT '  Email: admin@medicore.pe' AS '';
SELECT '' AS '';
SELECT 'DOCTORES (Contraseña: doctor123):' AS '';
SELECT '  jgarcia, mrodriguez, pmartinez, afernandez, csanchez' AS '';
SELECT '' AS '';
SELECT 'PACIENTES (Contraseña: paciente123):' AS '';
SELECT '  jperez, mlopez, cgomez' AS '';
SELECT '' AS '';
SELECT '===================================================' AS '';
SELECT '✓ Base de datos configurada correctamente' AS '';
SELECT '===================================================' AS '';
