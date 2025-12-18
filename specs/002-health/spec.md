# Specification: Health Check (002-health)

## 1. Overview
Provide basic endpoints to verify server status and database connectivity.

## 2. Goals
- Confirm server is running (Liveness Probe).
- Confirm database connection via Prisma (Readiness Probe).

## 3. Functional Requirements
### 3.1 Health Check API
- **Endpoint**: `GET /health`
- **Response (Success)**:
    - Status: 200 OK
    - Body:
      ```json
      {
        "status": "ok",
        "timestamp": "ISO-8601 String",
        "database": "connected"
      }
      ```
- **Response (DB Fail)**:
    - Status: 503 Service Unavailable
    - Body:
      ```json
      {
        "status": "error",
        "database": "disconnected"
      }
      ```

## 4. Technical Plan
- **Controller**: `HealthController`
- **Service**: `HealthService` (DB Ping Check)
- **TDD**: `test/health/Red` -> `src/health`
