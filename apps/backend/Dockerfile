FROM node:20-alpine

RUN npm install -g pnpm tsx

WORKDIR /app

COPY pnpm-workspace.yaml ./
COPY package.json ./
COPY pnpm-lock.yaml ./

COPY packages/ ./packages/
COPY apps/backend/ ./apps/backend/

RUN pnpm install --frozen-lockfile

WORKDIR /app/apps/backend

EXPOSE 4000

CMD ["tsx", "src/index.js"]