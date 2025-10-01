# Hobby Stock

A full-stack web application for managing hobby inventory and projects, built with React, Spring Boot/Kotlin, GraphQL, and PostgreSQL.

## 🏗️ Architecture

- **Frontend**: React 18 with TypeScript, Vite, Tailwind CSS, Apollo Client
- **Backend**: Spring Boot 3.2 with Kotlin, GraphQL, JPA/Hibernate
- **Database**: PostgreSQL 15 with Flyway migrations
- **Development**: Docker Compose for local development environment

## 🚀 Quick Start

### Prerequisites

- Docker and Docker Compose
- Java 17+ (for local backend development)
- Node.js 18+ (for local frontend development)

### Using Docker Compose (Recommended)

1. **Clone and start the services:**
   ```bash
   git clone <repository-url>
   cd hobby-stock
   docker-compose up -d
   ```

2. **Access the applications:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8080
   - GraphQL Playground: http://localhost:8080/graphiql
   - PostgreSQL: localhost:5432

3. **Stop the services:**
   ```bash
   docker-compose down
   ```

### Local Development

#### Backend (Spring Boot/Kotlin)

1. **Navigate to backend directory:**
   ```bash
   cd HSAPI
   ```

2. **Start PostgreSQL (if not using Docker):**
   ```bash
   # Using Docker for just the database
   docker run --name hobbystock-postgres \
     -e POSTGRES_DB=hobbystock \
     -e POSTGRES_USER=hobbystock \
     -e POSTGRES_PASSWORD=hobbystock \
     -p 5432:5432 \
     -d postgres:15-alpine
   ```

3. **Run the application:**
   ```bash
   ./gradlew bootRun
   ```

#### Frontend (React)

1. **Navigate to frontend directory:**
   ```bash
   cd app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

## 📁 Project Structure

```
hobby-stock/
├── app/                          # React frontend
│   ├── src/
│   │   ├── components/           # Reusable React components
│   │   ├── pages/               # Page components
│   │   ├── lib/                 # Utilities and configurations
│   │   └── main.tsx             # Application entry point
│   ├── package.json
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   └── Dockerfile
├── HSAPI/                        # Spring Boot backend
│   ├── src/main/kotlin/
│   │   └── com/hobbystock/
│   │       ├── HobbyStockApplication.kt
│   │       ├── graphql/         # GraphQL resolvers
│   │       └── config/          # Configuration classes
│   ├── src/main/resources/
│   │   ├── application.yml      # Application configuration
│   │   ├── graphql/            # GraphQL schema
│   │   └── db/migration/       # Database migrations
│   ├── build.gradle.kts
│   └── Dockerfile
├── hs-db/                       # Database initialization
│   └── init/
├── docker-compose               # Development environment
└── README.md
```

## 🛠️ Development

### Database Schema

The application includes the following main entities:

- **Categories**: Organize items into groups
- **Items**: Individual inventory items with quantities and locations
- **Projects**: Track ongoing hobby projects
- **Project Items**: Link items to projects with usage quantities

### GraphQL API

The backend exposes a GraphQL API at `/graphql` with:

- **Query**: `hello` - Test endpoint to verify API connectivity
- **GraphiQL**: Interactive GraphQL playground at `/graphiql`

### Frontend Features

- **Modern React**: Built with React 18, TypeScript, and modern hooks
- **Styling**: Tailwind CSS for utility-first styling
- **State Management**: Apollo Client for GraphQL state management
- **Routing**: React Router for client-side navigation
- **Development**: Vite for fast development and building

## 🔧 Configuration

### Environment Variables

#### Backend (application.yml)
- Database connection settings
- GraphQL endpoint configuration
- CORS settings for frontend integration

#### Frontend (vite.config.ts)
- Development server proxy to backend
- Build configuration

### Docker Configuration

The `docker-compose` file configures:
- PostgreSQL database with persistent storage
- Spring Boot backend with hot reload
- React frontend with hot reload
- Network isolation and service dependencies

## 📝 API Documentation

### GraphQL Endpoints

- **GraphQL API**: `http://localhost:8080/graphql`
- **GraphiQL Playground**: `http://localhost:8080/graphiql`

### Sample Query

```graphql
query {
  hello
}
```

## 🧪 Testing

### Backend Testing
```bash
cd HSAPI
./gradlew test
```

### Frontend Testing
```bash
cd app
npm run lint
```

## 🚀 Deployment

### Production Build

#### Backend
```bash
cd HSAPI
./gradlew build
java -jar build/libs/hobby-stock-api-*.jar
```

#### Frontend
```bash
cd app
npm run build
# Serve the dist/ directory with a web server
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License - see the LICENSE file for details.

## 👨‍💻 Author

**John Vorwald**

---

For more detailed information about specific components, check the individual README files in the `app/` and `HSAPI/` directories.