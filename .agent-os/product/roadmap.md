# Product Roadmap

> Last Updated: 2025-12-17
> Version: 1.0.0
> Status: Planning

## Phase 1: Core MVP Functionality

**Goal:** Deliver a functional inventory and project management system with essential features for organizing hobby supplies and tracking projects.

**Success Criteria:** Users can add inventory items, organize by categories, create projects, link items to projects, and view basic dashboards.

### Features

- [x] Inventory item CRUD operations - Create, read, update, and delete inventory items with all essential fields `M`
- [x] Category management - Create and manage categories for organizing items `S`
- [x] Project CRUD operations - Create, read, update, and delete projects with status tracking `M`
- [x] Project-item linking - Link inventory items to projects with quantity tracking `M`
- [x] Basic dashboard - Overview of total items, active projects, categories, and low stock alerts `S`
- [x] GraphQL API - Complete GraphQL API with queries and mutations for all entities `L`
- [x] Database schema and migrations - PostgreSQL schema with Flyway migrations `M`

### Dependencies

- Spring Boot backend setup
- PostgreSQL database
- React frontend setup
- GraphQL schema definition

## Phase 2: Enhanced User Experience

**Goal:** Improve usability with advanced search, filtering, pagination, and better inventory management features.

**Success Criteria:** Users can efficiently navigate large inventories, find items quickly, and receive proactive low-stock notifications.

### Features

- [x] Pagination support - Paginated queries for items, projects, and categories to handle large datasets `M`
- [x] Search functionality - Search items and projects by name or description `S`
- [x] Filter by category - Filter inventory items by category `S`
- [x] Filter by location - Filter and search items by storage location `S`
- [x] Low stock detection - Automatic identification of items below minimum quantity thresholds `S`
- [x] Quantity adjustment - Adjust item quantities with support for different amount types (count, volume, percentage) `S`
- [x] Item location management - Move items between locations and track location-based inventory `S`

### Dependencies

- Phase 1 completion
- GraphQL pagination implementation
- Frontend search and filter components

## Phase 3: Project Planning Enhancements

**Goal:** Enable comprehensive project planning with supply checking, usage tracking, and project status management.

**Success Criteria:** Users can verify project readiness, track item usage across projects, and manage project lifecycles effectively.

### Features

- [ ] Project supply checking - View required items for a project and compare against available inventory `M`
- [ ] Project status workflow - Enhanced project status management with transitions (planning, active, on-hold, completed) `S`
- [ ] Project completion tracking - Mark projects as complete with end dates and archive completed projects `S`
- [ ] Usage analytics - Track which items are used most frequently across projects `M`
- [ ] Project templates - Create reusable project templates for common hobby project types `L`
- [ ] Bulk operations - Add multiple items to projects at once, bulk quantity adjustments `M`

### Dependencies

- Phase 2 completion
- Enhanced project-item relationship queries
- Analytics data collection

## Phase 4: Advanced Features and Polish

**Goal:** Add advanced features like reporting, data export, mobile responsiveness, and performance optimizations.

**Success Criteria:** Application is production-ready with comprehensive features, excellent performance, and mobile-friendly interface.

### Features

- [ ] Inventory reports - Generate reports on inventory value, usage trends, and category breakdowns `M`
- [ ] Data export - Export inventory and project data to CSV/JSON formats `S`
- [ ] Mobile responsive design - Optimize UI for mobile and tablet devices `L`
- [ ] Image support - Add images to inventory items and projects `M`
- [ ] Barcode scanning - Scan barcodes to quickly add items to inventory (mobile) `XL`
- [ ] Notifications - Email or in-app notifications for low stock alerts `M`
- [ ] Performance optimization - Optimize queries, implement caching, and improve load times `M`

### Dependencies

- Phase 3 completion
- Mobile design system
- Image storage solution (S3)
- Notification service integration

## Phase 5: Collaboration and Sharing

**Goal:** Enable sharing and collaboration features for hobby communities and multi-user scenarios.

**Success Criteria:** Users can share projects, collaborate on inventory management, and work together on hobby projects.

### Features

- [ ] User accounts and authentication - Multi-user support with authentication `L`
- [ ] Project sharing - Share projects with other users or make them public `M`
- [ ] Collaborative inventory - Shared inventory spaces for hobby groups or families `L`
- [ ] Activity feed - Track changes and updates across shared projects and inventory `M`
- [ ] Comments and notes - Add comments to projects and items for collaboration `S`
- [ ] Permissions system - Role-based access control for shared spaces `L`

### Dependencies

- Phase 4 completion
- Authentication system
- User management infrastructure
- Real-time update system
