FROM node:18-alpine AS frontend-builder
# Set working directory
WORKDIR /app
# Copy frontend package.json
COPY frontend/package*.json ./
# Install dependencies
RUN npm install
# Copy frontend source code
COPY frontend ./
# Build the frontend
RUN npm run build
# Verify the build contents
RUN ls -la /app/build && echo "Frontend build complete"

FROM node:18-alpine AS backend-builder
# Set working directory
WORKDIR /app
# Copy backend package.json
COPY backend/package*.json ./
# Install dependencies including dev dependencies
RUN npm install
# Copy backend source code
COPY backend ./
# Create public directory
RUN mkdir -p /app/public
# Copy frontend build from frontend-builder correctly
COPY --from=frontend-builder /app/build/ ./public/
# Verify the public directory
RUN ls -la /app/public && echo "Copied frontend build to public directory"
# Build the backend
RUN npm run build

FROM node:18-alpine
# Set working directory
WORKDIR /app
# Copy package.json and package-lock.json
COPY --from=backend-builder /app/package*.json ./
# Install only production dependencies
RUN npm install --only=production
# Copy compiled backend code
COPY --from=backend-builder /app/dist ./dist
# Copy public directory with frontend build
COPY --from=backend-builder /app/public ./public
# Create data directory for SQLite
RUN mkdir -p /app/data
# Ensure directories exist and have proper permissions with detailed output
RUN echo "Checking public directory:" && \
    ls -la /app && \
    ls -la /app/public && \
    echo "Checking public files:" && \
    find /app/public -type f | head -n 10 && \
    echo "Checking if index.html exists:" && \
    ls -la /app/public/index.html || echo "index.html NOT FOUND!"
# Fix permissions if needed
RUN chmod -R 755 /app/public
# Expose the port
EXPOSE 3000
# Command to run the application 
CMD ["node", "dist/main"]