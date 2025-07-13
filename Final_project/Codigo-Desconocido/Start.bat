@echo off

cd Server-Chat
docker build -t server-chat .
docker run -p 8080:8080 server-chat
cd ..
echo Proceso completado exitosamente.
