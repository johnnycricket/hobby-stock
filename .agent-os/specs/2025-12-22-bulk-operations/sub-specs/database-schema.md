# Database Schema

This is the database schema implementation for the spec detailed in @.agent-os/specs/2025-12-22-bulk-operations/spec.md

## Schema Changes

No new database tables or columns required. Bulk operations use existing `project_items` table.

## Data Integrity Rules

1. **Transaction Support:** Bulk operations use database transactions to ensure atomicity
2. **Validation:** Each item is validated individually before insertion/update
3. **Duplicate Handling:** Existing project items are updated rather than creating duplicates
4. **Foreign Key Constraints:** Existing constraints ensure referential integrity

## Performance Considerations

- Bulk operations use batch inserts/updates for efficiency
- Transactions ensure consistency but may lock rows during operation
- Existing indexes on `project_items` support efficient lookups
- No additional indexes required

## Implementation Notes

- Use JPA batch processing for multiple inserts/updates
- Transaction boundaries ensure all-or-nothing behavior (or partial success with error collection)
- Consider using `@Transactional` with appropriate isolation level
- Validate all inputs before starting transaction to minimize rollback scenarios

