package pe.edu.utp.MediCore.test;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

/**
 * Utilidad para generar y verificar hashes BCrypt
 */
public class BCryptTest {
    
    public static void main(String[] args) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        
        // Contraseñas a testear
        String[] passwords = {"admin123", "doctor123", "paciente123"};
        
        System.out.println("=== GENERANDO HASHES BCRYPT ===\n");
        
        for (String password : passwords) {
            String hash = encoder.encode(password);
            System.out.println("Contraseña: " + password);
            System.out.println("Hash: " + hash);
            System.out.println("Verificación: " + encoder.matches(password, hash));
            System.out.println();
        }
        
        System.out.println("\n=== VERIFICANDO HASHES EXISTENTES ===\n");
        
        // Hash actual de admin en la BD
        String adminHash = "$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy";
        System.out.println("Hash de 'admin' en BD: " + adminHash);
        System.out.println("¿Coincide con 'admin123'? " + encoder.matches("admin123", adminHash));
        
        // Hash actual de jgarcia en la BD
        String doctorHash = "$2a$10$xn2eA1a6.Izt8Bm8G2FekeGU4g/EJ6z5lYhDLdxXQWqU7dOhH9npy";
        System.out.println("\nHash de 'jgarcia' en BD: " + doctorHash);
        System.out.println("¿Coincide con 'doctor123'? " + encoder.matches("doctor123", doctorHash));
        
        // Hash actual de jperez en la BD
        String pacienteHash = "$2a$10$3E8P3GiNsqC5F4cH7bXZpe5g9PKQK4CXoK0nVnLKYMZG7dYHJ8hqW";
        System.out.println("\nHash de 'jperez' en BD: " + pacienteHash);
        System.out.println("¿Coincide con 'paciente123'? " + encoder.matches("paciente123", pacienteHash));
        
        System.out.println("\n=== SQL UPDATES ===\n");
        
        String newAdminHash = encoder.encode("admin123");
        String newDoctorHash = encoder.encode("doctor123");
        String newPacienteHash = encoder.encode("paciente123");
        
        System.out.println("-- Actualizar contraseñas (COPIAR Y EJECUTAR EN MySQL)");
        System.out.println("UPDATE usuarios SET password = '" + newAdminHash + "' WHERE username IN ('admin', 'test_citas');");
        System.out.println("UPDATE usuarios SET password = '" + newDoctorHash + "' WHERE username IN ('jgarcia', 'mrodriguez', 'pmartinez', 'afernandez', 'csanchez');");
        System.out.println("UPDATE usuarios SET password = '" + newPacienteHash + "' WHERE username IN ('jperez', 'mlopez', 'cgomez');");
    }
}
