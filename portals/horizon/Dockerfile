# Base Stage (0)
FROM node:18-alpine
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app
RUN pnpm add -g turbo

# Builder Stage (1)
FROM node:18-alpine
WORKDIR /app
RUN apk add --no-cache libc6-compat
RUN apk update
RUN npm install -g pnpm
ENV PNPM_HOME /root/.pnpm
RUN mkdir -p $PNPM_HOME
ENV PATH=$PATH:$PNPM_HOME
RUN pnpm add -g turbo
COPY . .
RUN turbo prune --scope=horizon --docker


# Installer Stage (2)
FROM node:18-alpine
WORKDIR /app
COPY .gitignore .gitignore
COPY --from=1 /app/out/json/ .
COPY --from=1 /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
RUN pnpm install
COPY --from=1 /app/out/full/ .
RUN yarn turbo run build --filter=horizon...

# Runner Stage (3)
FROM node:18-alpine
WORKDIR /app
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs
COPY --from=2 /app/apps/web/next.config.js .
COPY --from=2 /app/apps/web/package.json .
COPY --from=2 --chown=nextjs:nodejs /app/apps/web/.next/standalone ./
COPY --from=2 --chown=nextjs:nodejs /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=2 --chown=nextjs:nodejs /app/apps/web/public ./apps/web/public
CMD node apps/web/server.js
