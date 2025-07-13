#!/bin/bash

# Levanta los contenedores de MongoDB usando Docker Compose
cd docker
docker-compose up -d
cd ..

# Ejecuta el Dockerfile en la carpeta "Server-Chat"
cd Server-Chat
docker build -t server-chat .
docker run -p 8080:8080 server-chat
cd ..

# Construye y ejecuta el frontend
cd frontend/pi-admin
docker build -t front .
docker run -p 3000:3000 front
cd ../..

echo "Proceso completado exitosamente."
