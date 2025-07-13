
@echo off

rem Detener el contenedor llamado "cs_api" si está en ejecución
docker stop cs_api

rem Reiniciar el contenedor "cs_api" si está detenido
docker start cs_api


echo Proceso completado exitosamente.
