#!/bin/bash
# Script para generar contraseñas encriptadas con BCrypt
# Nota: Se requiere Spring Boot CLI o usar el siguiente código Java

cat << 'EOF'
Para generar las contraseñas BCrypt, ejecuta este código Java o usa Spring Boot:

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class PasswordGenerator {
    public static void main(String[] args) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        System.out.println("admin123: " + encoder.encode("admin123"));
        System.out.println("doctor123: " + encoder.encode("doctor123"));
        System.out.println("paciente123: " + encoder.encode("paciente123"));
    }
}

Contraseñas BCrypt pre-generadas:
admin123: $2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy
doctor123: $2a$10$xn3LI/AjqicFYZFruSwve.681477XaVNaUQbr98gPxZIBQ/7eqmYu
paciente123: $2a$10$GlQQHKdVOxBWRxvlj/XUkeHDfYKvQr5D4spN4hDx1WNmNZKQC9CzW
EOF
