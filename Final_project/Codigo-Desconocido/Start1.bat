@echo off

rem Levanta los contenedores de MongoDB usando Docker Compose
cd docker
docker-compose up -d
cd ..


rem Detener el contenedor llamado "cs_api" si está en ejecución
docker stop cs_api

rem Reiniciar el contenedor "cs_api" si está detenido
docker start cs_api

cd frontend/pi-admin
docker build -t front .
docker run -p 3000:3000 front
cd ...






echo Proceso completado exitosamente.
