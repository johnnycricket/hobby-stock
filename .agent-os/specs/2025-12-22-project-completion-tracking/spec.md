# Spec Requirements Document

> Spec: Project Completion Tracking
> Created: 2025-12-22
> Status: Planning

## Overview

Implement project completion tracking that allows users to mark projects as complete with end dates and archive completed projects, enabling users to maintain a clean active project list while preserving historical project data for reference and analysis.

## User Stories

### Project Completion and Archival

As a project manager, I want to mark projects as complete with end dates and archive completed projects, so that I can maintain a clean active project list while preserving historical project data for reference and analysis.

Users can mark projects as completed, which automatically sets the status to COMPLETED and records an end date. Completed projects can be filtered out of the main project list or moved to an archived view. The system preserves all project data including linked items and quantities for historical reference and analytics purposes.

## Spec Scope

1. **Completion Workflow** - Add "Mark as Complete" functionality that sets project status to COMPLETED and records completion timestamp automatically.

2. **Completion Date Tracking** - Add `completedAt` timestamp field to track when projects are marked as complete, separate from `endDate` which represents project duration.

3. **Archive Filtering** - Implement archive filter functionality allowing users to show/hide completed projects in the projects list view with clear visual indicators.

4. **Completion UI** - Add "Mark as Complete" button/action in project details view with optional end date input and confirmation modal.

5. **GraphQL Enhancements** - Extend existing `completeProject` mutation to set completion timestamp and update queries to support filtering completed projects.

## Out of Scope

- Status workflow transitions (separate spec)
- Project deletion or hard removal
- Completion templates or presets
- Automated completion based on conditions
- Completion notifications or alerts
- Historical completion analytics or trends
- Bulk completion operations

## Expected Deliverable

1. Users can mark projects as completed with automatic status update to COMPLETED and completion timestamp recording, with optional end date specification.

2. Users can filter completed projects in the projects list view using an archive toggle, allowing them to focus on active projects while preserving access to completed project history.

3. Completed projects display completion date prominently and are visually distinct in the UI, making it easy to identify finished projects at a glance.

