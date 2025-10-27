# Dockerfile pour le Backend
FROM node:18-alpine

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./

# Installer les dépendances (incluant les devDependencies pour le build)
RUN npm ci --include=dev

# Copier le code source
COPY . .

# Compiler TypeScript
RUN npm run build

# Exposer le port
EXPOSE 3000

# Définir la variable d'environnement par défaut
ENV NODE_ENV=production
ENV PORT=3000

# Commande par défaut
CMD ["node", "dist/index.js"]

