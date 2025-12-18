# Data Model: Initial Setup (001-init)

## 1. Schema Diagram
```mermaid
erDiagram
    User ||--o{ Post : "writes"
    User {
        Int id PK
        String email UK
        String name "Nullable"
    }
    Post {
        Int id PK
        String title
        String content "Nullable"
        Boolean published "Default: false"
        Int authorId FK
    }
```

## 2. Prisma Schema Source
```prisma
model User {
  id    Int     @id @default(autoincrement())
  email String  @unique
  name  String?
  posts Post[]
}

model Post {
  id        Int     @id @default(autoincrement())
  title     String
  content   String?
  published Boolean @default(false)
  author    User    @relation(fields: [authorId], references: [id])
  authorId  Int
}
```
