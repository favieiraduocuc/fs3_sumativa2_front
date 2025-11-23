# ===========================
# Etapa 1: Build de Angular
# ===========================
FROM node:20-alpine AS build

# Directorio de trabajo
WORKDIR /app

# Copiamos package.json y package-lock.json primero (para cachear dependencias)
COPY package*.json ./

# Instalamos dependencias
RUN npm install

# Copiamos el resto del código del proyecto
COPY . .

# Compilamos Angular (usa la config por defecto = production)
RUN npm run build

# ===========================
# Etapa 2: Servir con nginx
# ===========================
FROM nginx:alpine

# Borramos la config por defecto
RUN rm /etc/nginx/conf.d/default.conf

# Copiamos nuestra config para Angular SPA
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiamos el build de Angular al directorio que sirve nginx
# OJO: en este proyecto el outputPath es dist/laboratorio-client
#COPY --from=build /app/dist/laboratorio-client/ /usr/share/nginx/html/
# Copiamos el build de Angular al directorio que sirve nginx
COPY --from=build /app/dist/laboratorio-client/browser/ /usr/share/nginx/html/

# Exponemos el puerto 80 (nginx)
EXPOSE 80

# nginx se levanta solo con el CMD por defecto de la imagen base
