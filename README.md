NestJS-Ionic Todo App
A full-stack Todo application with a NestJS backend and Ionic React frontend, packaged in Docker.
Quick Start
The easiest way to get the application running is with Docker Compose:

Make sure you have Docker and Docker Compose installed
Create a file named docker-compose.yml with the following content:

yamlversion: '3.8'

services:
  nest-ionic-todo:
    image: troyhd/nest-ionic-todo:latest
    restart: unless-stopped
    ports:
      - "3001:3000"
    environment:
      - NODE_ENV=production
      - PORT=3000
    volumes:
      - todo-data:/app/data

volumes:
  todo-data:

Run the following command in the same directory as the file:

bashdocker compose up -d

Access the application at http://localhost:3001

Features

Create, read, update, and delete Todo items
Mark Todos as completed
Persistent data storage using SQLite
