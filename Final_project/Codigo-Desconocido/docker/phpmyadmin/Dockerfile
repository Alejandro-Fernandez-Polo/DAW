FROM php:fpm

# pasar ID de usuario
ARG user
ARG uid

# Instalar paquetes
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip

# Limpiar cache de paquetes descargados y ya instalados
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Instalar extensiones de php
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

# Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Crear usuario del sistema (MV) para ejecutar composer y artisan
RUN useradd -G www-data,root -u $uid -d /home/$user $user
RUN mkdir -p /home/$user/.composer && chown -R $user:$user /home/$user

# Establecer el directorio de trabajo a /var/www para acceder a este directorio por defecto
WORKDIR /var/www

# Propietario del contenedor
USER $user