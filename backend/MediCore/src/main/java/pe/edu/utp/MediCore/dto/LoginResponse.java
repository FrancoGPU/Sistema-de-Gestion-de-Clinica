package pe.edu.utp.MediCore.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LoginResponse {
    private Long id;
    private String username;
    private String role;
    private String nombre; // Nombre real del usuario (Paciente o Médico)
    private Long profileId; // ID del Paciente o Médico asociado
    private String token; // JWT Token
}
