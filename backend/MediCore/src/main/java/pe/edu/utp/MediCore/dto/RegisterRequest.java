package pe.edu.utp.MediCore.dto;

import lombok.Data;
import java.time.LocalDate;

@Data
public class RegisterRequest {
    private String nombre;
    private String apellido;
    private String dni;
    private String telefono;
    private String email;
    private String password;
    private LocalDate fechaNacimiento;
}
