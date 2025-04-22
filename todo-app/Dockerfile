FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json files for both frontend and backend
COPY frontend/package*.json ./frontend/
COPY backend/package*.json ./backend/

# Install dependencies for both projects
RUN cd frontend && npm install
RUN cd backend && npm install

# Copy source code for both projects
COPY frontend ./frontend
COPY backend ./backend

# Build the frontend
RUN cd frontend && npm run build

# Create public directory in backend and copy frontend build
RUN mkdir -p backend/public
RUN cp -r frontend/build/* backend/public/

# Build the backend
RUN cd backend && npm run build

# Start a new stage for the final image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY --from=builder /app/backend/package*.json ./

# Install only production dependencies
RUN npm install --only=production

# Copy compiled backend code and frontend static files
COPY --from=builder /app/backend/dist ./dist
COPY --from=builder /app/backend/public ./public

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["node", "dist/main"]