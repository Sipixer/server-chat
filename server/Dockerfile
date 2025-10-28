# Étape 1 : Base commune (légère et sécurisée)
FROM node:20-slim AS base
WORKDIR /usr/src/app

# Installer pnpm de manière globale
RUN corepack enable && corepack prepare pnpm@latest --activate

# Étape 2 : Installation des dépendances (avec cache)
FROM base AS deps

# Copier uniquement les fichiers nécessaires à la résolution des dépendances
COPY package.json pnpm-lock.yaml ./

# Installation des dépendances (production + dev pour le build)
RUN pnpm install --frozen-lockfile

# Étape 3 : Build de l’application
FROM base AS build
COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY . .
RUN pnpm run build

# Étape 4 : Image finale (production, ultra légère)
FROM node:20-slim AS production
WORKDIR /usr/src/app

ENV NODE_ENV=production

# Réactiver pnpm uniquement si besoin (pour les scripts start)
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copier uniquement ce qui est nécessaire
COPY package.json pnpm-lock.yaml ./
COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/src ./src
RUN apk add --no-cache curl


# Sécurité et performances
USER node
EXPOSE 3000

CMD ["node", "--import", "tsx", "src/server/main.ts"]
