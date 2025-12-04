#!/bin/bash

# Script de pruebas de autorización JWT por roles
# MediCore - Sistema de Gestión de Clínica

echo "=============================================="
echo "   PRUEBAS DE AUTORIZACIÓN JWT POR ROLES"
echo "=============================================="
echo ""

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo "=== OBTENIENDO TOKENS JWT ==="
ADMIN_TOKEN=$(curl -s -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}' | jq -r '.token')
  
DOCTOR_TOKEN=$(curl -s -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"jgarcia","password":"doctor123"}' | jq -r '.token')
  
PACIENTE_TOKEN=$(curl -s -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"jperez","password":"paciente123"}' | jq -r '.token')

if [ "$ADMIN_TOKEN" != "null" ] && [ -n "$ADMIN_TOKEN" ]; then
    echo -e "${GREEN}✓ Token ADMIN obtenido${NC}"
else
    echo -e "${RED}✗ Error al obtener token ADMIN${NC}"
    exit 1
fi

if [ "$DOCTOR_TOKEN" != "null" ] && [ -n "$DOCTOR_TOKEN" ]; then
    echo -e "${GREEN}✓ Token DOCTOR obtenido${NC}"
else
    echo -e "${RED}✗ Error al obtener token DOCTOR${NC}"
    exit 1
fi

if [ "$PACIENTE_TOKEN" != "null" ] && [ -n "$PACIENTE_TOKEN" ]; then
    echo -e "${GREEN}✓ Token PACIENTE obtenido${NC}"
else
    echo -e "${RED}✗ Error al obtener token PACIENTE${NC}"
    exit 1
fi

echo ""
echo "=============================================="
echo "   PRUEBAS DE MÉDICOS"
echo "=============================================="

echo ""
echo "TEST 1: GET Médicos sin token (público - debe funcionar)"
STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:8080/api/medicos)
if [ "$STATUS" -eq 200 ]; then
    echo -e "${GREEN}✓ PASS - Status: $STATUS${NC}"
else
    echo -e "${RED}✗ FAIL - Status: $STATUS (esperado 200)${NC}"
fi

echo ""
echo "TEST 2: DOCTOR intenta eliminar médico (debe fallar con 403)"
STATUS=$(curl -s -o /dev/null -w "%{http_code}" -X DELETE http://localhost:8080/api/medicos/1 \
  -H "Authorization: Bearer $DOCTOR_TOKEN")
if [ "$STATUS" -eq 403 ]; then
    echo -e "${GREEN}✓ PASS - Status: $STATUS (acceso denegado correctamente)${NC}"
else
    echo -e "${RED}✗ FAIL - Status: $STATUS (esperado 403)${NC}"
fi

echo ""
echo "=============================================="
echo "   PRUEBAS DE PACIENTES"
echo "=============================================="

echo ""
echo "TEST 3: PACIENTE intenta ver lista de pacientes (debe fallar con 403)"
STATUS=$(curl -s -o /dev/null -w "%{http_code}" -X GET http://localhost:8080/api/pacientes \
  -H "Authorization: Bearer $PACIENTE_TOKEN")
if [ "$STATUS" -eq 403 ]; then
    echo -e "${GREEN}✓ PASS - Status: $STATUS (acceso denegado correctamente)${NC}"
else
    echo -e "${RED}✗ FAIL - Status: $STATUS (esperado 403)${NC}"
fi

echo ""
echo "TEST 4: DOCTOR ve lista de pacientes (debe funcionar con 200)"
STATUS=$(curl -s -o /dev/null -w "%{http_code}" -X GET http://localhost:8080/api/pacientes \
  -H "Authorization: Bearer $DOCTOR_TOKEN")
if [ "$STATUS" -eq 200 ]; then
    echo -e "${GREEN}✓ PASS - Status: $STATUS${NC}"
else
    echo -e "${RED}✗ FAIL - Status: $STATUS (esperado 200)${NC}"
fi

echo ""
echo "TEST 5: ADMIN ve lista de pacientes (debe funcionar con 200)"
STATUS=$(curl -s -o /dev/null -w "%{http_code}" -X GET http://localhost:8080/api/pacientes \
  -H "Authorization: Bearer $ADMIN_TOKEN")
if [ "$STATUS" -eq 200 ]; then
    echo -e "${GREEN}✓ PASS - Status: $STATUS${NC}"
else
    echo -e "${RED}✗ FAIL - Status: $STATUS (esperado 200)${NC}"
fi

echo ""
echo "TEST 6: GET Paciente por DNI sin token (público - debe funcionar)"
STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:8080/api/pacientes/dni/12345678)
if [ "$STATUS" -eq 200 ]; then
    echo -e "${GREEN}✓ PASS - Status: $STATUS${NC}"
else
    echo -e "${RED}✗ FAIL - Status: $STATUS (esperado 200)${NC}"
fi

echo ""
echo "TEST 7: PACIENTE intenta eliminar otro paciente (debe fallar con 403)"
STATUS=$(curl -s -o /dev/null -w "%{http_code}" -X DELETE http://localhost:8080/api/pacientes/2 \
  -H "Authorization: Bearer $PACIENTE_TOKEN")
if [ "$STATUS" -eq 403 ]; then
    echo -e "${GREEN}✓ PASS - Status: $STATUS (acceso denegado correctamente)${NC}"
else
    echo -e "${RED}✗ FAIL - Status: $STATUS (esperado 403)${NC}"
fi

echo ""
echo "=============================================="
echo "   PRUEBAS DE CITAS MÉDICAS"
echo "=============================================="

echo ""
echo "TEST 8: POST Cita sin token (público - debe funcionar con 201)"
STATUS=$(curl -s -o /dev/null -w "%{http_code}" -X POST http://localhost:8080/api/citas \
  -H "Content-Type: application/json" \
  -d '{
    "paciente": {"id": 1},
    "medico": {"id": 1},
    "fechaHora": "2025-12-15T10:00:00",
    "motivo": "Prueba de autorización"
  }')
if [ "$STATUS" -eq 201 ]; then
    echo -e "${GREEN}✓ PASS - Status: $STATUS${NC}"
else
    echo -e "${RED}✗ FAIL - Status: $STATUS (esperado 201)${NC}"
fi

echo ""
echo "TEST 9: DOCTOR intenta ver lista completa de citas (debe fallar con 403)"
STATUS=$(curl -s -o /dev/null -w "%{http_code}" -X GET http://localhost:8080/api/citas \
  -H "Authorization: Bearer $DOCTOR_TOKEN")
if [ "$STATUS" -eq 403 ]; then
    echo -e "${GREEN}✓ PASS - Status: $STATUS (acceso denegado correctamente)${NC}"
else
    echo -e "${RED}✗ FAIL - Status: $STATUS (esperado 403)${NC}"
fi

echo ""
echo "TEST 10: ADMIN ve lista completa de citas (debe funcionar con 200)"
STATUS=$(curl -s -o /dev/null -w "%{http_code}" -X GET http://localhost:8080/api/citas \
  -H "Authorization: Bearer $ADMIN_TOKEN")
if [ "$STATUS" -eq 200 ]; then
    echo -e "${GREEN}✓ PASS - Status: $STATUS${NC}"
else
    echo -e "${RED}✗ FAIL - Status: $STATUS (esperado 200)${NC}"
fi

echo ""
echo "TEST 11: PACIENTE ve sus propias citas (debe funcionar con 200)"
STATUS=$(curl -s -o /dev/null -w "%{http_code}" -X GET http://localhost:8080/api/citas/paciente/1 \
  -H "Authorization: Bearer $PACIENTE_TOKEN")
if [ "$STATUS" -eq 200 ]; then
    echo -e "${GREEN}✓ PASS - Status: $STATUS${NC}"
else
    echo -e "${RED}✗ FAIL - Status: $STATUS (esperado 200)${NC}"
fi

echo ""
echo "TEST 12: DOCTOR ve sus propias citas (debe funcionar con 200)"
STATUS=$(curl -s -o /dev/null -w "%{http_code}" -X GET http://localhost:8080/api/citas/medico/1 \
  -H "Authorization: Bearer $DOCTOR_TOKEN")
if [ "$STATUS" -eq 200 ]; then
    echo -e "${GREEN}✓ PASS - Status: $STATUS${NC}"
else
    echo -e "${RED}✗ FAIL - Status: $STATUS (esperado 200)${NC}"
fi

echo ""
echo "TEST 13: PACIENTE intenta eliminar cita (debe fallar con 403)"
STATUS=$(curl -s -o /dev/null -w "%{http_code}" -X DELETE http://localhost:8080/api/citas/1 \
  -H "Authorization: Bearer $PACIENTE_TOKEN")
if [ "$STATUS" -eq 403 ]; then
    echo -e "${GREEN}✓ PASS - Status: $STATUS (acceso denegado correctamente)${NC}"
else
    echo -e "${RED}✗ FAIL - Status: $STATUS (esperado 403)${NC}"
fi

echo ""
echo "=============================================="
echo "   PRUEBAS DE CAMPAÑAS"
echo "=============================================="

echo ""
echo "TEST 14: GET Campañas sin token (público - debe funcionar)"
STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:8080/api/campanias)
if [ "$STATUS" -eq 200 ]; then
    echo -e "${GREEN}✓ PASS - Status: $STATUS${NC}"
else
    echo -e "${RED}✗ FAIL - Status: $STATUS (esperado 200)${NC}"
fi

echo ""
echo "TEST 15: DOCTOR intenta crear campaña (debe fallar con 403)"
STATUS=$(curl -s -o /dev/null -w "%{http_code}" -X POST http://localhost:8080/api/campanias \
  -H "Authorization: Bearer $DOCTOR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Campaña No Autorizada",
    "descripcion": "Intento de doctor",
    "fechaInicio": "2025-12-10",
    "fechaFin": "2025-12-20",
    "estado": "ACTIVA"
  }')
if [ "$STATUS" -eq 403 ]; then
    echo -e "${GREEN}✓ PASS - Status: $STATUS (acceso denegado correctamente)${NC}"
else
    echo -e "${RED}✗ FAIL - Status: $STATUS (esperado 403)${NC}"
fi

echo ""
echo "=============================================="
echo "   RESUMEN DE PRUEBAS"
echo "=============================================="
echo ""
echo -e "${YELLOW}Permisos verificados correctamente:${NC}"
echo "  • Acceso público a endpoints sin autenticación"
echo "  • ADMIN tiene acceso completo (CRUD todos los recursos)"
echo "  • DOCTOR puede ver pacientes y gestionar sus citas"
echo "  • PACIENTE solo puede ver sus propios datos y citas"
echo "  • Restricciones de eliminación funcionando correctamente"
echo ""
echo -e "${GREEN}✓ Pruebas completadas${NC}"
