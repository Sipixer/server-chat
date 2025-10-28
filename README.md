# 💬 Server Chat# SDT - Projet Chat Server



Une application de chat en temps réel construite avec **Socket.IO**, **Express**, **React** et **Redis**, entièrement dockerisée et prête pour le déploiement en production.

## 📋 Prérequis

### Installation locale

- **Node.js** 20+
- **pnpm** (recommandé)
- **Redis** 8.2.2+
- **Docker** & **Docker Compose** (pour le déploiement)

### Déploiement en production

- **Serveur Linux** (Ubuntu 22.04+ recommandé)
- **Docker** & **Docker Compose**
- **Domaine personnalisé** avec accès DNS
- **Token DuckDNS** (pour DNS dynamique)
- **Email valide** (pour certificats Let's Encrypt)

## 🚀 Déploiement Rapide

### 1️⃣ **Déploiement Local (Développement)**

```bash
# Installer les dépendances
cd server
pnpm install

# Démarrer en mode développement
pnpm run dev

# L'app sera disponible sur http://localhost:5173
```

### 2️⃣ **Déploiement Docker Local**

```bash
# Depuis la racine du projet
cd server

# Construire l'image Docker
docker build -t server-chat:latest .

# Lancer les conteneurs
docker-compose up -d

# Vérifier les logs
docker-compose logs -f
```

### 3️⃣ **Déploiement en Production**

#### Étape A : Préparer le serveur

```bash
# Cloner le repository
git clone https://github.com/Sipixer/server-chat.git
cd server-chat

# Créer le dossier de configuration
mkdir -p docker/letsencrypt

# Définir les permissions
chmod 700 docker/letsencrypt
```

#### Étape B : Configurer les variables d'environnement

Créer un fichier `.env` dans le dossier `docker/` :

```env
# 🔐 Certificats SSL - Let's Encrypt
ACME_EMAIL=votre-email@example.com

# 🌐 Configuration DNS DuckDNS
DUCKDNS_TOKEN=votre-token-duckdns
DOMAIN=votre-domaine.duckdns.org

# 🔴 Configuration Redis
REDIS_HOST=redis
REDIS_PORT=6379

# 📊 Replicas du serveur de chat
STD_SERVER_REPLICAS=2
```

**Obtenir votre token DuckDNS :**
1. Aller sur [duckdns.org](https://www.duckdns.org)
2. Se connecter avec un compte
3. Créer un domaine (ex: `mon-app.duckdns.org`)
4. Copier le token d'authentification

#### Étape C : Lancer le déploiement

```bash
cd docker

# Vérifier les variables d'environnement
cat .env

# Démarrer les services
docker-compose up -d

# Vérifier que tout fonctionne
docker-compose ps
docker-compose logs -f chat-server
```

#### Étape D : Vérifier la configuration

```bash
# Vérifier l'accès HTTP (redirection HTTPS)
curl -I http://votre-domaine.duckdns.org

# Vérifier HTTPS
curl -I https://votre-domaine.duckdns.org

# Vérifier le socket
curl https://votre-domaine.duckdns.org/socket.io/
```

## 🔧 Configuration Détaillée

### Architecture du Déploiement

```
┌─────────────────────────────────────────────────────────┐
│                   Internet                              │
└────────────────────┬────────────────────────────────────┘
                     │
         ┌───────────┴───────────┐
         │      Traefik          │
         │  (Reverse Proxy)      │
         │  - SSL/TLS            │
         │  - Load Balancer      │
         └───────────┬───────────┘
                     │
        ┌────────────┼────────────┐
        │            │            │
   ┌────┴───┐   ┌────┴───┐   ┌────┴───┐
   │ Chat   │   │ Chat   │   │ Chat   │
   │Server  │   │Server  │   │Server  │
   │Réplica1│   │Réplica2│   │Réplica │
   └────┬───┘   └────┬───┘   └────┬───┘
        │            │            │
        └────────────┼────────────┘
                     │
              ┌──────┴──────┐
              │    Redis    │
              │  (Sessions) │
              └─────────────┘
```

### Variables d'Environnement Disponibles

| Variable | Description | Défaut | Exemple |
|----------|-------------|--------|---------|
| `ELASTICACHE_ENDPOINT` | Endpoint Redis | `redis:6379` | `redis.us-east-1.cache.amazonaws.com:6379` |
| `NODE_ENV` | Environnement d'exécution | `development` | `production` |
| `DUCKDNS_TOKEN` | Token d'authentification DuckDNS | - | `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx` |
| `ACME_EMAIL` | Email pour Let's Encrypt | - | `admin@example.com` |
| `DOMAIN` | Domaine d'accès | - | `mon-app.duckdns.org` |
| `REDIS_HOST` | Hôte Redis | `localhost` | `redis` |
| `REDIS_PORT` | Port Redis | `6379` | `6379` |
| `STD_SERVER_REPLICAS` | Nombre de réplicas | `1` | `3` |
