# Imagen base con PHP + Apache
FROM php:8.2-apache

# Copiar los archivos al directorio root del servidor web
COPY . /var/www/html

# Habilitar extensiones si las necesitas (ej: mysqli, pdo)
RUN docker-php-ext-install mysqli pdo pdo_mysql

# Exponer el puerto
EXPOSE 80
