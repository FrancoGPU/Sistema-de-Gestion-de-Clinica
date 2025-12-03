package pe.edu.utp.MediCore.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO para respuesta de autenticación (contiene el token JWT)
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AuthResponseDTO {
    
    private String token;
    private String tipo = "Bearer";
    private String username;
    private String email;
    
    public AuthResponseDTO(String token, String username, String email) {
        this.token = token;
        this.username = username;
        this.email = email;
    }
}
