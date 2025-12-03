# Validaciones y medidas de seguridad (servidor)

Resumen de las prácticas aplicadas en el backend Spring Boot para validar datos y mitigar riesgos comunes.

- Validaciones en entidades / DTOs:
  - `@NotNull`, `@NotBlank` para campos obligatorios (`CitaMedica.fechaHora`, `Paciente.nombre`, etc.).
  - `@Pattern` para formatos (ej.: `Paciente.dni` con `\d{8}`, `Paciente.numeroTelefono` con `\d{9}`).
  - `@Email` para correos electrónicos.
  - Estas anotaciones se usan junto con `@Valid` en controladores para validar entradas provenientes del cliente.

- Mitigación contra Inyección SQL:
  - Uso exclusivo de JPA / Spring Data (`JpaRepository`) y consultas parametrizadas.
  - No se concatenan SQL dinámicos a mano; evitar `EntityManager.createNativeQuery` sin parámetros.
  - Las consultas `@Query` en los repositorios usan JPQL y parámetros nombrados, lo que previene inyección SQL.

- Mitigación contra Cross-Site Scripting (XSS):
  - El backend devuelve JSON; asegurar que el front-end escape cualquier contenido que se renderice en HTML.
  - Si se usan plantillas Thymeleaf (no presente en este proyecto por defecto), Thymeleaf escapa variables por defecto (`th:text`). Para contenido HTML confiable, aplicar sanitización antes de incluirlo.
  - Recomendación: usar librerías de sanitización en cliente y servidor (ej. OWASP Java HTML Sanitizer) si se acepta HTML de entrada.

- Control de sesión y CORS:
  - Los controladores usan `@CrossOrigin(origins = "http://localhost:4200")` para permitir al frontend Angular consumir la API en desarrollo. En producción, restringir a los orígenes oficiales y usar autenticación/autorization.

- Manejo de errores y códigos HTTP:
  - Para conflictos de reserva devolvemos `409 CONFLICT`.
  - Para entradas inválidas, se aprovecha `@Valid` para devolver `400 Bad Request` con mensajes de validación.

- Auditoría y logging:
  - Registrar intentos fallidos de reserva y excepciones relevantes (no incluido en este parche — se recomienda añadir logs estructurados con niveles adecuados).

- Concurrencia en reservas (control de cupos):
  - Validación preliminar en la capa de servicio (`CitaMedicaService`) usando `existsByMedicoAndFechaHora`.
  - Restricción única a nivel de base de datos sobre `(id_medico, fecha_hora)` para evitar condiciones de carrera.
  - Captura de `DataIntegrityViolationException` para traducir errores de restricción a `409 Conflict`.

Ejemplos de anotaciones ya presentes en el código:

```java
@NotBlank(message = "El nombre es obligatorio")
@Column(nullable = false, length = 100)
private String nombre;

@Pattern(regexp = "\\d{8}", message = "El DNI debe tener 8 dígitos")
@Column(nullable = false, unique = true, length = 8)
private String dni;
```

Recomendaciones adicionales:
- Añadir autenticación (JWT/OAuth2) y autorización por roles (p. ej. permitir sólo a pacientes crear sus propias citas y al personal sanitario gestionar citas ajenas).
- Añadir pruebas de integración para la lógica de reservas (casos de competencia y conflictos simultáneos).

