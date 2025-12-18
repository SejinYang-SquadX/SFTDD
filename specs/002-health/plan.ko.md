# 기술 계획: 헬스 체크 (002-health)

## 1. 구현 전략
- **Service Layer**: Prisma Client의 `$queryRaw` 혹은 간단한 조회 메서드를 사용하여 DB 연결을 확인합니다.
- **Controller Layer**: Express Router를 사용하여 `/health` 엔드포인트를 노출합니다.

## 2. 기술 스택
- `express`: API 서버
- `prisma`: DB 연결 확인

## 3. 작업 순서 (TDD)
1.  **Red**: `test/health/Red/health.service.spec.ts`
    - `checkHealth()` 메서드 호출 시 결과값 검증 테스트.
2.  **Green**: `src/health/health.service.ts`
    - `checkHealth()` 메서드 구현 (Prisma로 `SELECT 1` 실행).
3.  **Controller**: `src/health/health.controller.ts`
    - Service 호출 및 HTTP 응답 매핑.
