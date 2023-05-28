# Stage 0
FROM node:18-alpine

# Install PNPM & Turbo 
# Stage 1
FROM node:18-alpine
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app
RUN npm install -g pnpm
RUN npm install -g turbo
COPY . .

# Add lockfile and package.json's of isolated subworkspace
# Stage 2
FROM node:18-alpine
RUN apk add --no-cache libc6-compat
RUN apk update
RUN npm install -g pnpm
WORKDIR /app
 
# First install the dependencies (as they change less often)
COPY --from=1 /app/json/ .
COPY --from=1 /app/pnpm-lock.yaml ./pnpm-lock.yaml
RUN pnpm install
 
EXPOSE 3000

# Build the project and start it
COPY --from=1 /app/full/ .
RUN pnpm turbo run build --filter=horizon
CMD pnpm turbo run start --filter=horizon
