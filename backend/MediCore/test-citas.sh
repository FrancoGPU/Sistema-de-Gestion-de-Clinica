#!/bin/bash

# Script para probar casos de creación de citas médicas
# Asegúrate de que la aplicación esté corriendo en http://localhost:8080

BASE_URL="http://localhost:8080/api"

# Colores para output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo "========================================="
echo "PRUEBAS DE CREACIÓN DE CITAS MÉDICAS"
echo "========================================="
echo ""

# ========================================
# CONFIGURACIÓN INICIAL
# ========================================
echo -e "${BLUE}Configuración Inicial${NC}"
echo "------------------------------------"

# Obtener un médico existente
echo -e "${YELLOW}Obteniendo lista de médicos...${NC}"
MEDICOS=$(curl -s "$BASE_URL/medicos")
MEDICO_ID=$(echo "$MEDICOS" | jq -r '.[0].idMedico')
MEDICO_NOMBRE=$(echo "$MEDICOS" | jq -r '.[0].nombreCompleto')

if [ "$MEDICO_ID" = "null" ] || [ -z "$MEDICO_ID" ]; then
    echo -e "${RED}❌ Error: No hay médicos en la base de datos${NC}"
    echo "Por favor, ejecuta primero el script de inserción de datos de ejemplo"
    exit 1
fi

echo -e "${GREEN}✓ Médico seleccionado:${NC} $MEDICO_NOMBRE (ID: $MEDICO_ID)"
echo ""

# Crear un paciente de prueba (con DNI único basado en timestamp)
echo -e "${YELLOW}Creando paciente de prueba...${NC}"
TIMESTAMP=$(date +%s)
DNI_UNICO="99${TIMESTAMP: -6}"
EMAIL_UNICO="test.citas.${TIMESTAMP}@medicore.pe"

PACIENTE_RESPONSE=$(curl -s -X POST "$BASE_URL/pacientes" \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Test",
    "apellido": "Paciente Citas",
    "dni": "'"$DNI_UNICO"'",
    "correoElectronico": "'"$EMAIL_UNICO"'",
    "numeroTelefono": "999888777"
  }')

PACIENTE_ID=$(echo "$PACIENTE_RESPONSE" | jq -r '.idPaciente')

if [ "$PACIENTE_ID" = "null" ] || [ -z "$PACIENTE_ID" ]; then
    echo -e "${RED}❌ Error al crear paciente de prueba${NC}"
    echo "Respuesta: $PACIENTE_RESPONSE"
    exit 1
fi

echo -e "${GREEN}✓ Paciente creado:${NC} Test Paciente Citas (ID: $PACIENTE_ID, DNI: $DNI_UNICO)"
echo ""

# Registrar usuario para autenticación (si no existe)
echo -e "${YELLOW}Configurando usuario de prueba...${NC}"
REGISTER_RESPONSE=$(curl -s -X POST "$BASE_URL/auth/registro" \
  -H "Content-Type: application/json" \
  -d '{
    "username": "test_citas",
    "password": "Test123!",
    "email": "test.citas@medicore.pe",
    "nombre": "Usuario",
    "apellido": "Test Citas",
    "rol": "ADMIN"
  }' 2>/dev/null)

# Iniciar sesión para obtener token
echo -e "${YELLOW}Obteniendo token de autenticación...${NC}"
LOGIN_RESPONSE=$(curl -s -X POST "$BASE_URL/auth/login" \
  -H "Content-Type: application/json" \
  -d '{
    "username": "test_citas",
    "password": "Test123!"
  }')

TOKEN=$(echo "$LOGIN_RESPONSE" | jq -r '.token' 2>/dev/null)

if [ "$TOKEN" = "null" ] || [ -z "$TOKEN" ]; then
    echo -e "${RED}❌ Error al obtener token de autenticación${NC}"
    echo "Respuesta de registro: $REGISTER_RESPONSE"
    echo "Respuesta de login: $LOGIN_RESPONSE"
    exit 1
fi

echo -e "${GREEN}✓ Token obtenido exitosamente${NC}"
echo ""

# ========================================
# CASO 1: Crear cita exitosamente (201 Created)
# ========================================
echo -e "${BLUE}=========================================${NC}"
echo -e "${BLUE}CASO 1: Crear cita exitosamente${NC}"
echo -e "${BLUE}=========================================${NC}"
echo ""

# Fecha/hora futura (mañana a las 10:00 AM)
FECHA_CITA=$(date -u -d "+1 day 10:00" +"%Y-%m-%dT%H:%M:%S" 2>/dev/null || date -u -v+1d +"%Y-%m-%dT10:00:00")

echo -e "${YELLOW}Request:${NC}"
echo "POST $BASE_URL/citas"
echo "Authorization: Bearer [TOKEN]"
echo "Body:"
cat << EOF | jq .
{
  "fechaHora": "$FECHA_CITA",
  "paciente": {
    "idPaciente": $PACIENTE_ID
  },
  "medico": {
    "idMedico": $MEDICO_ID
  },
  "motivo": "Consulta general",
  "estado": "PROGRAMADA"
}
EOF
echo ""

CITA1_RESPONSE=$(curl -s -w "\nHTTP_STATUS:%{http_code}" -X POST "$BASE_URL/citas" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "fechaHora": "'"$FECHA_CITA"'",
    "paciente": {
      "idPaciente": '$PACIENTE_ID'
    },
    "medico": {
      "idMedico": '$MEDICO_ID'
    },
    "motivo": "Consulta general",
    "estado": "PROGRAMADA"
  }')

HTTP_STATUS=$(echo "$CITA1_RESPONSE" | grep "HTTP_STATUS" | cut -d: -f2)
RESPONSE_BODY=$(echo "$CITA1_RESPONSE" | sed '/HTTP_STATUS/d')

echo -e "${YELLOW}Response:${NC}"
echo "HTTP Status: $HTTP_STATUS"
echo "$RESPONSE_BODY" | jq . 2>/dev/null || echo "$RESPONSE_BODY"
echo ""

if [ "$HTTP_STATUS" = "201" ]; then
    echo -e "${GREEN}✅ CASO 1 EXITOSO: Cita creada correctamente (201 Created)${NC}"
    CITA1_ID=$(echo "$RESPONSE_BODY" | jq -r '.idCita')
    echo -e "   ID de la cita: $CITA1_ID"
else
    echo -e "${RED}❌ CASO 1 FALLIDO: Se esperaba HTTP 201, se obtuvo $HTTP_STATUS${NC}"
fi
echo ""
sleep 2

# ========================================
# CASO 2: Intentar reservar la misma hora (409 Conflict)
# ========================================
echo -e "${BLUE}=========================================${NC}"
echo -e "${BLUE}CASO 2: Conflicto de horario${NC}"
echo -e "${BLUE}=========================================${NC}"
echo ""

echo -e "${YELLOW}Request:${NC}"
echo "POST $BASE_URL/citas"
echo "Authorization: Bearer [TOKEN]"
echo "Body: (misma fecha/hora y médico que CASO 1)"
cat << EOF | jq .
{
  "fechaHora": "$FECHA_CITA",
  "paciente": {
    "idPaciente": $PACIENTE_ID
  },
  "medico": {
    "idMedico": $MEDICO_ID
  },
  "motivo": "Intento de reserva duplicada",
  "estado": "PROGRAMADA"
}
EOF
echo ""

CITA2_RESPONSE=$(curl -s -w "\nHTTP_STATUS:%{http_code}" -X POST "$BASE_URL/citas" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "fechaHora": "'"$FECHA_CITA"'",
    "paciente": {
      "idPaciente": '$PACIENTE_ID'
    },
    "medico": {
      "idMedico": '$MEDICO_ID'
    },
    "motivo": "Intento de reserva duplicada",
    "estado": "PROGRAMADA"
  }')

HTTP_STATUS=$(echo "$CITA2_RESPONSE" | grep "HTTP_STATUS" | cut -d: -f2)
RESPONSE_BODY=$(echo "$CITA2_RESPONSE" | sed '/HTTP_STATUS/d')

echo -e "${YELLOW}Response:${NC}"
echo "HTTP Status: $HTTP_STATUS"
echo "$RESPONSE_BODY" | jq . 2>/dev/null || echo "$RESPONSE_BODY"
echo ""

if [ "$HTTP_STATUS" = "409" ]; then
    echo -e "${GREEN}✅ CASO 2 EXITOSO: Conflicto detectado correctamente (409 Conflict)${NC}"
    echo -e "   El sistema rechazó correctamente la cita duplicada"
else
    echo -e "${RED}❌ CASO 2 FALLIDO: Se esperaba HTTP 409, se obtuvo $HTTP_STATUS${NC}"
fi
echo ""
sleep 2

# ========================================
# CASO 3: Validación fallida (400 Bad Request)
# ========================================
echo -e "${BLUE}=========================================${NC}"
echo -e "${BLUE}CASO 3: Validación fallida (campo requerido faltante)${NC}"
echo -e "${BLUE}=========================================${NC}"
echo ""

# Caso 3A: Sin médico (debe fallar validación @NotNull)
echo -e "${YELLOW}Request:${NC}"
echo "POST $BASE_URL/citas"
echo "Authorization: Bearer [TOKEN]"
echo "Body: (sin médico - debe fallar validación @NotNull)"
cat << EOF | jq .
{
  "fechaHora": "2025-12-06T14:00:00",
  "paciente": {
    "idPaciente": $PACIENTE_ID
  },
  "motivo": "Cita sin médico"
}
EOF
echo ""

CITA3_RESPONSE=$(curl -s -w "\nHTTP_STATUS:%{http_code}" -X POST "$BASE_URL/citas" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "fechaHora": "2025-12-06T14:00:00",
    "paciente": {
      "idPaciente": '$PACIENTE_ID'
    },
    "motivo": "Cita sin médico"
  }')

HTTP_STATUS=$(echo "$CITA3_RESPONSE" | grep "HTTP_STATUS" | cut -d: -f2)
RESPONSE_BODY=$(echo "$CITA3_RESPONSE" | sed '/HTTP_STATUS/d')

echo -e "${YELLOW}Response:${NC}"
echo "HTTP Status: $HTTP_STATUS"
echo "$RESPONSE_BODY" | jq . 2>/dev/null || echo "$RESPONSE_BODY"
echo ""

if [ "$HTTP_STATUS" = "400" ]; then
    echo -e "${GREEN}✅ CASO 3 EXITOSO: Validación fallida correctamente (400 Bad Request)${NC}"
    echo -e "   El sistema rechazó correctamente la fecha en el pasado"
else
    echo -e "${RED}❌ CASO 3 FALLIDO: Se esperaba HTTP 400, se obtuvo $HTTP_STATUS${NC}"
fi
echo ""

# ========================================
# RESUMEN DE PRUEBAS
# ========================================
echo -e "${BLUE}=========================================${NC}"
echo -e "${BLUE}RESUMEN DE PRUEBAS${NC}"
echo -e "${BLUE}=========================================${NC}"
echo ""
echo "Configuración:"
echo "  - Médico ID: $MEDICO_ID ($MEDICO_NOMBRE)"
echo "  - Paciente ID: $PACIENTE_ID (Test Paciente Citas)"
echo "  - Fecha de cita válida: $FECHA_CITA"
echo ""
echo "Resultados esperados:"
echo "  ✓ Caso 1: HTTP 201 Created"
echo "  ✓ Caso 2: HTTP 409 Conflict"
echo "  ✓ Caso 3: HTTP 400 Bad Request"
echo ""
echo -e "${BLUE}=========================================${NC}"
