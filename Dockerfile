# Multi-stage build for both frontend and backend

# Backend build stage
FROM node:18-alpine AS backend-builder
WORKDIR /app/backend
COPY backend/package*.json ./
RUN npm ci --only=production
COPY backend/ ./
RUN npm run build

# Frontend build stage
FROM node:18-alpine AS frontend-builder
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm ci
COPY frontend/ ./
ENV NEXT_PUBLIC_API_URL=http://localhost:8000
RUN npm run build

# Production stage
FROM node:18-alpine AS production
WORKDIR /app

# Install PM2 for process management
RUN npm install -g pm2

# Copy backend
COPY --from=backend-builder /app/backend/dist ./backend/dist
COPY --from=backend-builder /app/backend/node_modules ./backend/node_modules
COPY --from=backend-builder /app/backend/package.json ./backend/

# Copy frontend
COPY --from=frontend-builder /app/frontend/.next ./frontend/.next
COPY --from=frontend-builder /app/frontend/node_modules ./frontend/node_modules
COPY --from=frontend-builder /app/frontend/package.json ./frontend/
COPY --from=frontend-builder /app/frontend/public ./frontend/public

# Create data directory
RUN mkdir -p /app/backend/data

# Copy PM2 ecosystem file
COPY ecosystem.config.js ./

EXPOSE 3000 8000

CMD ["pm2-runtime", "start", "ecosystem.config.js"]
