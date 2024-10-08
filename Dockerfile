# syntax = docker/dockerfile:1

# Adjust NODE_VERSION as desired
ARG NODE_VERSION=18.16.0
FROM node:${NODE_VERSION}-slim as base

LABEL fly_launch_runtime="NodeJS/Prisma"

# Set the working directory inside the container
WORKDIR /app

# Set production environment
ENV NODE_ENV=production

# Install pnpm
RUN npm install -g pnpm

# Throw-away build stage to reduce the size of the final image
FROM base as build

# Install packages needed to build node modules
RUN apt-get update -qq && \
    apt-get install -y python-is-python3 pkg-config build-essential openssl

# Install dependencies using pnpm
COPY --link pnpm-lock.yaml ./
COPY --link package.json ./
RUN pnpm install --frozen-lockfile

# Generate Prisma Client
COPY --link prisma ./prisma
RUN npx prisma generate

# Copy application code
COPY --link . .

# Build the application
RUN pnpm run build

# Prune dev dependencies
RUN pnpm prune --prod

# Final stage for production app image
FROM base

# Copy built application and production node modules from build stage
COPY --from=build /app /app

# Ensure ENV variables are used properly (e.g., database connection)
ENV DATABASE_URL=${DATABASE_URL}

# Make sure the entrypoint script is executable
RUN chmod +x /app/docker-entrypoint

# Entrypoint prepares the database
ENTRYPOINT ["/app/docker-entrypoint"]

# Start the server by default; this can be overwritten at runtime
CMD ["pnpm", "start"]
