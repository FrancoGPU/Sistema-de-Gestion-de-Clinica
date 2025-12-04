#!/bin/bash
set -e

echo "=== Configurando entorno de desarrollo ==="

# Inicializar SDKMAN si está disponible (para este script)
export SDKMAN_DIR="$HOME/.sdkman"
if [[ -s "$HOME/.sdkman/bin/sdkman-init.sh" ]]; then
    source "$HOME/.sdkman/bin/sdkman-init.sh"
fi

# Verificar Java
echo "Java version:"
java -version

# Verificar SDKMAN
if command -v sdk &> /dev/null; then
    echo "SDKMAN está instalado."
    sdk current java
else
    echo "Advertencia: SDKMAN no se encontró en el path."
fi

echo "=== Entorno listo ==="
