# Codigo Desconocido

## Overview
Codigo Desconocido is a multi-component escape room management platform. It includes a web-based admin panel, backend services, chat server, and Dockerized infrastructure for scalable deployment. The project is designed for educational and entertainment purposes, allowing users to book, manage, and interact with escape rooms.

## Features
- **Frontend (pi-admin):** Modern React-based admin dashboard for managing rooms, bookings, clients, and more.
- **Backend (Flask):** RESTful API for business logic, client management, and data persistence.
- **Chat Server:** Real-time communication for users and admins (Node.js).
- **Dockerized Infrastructure:** Easy setup for development and production using Docker Compose.
- **Database Support:** MongoDB and MySQL integration for flexible data storage.

## Technologies Used
- React (Frontend)
- Flask (Backend API)
- Node.js (Chat Server)
- MongoDB & MySQL (Databases)
- Docker & Docker Compose

## Folder Structure

```
Codigo-Desconocido/
├── backend/           # Flask backend API
├── docker/            # Docker configs, compose, and service folders
│   ├── flask/         # Flask Docker setup
│   ├── node/          # Node.js chat server Docker setup
│   ├── phpmyadmin/    # phpMyAdmin Docker setup
│   ├── mongo-volume/  # MongoDB data volume
├── frontend/
│   └── pi-admin/      # React admin dashboard
├── Server-Chat/       # Node.js chat server
├── README.md          # Project documentation
└── ...                # Other scripts and files
```

## Setup & Installation

### Prerequisites
- Docker & Docker Compose
- Node.js & npm (for local frontend/server development)
- Python 3.x (for local backend development)

### Quick Start (Recommended)
1. Clone the repository:
	 ```sh
	 git clone <repo-url>
	 cd Codigo-Desconocido
	 ```
2. Copy or edit environment variables in `docker/.env` as needed.
3. Start all services with Docker Compose:
	 ```sh
	 cd docker
	 docker-compose up --build
	 ```
4. Access the frontend at [http://localhost:3000](http://localhost:3000)
5. Backend API runs at [http://localhost:5000](http://localhost:5000)
6. Chat server runs at [http://localhost:4000](http://localhost:4000)

### Manual Development
- **Frontend:**
	```sh
	cd frontend/pi-admin
	npm install
	npm start
	```
- **Backend:**
	```sh
	cd docker/flask
	pip install -r requirements.txt
	python app.py
	```
- **Chat Server:**
	```sh
	cd docker/node
	npm install
	node server.js
	```

## Usage
- Book and manage escape rooms via the admin dashboard.
- Real-time chat for support and collaboration.
- Manage clients, bookings, and rooms from the backend.

## Authors
- Alejandro Fernandez
- Tatiana Fuentes 
- Miguel Angel Rufino
- Juan Carlos Carballo
- Samuel Sanchez
