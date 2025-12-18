# 명세서: 헬스 체크 (002-health)

## 1. 개요
서버의 상태 및 데이터베이스 연결 상태를 확인하기 위한 기본적인 엔드포인트를 제공합니다.

## 2. 목표
- 서버가 실행 중인지 확인 (Liveness Probe).
- Prisma를 통해 DB가 정상적으로 연결되어 있는지 확인 (Readiness Probe).

## 3. 기능 요구사항
### 3.1 헬스 체크 API
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

## 4. 기술 계획
- **Controller**: `HealthController`
- **Service**: `HealthService` (DB Ping Check)
- **TDD**: `test/health/Red` -> `src/health`
