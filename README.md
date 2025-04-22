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

The easiest way to get the application running is with Docker Compose - no need to clone the repository or install dependencies.

### Prerequisites

- Docker and Docker Compose installed on your machine

### Installation and Setup

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

3. Access the application at [http://localhost:3000](http://localhost:3000)

### Stopping the Application

To stop the application, run:

```bash
docker compose down
```

## Technology Stack

- **Frontend**: Ionic Framework, React, TypeScript
- **Backend**: NestJS, TypeORM
- **Database**: SQLite
- **Deployment**: Docker

## Data Persistence

The application uses a Docker volume (`todo-data`) to persist the SQLite database, ensuring your todos remain saved even if you restart the container.

