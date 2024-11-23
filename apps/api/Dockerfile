FROM oven/bun:1 AS base

# Set working directory
WORKDIR /app

# Copy root workspace files first
COPY package.json .
COPY bun.lockb .

# Copy packages directory
COPY packages/ ./packages/

# Copy API application
COPY apps/api/ ./apps/api/

# Install dependencies
RUN cd /app && bun install

# Set environment variables
ENV PORT=8000
EXPOSE 8000

# Set the working directory to the API folder
WORKDIR /app/apps/api

# Run the application
CMD ["bun", "run", "index.ts"]
