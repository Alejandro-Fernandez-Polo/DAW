FROM python:3.9-alpine

# Instala dependencias necesarias
RUN apk update && apk add --no-cache \
    gcc \
    musl-dev \
    linux-headers \
    curl \
    bash \
    mongodb-tools

# Copia tu aplicación
COPY . /app
WORKDIR /app

# Instala las dependencias de Python
RUN pip install -r requirements.txt
RUN apk add --no-cache mongodb-tools

# Expon el puerto de Flask
EXPOSE 5000

# Comando para ejecutar la aplicación
CMD ["python", "app.py"]
