-- Script para insertar datos de prueba con usuarios, roles y relaciones
-- Para MediCore Sistema de Gestión de Clínica

-- ===============================================
-- 1. INSERTAR ROLES
-- ===============================================
INSERT INTO roles (nombre, descripcion) VALUES
('ADMIN', 'Administrador del sistema con acceso completo'),
('DOCTOR', 'Médico con acceso a gestión de citas y pacientes'),
('PACIENTE', 'Paciente con acceso limitado a sus propias citas')
ON DUPLICATE KEY UPDATE descripcion=VALUES(descripcion);

-- ===============================================
-- 2. INSERTAR USUARIOS
-- ===============================================
-- Contraseñas BCrypt (todas son: admin123, doctor123, paciente123)
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
-- 3. ASIGNAR ROLES A USUARIOS
-- ===============================================
INSERT INTO usuario_roles (id_usuario, id_rol)
SELECT u.id_usuario, r.id_rol
FROM usuarios u, roles r
WHERE u.username = 'admin' AND r.nombre = 'ADMIN';

-- Asignar rol DOCTOR a médicos
INSERT INTO usuario_roles (id_usuario, id_rol)
SELECT u.id_usuario, r.id_rol
FROM usuarios u, roles r
WHERE u.username IN ('jgarcia', 'mrodriguez', 'pmartinez', 'afernandez', 'csanchez') 
AND r.nombre = 'DOCTOR';

-- Asignar rol PACIENTE a pacientes
INSERT INTO usuario_roles (id_usuario, id_rol)
SELECT u.id_usuario, r.id_rol
FROM usuarios u, roles r
WHERE u.username IN ('jperez', 'mlopez', 'cgomez')
AND r.nombre = 'PACIENTE';

-- ===============================================
-- 4. INSERTAR MÉDICOS
-- ===============================================
INSERT INTO medicos (nombre, apellido, especialidad, horarios_atencion, numero_licencia, telefono, email, id_usuario) 
SELECT 'Juan Carlos', 'García Pérez', 'Cardiología', 'Lunes a Viernes: 8:00 AM - 2:00 PM', 'CMP-12345', '987654321', 'juan.garcia@medicore.pe', id_usuario
FROM usuarios WHERE username = 'jgarcia';

INSERT INTO medicos (nombre, apellido, especialidad, horarios_atencion, numero_licencia, telefono, email, id_usuario) 
SELECT 'María Elena', 'Rodríguez López', 'Pediatría', 'Lunes a Viernes: 2:00 PM - 8:00 PM', 'CMP-23456', '987654322', 'maria.rodriguez@medicore.pe', id_usuario
FROM usuarios WHERE username = 'mrodriguez';

INSERT INTO medicos (nombre, apellido, especialidad, horarios_atencion, numero_licencia, telefono, email, id_usuario) 
SELECT 'Pedro José', 'Martínez Silva', 'Traumatología', 'Lunes a Viernes: 8:00 AM - 4:00 PM, Sábados: 8:00 AM - 12:00 PM', 'CMP-34567', '987654323', 'pedro.martinez@medicore.pe', id_usuario
FROM usuarios WHERE username = 'pmartinez';

INSERT INTO medicos (nombre, apellido, especialidad, horarios_atencion, numero_licencia, telefono, email, id_usuario) 
SELECT 'Ana Patricia', 'Fernández Torres', 'Ginecología', 'Martes a Sábado: 9:00 AM - 3:00 PM', 'CMP-45678', '987654324', 'ana.fernandez@medicore.pe', id_usuario
FROM usuarios WHERE username = 'afernandez';

INSERT INTO medicos (nombre, apellido, especialidad, horarios_atencion, numero_licencia, telefono, email, id_usuario) 
SELECT 'Carlos Alberto', 'Sánchez Díaz', 'Neurología', 'Lunes a Viernes: 10:00 AM - 6:00 PM', 'CMP-56789', '987654325', 'carlos.sanchez@medicore.pe', id_usuario
FROM usuarios WHERE username = 'csanchez';

-- Médicos adicionales sin usuarios (acceso público)
INSERT INTO medicos (nombre, apellido, especialidad, horarios_atencion, numero_licencia, telefono, email, id_usuario) VALUES
('Laura Sofía', 'González Ramírez', 'Dermatología', 'Lunes, Miércoles, Viernes: 8:00 AM - 2:00 PM', 'CMP-67890', '987654326', 'laura.gonzalez@medicore.pe', NULL),
('Roberto Miguel', 'Vargas Castro', 'Oftalmología', 'Martes a Sábado: 10:00 AM - 4:00 PM', 'CMP-78901', '987654327', 'roberto.vargas@medicore.pe', NULL),
('Carmen Rosa', 'Flores Mendoza', 'Psiquiatría', 'Lunes a Viernes: 3:00 PM - 9:00 PM', 'CMP-89012', '987654328', 'carmen.flores@medicore.pe', NULL),
('José Luis', 'Rojas Paredes', 'Medicina General', 'Lunes a Sábado: 7:00 AM - 1:00 PM', 'CMP-90123', '987654329', 'jose.rojas@medicore.pe', NULL),
('Isabel Cristina', 'Cruz Delgado', 'Endocrinología', 'Lunes a Viernes: 9:00 AM - 5:00 PM', 'CMP-01234', '987654330', 'isabel.cruz@medicore.pe', NULL);

-- ===============================================
-- 5. INSERTAR PACIENTES
-- ===============================================
INSERT INTO pacientes (nombre, apellido, dni, correo_electronico, numero_telefono, id_usuario) 
SELECT 'Juan', 'Pérez', '12345678', 'juan.perez@email.com', '987654331', id_usuario
FROM usuarios WHERE username = 'jperez';

INSERT INTO pacientes (nombre, apellido, dni, correo_electronico, numero_telefono, id_usuario) 
SELECT 'María', 'López', '23456789', 'maria.lopez@email.com', '987654332', id_usuario
FROM usuarios WHERE username = 'mlopez';

INSERT INTO pacientes (nombre, apellido, dni, correo_electronico, numero_telefono, id_usuario) 
SELECT 'Carlos', 'Gómez', '34567890', 'carlos.gomez@email.com', '987654333', id_usuario
FROM usuarios WHERE username = 'cgomez';

-- Pacientes adicionales sin usuarios (registro público)
INSERT INTO pacientes (nombre, apellido, dni, correo_electronico, numero_telefono, id_usuario) VALUES
('Ana', 'Martínez', '45678901', 'ana.martinez@email.com', '987654334', NULL),
('Luis', 'Fernández', '56789012', 'luis.fernandez@email.com', '987654335', NULL),
('Carmen', 'Torres', '67890123', 'carmen.torres@email.com', '987654336', NULL),
('Roberto', 'Sánchez', '78901234', 'roberto.sanchez@email.com', '987654337', NULL),
('Patricia', 'Ramírez', '89012345', 'patricia.ramirez@email.com', '987654338', NULL);

-- ===============================================
-- 6. INSERTAR CITAS DE EJEMPLO
-- ===============================================
INSERT INTO citas_medicas (fecha_hora, motivo, estado, id_paciente, id_medico) VALUES
('2024-12-05 10:00:00', 'Control de presión arterial', 'PROGRAMADA', 1, 1),
('2024-12-05 15:00:00', 'Consulta pediátrica', 'PROGRAMADA', 2, 2),
('2024-12-06 09:00:00', 'Revisión de resultados', 'PROGRAMADA', 3, 3),
('2024-12-03 11:00:00', 'Control post-operatorio', 'COMPLETADA', 1, 3),
('2024-12-02 16:00:00', 'Consulta general', 'CANCELADA', 2, 1);

-- ===============================================
-- RESUMEN DE USUARIOS DE PRUEBA
-- ===============================================
-- 
-- ADMINISTRADOR:
--   Usuario: admin
--   Contraseña: admin123
--   Email: admin@medicore.pe
-- 
-- DOCTORES:
--   Usuario: jgarcia / Contraseña: doctor123 (Juan Carlos García - Cardiología)
--   Usuario: mrodriguez / Contraseña: doctor123 (María Elena Rodríguez - Pediatría)
--   Usuario: pmartinez / Contraseña: doctor123 (Pedro José Martínez - Traumatología)
--   Usuario: afernandez / Contraseña: doctor123 (Ana Patricia Fernández - Ginecología)
--   Usuario: csanchez / Contraseña: doctor123 (Carlos Alberto Sánchez - Neurología)
-- 
-- PACIENTES:
--   Usuario: jperez / Contraseña: paciente123 (Juan Pérez)
--   Usuario: mlopez / Contraseña: paciente123 (María López)
--   Usuario: cgomez / Contraseña: paciente123 (Carlos Gómez)
-- 
-- ===============================================
