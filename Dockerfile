FROM node:24-slim AS build

WORKDIR /app

RUN corepack enable

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm build

FROM node:24-slim

WORKDIR /app

COPY --from=build /app/dist /app/dist

CMD ["sh", "-c", "mkdir -p /dist && rm -rf /dist/* && cp -r /app/dist/. /dist/"]
