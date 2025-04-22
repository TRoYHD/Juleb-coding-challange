# NestJS-Ionic Todo App

A full-stack Todo application with a NestJS backend and Ionic React frontend, packaged in Docker.

## Features

- Create, read, update, and delete Todo items
- Mark Todos as completed
- Persistent data storage using SQLite
- NestJS RESTful API backend
- Ionic React frontend with a clean UI
- Docker containerization for easy deployment

## Quick Start with Docker

There are two ways to run this application with Docker:

### Option 1: Using Docker Run (Simple but No Data Persistence)

If you just want to try the application quickly:

```bash
# Pull the image from Docker Hub
docker pull troyhd/nest-ionic-todo:latest

# Run the container
docker run -p 3000:3000 -d troyhd/nest-ionic-todo:latest
```

**Note:** With this method, your todo data will be lost if the container is restarted or removed.

### Option 2: Using Docker Compose (Recommended for Data Persistence)

For a more robust setup with data persistence:

1. Create a file named `docker-compose.yml` with the following content:

```yaml
version: '3.8'

services:
  nest-ionic-todo:
    image: troyhd/nest-ionic-todo:latest
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

2. Run the following command in the same directory as the file:

```bash
docker compose up -d
```

With this method, your todo data will be stored in a Docker volume, ensuring it persists even if you restart or rebuild the container.

3. Access the application at [http://localhost:3000](http://localhost:3000)  or  [http://localhost:3000/todos](http://localhost:3000/todos)

### Stopping the Application

To stop the Docker Compose version:
```bash
docker compose down
```

To stop the Docker Run version, first find the container ID:
```bash
docker ps
```
Then stop it:
```bash
docker stop [CONTAINER_ID]
```

## Technology Stack

- **Frontend**: Ionic Framework, React, TypeScript
- **Backend**: NestJS, TypeORM
- **Database**: SQLite
- **Deployment**: Docker

## Data Persistence

The application uses a Docker volume (`todo-data`) to persist the SQLite database, ensuring your todos remain saved even if you restart the container.

