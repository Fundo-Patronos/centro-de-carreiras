# Etapa 1: Construção do Frontend
FROM node:18-alpine AS frontend-build

# Set the working directory for frontend
WORKDIR /app/frontend

# Copy package.json and package-lock.json and install dependencies
COPY frontend/package.json frontend/package-lock.json ./
RUN npm ci

# Copy all files and build the app
COPY frontend ./
RUN npm run build

# Etapa 2: Construção do Backend
FROM python:3.10-slim AS backend-build

# Set the working directory for backend
WORKDIR /app/backend

# Copy requirements.txt and install dependencies
COPY backend/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copy all backend files
COPY backend ./

# Etapa 3: Imagem final
FROM node:18-alpine

# Set the working directory for final image
WORKDIR /app

# Set environment to production
ENV NODE_ENV=production

# Copy the frontend build artifacts
COPY --from=frontend-build /app/frontend/.next /app/frontend/.next
COPY --from=frontend-build /app/frontend/node_modules /app/frontend/node_modules

# Copy backend files
COPY --from=backend-build /app/backend /app/backend

# Expose the ports for both services
EXPOSE 3000 8000

# Healthcheck para o frontend
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
    CMD wget -q --spider http://localhost:3000/ || exit 1

# Run both the frontend and backend
CMD ["sh", "-c", "npm run start --prefix /app/frontend & uvicorn backend.app:app --host 0.0.0.0 --port 8000 --reload"]
