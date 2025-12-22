# Spec Requirements Document

> Spec: Project Status Workflow
> Created: 2025-12-22
> Status: Planning

## Overview

Implement enhanced project status management with defined workflow transitions (planning, active, on-hold, completed) using enum-based status values and transition validation to ensure users can track project progress through clear lifecycle stages.

## User Stories

### Project Status Workflow Management

As a hobby enthusiast, I want to manage project statuses with defined workflow transitions (planning, active, on-hold, completed), so that I can track project progress through clear lifecycle stages and understand which projects are ready to start, in progress, paused, or finished.

When creating or editing a project, users can select from predefined status values (PLANNING, ACTIVE, ON_HOLD, COMPLETED) with appropriate UI indicators. The system enforces valid status transitions (e.g., PLANNING → ACTIVE → ON_HOLD → ACTIVE or COMPLETED) and provides visual feedback for each status. Users can filter and view projects by status to organize their work effectively.

## Spec Scope

1. **Status Enum Implementation** - Convert project status from String to enum type (PLANNING, ACTIVE, ON_HOLD, COMPLETED) in both backend and frontend for type safety and validation.

2. **Status Transition Validation** - Implement business logic to validate status transitions, preventing invalid state changes (e.g., COMPLETED → ACTIVE) while allowing valid workflows.

3. **Enhanced UI Components** - Create status badge components with color coding and icons, update project forms to use enum-based dropdowns, and display status indicators throughout the application.

4. **Status Filtering** - Add status-based filtering capabilities in the projects list view, allowing users to view projects by specific status with pagination support.

5. **GraphQL Schema Updates** - Update GraphQL schema to expose ProjectStatus enum type and ensure all queries and mutations use the enum instead of String.

## Out of Scope

- Project completion tracking with end dates (separate spec)
- Status change history or audit logging
- Custom status values or user-defined statuses
- Status-based notifications or alerts
- Automated status transitions based on project conditions
- Status templates or presets

## Expected Deliverable

1. Users can select and transition between four project statuses (PLANNING, ACTIVE, ON_HOLD, COMPLETED) with visual indicators, and the system validates status transitions to prevent invalid state changes.

2. Projects can be filtered by status in the projects list view, and status badges are displayed consistently across project cards, details pages, and forms.

3. The GraphQL API uses ProjectStatus enum type for all project status operations, ensuring type safety and preventing invalid status values.

