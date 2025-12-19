# GitHub Actions CI/CD for PR Testing - Lite Summary

Automatically run frontend and backend tests on pull requests to ensure code quality and prevent regressions before merging.

## Key Points
- Trigger workflow on pull request events (opened, synchronize, reopened)
- Run Vitest test suite for React/TypeScript frontend
- Run Gradle test suite for Kotlin/Spring Boot backend
- Execute tests in parallel for faster feedback
- Display test results in PR checks
- Block merging on test failures (when branch protection is enabled)
