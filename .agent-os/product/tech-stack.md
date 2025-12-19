# Technical Stack

> Last Updated: 2025-12-17
> Version: 1.0.0

## Application Framework

- **Framework:** Spring Boot
- **Version:** 3.2.0

## Database

- **Primary Database:** PostgreSQL 15+

## JavaScript

- **Framework:** React
- **Version:** 18.2.0
- **Build Tool:** Vite 4.5.0
- **Package Manager:** npm
- **Node Version:** 22 LTS

## Import Strategy

- **Strategy:** Node.js modules

## CSS Framework

- **Framework:** TailwindCSS
- **Version:** 3.3.5

## UI Component Library

- **Library:** Lucide React
- **Version:** 0.294.0

## Font Provider

- **Provider:** Google Fonts
- **Loading:** Self-hosted for performance

## Icon Library

- **Library:** Lucide React components

## Application Hosting

- **Hosting:** AWS App hosting
- **Region:** us-east-1

## Database Hosting

- **Hosting:** AWS Managed PostgreSQL
- **Backups:** Weekly automated

## Asset Storage

- **Storage:** Amazon S3
- **CDN:** CloudFront
- **Access:** Private with signed URLs

## Deployment Solution

- **Platform:** GitHub Actions
- **Trigger:** Push to main/staging branches
- **Tests:** Run before deployment
- **Production Environment:** main branch
- **Staging Environment:** staging branch

## Code Repository

- **URL:** (To be configured)

## Additional Technical Details

### Backend Stack

- **Language:** Kotlin 1.9.20
- **Java Version:** 17
- **GraphQL:** Spring for GraphQL (official Spring project)
- **ORM:** JPA/Hibernate
- **Database Migrations:** Flyway
- **API Style:** GraphQL with GraphiQL playground

### Frontend Stack

- **Language:** TypeScript 5.2.2
- **State Management:** Apollo Client 3.8.7
- **Routing:** React Router DOM 6.20.1
- **Form Handling:** React Hook Form 7.65.0 with Zod validation
- **Styling Utilities:** clsx, tailwind-merge

### Development Environment

- **Containerization:** Docker and Docker Compose
- **Local Development:** Docker Compose for full stack, or individual services
