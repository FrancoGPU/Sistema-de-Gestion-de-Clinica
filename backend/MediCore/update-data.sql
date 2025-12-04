-- Script para agregar usuarios y datos faltantes (sin duplicar)
-- Verifica si existen antes de insertar

-- ===============================================
-- 1. INSERTAR USUARIOS DOCTORES (si no existen)
-- ===============================================
INSERT IGNORE INTO usuarios (username, password, email, activo, nombre, apellido) VALUES
('jgarcia', '$2a$10$xn3LI/AjqicFYZFruSwve.681477XaVNaUQbr98gPxZIBQ/7eqmYu', 'juan.garcia@medicore.pe', true, 'Juan Carlos', 'García Pérez'),
('mrodriguez', '$2a$10$xn3LI/AjqicFYZFruSwve.681477XaVNaUQbr98gPxZIBQ/7eqmYu', 'maria.rodriguez@medicore.pe', true, 'María Elena', 'Rodríguez López'),
('pmartinez', '$2a$10$xn3LI/AjqicFYZFruSwve.681477XaVNaUQbr98gPxZIBQ/7eqmYu', 'pedro.martinez@medicore.pe', true, 'Pedro José', 'Martínez Silva'),
('afernandez', '$2a$10$xn3LI/AjqicFYZFruSwve.681477XaVNaUQbr98gPxZIBQ/7eqmYu', 'ana.fernandez@medicore.pe', true, 'Ana Patricia', 'Fernández Torres'),
('csanchez', '$2a$10$xn3LI/AjqicFYZFruSwve.681477XaVNaUQbr98gPxZIBQ/7eqmYu', 'carlos.sanchez@medicore.pe', true, 'Carlos Alberto', 'Sánchez Díaz');

-- ===============================================
-- 2. INSERTAR USUARIOS PACIENTES (si no existen)
-- ===============================================
INSERT IGNORE INTO usuarios (username, password, email, activo, nombre, apellido) VALUES
('jperez', '$2a$10$GlQQHKdVOxBWRxvlj/XUkeHDfYKvQr5D4spN4hDx1WNmNZKQC9CzW', 'juan.perez@email.com', true, 'Juan', 'Pérez'),
('mlopez', '$2a$10$GlQQHKdVOxBWRxvlj/XUkeHDfYKvQr5D4spN4hDx1WNmNZKQC9CzW', 'maria.lopez@email.com', true, 'María', 'López'),
('cgomez', '$2a$10$GlQQHKdVOxBWRxvlj/XUkeHDfYKvQr5D4spN4hDx1WNmNZKQC9CzW', 'carlos.gomez@email.com', true, 'Carlos', 'Gómez');

-- ===============================================
-- 3. ASIGNAR ROLES A USUARIOS (si no están asignados)
-- ===============================================
-- Asignar rol DOCTOR a médicos
INSERT IGNORE INTO usuario_roles (id_usuario, id_rol)
SELECT u.id_usuario, r.id_rol
FROM usuarios u, roles r
WHERE u.username IN ('jgarcia', 'mrodriguez', 'pmartinez', 'afernandez', 'csanchez') 
AND r.nombre = 'DOCTOR';

-- Asignar rol PACIENTE a pacientes
INSERT IGNORE INTO usuario_roles (id_usuario, id_rol)
SELECT u.id_usuario, r.id_rol
FROM usuarios u, roles r
WHERE u.username IN ('jperez', 'mlopez', 'cgomez')
AND r.nombre = 'PACIENTE';

-- ===============================================
-- 4. INSERTAR MÉDICOS VINCULADOS A USUARIOS
-- ===============================================
-- Eliminar médicos sin usuario que tengan email de usuarios doctores
DELETE FROM medicos WHERE email IN (
    'juan.garcia@medicore.pe',
    'maria.rodriguez@medicore.pe',
    'pedro.martinez@medicore.pe',
    'ana.fernandez@medicore.pe',
    'carlos.sanchez@medicore.pe'
) AND id_usuario IS NULL;

-- Insertar médicos vinculados
INSERT IGNORE INTO medicos (nombre, apellido, especialidad, horarios_atencion, numero_licencia, telefono, email, id_usuario) 
SELECT 'Juan Carlos', 'García Pérez', 'Cardiología', 'Lunes a Viernes: 8:00 AM - 2:00 PM', 'CMP-12345', '987654321', 'juan.garcia@medicore.pe', u.id_usuario
FROM usuarios u WHERE u.username = 'jgarcia';

INSERT IGNORE INTO medicos (nombre, apellido, especialidad, horarios_atencion, numero_licencia, telefono, email, id_usuario) 
SELECT 'María Elena', 'Rodríguez López', 'Pediatría', 'Lunes a Viernes: 2:00 PM - 8:00 PM', 'CMP-23456', '987654322', 'maria.rodriguez@medicore.pe', u.id_usuario
FROM usuarios u WHERE u.username = 'mrodriguez';

INSERT IGNORE INTO medicos (nombre, apellido, especialidad, horarios_atencion, numero_licencia, telefono, email, id_usuario) 
SELECT 'Pedro José', 'Martínez Silva', 'Traumatología', 'Lunes a Viernes: 8:00 AM - 4:00 PM, Sábados: 8:00 AM - 12:00 PM', 'CMP-34567', '987654323', 'pedro.martinez@medicore.pe', u.id_usuario
FROM usuarios u WHERE u.username = 'pmartinez';

INSERT IGNORE INTO medicos (nombre, apellido, especialidad, horarios_atencion, numero_licencia, telefono, email, id_usuario) 
SELECT 'Ana Patricia', 'Fernández Torres', 'Ginecología', 'Martes a Sábado: 9:00 AM - 3:00 PM', 'CMP-45678', '987654324', 'ana.fernandez@medicore.pe', u.id_usuario
FROM usuarios u WHERE u.username = 'afernandez';

INSERT IGNORE INTO medicos (nombre, apellido, especialidad, horarios_atencion, numero_licencia, telefono, email, id_usuario) 
SELECT 'Carlos Alberto', 'Sánchez Díaz', 'Neurología', 'Lunes a Viernes: 10:00 AM - 6:00 PM', 'CMP-56789', '987654325', 'carlos.sanchez@medicore.pe', u.id_usuario
FROM usuarios u WHERE u.username = 'csanchez';

-- ===============================================
-- 5. INSERTAR PACIENTES VINCULADOS A USUARIOS
-- ===============================================
INSERT IGNORE INTO pacientes (nombre, apellido, dni, correo_electronico, numero_telefono, id_usuario) 
SELECT 'Juan', 'Pérez', '12345678', 'juan.perez@email.com', '987654331', u.id_usuario
FROM usuarios u WHERE u.username = 'jperez';

INSERT IGNORE INTO pacientes (nombre, apellido, dni, correo_electronico, numero_telefono, id_usuario) 
SELECT 'María', 'López', '23456789', 'maria.lopez@email.com', '987654332', u.id_usuario
FROM usuarios u WHERE u.username = 'mlopez';

INSERT IGNORE INTO pacientes (nombre, apellido, dni, correo_electronico, numero_telefono, id_usuario) 
SELECT 'Carlos', 'Gómez', '34567890', 'carlos.gomez@email.com', '987654333', u.id_usuario
FROM usuarios u WHERE u.username = 'cgomez';

-- ===============================================
-- VERIFICAR DATOS INSERTADOS
-- ===============================================
SELECT 'USUARIOS:' as Info;
SELECT u.username, u.email, u.nombre, u.apellido, GROUP_CONCAT(r.nombre) as roles
FROM usuarios u
LEFT JOIN usuario_roles ur ON u.id_usuario = ur.id_usuario
LEFT JOIN roles r ON ur.id_rol = r.id_rol
GROUP BY u.id_usuario;

SELECT '\nMÉDICOS:' as Info;
SELECT m.nombre, m.apellido, m.especialidad, u.username as usuario
FROM medicos m
LEFT JOIN usuarios u ON m.id_usuario = u.id_usuario;

SELECT '\nPACIENTES:' as Info;
SELECT p.nombre, p.apellido, p.dni, u.username as usuario
FROM pacientes p
LEFT JOIN usuarios u ON p.id_usuario = u.id_usuario;
