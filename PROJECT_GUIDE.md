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

3.  **Documentation-Complete**: 구현 후 **Swagger**를 통해 즉시 사용 가능한 문서로 종결한다. (DDD 계승)

---

## 8. 🪵 Logging System (AOP)

이 프로젝트는 **AOP (Aspect-Oriented Programming)** 기반의 2-Tier 로그 추적 시스템을 갖추고 있습니다.

### 8-1. Architecture
*   **Infrastructure**: `Winston` (Transport: Console + File)
*   **Tier 1 (Macro)**: `LogMiddleware` - 모든 HTTP 요청의 진입과 이탈을 기록 (URL, Status, Latency).
*   **Tier 2 (Micro)**: `@Log` Decorator - 서비스 메서드의 실행 흐름, 파라미터, 소요 시간을 추적.

### 8-2. Log UI (Real-time)
*   `npm run logs` 명령어를 통해 **커스텀 로그 뷰어**(Socket.io 기반)에서 실시간 로그 스트리밍을 제공합니다.
*   포트: `:9001`, 다크 테마 UI, 자동 브라우저 오픈

### 8-3. Log Level Policy

로그 레벨은 **"이 로그를 왜 남기는가?"**를 기준으로 정의합니다.

#### ERROR - 반드시 확인해야 하는 장애
*   **기준**: 서비스가 의도대로 동작하지 못함
*   **예시**: DB 연결 실패, 외부 API 호출 실패, Unhandled Exception
*   **운영**: 알림 발송 대상
*   **보존**: 30일

#### WARN - 비정상이지만 서비스는 계속됨
*   **기준**: 예상 가능한 실패 or 복구 가능한 상황
*   **예시**: Retry 발생, Deprecated API 호출, Rate Limit 근접, 잘못된 요청 (400)
*   **운영**: 모니터링 대상 (추세 파악)
*   **보존**: 14일

#### INFO - 의미 있는 비즈니스 이벤트만
*   **기준**: "나중에 이 시점을 찾아야 할 수 있는가?"
*   **예시**: 유저 생성/삭제, 주문 완료, 상태 변경, 배치 작업 시작/종료
*   **❌ 안 되는 것**: "요청이 왔다", "메서드가 실행됐다" (DEBUG 영역)
*   **보존**: 7일

#### DEBUG - 개발/디버깅 전용
*   **기준**: 코드 흐름 추적용
*   **예시**: 메서드 실행 시간, 파라미터 값, 중간 계산 결과
*   **운영**: **비활성화** (환경변수로 제어)
*   **보존**: 0일

#### TRACE - 절대 운영 금지
*   **기준**: 극도로 상세한 디버깅 (프레임워크 내부 등)
*   **사용**: 거의 안 씀

### 8-4. Structured Logging (구조화 로그)

모든 로그는 **JSON 형식**으로 남기며, 다음 필드를 포함합니다:

```typescript
interface LogEntry {
  timestamp: string;      // ISO 8601 형식
  level: 'ERROR' | 'WARN' | 'INFO' | 'DEBUG';
  traceId: string;        // 요청 추적 ID (향후 추가 예정)
  event: string;          // 이벤트 코드 (대문자_스네이크)
  reason: string;         // 왜 이 로그를 남겼는지 (한 문장)
  [key: string]: any;     // 추가 메타데이터
}
```

**예시**:
```json
{
  "timestamp": "2025-12-18T08:22:00.123Z",
  "level": "ERROR",
  "traceId": "abc-123-xyz",
  "event": "DB_CONNECTION_FAILED",
  "reason": "Database connection timeout after 5s",
  "error": "ETIMEDOUT"
}
```

### 8-5. 실전 판단 기준

로그를 남기기 전 자문:

1. **"이 로그가 없으면 장애 원인을 못 찾는가?"** → ERROR
2. **"이게 자주 발생하면 문제인가?"** → WARN
3. **"비즈니스적으로 의미 있는 시점인가?"** → INFO
4. **"코드 흐름 추적용인가?"** → DEBUG
5. **"그냥 찍어본 거다"** → 삭제

### 8-6. Future AOP Expansion

현재 구현된 `@Log`, `@Catch` 외에 추가 예정인 AOP 데코레이터:
*   **@Auth**: 권한 검증 (Role-based Access Control)
*   **@Transaction**: 트랜잭션 관리 (Prisma Transaction Wrapper)
*   **@Metrics**: 성능 측정 및 메트릭 수집
*   **@Validate**: 공통 유효성 검사 (DTO 검증 자동화)

### 8-7. Production Readiness (운영 환경 대비)

현재는 개발 편의성을 위해 모든 로그를 남기지만, 운영 환경에서는 다음을 고려해야 합니다:

#### TraceId (요청 추적)
*   모든 HTTP 요청에 고유 `traceId` 부여
*   분산 시스템에서 요청 흐름 추적 가능
*   장애 발생 시 1개 traceId로 전체 로그 필터링

#### 로그 샘플링
*   트래픽 증가 시 INFO 로그 1~5%만 저장
*   ERROR는 항상 100% 저장
*   환경변수로 샘플링 비율 제어

#### 로그 vs 메트릭 vs 트레이싱
*   **로그**: 에러 원인 분석 ("왜 실패했지?")
*   **메트릭** (Prometheus): 상태/추세 (응답 시간, 에러율)
*   **트레이싱** (Jaeger): 병목 지점 추적 ("어디가 느린지?")

> **중요**: 모든 것을 로그로 해결하려 하지 말 것. 역할을 명확히 분리해야 운영 난이도가 낮아집니다.


---

## 9. 🔮 Future Roadmap (Evolution)

프로젝트가 확장됨에 따라 도입을 고려해야 할 기술적 주제들입니다.

### 8-1. High-Performance Logging (ELK Stack)
*   **Current**: Winston (개발 편의성, 가독성 중심)
*   **Future**: **Pino** (Zero-overhead, JSON-only)
*   **Why**: 트래픽이 급증하거나 로그량이 많아져 **ELK Stack (Elasticsearch, Logstash, Kibana)**을 붙여야 할 때, Pino의 성능과 구조화된 JSON 로그가 필수적입니다.
*   **Action**: `LoggerService` 인터페이스를 유지한 채 내부 구현체만 Winston -> Pino로 교체하는 전략 사용.

### 8-2. Advanced Automation
*   **Husky**: 커밋 전 스펙 문서 존재 여부 및 테스트 통과 강제.
