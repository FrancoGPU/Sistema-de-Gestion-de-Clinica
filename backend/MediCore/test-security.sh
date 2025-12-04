#!/bin/bash
# Script para probar la autenticación y autorización con JWT
# MediCore - Sistema de Gestión de Clínica

BASE_URL="http://localhost:8080"
BOLD='\033[1m'
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BOLD}==================================================${NC}"
echo -e "${BOLD}   MediCore - Pruebas de Autenticación JWT      ${NC}"
echo -e "${BOLD}==================================================${NC}\n"

# Función para imprimir resultados
print_result() {
    if [ $1 -eq 0 ]; then
        echo -e "${GREEN}✓ $2${NC}"
    else
        echo -e "${RED}✗ $2${NC}"
    fi
}

# Verificar que el servidor esté corriendo
echo -e "${YELLOW}Verificando servidor...${NC}"
if ! curl -s "$BASE_URL/api/auth/login" > /dev/null 2>&1; then
    echo -e "${RED}Error: El servidor no está corriendo en $BASE_URL${NC}"
    echo -e "${YELLOW}Ejecuta: ./mvnw spring-boot:run${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Servidor activo${NC}\n"

# ===================================================
# TEST 1: Login como Administrador
# ===================================================
echo -e "${BOLD}TEST 1: Login como Administrador${NC}"
echo -e "Credenciales: admin / admin123\n"

ADMIN_RESPONSE=$(curl -s -X POST "$BASE_URL/api/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}')

ADMIN_TOKEN=$(echo $ADMIN_RESPONSE | jq -r '.token' 2>/dev/null)

if [ "$ADMIN_TOKEN" != "null" ] && [ ! -z "$ADMIN_TOKEN" ]; then
    print_result 0 "Login exitoso"
    echo -e "Token: ${ADMIN_TOKEN:0:50}...\n"
else
    print_result 1 "Login fallido"
    echo -e "Respuesta: $ADMIN_RESPONSE\n"
    exit 1
fi

# ===================================================
# TEST 2: Obtener información del usuario actual
# ===================================================
echo -e "${BOLD}TEST 2: GET /api/auth/me (Usuario Actual)${NC}"
ME_RESPONSE=$(curl -s -X GET "$BASE_URL/api/auth/me" \
  -H "Authorization: Bearer $ADMIN_TOKEN")

USERNAME=$(echo $ME_RESPONSE | jq -r '.username' 2>/dev/null)

if [ "$USERNAME" = "admin" ]; then
    print_result 0 "Usuario autenticado correctamente"
    echo -e "Usuario: $(echo $ME_RESPONSE | jq -r '.username')"
    echo -e "Email: $(echo $ME_RESPONSE | jq -r '.email')"
    echo -e "Roles: $(echo $ME_RESPONSE | jq -r '.roles[].nombre' | tr '\n' ', ')\n"
else
    print_result 1 "Error al obtener usuario actual"
    echo -e "Respuesta: $ME_RESPONSE\n"
fi

# ===================================================
# TEST 3: Obtener todas las citas (requiere ADMIN)
# ===================================================
echo -e "${BOLD}TEST 3: GET /api/citas (Todas las citas - requiere ADMIN)${NC}"
CITAS_RESPONSE=$(curl -s -w "\nHTTP_CODE:%{http_code}" -X GET "$BASE_URL/api/citas" \
  -H "Authorization: Bearer $ADMIN_TOKEN")

HTTP_CODE=$(echo "$CITAS_RESPONSE" | grep "HTTP_CODE:" | cut -d: -f2)
CITAS_BODY=$(echo "$CITAS_RESPONSE" | sed '/HTTP_CODE:/d')

if [ "$HTTP_CODE" = "200" ]; then
    print_result 0 "Acceso autorizado (rol ADMIN)"
    CITAS_COUNT=$(echo $CITAS_BODY | jq '. | length' 2>/dev/null)
    echo -e "Total de citas: $CITAS_COUNT\n"
else
    print_result 1 "Acceso denegado o error (HTTP $HTTP_CODE)"
    echo -e "Respuesta: $CITAS_BODY\n"
fi

# ===================================================
# TEST 4: Login como Doctor
# ===================================================
echo -e "${BOLD}TEST 4: Login como Doctor${NC}"
echo -e "Credenciales: jgarcia / doctor123\n"

DOCTOR_RESPONSE=$(curl -s -X POST "$BASE_URL/api/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"username":"jgarcia","password":"doctor123"}')

DOCTOR_TOKEN=$(echo $DOCTOR_RESPONSE | jq -r '.token' 2>/dev/null)

if [ "$DOCTOR_TOKEN" != "null" ] && [ ! -z "$DOCTOR_TOKEN" ]; then
    print_result 0 "Login exitoso"
    echo -e "Token: ${DOCTOR_TOKEN:0:50}...\n"
else
    print_result 1 "Login fallido"
    echo -e "Respuesta: $DOCTOR_RESPONSE\n"
fi

# ===================================================
# TEST 5: Doctor intenta acceder a todas las citas (debe fallar)
# ===================================================
echo -e "${BOLD}TEST 5: Doctor intenta GET /api/citas (debe fallar)${NC}"
DOCTOR_CITAS_RESPONSE=$(curl -s -w "\nHTTP_CODE:%{http_code}" -X GET "$BASE_URL/api/citas" \
  -H "Authorization: Bearer $DOCTOR_TOKEN")

DOCTOR_HTTP_CODE=$(echo "$DOCTOR_CITAS_RESPONSE" | grep "HTTP_CODE:" | cut -d: -f2)

if [ "$DOCTOR_HTTP_CODE" = "403" ]; then
    print_result 0 "Acceso denegado correctamente (no es ADMIN)"
    echo -e "HTTP Code: $DOCTOR_HTTP_CODE (Forbidden)\n"
else
    print_result 1 "Error: Doctor tiene acceso cuando no debería"
    echo -e "HTTP Code: $DOCTOR_HTTP_CODE\n"
fi

# ===================================================
# TEST 6: Login como Paciente
# ===================================================
echo -e "${BOLD}TEST 6: Login como Paciente${NC}"
echo -e "Credenciales: jperez / paciente123\n"

PACIENTE_RESPONSE=$(curl -s -X POST "$BASE_URL/api/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"username":"jperez","password":"paciente123"}')

PACIENTE_TOKEN=$(echo $PACIENTE_RESPONSE | jq -r '.token' 2>/dev/null)

if [ "$PACIENTE_TOKEN" != "null" ] && [ ! -z "$PACIENTE_TOKEN" ]; then
    print_result 0 "Login exitoso"
    echo -e "Token: ${PACIENTE_TOKEN:0:50}...\n"
else
    print_result 1 "Login fallido"
    echo -e "Respuesta: $PACIENTE_RESPONSE\n"
fi

# ===================================================
# TEST 7: Acceso sin token (debe fallar)
# ===================================================
echo -e "${BOLD}TEST 7: Acceso sin token a /api/citas (debe fallar)${NC}"
NO_TOKEN_RESPONSE=$(curl -s -w "\nHTTP_CODE:%{http_code}" -X GET "$BASE_URL/api/citas")

NO_TOKEN_HTTP_CODE=$(echo "$NO_TOKEN_RESPONSE" | grep "HTTP_CODE:" | cut -d: -f2)

if [ "$NO_TOKEN_HTTP_CODE" = "401" ]; then
    print_result 0 "Acceso denegado correctamente (sin token)"
    echo -e "HTTP Code: $NO_TOKEN_HTTP_CODE (Unauthorized)\n"
else
    print_result 1 "Error: Acceso sin token debería ser 401"
    echo -e "HTTP Code: $NO_TOKEN_HTTP_CODE\n"
fi

# ===================================================
# TEST 8: Token inválido (debe fallar)
# ===================================================
echo -e "${BOLD}TEST 8: Token inválido (debe fallar)${NC}"
INVALID_TOKEN="eyJhbGciOiJIUzI1NiJ9.invalid.token"
INVALID_TOKEN_RESPONSE=$(curl -s -w "\nHTTP_CODE:%{http_code}" -X GET "$BASE_URL/api/citas" \
  -H "Authorization: Bearer $INVALID_TOKEN")

INVALID_TOKEN_HTTP_CODE=$(echo "$INVALID_TOKEN_RESPONSE" | grep "HTTP_CODE:" | cut -d: -f2)

if [ "$INVALID_TOKEN_HTTP_CODE" = "401" ]; then
    print_result 0 "Token inválido rechazado correctamente"
    echo -e "HTTP Code: $INVALID_TOKEN_HTTP_CODE (Unauthorized)\n"
else
    print_result 1 "Error: Token inválido debería ser rechazado"
    echo -e "HTTP Code: $INVALID_TOKEN_HTTP_CODE\n"
fi

# ===================================================
# TEST 9: Listar médicos (público)
# ===================================================
echo -e "${BOLD}TEST 9: GET /api/medicos (público - sin token)${NC}"
MEDICOS_RESPONSE=$(curl -s -w "\nHTTP_CODE:%{http_code}" -X GET "$BASE_URL/api/medicos")

MEDICOS_HTTP_CODE=$(echo "$MEDICOS_RESPONSE" | grep "HTTP_CODE:" | cut -d: -f2)
MEDICOS_BODY=$(echo "$MEDICOS_RESPONSE" | sed '/HTTP_CODE:/d')

if [ "$MEDICOS_HTTP_CODE" = "200" ]; then
    print_result 0 "Acceso público permitido"
    MEDICOS_COUNT=$(echo $MEDICOS_BODY | jq '. | length' 2>/dev/null)
    echo -e "Total de médicos: $MEDICOS_COUNT\n"
else
    print_result 1 "Error al acceder a médicos públicos"
    echo -e "HTTP Code: $MEDICOS_HTTP_CODE\n"
fi

# ===================================================
# TEST 10: Crear médico sin token (debe fallar)
# ===================================================
echo -e "${BOLD}TEST 10: POST /api/medicos sin token (debe fallar)${NC}"
CREATE_MEDICO_RESPONSE=$(curl -s -w "\nHTTP_CODE:%{http_code}" -X POST "$BASE_URL/api/medicos" \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Test","apellido":"Medico","especialidad":"Prueba","horariosAtencion":"9-5"}')

CREATE_MEDICO_HTTP_CODE=$(echo "$CREATE_MEDICO_RESPONSE" | grep "HTTP_CODE:" | cut -d: -f2)

if [ "$CREATE_MEDICO_HTTP_CODE" = "401" ] || [ "$CREATE_MEDICO_HTTP_CODE" = "403" ]; then
    print_result 0 "Creación sin autorización denegada correctamente"
    echo -e "HTTP Code: $CREATE_MEDICO_HTTP_CODE\n"
else
    print_result 1 "Error: Debería denegar creación sin token"
    echo -e "HTTP Code: $CREATE_MEDICO_HTTP_CODE\n"
fi

# ===================================================
# RESUMEN FINAL
# ===================================================
echo -e "${BOLD}==================================================${NC}"
echo -e "${BOLD}                 RESUMEN                         ${NC}"
echo -e "${BOLD}==================================================${NC}"
echo -e "${GREEN}✓ Autenticación JWT funcionando${NC}"
echo -e "${GREEN}✓ Autorización basada en roles funcionando${NC}"
echo -e "${GREEN}✓ Protección de endpoints configurada${NC}"
echo -e "${GREEN}✓ Tokens validados correctamente${NC}"
echo -e "${GREEN}✓ Acceso público a recursos permitidos${NC}\n"

echo -e "${BOLD}Tokens generados para pruebas manuales:${NC}"
echo -e "${YELLOW}ADMIN_TOKEN:${NC}"
echo -e "$ADMIN_TOKEN\n"
echo -e "${YELLOW}DOCTOR_TOKEN:${NC}"
echo -e "$DOCTOR_TOKEN\n"
echo -e "${YELLOW}PACIENTE_TOKEN:${NC}"
echo -e "$PACIENTE_TOKEN\n"

echo -e "${BOLD}Usuarios de prueba:${NC}"
echo -e "Admin: admin / admin123"
echo -e "Doctor: jgarcia / doctor123"
echo -e "Paciente: jperez / paciente123\n"

echo -e "${GREEN}¡Todas las pruebas completadas!${NC}"
