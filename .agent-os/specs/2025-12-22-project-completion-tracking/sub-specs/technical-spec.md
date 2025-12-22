# Technical Specification

This is the technical specification for the spec detailed in @.agent-os/specs/2025-12-22-project-completion-tracking/spec.md

## Technical Requirements

### Backend Implementation

- **Database Schema:**
  - Add `completed_at` TIMESTAMP column to `projects` table (nullable)
  - Create database migration `V7__Add_project_completion_tracking.sql`
  - Add index on `completed_at` for efficient filtering (partial index for non-null values)

- **Entity Updates:**
  - Add `completedAt: LocalDateTime?` field to `ProjectsEntity`
  - Update `toGraphQLType()` method to include `completedAt` in response

- **Service Layer:**
  - Update `ProjectService.completeProject()` method to:
    - Set status to `COMPLETED` (if status enum exists) or status string "COMPLETED"
    - Set `completedAt` to current timestamp
    - Set `endDate` if provided in input
    - Validate project exists and is not already completed
  - Add query method `findCompletedProjectsPaginated()` for archived projects view

- **GraphQL Schema:**
  - Add `completedAt: String` field to `Project` type
  - Update `completeProject` mutation to accept optional `endDate` parameter
  - Ensure mutation returns updated project with `completedAt` timestamp

### Frontend Implementation

- **Type Updates:**
  - Add `completedAt?: string` to `Project` type
  - Update project service types to include completion date

- **Completion Action:**
  - Add "Mark as Complete" button in `ProjectDetails` component
  - Create `CompleteProjectModal` component with:
    - Optional end date input (date picker)
    - Confirmation message
    - Success/error handling
  - Call `completeProject` mutation on confirmation

- **Archive Filtering:**
  - Add archive filter toggle in `Projects` page
  - Implement filter state: "Show Completed" / "Hide Completed"
  - Update project queries to exclude completed projects when filter is active
  - Add visual indicator showing filter state

- **Display Updates:**
  - Display `completedAt` date in `ProjectDetails` when project is completed
  - Show completion date in `ProjectCard` for completed projects
  - Use muted colors or distinct styling for completed projects
  - Add completion icon (checkmark) for completed projects

### UI/UX Specifications

- **Completion Button:**
  - Prominent button in project details view
  - Only visible when project is not already completed
  - Color: green/primary
  - Icon: `CheckCircle` from Lucide React

- **Completion Modal:**
  - Title: "Mark Project as Complete"
  - Optional end date field (date picker)
  - Confirmation message: "Are you sure you want to mark this project as complete?"
  - Cancel and Confirm buttons

- **Archive Filter:**
  - Toggle switch or checkbox: "Show Completed Projects"
  - Position: Near project list header or filter section
  - Clear visual state (checked/unchecked)
  - Filter persists during session (optional: URL query param)

- **Completed Project Styling:**
  - Muted text colors (gray-500)
  - Completion badge/indicator
  - Completion date displayed prominently
  - Optional: strikethrough or faded appearance

- **Completion Date Display:**
  - Format: "Completed on [Date]" or "Completed: [Date]"
  - Use readable date format (e.g., "December 22, 2025")
  - Icon: `Calendar` or `CheckCircle`

## Integration Requirements

- Integrates with Project Status Workflow spec (if implemented)
- Works with existing `completeProject` mutation
- Compatible with existing project queries and pagination
- No breaking changes to existing project data

## Performance Criteria

- Completion mutation completes in < 200ms
- Archive filter queries complete in < 200ms for typical datasets
- Partial index on `completed_at` optimizes filtering performance

## External Dependencies

No new external dependencies required. Uses existing stack:
- Spring Boot GraphQL (existing)
- React Hook Form (existing)
- Lucide React icons (existing)
- PostgreSQL (existing)

