package pe.edu.utp.MediCore.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;

/**
 * Proveedor JWT para generar, validar y extraer información de tokens
 */
@Component
public class JwtTokenProvider {
    
    private static final Logger logger = LoggerFactory.getLogger(JwtTokenProvider.class);
    
    @Value("${app.jwtSecret:mySecretKeyForJWTTokenGenerationAndValidationPleaseChangeInProduction12345}")
    private String jwtSecret;
    
    @Value("${app.jwtExpirationMs:86400000}") // 24 horas por defecto
    private long jwtExpirationMs;
    
    private SecretKey getSigningKey() {
        return Keys.hmacShaKeyFor(jwtSecret.getBytes());
    }
    
    /**
     * Generar token JWT a partir de la autenticación
     */
    public String generateToken(Authentication authentication) {
        String username = authentication.getName();
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + jwtExpirationMs);
        
        SecretKey key = getSigningKey();
        
        return Jwts.builder()
                .subject(username)
                .issuedAt(now)
                .expiration(expiryDate)
                .claim("roles", authentication.getAuthorities().stream()
                        .map(auth -> auth.getAuthority())
                        .toList())
                .signWith(key, SignatureAlgorithm.HS512)
                .compact();
    }
    
    /**
     * Obtener el username/subject del token
     */
    public String getUsernameFromToken(String token) {
        return getClaimsFromToken(token).getSubject();
    }
    
    /**
     * Validar que el token sea válido (firma, expiración, etc.)
     */
    public boolean validateToken(String token) {
        try {
            SecretKey key = getSigningKey();
            Jwts.parser()
                    .verifyingKeyResolver(ctx -> key)
                    .build()
                    .parseSignedClaims(token);
            return true;
        } catch (SecurityException ex) {
            logger.error("Firma JWT inválida: {}", ex.getMessage());
        } catch (MalformedJwtException ex) {
            logger.error("Token JWT inválido: {}", ex.getMessage());
        } catch (ExpiredJwtException ex) {
            logger.error("Token JWT expirado: {}", ex.getMessage());
        } catch (UnsupportedJwtException ex) {
            logger.error("Token JWT no soportado: {}", ex.getMessage());
        } catch (IllegalArgumentException ex) {
            logger.error("Token JWT vacio o inválido: {}", ex.getMessage());
        }
        return false;
    }
    
    /**
     * Extraer claims del token
     */
    public Claims getClaimsFromToken(String token) {
        SecretKey key = getSigningKey();
        return Jwts.parser()
                .verifyingKeyResolver(ctx -> key)
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }
}
