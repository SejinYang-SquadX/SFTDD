# Technical Plan: Initial Setup (001-init)

## 1. Technology Stack
- **Language**: TypeScript 5.x
- **Runtime**: Node.js (Latest LTS)
- **Database ORM**: Prisma v6
- **Database**: SQLite (Local Development)

## 2. Architecture
- **Monolithic Script Approach** (for this initial stage):
    - We will implement a simple procedural script (`src/script.ts`) to verify the data flow.
    - No complex server framework (Express/NestJS) for this specific step, to focus purely on the SDD data flow.

## 3. Implementation Steps
1.  **Schema Definition**: Ensure `schema.prisma` matches the `data-model.md`.
2.  **Generate Client**: Run `npx prisma generate`.
3.  **Database Sync**: Run `npx prisma db push`.
4.  **Logic Implementation**:
    - Create `src/script.ts`.
    - Import `PrismaClient`.
    - Implement `createUser`, `createPost`, `getPublishedPosts`.
    - Run script to verify.

## 4. Verification
- Run `npx ts-node src/script.ts` and check console output.
- Use `npx prisma studio` to visually inspect the SQLite database.
