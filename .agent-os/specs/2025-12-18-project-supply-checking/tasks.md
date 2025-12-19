# Spec Tasks

## Tasks

- [ ] 1. Backend: GraphQL Schema and Type Extensions for Supply Check
  - [ ] 1.1 Write tests for ProjectSupplyCheck type and supply status calculation
  - [ ] 1.2 Add ProjectSupplyCheck type to GraphQL schema with fields: itemId, itemName, requiredQuantity, availableQuantity, supplyStatus, quantityGap
  - [ ] 1.3 Add SupplyStatus enum (SUFFICIENT, INSUFFICIENT, MISSING) to GraphQL schema
  - [ ] 1.4 Extend Project type with supplyCheck field that returns [ProjectSupplyCheck!]!
  - [ ] 1.5 Verify all tests pass

- [ ] 2. Backend: Supply Check Service and Resolver
  - [ ] 2.1 Write tests for SupplyCheckService that calculates supply status by comparing project item quantities with inventory quantities
  - [ ] 2.2 Create SupplyCheckService with method to calculate supply check for a project
  - [ ] 2.3 Implement logic to fetch project items and their linked inventory items
  - [ ] 2.4 Implement supply status calculation: compare quantityUsed (required) with item.quantity (available)
  - [ ] 2.5 Create GraphQL resolver for Project.supplyCheck field
  - [ ] 2.6 Handle edge cases: missing items, null quantities, items not in inventory
  - [ ] 2.7 Verify all tests pass

- [ ] 3. Frontend: TypeScript Types and GraphQL Query
  - [ ] 3.1 Write tests for TypeScript types (SupplyStatus enum, ProjectSupplyCheck type)
  - [ ] 3.2 Add SupplyStatus enum to frontend types
  - [ ] 3.3 Add ProjectSupplyCheck type to frontend types matching GraphQL schema
  - [ ] 3.4 Update Project type to include optional supplyCheck field
  - [ ] 3.5 Create GraphQL query fragment for supply check data
  - [ ] 3.6 Update project query in project-service.ts to include supplyCheck field
  - [ ] 3.7 Verify all tests pass

- [ ] 4. Frontend: Supply Check Component
  - [ ] 4.1 Write tests for SupplyCheck component rendering and status display
  - [ ] 4.2 Create SupplyCheck component that displays supply check summary (total items, sufficient, insufficient, missing counts)
  - [ ] 4.3 Create SupplyCheckItem component to display individual item supply status with visual indicators
  - [ ] 4.4 Implement visual indicators: color-coded badges/icons for SUFFICIENT (green), INSUFFICIENT (yellow), MISSING (red)
  - [ ] 4.5 Display required quantity, available quantity, and quantity gap for each item
  - [ ] 4.6 Add proper styling using TailwindCSS following existing design patterns
  - [ ] 4.7 Handle loading and error states
  - [ ] 4.8 Verify all tests pass

- [ ] 5. Frontend: Integration into Project Details Page
  - [ ] 5.1 Write tests for ProjectDetails page with supply check integration
  - [ ] 5.2 Update ProjectDetails page to fetch and display supply check data
  - [ ] 5.3 Add SupplyCheck component to ProjectDetails page layout
  - [ ] 5.4 Ensure supply check updates when project items change
  - [ ] 5.5 Test end-to-end: view project, see supply check, verify status calculations
  - [ ] 5.6 Verify all tests pass
