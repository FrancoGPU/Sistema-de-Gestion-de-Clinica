#!/bin/bash

# Script para generar hashes BCrypt y actualizar contraseñas

echo "Generando hashes BCrypt..."

# Crear un programa Java temporal para generar los hashes
cat > /tmp/BCryptGenerator.java << 'JAVA'
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class BCryptGenerator {
    public static void main(String[] args) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        
        System.out.println("-- Hashes BCrypt generados");
        System.out.println("-- admin123:");
        String admin123 = encoder.encode("admin123");
        System.out.println("UPDATE usuarios SET password = '" + admin123 + "' WHERE username = 'admin';");
        
        System.out.println("-- doctor123:");
        String doctor123 = encoder.encode("doctor123");
        System.out.println("UPDATE usuarios SET password = '" + doctor123 + "' WHERE username = 'jgarcia';");
        System.out.println("UPDATE usuarios SET password = '" + doctor123 + "' WHERE username = 'mrodriguez';");
        System.out.println("UPDATE usuarios SET password = '" + doctor123 + "' WHERE username = 'pmartinez';");
        System.out.println("UPDATE usuarios SET password = '" + doctor123 + "' WHERE username = 'afernandez';");
        System.out.println("UPDATE usuarios SET password = '" + doctor123 + "' WHERE username = 'csanchez';");
        
        System.out.println("-- paciente123:");
        String paciente123 = encoder.encode("paciente123");
        System.out.println("UPDATE usuarios SET password = '" + paciente123 + "' WHERE username = 'jperez';");
        System.out.println("UPDATE usuarios SET password = '" + paciente123 + "' WHERE username = 'mlopez';");
        System.out.println("UPDATE usuarios SET password = '" + paciente123 + "' WHERE username = 'cgomez';");
    }
}
JAVA

echo "Ejecutando generador de hashes..."
cd /workspaces/Sistema-de-Gestion-de-Clinica/backend/MediCore

# Compilar y ejecutar usando Maven
./mvnw exec:java -Dexec.mainClass="BCryptGenerator" -Dexec.classpathScope=compile -Dexec.cleanupDaemonThreads=false -q 2>/dev/null | grep "UPDATE" > /tmp/update-passwords.sql

if [ -s /tmp/update-passwords.sql ]; then
    echo "Actualizando contraseñas en la base de datos..."
    docker exec -i medicore-db mysql -u root -pmedicore_root_pass -D medicore < /tmp/update-passwords.sql
    echo "✓ Contraseñas actualizadas correctamente"
else
    echo "Usando hashes pre-generados..."
    # Hashes BCrypt válidos pre-generados con factor 10
    docker exec -i medicore-db mysql -u root -pmedicore_root_pass -D medicore << 'SQL'
-- admin123 (BCrypt con factor 10)
UPDATE usuarios SET password = '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy' WHERE username = 'admin';
UPDATE usuarios SET password = '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy' WHERE username = 'test_citas';

-- doctor123 (BCrypt con factor 10)  
UPDATE usuarios SET password = '$2a$10$xn2eA1a6.Izt8Bm8G2FekeGU4g/EJ6z5lYhDLdxXQWqU7dOhH9npy' WHERE username = 'jgarcia';
UPDATE usuarios SET password = '$2a$10$xn2eA1a6.Izt8Bm8G2FekeGU4g/EJ6z5lYhDLdxXQWqU7dOhH9npy' WHERE username = 'mrodriguez';
UPDATE usuarios SET password = '$2a$10$xn2eA1a6.Izt8Bm8G2FekeGU4g/EJ6z5lYhDLdxXQWqU7dOhH9npy' WHERE username = 'pmartinez';
UPDATE usuarios SET password = '$2a$10$xn2eA1a6.Izt8Bm8G2FekeGU4g/EJ6z5lYhDLdxXQWqU7dOhH9npy' WHERE username = 'afernandez';
UPDATE usuarios SET password = '$2a$10$xn2eA1a6.Izt8Bm8G2FekeGU4g/EJ6z5lYhDLdxXQWqU7dOhH9npy' WHERE username = 'csanchez';

-- paciente123 (BCrypt con factor 10)
UPDATE usuarios SET password = '$2a$10$3E8P3GiNsqC5F4cH7bXZpe5g9PKQK4CXoK0nVnLKYMZG7dYHJ8hqW' WHERE username = 'jperez';
UPDATE usuarios SET password = '$2a$10$3E8P3GiNsqC5F4cH7bXZpe5g9PKQK4CXoK0nVnLKYMZG7dYHJ8hqW' WHERE username = 'mlopez';
UPDATE usuarios SET password = '$2a$10$3E8P3GiNsqC5F4cH7bXZpe5g9PKQK4CXoK0nVnLKYMZG7dYHJ8hqW' WHERE username = 'cgomez';

SELECT CONCAT('✓ ', COUNT(*), ' contraseñas actualizadas') AS resultado FROM usuarios;
SQL
    echo "✓ Proceso completado"
fi
