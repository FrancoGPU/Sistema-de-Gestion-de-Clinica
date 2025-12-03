# Diagrama Entidad-Relación (DER)

Se incluye diagrama en formato Mermaid para visualizar las entidades principales y sus relaciones (PK, FK).

```mermaid
erDiagram
    PACIENTES {
        LONG idPaciente PK
        STRING nombre
        STRING apellido
        STRING dni
        STRING correoElectronico
        STRING numeroTelefono
    }

    MEDICOS {
        LONG idMedico PK
        STRING nombre
        STRING apellido
        STRING especialidad
        STRING horariosAtencion
        STRING numeroLicencia
        STRING telefono
        STRING email
    }

    CITAS_MEDICAS {
        LONG idCita PK
        DATETIME fecha_hora
        LONG id_paciente FK
        LONG id_medico FK
        STRING estado
        STRING motivo
        STRING observaciones
    }

    PACIENTES ||--o{ CITAS_MEDICAS : "tiene"
    MEDICOS ||--o{ CITAS_MEDICAS : "agenda"
```

Notas:
- La tabla `citas_medicas` contiene una restricción UNIQUE sobre `(id_medico, fecha_hora)` para evitar doble reserva exacta de un mismo horario.
- Se usan claves foráneas `id_paciente` -> `pacientes.idPaciente` y `id_medico` -> `medicos.idMedico` para asegurar integridad referencial.

Puedes renderizar este diagrama en GitHub/GitLab que soporten Mermaid o usar un visualizador Mermaid local.
