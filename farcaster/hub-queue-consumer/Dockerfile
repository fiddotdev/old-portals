FROM --platform=linux/amd64 node:18-alpine AS base

FROM base AS builder
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
RUN apk update
# Set working directory
WORKDIR /app
RUN npm install -g pnpm
RUN npm install -g turbo
COPY . .
RUN turbo prune --scope=hub-queue-consumer --docker

FROM base AS installer
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app

COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
RUN npm install -g pnpm
RUN npm install -g turbo
RUN pnpm install

COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json

RUN turbo run build --filter=hub-queue-consumer...

FROM base AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 expressjs
RUN adduser --system --uid 1001 expressjs

USER expressjs

COPY --from=installer /app .

ENV NODE_ENV=production

CMD node farcaster/hub-queue-consumer/dist/index.js
