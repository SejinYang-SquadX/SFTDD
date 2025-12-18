# Technical Plan: Health Check (002-health)

## 1. Implementation Strategy
- **Service Layer**: Use Prisma Client's `$queryRaw` or a simple query to verify DB connection.
- **Controller Layer**: Use Express Router to expose `/health` endpoint.

## 2. Technology Stack
- `express`: API Server
- `prisma`: DB Connection Check

## 3. Workflow (TDD)
1.  **Red**: `test/health/Red/health.service.spec.ts`
    - Verify `checkHealth()` method return value.
2.  **Green**: `src/health/health.service.ts`
    - Implement `checkHealth()` (Execute `SELECT 1` via Prisma).
3.  **Controller**: `src/health/health.controller.ts`
    - Call Service and map HTTP response.
