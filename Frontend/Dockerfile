# Étape 1: Build de l'application
FROM node:18-alpine AS builder

WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./

# Installer les dépendances (incluant les devDependencies pour le build)
RUN npm ci --include=dev

# Copier le code source
COPY . .

# Builder l'application
RUN npm run build

# Étape 2: Image de production avec Nginx
FROM nginx:alpine

# Copier les fichiers buildés
COPY --from=builder /app/dist /usr/share/nginx/html

# Copier la configuration nginx personnalisée
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exposer le port 80
EXPOSE 80

# Démarer nginx
CMD ["nginx", "-g", "daemon off;"]

