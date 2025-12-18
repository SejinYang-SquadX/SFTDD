# 📜 Project Constitution

This document defines the **absolute principles** and **decision-making criteria**.

## 1. 💎 Core Values
1.  **Simplicity**: Optimize for readability.
2.  **SSOT**: `schema.prisma` is the only truth.
3.  **No Any**: Strict types.

## 2. 🏛 Architecture
1.  **Src Standard**: Standard naming in `src`.
2.  **Test History**: TDD history (`Red/Green/Refactor`) in `test`.

## 3. 🛡 TDD & Development Process
**The "Trinity of Docs" (Spec/Plan/DataModel) is required for every feature, in both English and Korean.**

### A. New Feature
1.  **Documentation Phase**
    *   **User (Korean)**: Use `.ko.md`.
    *   **AI (English)**: Use `.md`.
    *   **Required**: `Spec`, `Plan`, `Data Model`.
2.  **Prepare Test**: `test/{feature}/Red`.
3.  **Write Source**: `src/{feature}/`.

### B. Existing Feature
1.  **Update Docs**: Modify both languages.
2.  **TDD Cycle**: Red -> Green -> Refactor.
3.  **Modify Source**: Update implementation.

## 4. 📚 API & Documentation (Swagger)
1.  **Structure**: Manage JSON-based Swagger docs in `docs/{feature}/`.
2.  **URL Policy**:
    *   **API**: `/api/v1/{resource}`
    *   **Docs**: `/api` redirects to Swagger UI.
3.  **Workflow (Post-Implementation)**:
    *   Write Swagger docs **AFTER** Source (Green/Refactor) is complete.
    *   **Must Include**: All **exception cases** validated during testing.

## 5. 🤖 AI Collaboration Rules
1.  **Check Docs**: Ensure all 3 docs exist (Eng & Kor) before coding.
2.  **Follow Order**: Docs -> Test -> Source -> **Swagger**.
