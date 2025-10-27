#!/bin/bash

# Script para probar todos los endpoints de la API MediCore
# Asegúrate de que la aplicación esté corriendo en http://localhost:8080

BASE_URL="http://localhost:8080/api"

echo "========================================="
echo "PROBANDO API MEDICORE"
echo "========================================="
echo ""

# Colores para output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# ========================================
# 1. PRUEBAS DE PACIENTES
# ========================================
echo -e "${BLUE}=========================================${NC}"
echo -e "${BLUE}1. PROBANDO ENDPOINTS DE PACIENTES${NC}"
echo -e "${BLUE}=========================================${NC}"
echo ""

echo -e "${GREEN}POST /api/pacientes - Crear paciente 1${NC}"
PACIENTE1=$(curl -s -X POST "$BASE_URL/pacientes" \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Juan",
    "apellido": "Pérez García",
    "dni": "12345678",
    "correoElectronico": "juan.perez@email.com",
    "numeroTelefono": "987654321"
  }')
echo "$PACIENTE1" | jq .
PACIENTE1_ID=$(echo "$PACIENTE1" | jq -r '.idPaciente')
echo ""

echo -e "${GREEN}POST /api/pacientes - Crear paciente 2${NC}"
PACIENTE2=$(curl -s -X POST "$BASE_URL/pacientes" \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "María",
    "apellido": "González López",
    "dni": "87654321",
    "correoElectronico": "maria.gonzalez@email.com",
    "numeroTelefono": "912345678"
  }')
echo "$PACIENTE2" | jq .
PACIENTE2_ID=$(echo "$PACIENTE2" | jq -r '.idPaciente')
echo ""

echo -e "${GREEN}GET /api/pacientes - Obtener todos los pacientes${NC}"
curl -s "$BASE_URL/pacientes" | jq .
echo ""

echo -e "${GREEN}GET /api/pacientes/{id} - Obtener paciente por ID${NC}"
curl -s "$BASE_URL/pacientes/$PACIENTE1_ID" | jq .
echo ""

echo -e "${GREEN}GET /api/pacientes/dni/{dni} - Buscar por DNI${NC}"
curl -s "$BASE_URL/pacientes/dni/12345678" | jq .
echo ""

echo -e "${GREEN}GET /api/pacientes/buscar?q=María - Buscar por nombre${NC}"
curl -s "$BASE_URL/pacientes/buscar?q=María" | jq .
echo ""

# ========================================
# 2. PRUEBAS DE MÉDICOS
# ========================================
echo -e "${BLUE}=========================================${NC}"
echo -e "${BLUE}2. PROBANDO ENDPOINTS DE MÉDICOS${NC}"
echo -e "${BLUE}=========================================${NC}"
echo ""

echo -e "${GREEN}POST /api/medicos - Crear médico 1${NC}"
MEDICO1=$(curl -s -X POST "$BASE_URL/medicos" \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Dr. Carlos",
    "apellido": "Ramírez Soto",
    "especialidad": "Cardiología",
    "numeroLicencia": "MED-001",
    "telefono": "999888777",
    "email": "carlos.ramirez@medicore.com",
    "horariosAtencion": "Lunes a Viernes 8:00-16:00"
  }')
echo "$MEDICO1" | jq .
MEDICO1_ID=$(echo "$MEDICO1" | jq -r '.idMedico')
echo ""

echo -e "${GREEN}POST /api/medicos - Crear médico 2${NC}"
MEDICO2=$(curl -s -X POST "$BASE_URL/medicos" \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Dra. Ana",
    "apellido": "Torres Vega",
    "especialidad": "Pediatría",
    "numeroLicencia": "MED-002",
    "telefono": "999777666",
    "email": "ana.torres@medicore.com",
    "horariosAtencion": "Lunes a Viernes 9:00-17:00"
  }')
echo "$MEDICO2" | jq .
MEDICO2_ID=$(echo "$MEDICO2" | jq -r '.idMedico')
echo ""

echo -e "${GREEN}GET /api/medicos - Obtener todos los médicos${NC}"
curl -s "$BASE_URL/medicos" | jq .
echo ""

echo -e "${GREEN}GET /api/medicos/{id} - Obtener médico por ID${NC}"
curl -s "$BASE_URL/medicos/$MEDICO1_ID" | jq .
echo ""

echo -e "${GREEN}GET /api/medicos/especialidad/Cardiología${NC}"
curl -s "$BASE_URL/medicos/especialidad/Cardiología" | jq .
echo ""

echo -e "${GREEN}GET /api/medicos/especialidades - Listar especialidades${NC}"
curl -s "$BASE_URL/medicos/especialidades" | jq .
echo ""

echo -e "${GREEN}GET /api/medicos/buscar?q=Ana - Buscar médicos${NC}"
curl -s "$BASE_URL/medicos/buscar?q=Ana" | jq .
echo ""

# ========================================
# 3. PRUEBAS DE CAMPAÑAS DE SALUD
# ========================================
echo -e "${BLUE}=========================================${NC}"
echo -e "${BLUE}3. PROBANDO ENDPOINTS DE CAMPAÑAS${NC}"
echo -e "${BLUE}=========================================${NC}"
echo ""

echo -e "${GREEN}POST /api/campanias - Crear campaña 1${NC}"
CAMPANIA1=$(curl -s -X POST "$BASE_URL/campanias" \
  -H "Content-Type: application/json" \
  -d '{
    "nombreCampania": "Vacunación COVID-19",
    "descripcion": "Campaña de vacunación contra COVID-19 para toda la población",
    "fechaInicio": "2025-11-01",
    "fechaFinalizacion": "2025-11-30",
    "estado": "PLANIFICADA",
    "lugarRealizacion": "Centro de Salud Principal",
    "publicoObjetivo": "Población general mayor de 18 años"
  }')
echo "$CAMPANIA1" | jq .
CAMPANIA1_ID=$(echo "$CAMPANIA1" | jq -r '.idCampania')
echo ""

echo -e "${GREEN}POST /api/campanias - Crear campaña 2${NC}"
CAMPANIA2=$(curl -s -X POST "$BASE_URL/campanias" \
  -H "Content-Type: application/json" \
  -d '{
    "nombreCampania": "Control de Diabetes",
    "descripcion": "Campaña de detección y control de diabetes",
    "fechaInicio": "2025-10-15",
    "fechaFinalizacion": "2025-12-15",
    "estado": "EN_CURSO",
    "lugarRealizacion": "Policlínico Norte",
    "publicoObjetivo": "Adultos mayores de 40 años"
  }')
echo "$CAMPANIA2" | jq .
CAMPANIA2_ID=$(echo "$CAMPANIA2" | jq -r '.idCampania')
echo ""

echo -e "${GREEN}GET /api/campanias - Obtener todas las campañas${NC}"
curl -s "$BASE_URL/campanias" | jq .
echo ""

echo -e "${GREEN}GET /api/campanias/{id} - Obtener campaña por ID${NC}"
curl -s "$BASE_URL/campanias/$CAMPANIA1_ID" | jq .
echo ""

echo -e "${GREEN}GET /api/campanias/activas - Campañas activas${NC}"
curl -s "$BASE_URL/campanias/activas" | jq .
echo ""

echo -e "${GREEN}GET /api/campanias/estado/EN_CURSO - Por estado${NC}"
curl -s "$BASE_URL/campanias/estado/EN_CURSO" | jq .
echo ""

echo -e "${GREEN}GET /api/campanias/buscar?q=COVID - Buscar campañas${NC}"
curl -s "$BASE_URL/campanias/buscar?q=COVID" | jq .
echo ""

# ========================================
# 4. PRUEBAS DE CITAS MÉDICAS
# ========================================
echo -e "${BLUE}=========================================${NC}"
echo -e "${BLUE}4. PROBANDO ENDPOINTS DE CITAS MÉDICAS${NC}"
echo -e "${BLUE}=========================================${NC}"
echo ""

echo -e "${GREEN}POST /api/citas - Crear cita 1${NC}"
CITA1=$(curl -s -X POST "$BASE_URL/citas" \
  -H "Content-Type: application/json" \
  -d "{
    \"paciente\": { \"idPaciente\": $PACIENTE1_ID },
    \"medico\": { \"idMedico\": $MEDICO1_ID },
    \"fechaHora\": \"2025-11-05T10:00:00\",
    \"motivo\": \"Control cardiológico de rutina\",
    \"estado\": \"PROGRAMADA\",
    \"observaciones\": \"Primera consulta del paciente\"
  }")
echo "$CITA1" | jq .
CITA1_ID=$(echo "$CITA1" | jq -r '.idCita')
echo ""

echo -e "${GREEN}POST /api/citas - Crear cita 2${NC}"
CITA2=$(curl -s -X POST "$BASE_URL/citas" \
  -H "Content-Type: application/json" \
  -d "{
    \"paciente\": { \"idPaciente\": $PACIENTE2_ID },
    \"medico\": { \"idMedico\": $MEDICO2_ID },
    \"fechaHora\": \"2025-10-28T14:30:00\",
    \"motivo\": \"Control pediátrico\",
    \"estado\": \"PROGRAMADA\",
    \"observaciones\": \"Control de crecimiento y desarrollo\"
  }")
echo "$CITA2" | jq .
CITA2_ID=$(echo "$CITA2" | jq -r '.idCita')
echo ""

echo -e "${GREEN}GET /api/citas - Obtener todas las citas${NC}"
curl -s "$BASE_URL/citas" | jq .
echo ""

echo -e "${GREEN}GET /api/citas/{id} - Obtener cita por ID${NC}"
curl -s "$BASE_URL/citas/$CITA1_ID" | jq .
echo ""

echo -e "${GREEN}GET /api/citas/paciente/{id} - Citas de un paciente${NC}"
curl -s "$BASE_URL/citas/paciente/$PACIENTE1_ID" | jq .
echo ""

echo -e "${GREEN}GET /api/citas/medico/{id} - Citas de un médico${NC}"
curl -s "$BASE_URL/citas/medico/$MEDICO1_ID" | jq .
echo ""

echo -e "${GREEN}GET /api/citas/estado/PROGRAMADA - Citas por estado${NC}"
curl -s "$BASE_URL/citas/estado/PROGRAMADA" | jq .
echo ""

# ========================================
# 5. PRUEBAS DE ACTUALIZACIÓN (PUT)
# ========================================
echo -e "${BLUE}=========================================${NC}"
echo -e "${BLUE}5. PROBANDO ACTUALIZACIONES (PUT)${NC}"
echo -e "${BLUE}=========================================${NC}"
echo ""

echo -e "${GREEN}PUT /api/pacientes/{id} - Actualizar paciente${NC}"
curl -s -X PUT "$BASE_URL/pacientes/$PACIENTE1_ID" \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Juan Carlos",
    "apellido": "Pérez García",
    "dni": "12345678",
    "correoElectronico": "juancarlos.perez@email.com",
    "numeroTelefono": "987654321"
  }' | jq .
echo ""

echo -e "${GREEN}PUT /api/citas/{id} - Actualizar estado de cita${NC}"
curl -s -X PUT "$BASE_URL/citas/$CITA2_ID" \
  -H "Content-Type: application/json" \
  -d "{
    \"paciente\": { \"idPaciente\": $PACIENTE2_ID },
    \"medico\": { \"idMedico\": $MEDICO2_ID },
    \"fechaHora\": \"2025-10-28T14:30:00\",
    \"motivo\": \"Control pediátrico\",
    \"estado\": \"COMPLETADA\",
    \"observaciones\": \"Consulta realizada exitosamente\"
  }" | jq .
echo ""

# ========================================
# 6. PRUEBAS DE ELIMINACIÓN (DELETE)
# ========================================
echo -e "${BLUE}=========================================${NC}"
echo -e "${BLUE}6. PROBANDO ELIMINACIONES (DELETE)${NC}"
echo -e "${BLUE}=========================================${NC}"
echo ""

echo -e "${GREEN}Crear una cita temporal para eliminar${NC}"
CITA_TEMP=$(curl -s -X POST "$BASE_URL/citas" \
  -H "Content-Type: application/json" \
  -d "{
    \"paciente\": { \"idPaciente\": $PACIENTE1_ID },
    \"medico\": { \"idMedico\": $MEDICO2_ID },
    \"fechaHora\": \"2025-12-01T10:00:00\",
    \"motivo\": \"Cita de prueba\",
    \"estado\": \"PROGRAMADA\",
    \"observaciones\": \"Esta cita será eliminada\"
  }")
CITA_TEMP_ID=$(echo "$CITA_TEMP" | jq -r '.idCita')
echo "Cita temporal creada con ID: $CITA_TEMP_ID"
echo ""

echo -e "${GREEN}DELETE /api/citas/{id} - Eliminar cita${NC}"
curl -s -X DELETE "$BASE_URL/citas/$CITA_TEMP_ID" -w "HTTP Status: %{http_code}\n"
echo ""

echo -e "${GREEN}Verificar que la cita fue eliminada (debe devolver 404)${NC}"
curl -s "$BASE_URL/citas/$CITA_TEMP_ID" -w "HTTP Status: %{http_code}\n"
echo ""

# ========================================
# RESUMEN FINAL
# ========================================
echo -e "${BLUE}=========================================${NC}"
echo -e "${BLUE}RESUMEN DE DATOS CREADOS${NC}"
echo -e "${BLUE}=========================================${NC}"
echo ""
echo "Pacientes creados: 2"
echo "  - ID $PACIENTE1_ID: Juan Carlos Pérez García"
echo "  - ID $PACIENTE2_ID: María González López"
echo ""
echo "Médicos creados: 2"
echo "  - ID $MEDICO1_ID: Dr. Carlos Ramírez Soto (Cardiología)"
echo "  - ID $MEDICO2_ID: Dra. Ana Torres Vega (Pediatría)"
echo ""
echo "Campañas creadas: 2"
echo "  - ID $CAMPANIA1_ID: Vacunación COVID-19"
echo "  - ID $CAMPANIA2_ID: Control de Diabetes"
echo ""
echo "Citas médicas creadas: 2 (+ 1 eliminada)"
echo "  - ID $CITA1_ID: Juan con Dr. Carlos (Cardiología)"
echo "  - ID $CITA2_ID: María con Dra. Ana (Pediatría) - COMPLETADA"
echo ""
echo -e "${GREEN}¡Pruebas completadas exitosamente!${NC}"
