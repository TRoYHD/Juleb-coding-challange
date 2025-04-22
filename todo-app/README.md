# NestJS-Ionic Todo App

A full-stack Todo application with a NestJS backend and Ionic React frontend, packaged in Docker.

## Project Structure

```
nest-ionic-todo/
├── frontend/               # Ionic React app
├── backend/                # NestJS app
├── docker-compose.yml      # Docker composition
├── Dockerfile              # Docker image definition
└── README.md               # Setup instructions
```

## Features

- Ionic React frontend
- NestJS backend with REST API
- SQLite database with TypeORM
- Docker packaging
- CRUD operations for Todo items

## Prerequisites

To run this application locally, you need to have the following installed:

- Node.js 16+ and npm
- Docker and Docker Compose (for containerized deployment)
- Git

## Local Development

### Frontend (Ionic React)

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm start
```

The frontend will be available at http://localhost:8100

### Backend (NestJS)

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Start development server
npm run start:dev
```

The backend API will be available at http://localhost:3000/api

## Building for Production

You can use the provided build script to build both frontend and backend:

```bash
# Make the script executable
chmod +x build.sh

# Run the build script
./build.sh
```

This will:
1. Build the Ionic React frontend
2. Copy the build output to the backend's public directory
3. Build the NestJS backend

## Docker Deployment

### Building the Docker Image

```bash
# Build the Docker image
docker build -t yourusername/nest-ionic-todo:latest .

# Push the image to Docker Hub
docker push yourusername/nest-ionic-todo:latest
```

### Running with Docker Compose

1. Update the `docker-compose.yml` file to use your Docker Hub username or preferred image name.

2. Run the application:

```bash
docker-compose up -d
```

The application will be available at http://localhost:3000

### Docker Compose Configuration

The included `docker-compose.yml` file contains the following configuration:

```yaml
version: '3.8'

services:
  nest-ionic-todo:
    image: yourusername/nest-ionic-todo:latest
    restart: unless-stopped
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - PORT=3000
    volumes:
      - todo-data:/app/data

volumes:
  todo-data:
```

You can modify this file to suit your specific deployment needs.

## API Endpoints

The backend provides the following REST API endpoints:

- `GET /api/todos` - Get all todos
- `GET /api/todos/:id` - Get a specific todo
- `POST /api/todos` - Create a new todo
- `PATCH /api/todos/:id` - Update a todo
- `DELETE /api/todos/:id` - Delete a todo

## Database

The application uses SQLite as the database, with TypeORM for database operations. 
In the Docker container, the SQLite database file is stored in the `/app/data` directory, 
which is persisted using a Docker volume.

## License

MIT