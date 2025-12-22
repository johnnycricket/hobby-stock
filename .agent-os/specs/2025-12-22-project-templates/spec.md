# Spec Requirements Document

> Spec: Project Templates
> Created: 2025-12-22
> Status: Planning

## Overview

Implement reusable project templates for common hobby project types, allowing users to quickly create new projects with pre-configured item lists and avoid repetitive setup work when starting similar projects.

## User Stories

### Project Templates for Common Types

As a hobbyist, I want to create reusable project templates for common hobby project types (e.g., "Arduino Project", "Woodworking Project"), so that I can quickly start new projects with pre-configured item lists and avoid repetitive setup work.

Users can create project templates that include a name, description, default status, and a list of commonly used items with typical quantities. When creating a new project, users can select a template to automatically populate the project with template items, which can then be customized. Templates can be edited, duplicated, and deleted as needed.

## Spec Scope

1. **Template Management** - Create, read, update, and delete project templates with name, description, default status, and associated items.

2. **Template Items** - Associate multiple items with templates, each with a default quantity, allowing templates to define complete project supply lists.

3. **Template-Based Project Creation** - Enable users to create new projects from templates, automatically populating the project with template items while allowing customization.

4. **Template UI** - Build template management interface for creating, editing, viewing, and deleting templates, and integrate template selection into project creation flow.

5. **GraphQL API** - Implement GraphQL queries and mutations for template CRUD operations and template-based project creation.

## Out of Scope

- Template versioning or history
- Template sharing between users (Phase 5)
- Template categories or tags
- Template import/export functionality
- Automatic template suggestions based on project type
- Template usage statistics or analytics
- Template permissions or access control

## Expected Deliverable

1. Users can create, edit, and delete project templates with names, descriptions, default status, and lists of items with quantities.

2. Users can select a template when creating a new project, which automatically populates the project with template items that can be customized after creation.

3. Users can view and manage all templates in a dedicated templates management interface, making it easy to organize and reuse common project configurations.

