#!/bin/bash
set -e

echo "=== Configurando entorno de desarrollo ==="

# Usar Java 21
export JAVA_HOME=/usr/lib/jvm/java-21-openjdk-amd64
export PATH=$JAVA_HOME/bin:$PATH

# Verificar Java
echo "Java version:"
java -version

# Persistir en bash profile para futuros shells
echo 'export JAVA_HOME=/usr/lib/jvm/java-21-openjdk-amd64' >> ~/.bashrc
echo 'export PATH=$JAVA_HOME/bin:$PATH' >> ~/.bashrc

echo "JAVA_HOME configurado: $JAVA_HOME"
echo "=== Entorno listo ==="
