# Usar una imagen oficial de Node.js como imagen padre
FROM node:14

# Instalar Redis
RUN apt-get update && apt-get install -y redis-server

# Crear un directorio para la aplicación en el contenedor
WORKDIR /usr/src/app

# Copiar los archivos del paquete.json al contenedor
COPY package*.json ./

# Instalar cualquier dependencia de la aplicación
RUN npm install

# Copiar el resto de los archivos de la aplicación al contenedor
COPY . .

# Hacer el puerto 8080 disponible para el mundo fuera de este contenedor
EXPOSE 8080

# Ejecutar Redis y la aplicación cuando se lanza el contenedor
CMD redis-server --daemonize yes && node server.js