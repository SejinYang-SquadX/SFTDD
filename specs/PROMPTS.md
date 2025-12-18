# 🤖 AI Collaboration Prompts (SFTDD Protocol)

이 문서는 SFTDD 프로세스 각 단계에서 AI 에이전트에게 작업을 요청할 때 사용하는 **표준 프롬프트 템플릿**입니다.
AI에게 컨텍스트를 명확히 전달하여, 일관된 품질의 결과물을 얻는 것을 목표로 합니다.

---

## 🏗️ Phase 1: Design (Spec & Plan)

### 📝 Spec 작성 요청
> **Goal**: 요구사항을 기반으로 3대 문서를 작성한다.

```markdown
# Role
Technical Product Manager & Architect

# Context
우리는 SFTDD(Spec-First TDD) 방법론을 따르고 있습니다.
새로운 기능 `{Feature Name}`에 대한 명세를 작성해주세요.

# Input
- 요구사항: "{간단한 요구사항 설명}"

# Deliverables (in `specs/{id}-{feature}/`)
1. spec.ko.md: 기능 명세, 유저 스토리, 예외 케이스
2. plan.ko.md: 기술적 구현 계획, 아키텍처, 폴더 구조
3. data-model.ko.md: Prisma 스키마 변경점 (필요 시)

# Rules
- 모든 문서는 한국어로 작성하지만, AI용 영문 문서 생성을 염두에 두세요.
- Data Model은 `schema.prisma`의 SSOT 원칙을 위배하지 않도록 정의하세요.
```

---

## 🧪 Phase 2: Test (Red Phase)

### 🔴 Red Test 작성 요청
> **Goal**: 구현 전, 실패하는 테스트를 먼저 작성한다.

```markdown
# Role
QA Engineer & TDD Expert

# Context
`specs/{id}-{feature}/`에 있는 문서를 기반으로 테스트 코드를 작성합니다.
아직 `src` 코드는 존재하지 않습니다.

# Inputs
- Spec: `specs/{id}-{feature}/spec.ko.md`
- Data Model: `specs/{id}-{feature}/data-model.ko.md`

# Task
`test/{feature}/Red/{feature}.service.spec.ts`를 작성하세요.

# Rules
1. `src`의 서비스 클래스는 존재한다고 가정하고 `@ts-ignore` 처리하여 import 하세요.
2. `vitest-mock-extended`와 `PrismaClient` Mock을 사용하세요.
3. `runTest` 헬퍼를 사용하여 구조화된 로깅을 적용하세요.
4. 테스트는 반드시 **실패(Red)**하거나 컴파일 에러가 나야 합니다.
```

---

## 🟢 Phase 3: Implementation (Green/Refactor)

### 💻 Code 구현 요청
> **Goal**: 테스트를 통과시키는 최소한의 코드를 작성한다.

```markdown
# Role
Senior Node.js Developer

# Context
현재 `{Feature}`의 Red 테스트가 작성되어 있습니다.
이 테스트를 통과시키는 코드를 구현해주세요.

# Inputs
- Test: `test/{feature}/Red/{feature}.service.spec.ts`
- Plan: `specs/{id}-{feature}/plan.ko.md`

# Task
1. `src/{feature}/{feature}.service.ts`를 생성 및 구현하세요.
2. `test/{feature}/Green/` 폴더를 만들고 Red 테스트를 복사해온 뒤, 실제 구현체를 import하도록 수정하세요.

# Rules
- 과도한 엔지니어링을 피하고, 테스트 통과에 집중하세요.
- 비즈니스 로직은 반드시 Service 레이어에 위치해야 합니다.
```

---

## 🌐 Phase 4: Interface (Controller & Swagger)

### 📡 API & Docs 구현 요청
```markdown
# Role
Backend API Specialist

# Task
1. `class-validator`를 사용하여 DTO를 정의하세요.
2. `src/{feature}/{feature}.controller.ts`를 구현하세요.
3. `docs/{feature}/swagger.json`을 작성하세요.

# Rules
- Controller는 Service에 의존해야 합니다.
- Swagger 문서는 테스트 과정에서 발견된 모든 예외 케이스를 포함해야 합니다.
- DTO에는 Java 스타일의 데코레이터(`@IsString` 등)를 사용하세요.
```
