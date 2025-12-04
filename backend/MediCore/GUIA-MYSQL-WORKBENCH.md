# 🚀 GUÍA RÁPIDA - Configuración MySQL Local con Workbench

## ✅ CAMBIOS REALIZADOS:

1. ✅ **phpMyAdmin eliminado** del Docker Compose
2. ✅ **MySQL configurado** para conexión local (puerto 3306)
3. ✅ **Script SQL completo** creado para MySQL Workbench
4. ✅ **Docker simplificado** - solo MySQL

---

## 📋 PASOS PARA CONFIGURAR TODO:

### **PASO 1: Conectar MySQL Workbench**

Abre MySQL Workbench y crea una nueva conexión con estos datos:

```
Connection Name: MediCore Local
Hostname: 127.0.0.1
Port: 3306
Username: root
Password: medicore_root_pass
```

Clic en **"Test Connection"** y luego **"OK"**

---

### **PASO 2: Ejecutar el Script SQL**

1. Abre la conexión que creaste
2. Ve a **File → Open SQL Script**
3. Selecciona el archivo:
   ```
   /workspaces/Sistema-de-Gestion-de-Clinica/backend/MediCore/medicore-workbench-setup.sql
   ```
4. Clic en el botón **⚡ Execute** (o presiona `Ctrl+Shift+Enter`)
5. Espera a que termine (verás mensajes de confirmación)

**El script hará:**
- ✅ Crear la base de datos `medicore`
- ✅ Crear todas las tablas necesarias
- ✅ Insertar roles (ADMIN, DOCTOR, PACIENTE)
- ✅ Insertar usuarios de prueba con contraseñas encriptadas
- ✅ Insertar médicos y pacientes de ejemplo
- ✅ Insertar citas y campañas de salud
- ✅ Mostrar resumen de datos insertados

---

## 🔐 CREDENCIALES DE ACCESO:

### **Administrador:**
```
Usuario: admin
Contraseña: admin123
Email: admin@medicore.pe
```

### **Doctores (todos con contraseña: doctor123):**
```
jgarcia       - Juan Carlos García (Cardiología)
mrodriguez    - María Elena Rodríguez (Pediatría)
pmartinez     - Pedro José Martínez (Traumatología)
afernandez    - Ana Patricia Fernández (Ginecología)
csanchez      - Carlos Alberto Sánchez (Neurología)
```

### **Pacientes (todos con contraseña: paciente123):**
```
jperez        - Juan Pérez
mlopez        - María López
cgomez        - Carlos Gómez
```

---

## 🚀 LEVANTAR EL SISTEMA COMPLETO:

### **1. Docker (MySQL) - Ya está corriendo** ✅
```bash
cd /workspaces/Sistema-de-Gestion-de-Clinica/backend/MediCore
docker compose ps
```

### **2. Backend (Spring Boot)**
```bash
cd /workspaces/Sistema-de-Gestion-de-Clinica/backend/MediCore
./mvnw spring-boot:run
```

Espera a ver:
```
Started MediCoreApplication in X.XXX seconds
```

### **3. Frontend (Angular)** - En NUEVA terminal
```bash
cd /workspaces/Sistema-de-Gestion-de-Clinica/frontend/Sistema-de-Gestion-de-Clinica
npm install
npm start
```

---

## 🌐 URLS DEL SISTEMA:

| Servicio | URL | Puerto |
|----------|-----|--------|
| **Frontend** | http://localhost:4200 | 4200 |
| **Backend API** | http://localhost:8080 | 8080 |
| **MySQL** | localhost | 3306 |

---

## 🧪 PROBAR QUE FUNCIONA:

### **Test 1: Verificar Backend**
```bash
curl http://localhost:8080/api/medicos
```

Deberías ver la lista de médicos en JSON.

### **Test 2: Login**
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'
```

Deberías recibir un token JWT.

### **Test 3: Frontend**
1. Abre: http://localhost:4200
2. Haz clic en "Administrador"
3. Las credenciales ya estarán pre-llenadas
4. Clic en "Iniciar Sesión"

---

## 📊 VERIFICAR DATOS EN WORKBENCH:

### Ver todos los usuarios con sus roles:
```sql
SELECT u.username, u.email, u.nombre, u.apellido, GROUP_CONCAT(r.nombre) as roles
FROM usuarios u
LEFT JOIN usuario_roles ur ON u.id_usuario = ur.id_usuario
LEFT JOIN roles r ON ur.id_rol = r.id_rol
GROUP BY u.id_usuario;
```

### Ver médicos con usuarios vinculados:
```sql
SELECT m.nombre, m.apellido, m.especialidad, u.username as usuario_vinculado
FROM medicos m
LEFT JOIN usuarios u ON m.id_usuario = u.id_usuario;
```

### Ver pacientes con usuarios vinculados:
```sql
SELECT p.nombre, p.apellido, p.dni, u.username as usuario_vinculado
FROM pacientes p
LEFT JOIN usuarios u ON p.id_usuario = u.id_usuario;
```

### Ver todas las citas:
```sql
SELECT 
    c.id_cita,
    c.fecha_hora,
    c.motivo,
    c.estado,
    CONCAT(p.nombre, ' ', p.apellido) as paciente,
    CONCAT(m.nombre, ' ', m.apellido) as medico,
    m.especialidad
FROM citas_medicas c
JOIN pacientes p ON c.id_paciente = p.id_paciente
JOIN medicos m ON c.id_medico = m.id_medico
ORDER BY c.fecha_hora DESC;
```

---

## 🛠️ COMANDOS ÚTILES:

### Reiniciar MySQL en Docker:
```bash
cd /workspaces/Sistema-de-Gestion-de-Clinica/backend/MediCore
docker compose restart db
```

### Ver logs de MySQL:
```bash
docker compose logs -f db
```

### Detener MySQL:
```bash
docker compose down
```

### Limpiar completamente (⚠️ elimina datos):
```bash
docker compose down -v
rm -rf mysql-data
docker compose up -d
# Luego re-ejecutar el script SQL en Workbench
```

---

## 🔍 SOLUCIÓN DE PROBLEMAS:

### ❌ Error: "Can't connect to MySQL server"
```bash
# Verificar que Docker esté corriendo
docker compose ps

# Reiniciar MySQL
docker compose restart db

# Esperar 10 segundos
sleep 10

# Probar conexión
docker exec medicore-db mysqladmin ping -h localhost -u root -pmedicore_root_pass
```

### ❌ Error: "Access denied for user 'root'"
- Verificar que estás usando la contraseña: `medicore_root_pass`
- En Workbench: Conexión → Edit Connection → Password: medicore_root_pass

### ❌ Error: "Database 'medicore' doesn't exist"
- Ejecutar el script SQL completo en Workbench
- El script crea automáticamente la base de datos

### ❌ Frontend no puede conectar con Backend
- Verificar que el backend esté corriendo en puerto 8080
- Verificar que no haya errores en la consola del backend
- El CORS ya está configurado para `localhost:4200`

---

## 📝 NOTAS IMPORTANTES:

1. **Contraseñas BCrypt**: Todas las contraseñas están encriptadas con BCrypt
2. **Datos de Prueba**: El script incluye 8 usuarios, 10 médicos, 8 pacientes, 5 citas
3. **Roles**: ADMIN, DOCTOR, PACIENTE - configurados correctamente
4. **JWT**: Tokens válidos por 24 horas
5. **CORS**: Configurado para Angular (localhost:4200)

---

## ✅ CHECKLIST FINAL:

- [ ] MySQL Workbench conectado a `medicore`
- [ ] Script SQL ejecutado sin errores
- [ ] Datos verificados en Workbench
- [ ] Docker MySQL corriendo (`docker compose ps`)
- [ ] Backend Spring Boot iniciado (puerto 8080)
- [ ] Frontend Angular iniciado (puerto 4200)
- [ ] Login funcionando en http://localhost:4200

---

**¡Tu sistema MediCore está listo para usar!** 🎉
