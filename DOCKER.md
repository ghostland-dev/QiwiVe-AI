# Guide Docker pour Bolt Clone

Ce guide explique comment déployer l'application Bolt Clone avec Docker et Docker Compose.

## Prérequis

- Docker (version 20.10 ou supérieure)
- Docker Compose (version 2.0 ou supérieure)

## Installation

### 1. Cloner le projet (si ce n'est pas déjà fait)

```bash
git clone <votre-repo>
cd Bolt-Clone
```

### 2. Configurer les variables d'environnement

Créez un fichier `.env` à la racine du projet :

```bash
cp .env.example .env
```

Éditez le fichier `.env` et ajoutez vos clés API :

```env
GEMINI_API_KEY=votre_clé_api_ici
GEMINI_MODEL=gemini-2.0-flash-lite
PORT=3000
NODE_ENV=production
```

### 3. Construire et lancer les conteneurs

```bash
docker-compose up --build
```

Cette commande va :
- Construire les images Docker pour le backend et le frontend
- Lancer les conteneurs
- Exposer le frontend sur le port 80
- Exposer le backend sur le port 3000

### 4. Accéder à l'application

- **Frontend** : http://localhost
- **Backend API** : http://localhost:3000

## Commandes utiles

### Démarrer les services

```bash
docker-compose up -d
```

### Arrêter les services

```bash
docker-compose down
```

### Voir les logs

```bash
# Tous les services
docker-compose logs -f

# Backend seulement
docker-compose logs -f backend

# Frontend seulement
docker-compose logs -f frontend
```

### Reconstruire les images

```bash
docker-compose up --build --force-recreate
```

### Nettoyer les conteneurs et volumes

```bash
docker-compose down -v
```

### Accéder au shell d'un conteneur

```bash
# Backend
docker-compose exec backend sh

# Frontend
docker-compose exec frontend sh
```

## Architecture

Le projet est composé de deux services :

- **backend** : Application Express.js avec TypeScript
  - Port : 3000
  - Image basée sur Node.js 18 Alpine
  
- **frontend** : Application React avec Vite
  - Port : 80 (Nginx)
  - Build multi-stages avec Node.js puis serveur Nginx

Les deux services communiquent via un réseau Docker dédié (`bolt-network`).

## Dépannage

### Les conteneurs ne démarrent pas

Vérifiez que les ports 80 et 3000 ne sont pas déjà utilisés :

```bash
lsof -i :80
lsof -i :3000
```

### Erreurs de build

Nettoyez le cache Docker et reconstruisez :

```bash
docker-compose down
docker system prune -f
docker-compose up --build --force-recreate
```

### Erreurs de connexion au backend

Vérifiez que la clé API Gemini est correctement configurée dans le fichier `.env`.

## Production

Pour un déploiement en production, assurez-vous de :

1. Utiliser des secrets sécurisés pour les variables d'environnement
2. Configurer un reverse proxy (comme Traefik ou Nginx) devant les conteneurs
3. Activer les logs et le monitoring
4. Mettre en place des sauvegardes régulières
5. Utiliser des images officielles et maintenues

