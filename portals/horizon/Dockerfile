# Steps:
# - Install PNPM & Turbo (npm install -g pnpm turbo)
# - Create a WORKDIR (/app)
# - Copy our json & lock file to the current dir (COPY /app/json/ . && COPY /app/pnpm-lock.yaml .)
# - Install (pnpm install)
# - Copy our full files to our current dir (COPY /app/full/ .)
# - pnpm turbo run build --filter=horizon

FROM node:18-alpine AS base

# Install PNPM & Turbo 
FROM base AS builder
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app
RUN npm install -g pnpm
RUN npm install -g turbo
COPY . .
 
# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer
RUN apk add --no-cache libc6-compat
RUN apk update
RUN npm install -g pnpm
WORKDIR /app
 
# First install the dependencies (as they change less often)
COPY --from=builder /app/json/ .
COPY --from=builder /app/pnpm-lock.yaml ./pnpm-lock.yaml
RUN pnpm install
 
# Build the project and start it
COPY --from=builder /app/full/ .
RUN pnpm turbo run build --filter=horizon
CMD pnpm turbo run start --filter=horizon