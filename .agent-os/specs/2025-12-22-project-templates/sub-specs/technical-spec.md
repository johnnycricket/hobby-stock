# Technical Specification

This is the technical specification for the spec detailed in @.agent-os/specs/2025-12-22-project-templates/spec.md

## Technical Requirements

### Backend Implementation

- **Database Schema:**
  - Create `project_templates` table with fields: id, name, description, default_status, created_at, updated_at
  - Create `project_template_items` table (many-to-many) with fields: id, template_id, item_id, quantity_used, created_at
  - Create Flyway migration `V8__Add_project_templates.sql`
  - Add foreign key constraints and indexes

- **Entity Classes:**
  - Create `ProjectTemplateEntity` with JPA annotations
  - Create `ProjectTemplateItemEntity` with relationships
  - Implement `toGraphQLType()` methods

- **Data Models:**
  - Create `ProjectTemplate` data class for GraphQL
  - Create `ProjectTemplateInput` for mutations
  - Create `ProjectTemplateItem` and `ProjectTemplateItemInput`

- **Service Layer:**
  - Create `ProjectTemplateService` with CRUD operations:
    - `createTemplate(input: ProjectTemplateInput)`
    - `updateTemplate(id, input)`
    - `deleteTemplate(id)`
    - `findAllTemplates()`
    - `findTemplateById(id)`
    - `findTemplatesPaginated(page, size)`
  - Create `createProjectFromTemplate(templateId, projectInput)` method
  - Handle template item associations

- **GraphQL Schema:**
  - Add `ProjectTemplate` type
  - Add `ProjectTemplateItem` type
  - Add `ProjectTemplateInput` input type
  - Add queries: `projectTemplates`, `projectTemplate(id)`, `projectTemplatesPaginated`
  - Add mutations: `createProjectTemplate`, `updateProjectTemplate`, `deleteProjectTemplate`
  - Add mutation: `createProjectFromTemplate(templateId, projectInput)`

### Frontend Implementation

- **Type Definitions:**
  - Create `ProjectTemplate` type matching backend
  - Create `ProjectTemplateItem` type
  - Create `ProjectTemplateInput` type
  - Create `ProjectTemplatePage` type for pagination

- **Service Layer:**
  - Create `ProjectTemplateService` with methods:
    - `getTemplates()`
    - `getTemplate(id)`
    - `getTemplatesPaginated(page, size)`
    - `createTemplate(input)`
    - `updateTemplate(id, input)`
    - `deleteTemplate(id)`
    - `createProjectFromTemplate(templateId, projectInput)`

- **Template Management UI:**
  - Create `ProjectTemplateList` component for viewing all templates
  - Create `ProjectTemplateForm` component for creating/editing templates
  - Create `ProjectTemplateCard` component for template display
  - Add template management page/route
  - Implement template CRUD operations

- **Template Selection in Project Creation:**
  - Add template selection dropdown in `ProjectForm`
  - Create `TemplateSelector` component
  - Load template items when template is selected
  - Populate project form with template data
  - Allow customization after template selection

- **Template Preview:**
  - Show template items and quantities in template list
  - Display template details in modal or expandable view
  - Show default status and description

### UI/UX Specifications

- **Template List:**
  - Card or table layout
  - Template name, description, item count
  - Actions: Edit, Delete, Use Template
  - Create new template button

- **Template Form:**
  - Name and description fields
  - Default status dropdown
  - Item selection with quantity inputs
  - Add/remove items dynamically
  - Save and cancel buttons

- **Template Selection:**
  - Dropdown in project creation form
  - "Create from Template" option
  - Template preview showing included items
  - Clear indication when template is selected

- **Template-Based Project Creation:**
  - Pre-populate project name (with template name as default)
  - Pre-populate description
  - Pre-populate status with template default
  - Add all template items to project
  - Allow user to modify before saving

- **Visual Design:**
  - Consistent with existing project/item UI
  - Clear template vs project distinction
  - Template icon/badge for identification

## Integration Requirements

- Integrates with existing `ProjectService` and `ProjectItemService`
- Works with existing project creation flow
- Compatible with existing item selection components
- No breaking changes to existing project/item structure

## Performance Criteria

- Template-based project creation completes in < 1s for templates with up to 50 items
- Template queries complete in < 200ms
- Template list pagination performs efficiently

## External Dependencies

No new external dependencies required. Uses existing stack:
- Spring Boot GraphQL (existing)
- React Hook Form (existing)
- Apollo Client (existing)
- PostgreSQL (existing)
- Flyway migrations (existing)

