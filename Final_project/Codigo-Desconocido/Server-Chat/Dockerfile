# Usa la imagen oficial de Node.js como base
FROM node:20

# Establece el directorio de trabajo en /usr/src/app
WORKDIR ./

# Copia el package.json y el package-lock.json al directorio de trabajo
COPY package*.json ./

# Instala las dependencias de la aplicación
RUN npm i websocket

# Copia el resto de los archivos de la aplicación al directorio de trabajo
COPY . .

# Expone el puerto 3000 en el contenedor
EXPOSE 8080

# Comando para ejecutar la aplicación
CMD ["node", "index.js"]
