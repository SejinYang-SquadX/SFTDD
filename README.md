# 🚀 SFTDD (Spec-First Test-Driven Development) 프로젝트 가이드

이 문서는 본 프로젝트에서 정립한 **개발 철학, 아키텍처, 그리고 협업 규칙**을 정리한 가이드입니다.
README, 기술 블로그, 내부 스터디를 위한 **Single Source of Truth**로 활용됩니다.

---

## 1. 🎯 Core Philosophy

### 1-1. Spec-Driven Development (SDD)
*   **원칙**: 코드는 명세(Spec)의 결과물이다.
*   **규칙**: 스펙이 바뀌지 않으면 코드는 바뀌지 않는다.
*   **실천**:
    *   모든 개발은 `specs/` 문서에서 시작한다.
    *   Spec 문서는 프로젝트의 **유일한 진실(SSOT)** 이다.

### 1-2. Test-Driven Development (Strict TDD)
*   **원칙**: 테스트 없이는 서비스 코드를 작성하지 않는다.
*   **사이클**: **Red** → **Green** → **Refactor**
*   **의미 확장**:
    *   `test/`는 단순 검증 공간이 아니라, **요구사항이 진화한 히스토리 아카이브**다.

### 1-3. Documentation First (One Source, Multi Use)
*   **원칙**: 구현보다 설계가 먼저다.
*   **Rule**: 모든 기능은 **3대 문서** 작성 후에만 개발 가능.
    1.  **Spec** – 무엇을 만들 것인가
    2.  **Plan** – 어떻게 만들 것인가
    3.  **Data Model** – 구조는 어떻게 되는가
*   **AI 협업 규칙**: User용 문서(한글) + AI용 문서(영문) 병행 관리하여 컨텍스트 손실 없는 반복 협업 가능.

---

## 2. 🏛 Directory Structure

```bash
Request-Pro/
├── src/                  # 배포 대상 서비스 코드
│   ├── {feature}/
│   │   ├── {feature}.service.ts
│   │   ├── {feature}.controller.ts
│   │   └── dto/
│   ├── app.ts
│   └── server.ts
│
├── test/                 # TDD 히스토리 기록
│   ├── {feature}/
│   │   ├── Red/          # 실패하는 요구사항 테스트
│   │   ├── Green/        # 구현 검증
│   │   └── Refactor/     # 최종 품질 검증
│   └── utils/
│
├── docs/                 # API 문서 (Swagger)
│   └── {feature}/
│       └── swagger.json
│
├── specs/                # 설계 문서 (3대 문서)
│   └── {id}-{feature}/
│       ├── spec.ko.md
│       ├── plan.ko.md
│       └── data-model.ko.md
│
└── prisma/
    └── schema.prisma     # DB Single Source of Truth
```

---

## 3. 🛠 Strict Development Workflow

모든 기능은 아래 **5단계**를 반드시 순서대로 따른다.

### Step 1. Design
*   `specs/`에 **Spec / Plan / Data Model** 작성
*   What / How / Structure를 코드보다 먼저 확정

### Step 2. Red
*   `src` 코드 없이 `test/{feature}/Red`부터 작성
*   테스트 실패 또는 컴파일 에러 상태 확인
*   **요구사항을 테스트로 먼저 정의**

### Step 3. Green → Refactor
*   최소 코드로 테스트 통과
*   중복 제거, 가독성 개선, 책임 분리
*   **리팩터링 후에도 테스트는 항상 Green 유지**

### Step 4. Controller
*   Express Controller 구현
*   `class-validator` 기반 DTO 검증 적용

### Step 5. Swagger
*   `docs/{feature}/swagger.json` 작성
*   테스트 과정에서 발견된 **모든 예외 케이스** 포함
*   문서는 구현 요약이 아닌 **계약(Contract)** 이다

---

## 4. 🧪 Testing & Tooling

### 4-1. Vitest UI
```bash
npm run test:ui
```
*   테스트 결과를 시각적으로 확인
*   테스트 자체를 **살아있는 명세서**로 활용

### 4-2. runTest Helper
*   **목적, 입력, 기대값, 실제값**을 구조화된 로그로 출력
*   실패 원인을 즉시 파악 가능

### 4-3. Tech Stack
*   **Runtime**: Node.js + TypeScript
*   **Web**: Express
*   **ORM**: Prisma v6
*   **Test**: Vitest, vitest-mock-extended
*   **Docs**: Swagger (swagger-ui-express)

---

## 5. 🔗 API Convention
*   **Endpoint**: `/api/v1/{resource}`
*   **Documentation**: `/api` 접속 시 Swagger UI **자동 리다이렉트**

---

## 6. 🌐 Related Methodologies
**SFTDD**는 기존 방법론의 장점을 통합한 실전형 프로세스다.

*   **Spec-Driven Development**: 명세를 코드보다 우선, AI 협업에 강점
*   **Documentation-Driven Development**: 문서를 계약으로 취급, Swagger 중심
*   **Readme-Driven Development**: 무엇을 만들 것인지부터 명확히 정의

---

## 7. 📛 What is SFTDD?

**SFTDD (Spec-First Test-Driven Development)** 는 다음을 의미한다.

1.  **Spec-First**: 생각과 설계가 코드보다 먼저다.
2.  **Test-Driven**: 테스트로 검증되지 않은 생각은 코드로 옮기지 않는다.
3.  **Documentation-Complete**: 모든 구현은 Swagger 문서로 종결된다.

> **결론: SFTDD는 "생각 → 검증 → 구현 → 문서화"를 하나의 끊기지 않는 개발 흐름으로 만든 방법론이다.**
