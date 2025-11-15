# ft_transcendence

A real-time, multiplayer Pong web application built as the culminating project of the 42 Common Core. This project blends classic Pong gameplay with advanced web features, microservices architecture, and robust security.

## 🎯 Project Overview

ft_transcendence is a full-stack web application featuring:
- **Real-time multiplayer Pong gameplay** with WebSocket connections
- **Tournament system** for competitive play
- **AI opponent** for single-player matches
- **Chat functionality** for user communication
- **User authentication & management** with secure OAuth integration
- **Microservices architecture** for scalability and maintainability

## 🏗️ Architecture

The project follows a microservices architecture with the following services:

### Core Services

| Service | Description | Technology |
|---------|-------------|------------|
| **frontend** | User interface and client-side logic | TypeScript, CSS, HTML |
| **gateway** | API Gateway and request routing | Node.js/Fastify |
| **nginx** | Reverse proxy and load balancer | Nginx |
| **auth-service** | Authentication and authorization | Node.js/Fastify |
| **user-management** | User profiles and data management | Node.js/Fastify |
| **chat-service** | Real-time chat functionality | Node.js/Fastify + WebSockets |
| **server-side-pong** | Game logic and state management | Node.js/Fastify |
| **ai-opponent** | AI player implementation | Node.js/Fastify |
| **tournament-service** | Tournament creation and management | Node.js/Fastify |
| **base-node-image** | Base Docker image for Node services | Docker |

### Technology Stack

- **Frontend**: TypeScript, CSS3, HTML5
- **Backend**: Node.js with Fastify framework
- **Real-time Communication**: WebSockets
- **Containerization**: Docker & Docker Compose
- **Reverse Proxy**: Nginx
- **Architecture Pattern**: Microservices

## 📋 Prerequisites

Before running this project, ensure you have the following installed:

- **Docker** (version 20.10 or higher)
- **Docker Compose** (version 1.29 or higher)
- **Git**
- **Make** (optional, for using Makefile commands)

### Installation Links
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- [Docker Engine](https://docs.docker.com/engine/install/)

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/SalvadorChamizo/ft_transcendence.git
cd ft_transcendence
```

### 2. Environment Configuration

You'll need to create environment configuration files for the services. Create a `.env` file in each service that requires one, you'll find a `.env.example` like this:

**Auth service `.env` example:**
```env
# Container Port
PORT=8081

# Json Web Token secrets
JWT_SECRET=ADD_SECRET
REFRESH_SECRET=ADD_REFRESH_SECRET

# 42 OAuth
FORTY_TWO_CLIENT_ID=ADD_42_CLIENT_ID
FORTY_TWO_CLIENT_SECRET=ADD_42_CLIENT_SECRET
FORTY_TWO_REDIRECT_URI=ADD_HOST_URL_AND_PORT/api/auth/42/callback
FRONTEND_REDIRECT_IP=ADD_HOST_URL

# Google OAuth
GOOGLE_CLIENT_ID=ADD_GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET=ADD_GOOGLE_CLIENT_SECRET
GOOGLE_REDIRECT_URI=http://localhost:8443/auth/google/callbacks

# Forgot Password Email
EMAIL_ACCOUNT=ADD_EMAIL_ACCOUNT
EMAIL_PASS=ADD_EMAIL_PASSWORD
```

**Note**: For 42 OAuth integration, you'll need to:
1. Register an application at the [42 API](https://profile.intra.42.fr/oauth/applications)
2. Set the redirect URI to your application URL
3. Copy the Client ID and Client Secret to your `.env` file

### 3. Build and Run

#### Using Make (Recommended)

```bash
# Build and start all services
make

# Or explicitly:
make build
```

#### Using Docker Compose Directly

```bash
# Build and start all services
docker-compose up --build

# Run in detached mode (background)
docker-compose up -d --build
```

### 4. Access the Application

Once all containers are running, access the application at:

```
https://localhost:8443
```

Or the port specified in your configuration.

## 🎮 Features

### Gameplay
- **Real-time Pong matches**: Play against other users in real-time
- **AI opponent**: Practice against computer-controlled opponents
- **Server-side game logic**: Prevents cheating with authoritative server
- **Smooth animations**: Responsive and fluid gameplay experience

### Tournament System
- Create and join tournaments
- Bracket-style competition

### User Management
- OAuth authentication (42 Intra)
- User profiles with avatars
- Statistics tracking (wins, losses, rankings)
- Match history
- Friend system

### Chat & Social
- Real-time chat functionality
- Direct messages
- User blocking and moderation

### Security Features
- JWT-based authentication
- Encrypted password storage
- SQL injection prevention
- XSS protection
- CSRF tokens
- Rate limiting

## 🛠️ Development

### Project Structure

```
ft_transcendence/
├── frontend/              # Frontend application
├── gateway/               # API Gateway service
├── nginx/                 # Nginx configuration
├── auth-service/          # Authentication service
├── user-management/       # User management service
├── chat-service/          # Chat functionality
├── server-side-pong/      # Game logic service
├── ai-opponent/           # AI player service
├── tournament-service/    # Tournament management
├── base-node-image/       # Base Docker image
├── docker-compose.yml     # Docker orchestration
├── Makefile              # Build automation
└── README.md             # This file
```

### Available Make Commands

```bash
make            # Build and start all services
make build      # Build all Docker images
make up         # Start all services
make down       # Stop all services
make clean      # Stop and remove containers
make fclean     # Clean + remove volumes and images
make re         # Rebuild everything from scratch
make logs       # View logs from all services
```

### Viewing Logs

```bash
# All services
docker logs -f

# Specific service
docker logs -f frontend
docker logs -f gateway
```

### Accessing Service Containers

```bash
# List running containers
docker ps

# Access a specific container
docker exec -it <container_name> /bin/sh

# Examples:
docker exec -it frontend /bin/sh
docker exec -it auth-service /bin/sh
```

## 🔧 Troubleshooting

### Port Conflicts

If you encounter port conflicts:

1. Check which process is using the port:
```bash
# Linux/Mac
lsof -i :8443

# Windows
netstat -ano | findstr :8443
```

2. Either stop the conflicting service or change the port in `docker-compose.yml`

### Container Issues

```bash
# Stop all containers
docker-compose down

# Remove all containers, volumes, and images
make fclean

# Rebuild everything
make re
```

### Permission Issues

```bash
# Fix permissions (Linux/Mac)
sudo chown -R $USER:$USER .
```

## 📝 API Documentation

The API Gateway provides access to all microservices. Key endpoints include:

- `/api/auth/*` - Authentication endpoints
- `/api/users/*` - User management
- `/api/game/*` - Game functionality
- `/api/chat/*` - Chat features
- `/api/tournaments/*` - Tournament management

*Note: For detailed API documentation, check individual service directories.*

## 🧪 Testing

```bash
# Run tests (if implemented)
docker-compose run <service_name> npm test

# Example:
docker-compose run auth-service npm test
```

## 🤝 Contributing

This is a 42 School project. Contributions follow 42's academic integrity policy.

### Team Contributors
Check the [Contributors](https://github.com/SalvadorChamizo/ft_transcendence/graphs/contributors) section for team members.

## 📜 License

This project is part of the 42 School curriculum.

## 🔗 Resources

- [42 School](https://www.42.fr/)
- [Docker Documentation](https://docs.docker.com/)
- [Fastify Framework](https://www.fastify.io/)
- [WebSocket Protocol](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API)

## 📞 Support

For issues, questions, or discussions:
- Open an issue on [GitHub](https://github.com/SalvadorChamizo/ft_transcendence/issues)
- Contact the repository maintainers

---

**Note**: This project was created as part of the 42 Common Core curriculum. It demonstrates proficiency in full-stack development, microservices architecture, real-time applications, and modern web technologies.