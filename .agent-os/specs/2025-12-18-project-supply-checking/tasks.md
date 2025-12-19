# Spec Tasks

## Tasks

- [x] 1. Backend: GraphQL Schema and Type Extensions for Supply Check
  - [x] 1.1 Write tests for ProjectSupplyCheck type and supply status calculation
  - [x] 1.2 Add ProjectSupplyCheck type to GraphQL schema with fields: itemId, itemName, requiredQuantity, availableQuantity, supplyStatus, quantityGap
  - [x] 1.3 Add SupplyStatus enum (SUFFICIENT, INSUFFICIENT, MISSING) to GraphQL schema
  - [x] 1.4 Extend Project type with supplyCheck field that returns [ProjectSupplyCheck!]!
  - [x] 1.5 Verify all tests pass

- [x] 2. Backend: Supply Check Service and Resolver
  - [x] 2.1 Write tests for SupplyCheckService that calculates supply status by comparing project item quantities with inventory quantities
  - [x] 2.2 Create SupplyCheckService with method to calculate supply check for a project
  - [x] 2.3 Implement logic to fetch project items and their linked inventory items
  - [x] 2.4 Implement supply status calculation: compare quantityUsed (required) with item.quantity (available)
  - [x] 2.5 Create GraphQL resolver for Project.supplyCheck field
  - [x] 2.6 Handle edge cases: missing items, null quantities, items not in inventory
  - [x] 2.7 Verify all tests pass

- [x] 3. Frontend: TypeScript Types and GraphQL Query
  - [x] 3.1 Write tests for TypeScript types (SupplyStatus enum, ProjectSupplyCheck type)
  - [x] 3.2 Add SupplyStatus enum to frontend types
  - [x] 3.3 Add ProjectSupplyCheck type to frontend types matching GraphQL schema
  - [x] 3.4 Update Project type to include optional supplyCheck field
  - [x] 3.5 Create GraphQL query fragment for supply check data
  - [x] 3.6 Update project query in project-service.ts to include supplyCheck field
  - [x] 3.7 Verify all tests pass

- [x] 4. Frontend: Supply Check Component
  - [x] 4.1 Write tests for SupplyCheck component rendering and status display
  - [x] 4.2 Create SupplyCheck component that displays supply check summary (total items, sufficient, insufficient, missing counts)
  - [x] 4.3 Create SupplyCheckItem component to display individual item supply status with visual indicators
  - [x] 4.4 Implement visual indicators: color-coded badges/icons for SUFFICIENT (green), INSUFFICIENT (yellow), MISSING (red)
  - [x] 4.5 Display required quantity, available quantity, and quantity gap for each item
  - [x] 4.6 Add proper styling using TailwindCSS following existing design patterns
  - [x] 4.7 Handle loading and error states
  - [x] 4.8 Verify all tests pass

- [x] 5. Frontend: Integration into Project Details Page
  - [x] 5.1 Write tests for ProjectDetails page with supply check integration
  - [x] 5.2 Update ProjectDetails page to fetch and display supply check data
  - [x] 5.3 Add SupplyCheck component to ProjectDetails page layout
  - [x] 5.4 Ensure supply check updates when project items change
  - [x] 5.5 Test end-to-end: view project, see supply check, verify status calculations
  - [x] 5.6 Verify all tests pass
