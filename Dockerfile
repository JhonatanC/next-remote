FROM node:22

WORKDIR /app

# Copiar archivos de dependencias e instalarlas
COPY package*.json ./
RUN npm install

# Copiar TODO el código del proyecto (esto incluye tu carpeta public con las imágenes)
COPY . .

# Construir la aplicación Next.js
RUN npm run build

# Exponer el puerto por el que corre Next.js
EXPOSE 3000

# Comando para iniciar la aplicación en producción
# CMD ["npm", "run", "dev"]
CMD ["npm", "start"]