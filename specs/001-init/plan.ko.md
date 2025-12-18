# 기술 계획: 초기 설정 (001-init)

## 1. 기술 스택
- **언어**: TypeScript 5.x
- **런타임**: Node.js
- **ORM**: Prisma v6
- **Web**: Express (Controller Layer)
- **Test**: Vitest, Supertest, vitest-mock-extended

## 2. 아키텍처 및 폴더 구조 (최종)
실제 소스(`src`)는 현업 표준 관례를 따르고, 테스트(`test`)는 학습 과정을 기록하기 위해 TDD 단계별로 나눕니다.

### 2.1 디렉토리 구조
```
.
├── src/                    # [소스] 직관적인 표준 구조
│   └── user/               # Feature: User
│       ├── user.service.ts # 비즈니스 로직
│       └── user.controller.ts # API 컨트롤러
│
└── test/                   # [테스트] TDD 학습용 구조
    └── user/               # Feature: User
        ├── Red/            # 1단계: 실패하는 테스트 (요구사항 정의)
        │   └── user.service.spec.ts
        ├── Green/          # 2단계: 통과하는 테스트 (검증)
        │   └── user.service.spec.ts
        └── Refactor/       # 3단계: 최종 테스트 (완성)
            └── user.service.spec.ts
```

> **Note**: `src`의 코드는 계속 진화(Overwriting)하지만, `test` 폴더는 단계별 스냅삿을 남겨두어 TDD 과정을 복기할 수 있도록 합니다.

## 3. 구현 단계 (User 기능)
1.  **환경 구성**: Vitest 및 Express 설정.
2.  **스키마**: `schema.prisma` 정의 (User).
3.  **TDD 사이클**:
    *   **Step 1 (Red)**: `test/user/Red/user.service.spec.ts` 작성 -> 실패 확인.
    *   **Step 2 (Green)**: `src/user/user.service.ts` 구현 -> `test/user/Green/`에 복사 후 성공 확인.
    *   **Step 3 (Refactor)**: `src/user/user.service.ts` 리팩토링 -> `test/user/Refactor/`에서 검증.
4.  **Controller**: `src/user/user.controller.ts` 작성 및 `Refactor`된 서비스 연결.

## 4. 검증
- `npx vitest` 실행.
