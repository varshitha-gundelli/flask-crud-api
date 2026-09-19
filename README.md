# Flask CRUD API

A full-stack CRUD (Create, Read, Update, Delete) web application built using **Python Flask**, **SQLAlchemy**, **PostgreSQL**, HTML, CSS, and JavaScript. The application is containerized using **Docker and Docker Compose**.

## Features

* Create, read, update, and delete users.
* Manage product records through REST API endpoints.
* PostgreSQL database integration.
* SQLAlchemy ORM for database operations.
* Frontend interface using HTML, CSS, and JavaScript.
* RESTful API architecture.
* Dockerized Flask backend.
* Dockerized PostgreSQL database.
* Docker Compose for running multiple containers together.
* CORS support for frontend-backend communication.

## Technologies Used

| Technology     | Purpose                    |
| -------------- | -------------------------- |
| Python         | Backend programming        |
| Flask          | Web framework and REST API |
| SQLAlchemy     | Database ORM               |
| PostgreSQL     | Database                   |
| HTML           | Frontend structure         |
| CSS            | Frontend styling           |
| JavaScript     | Frontend functionality     |
| Docker         | Containerization           |
| Docker Compose | Multi-container deployment |

## Project Structure

```text
flask-crud-api/
│
├── static/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── app.py
├── Dockerfile
├── docker-compose.yml
├── requirements.txt
└── README.md
```

## Application Architecture

```text
        Browser
           |
           | HTTP Requests
           v
    Frontend (HTML/CSS/JS)
           |
           | REST API
           v
     Flask Application
           |
           | SQLAlchemy
           v
       PostgreSQL
```

## Database

The application uses PostgreSQL as the database.

The Flask application connects to PostgreSQL using the `DB_URL` environment variable.

Example:

```text
postgresql://username:password@db:5432/database_name
```

The database runs in a separate Docker container.

## API Endpoints

### Users

| Method | Endpoint      | Description             |
| ------ | ------------- | ----------------------- |
| GET    | `/users`      | Get all users           |
| GET    | `/users/<id>` | Get a specific user     |
| POST   | `/users`      | Create a new user       |
| PUT    | `/users/<id>` | Update an existing user |
| DELETE | `/users/<id>` | Delete a user           |

### Products

| Method | Endpoint         | Description      |
| ------ | ---------------- | ---------------- |
| GET    | `/products`      | Get all products |
| POST   | `/products`      | Create a product |
| PUT    | `/products/<id>` | Update a product |
| DELETE | `/products/<id>` | Delete a product |

## Running the Project with Docker

### 1. Clone the repository

```bash
git clone https://github.com/varshitha-gundelli/flask-crud-api.git
```

### 2. Open the project directory

```bash
cd flask-crud-api
```

### 3. Build and start the containers

```bash
docker compose up --build
```

If your Docker installation uses the older Compose command, use:

```bash
docker-compose up --build
```

### 4. Open the application

After the containers start successfully, open:

```text
http://127.0.0.1:4000/
```

The Flask application runs on port `4000`.

## Stopping the Application

To stop the running containers:

```bash
docker compose down
```

## Running in the Background

To start the application in detached mode:

```bash
docker compose up --build -d
```

To view the container logs:

```bash
docker compose logs
```

## API Testing

The API can be tested using:

* Web browser for GET requests
* Postman
* cURL
* The integrated frontend

Example GET request:

```text
GET http://127.0.0.1:4000/users
```

Example POST request:

```json
{
    "username": "John",
    "email": "john@example.com"
}
```

## Docker Containers

The project uses separate containers for the application and database.

```text
┌─────────────────────────┐
│     Flask Container     │
│                         │
│  Flask + SQLAlchemy     │
│        Port 4000        │
└────────────┬────────────┘
             │
             │ Database Connection
             ▼
┌─────────────────────────┐
│   PostgreSQL Container  │
│                         │
│        Port 5432        │
└─────────────────────────┘
```

Docker Compose manages both containers and their network communication.

## Future Improvements

* User authentication and authorization.
* Improved frontend design.
* Input validation and error handling.
* Pagination for large datasets.
* Search and filtering.
* API documentation using Swagger/OpenAPI.
* Production deployment.

## Author

**Varshitha Gundelli**

GitHub:
https://github.com/varshitha-gundelli

## License

This project is intended for educational and development purposes.
