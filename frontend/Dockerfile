# ============================================================================
# Frontend Dockerfile (Vite + React + Tailwind CSS -> Nginx)
# ============================================================================

# --- Stage 1: Build the React Application ---
FROM node:20-alpine AS builder

WORKDIR /app

# Copy dependency manifests and install dependencies first
# This optimizes Docker layer caching
COPY package.json package-lock.json* ./
RUN npm ci || npm install

# Copy the rest of the application source code
COPY . .

# Build the Vite application for production
RUN npm run build

# --- Stage 2: Serve with Nginx ---
FROM nginx:alpine

# Copy the build output from the builder stage to Nginx's html directory
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy the custom Nginx configuration for client-side routing (React Router fallback)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 (will be mapped to 3000 in docker-compose)
EXPOSE 80

# Run Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
