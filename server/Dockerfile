# Étape 1 : Base commune (légère et sécurisée)
FROM node:22-alpine AS base
WORKDIR /usr/src/app

RUN corepack enable && corepack prepare pnpm@latest --activate

FROM base AS deps

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile


FROM base AS build
COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY . .
RUN pnpm run build


FROM node:22-alpine AS production
WORKDIR /usr/src/app

ENV NODE_ENV=production


RUN corepack enable && corepack prepare pnpm@latest --activate

COPY package.json pnpm-lock.yaml ./
COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/src ./src



USER node
EXPOSE 3000

CMD ["node", "--import", "tsx", "src/server/main.ts"]
