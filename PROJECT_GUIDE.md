# 🚀 SFTDD (Spec-First TDD) 프로젝트 가이드

이 문서는 본 프로젝트에서 정립한 **개발 프로세스, 아키텍처, 그리고 협업 규칙**을 요약한 가이드입니다. README 작성, 블로그 포스팅, 그리고 향후 스터디를 위한 핵심 자료로 활용할 수 있습니다.

---

## 1. 🎯 핵심 철학 (Core Philosophy)

### 1-1. SDD (Spec-Driven Development)
*   **원칙**: 코드를 작성하기 전에 먼저 작성된 **명세서(Spec)**가 프로젝트의 **유일한 진실(Single Source of Truth)**입니다.
*   **실천**: 모든 개발은 스펙 문서(`specs/`)에서 시작되며, 스펙이 변경되지 않으면 코드도 변경되지 않습니다.

### 1-2. TDD (Test-Driven Development)
*   **원칙**: 테스트 없이는 단 한 줄의 서비스 코드도 작성하지 않습니다.
*   **Red -> Green -> Refactor** 사이클을 엄격히 준수합니다.
*   `test` 폴더는 단순 검증용이 아니라, **기능 개발의 역사(History)**를 보존하는 아카이브 역할을 합니다.

### 1-3. Documentation First (One-Source, Multi-Use)
*   **원칙**: "구현"보다 "설계"가 먼저입니다.
*   모든 기능은 **3대 문서(Spec, Plan, DataModel)**가 작성된 후에만 코딩을 시작할 수 있습니다.
*   **AI 협업**: User용(한글)과 AI용(영문) 문서를 쌍으로 유지하여 문맥을 명확히 공유합니다.

---

## 2. 🏛 폴더 구조 전략 (Directory Structure)

소스 코드(`src`)와 테스트 코드(`test`), 문서(`docs`)를 목적에 따라 철저히 분리합니다.

```
Request-Pro/
├── src/                  # (Standard) 배포될 실제 서비스 코드
│   ├── {feature}/
│   │   ├── {feature}.service.ts
│   │   ├── {feature}.controller.ts
│   │   └── dto/          # Validation DTO
│   ├── app.ts            # App Entry
│   └── server.ts         # Server Entry
├── test/                 # (History) TDD 개발 과정의 기록
│   ├── {feature}/
│   │   ├── Red/          # 요구사항 정의 (실패하는 테스트)
│   │   ├── Green/        # 기능 구현 검증
│   │   └── Refactor/     # 최종 품질 검증
│   └── utils/            # 테스트 헬퍼 (runTest 등)
├── docs/                 # (Swagger) API 명세
│   └── {feature}/
│       └── swagger.json
├── specs/                # (Design) 3대 기획 문서
│   └── {id}-{feature}/
│       ├── spec.ko.md
│       ├── plan.ko.md
│       └── data-model.ko.md
└── prisma/               # (DB) SSOT 스키마
    └── schema.prisma
```

---

## 3. 🛠 개발 프로세스 (Strict Workflow)

기능 하나를 만들 때 다음 **5단계**를 반드시 순서대로 거쳐야 합니다.

### Step 1: Design (문서화)
*   `specs/`에 **Spec, Plan, Data Model** 작성.
*   무을(What), 어떻게(How), 구조(Structure)를 먼저 정의.

### Step 2: Red (요구사항 정의/테스트)
*   **가장 중요**: `src` 코드가 없는 상태에서 `test/{feature}/Red` 테스트 작성.
*   `vitest` 실행 시 컴파일 에러나 실패가 뜨는 것을 확인 (요구사항의 구체화).

### Step 3: Green & Refactor (구현)
*   `src/{feature}` 폴더 생성 및 서비스 구현.
*   최소한의 코드로 테스트 통과(Green).
*   코드 다듬기 및 최종 검증(Refactor).

### Step 4: Controller (API 연결)
*   Express Controller 구현.
*   `class-validator`를 이용한 DTO 검증 적용.

### Step 5: Swagger (문서화)
*   구현이 끝난 후 `docs/{feature}/swagger.json` 작성.
*   테스트 과정에서 발견한 **예외 케이스(Exception)**를 문서에 반드시 포함.

---

## 4. 🧪 테스팅 및 도구 (Tooling)

### 4-1. Vitest UI & Structured Report
*   `npm run test:ui`: 브라우저에서 테스트 결과를 시각적으로 확인.
*   **runTest Helper**: 테스트의 목적(Purpose), 파라미터, 예상값, 실제값을 구조화된 로그로 출력하여 UI를 "살아있는 명세서"로 활용.

### 4-2. Stack
*   **Runtime**: Node.js + TypeScript
*   **Web**: Express
*   **ORM**: Prisma v6
*   **Test**: Vitest, vitest-mock-extended
*   **Docs**: Swagger (swagger-ui-express)

---

## 5. 🔗 API 규칙
*   **Endpoint**: `/api/v1/{resource}`
*   **Documentation**: `/api` 접속 시 Swagger UI로 자동 리다이렉트.

---

## 6. 🌐 참고할 만한 유사 방법론 (Related Methodologies)

우리의 **"3대 문서(Spec First) + Strict TDD"** 워크플로우는 업계의 몇 가지 선진적인 방법론과 맞닿아 있습니다.

### 6-1. Spec-Driven Development (SDD)
*   **개념**: 코드를 짜기 전에 기능을 명세(Spec)로 먼저 정의하고, 이를 진실 공급원으로 삼는 방식입니다.
*   **우리와의 공통점**: `specs/` 폴더의 문서가 코드보다 선행되며, AI 에이전트와의 협업에서 컨텍스트 손실을 막는 핵심 기술로 각광받고 있습니다.

### 6-2. Documentation-Driven Development (DDD)
*   **개념**: "문서화되지 않은 기능은 존재하지 않는 것이다"라는 철학. API 명세나 사용자 가이드를 먼저 작성합니다.
*   **우리와의 공통점**: `plan.md`와 `swagger.json`을 통해 구현 전에 설계를 확정 짓는 방식과 유사합니다.

### 6-3. Readme-Driven Development (RDD)
*   **개념**: 프로젝트의 `README.md`부터 작성하여 기획 의도와 사용법을 명확히 한 뒤 개발하는 방식.
*   **우리와의 공통점**: 우리가 `specs/spec.md`를 가장 먼저 작성하여 "무엇을 만들 것인가"를 정의하는 흐름과 일맥상통합니다.

> **결론**: 우리는 이들의 장점을 흡수하여 **"SFTDD (Spec-First Test-Driven Development)"**라는 독자적이고 강력한 프로세스를 정립했습니다.

## 7. 📛 SFTDD (Spec-First TDD) 정의
이 프로젝트의 폴더명이자 핵심 방법론인 **SFTDD**는 다음을 의미합니다.

1.  **Spec-First**: 코딩보다 **생각(Spec/Plan)**이 항상 먼저다. (SDD/RDD/DDD 계승)
2.  **Test-Driven**: 생각한 것을 **테스트(Red)**로 검증하지 않으면 코드로 옮기지 않는다. (Strict TDD 계승)
3.  **Documentation-Complete**: 구현 후 **Swagger**를 통해 즉시 사용 가능한 문서로 종결한다. (DDD 계승)

---

## 8. 🔮 Future Roadmap (Evolution)

프로젝트가 확장됨에 따라 도입을 고려해야 할 기술적 주제들입니다.

### 8-1. High-Performance Logging (ELK Stack)
*   **Current**: Winston (개발 편의성, 가독성 중심)
*   **Future**: **Pino** (Zero-overhead, JSON-only)
*   **Why**: 트래픽이 급증하거나 로그량이 많아져 **ELK Stack (Elasticsearch, Logstash, Kibana)**을 붙여야 할 때, Pino의 성능과 구조화된 JSON 로그가 필수적입니다.
*   **Action**: `LoggerService` 인터페이스를 유지한 채 내부 구현체만 Winston -> Pino로 교체하는 전략 사용.

### 8-2. Advanced Automation
*   **Husky**: 커밋 전 스펙 문서 존재 여부 및 테스트 통과 강제.
