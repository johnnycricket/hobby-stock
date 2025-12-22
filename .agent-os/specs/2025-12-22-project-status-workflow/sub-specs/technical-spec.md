# Technical Specification

This is the technical specification for the spec detailed in @.agent-os/specs/2025-12-22-project-status-workflow/spec.md

## Technical Requirements

### Backend Implementation

- **Status Enum Creation:**
  - Create `ProjectStatus` enum in Kotlin: `PLANNING`, `ACTIVE`, `ON_HOLD`, `COMPLETED`
  - Use JPA `@Enumerated(EnumType.STRING)` for database storage
  - Update `ProjectsEntity` to use `ProjectStatus` enum instead of `String`

- **Database Migration:**
  - Create Flyway migration `V6__Add_project_status_enum.sql`
  - Convert existing VARCHAR status column to use enum values
  - Migrate existing data: map current status strings to enum values
  - Set default status to `PLANNING` for new projects

- **Status Transition Validation:**
  - Implement `StatusTransitionValidator` service
  - Define valid transitions:
    - PLANNING → ACTIVE, ON_HOLD
    - ACTIVE → ON_HOLD, COMPLETED
    - ON_HOLD → ACTIVE, COMPLETED
    - COMPLETED → (no transitions allowed)
  - Add validation in `ProjectService.updateProjectStatus()` method
  - Return clear error messages for invalid transitions

- **GraphQL Schema Updates:**
  - Add `ProjectStatus` enum to GraphQL schema
  - Update `Project` type to use `status: ProjectStatus!` instead of `String!`
  - Update `ProjectInput` to use `status: ProjectStatus!`
  - Update `updateProjectStatus` mutation to accept and return enum

- **Service Layer:**
  - Update `ProjectService` methods to use enum type
  - Add `findByStatusPaginated(status: ProjectStatus, page: Int, size: Int)` method
  - Ensure all status-related queries use enum type

### Frontend Implementation

- **TypeScript Enum:**
  - Create `ProjectStatus` enum matching backend values
  - Update `Project` type to use `status: ProjectStatus` instead of `string`
  - Update `ProjectInput` type to use enum

- **Status Badge Component:**
  - Create `ProjectStatusBadge` component with color coding:
    - PLANNING: gray/slate
    - ACTIVE: green
    - ON_HOLD: yellow/amber
    - COMPLETED: blue
  - Include appropriate icons for each status
  - Support different sizes (sm, md, lg)

- **Form Updates:**
  - Update `ProjectForm` to use enum-based select dropdown
  - Remove hardcoded status options, use enum values
  - Add visual feedback for status selection
  - Display transition validation errors if backend rejects invalid transition

- **Status Filtering:**
  - Add status filter dropdown in `Projects` page
  - Implement filter state management
  - Update project queries to include status filter parameter
  - Show active filter with clear option

- **Display Components:**
  - Update `ProjectCard` to display status badge
  - Update `ProjectDetails` to show status prominently
  - Ensure consistent status display across all views

### UI/UX Specifications

- **Status Colors:**
  - PLANNING: `slate-500` (gray)
  - ACTIVE: `green-500` (green)
  - ON_HOLD: `amber-500` (yellow)
  - COMPLETED: `blue-500` (blue)

- **Status Icons (Lucide React):**
  - PLANNING: `ClipboardList`
  - ACTIVE: `PlayCircle`
  - ON_HOLD: `PauseCircle`
  - COMPLETED: `CheckCircle`

- **Status Badge Design:**
  - Rounded pill shape
  - Icon + text layout
  - Consistent sizing and spacing
  - Accessible color contrast

- **Filter UI:**
  - Dropdown select with "All Statuses" option
  - Visual indicator showing active filter
  - Clear filter button
  - Filter persists in URL query params (optional)

## Integration Requirements

- Integrates with existing `ProjectService` and `ProjectMutation`
- Works with existing pagination system
- Compatible with existing project queries
- No breaking changes to existing project data

## Performance Criteria

- Status filtering queries complete in < 200ms for typical datasets
- Status transition validation completes in < 50ms
- Enum conversion adds no measurable performance overhead

## External Dependencies

No new external dependencies required. Uses existing stack:
- Spring Boot GraphQL (existing)
- React Hook Form (existing)
- Lucide React icons (existing)
- PostgreSQL enum support (existing)

