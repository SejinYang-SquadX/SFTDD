# 데이터 모델: 초기 설정 (001-init)

## 1. 스키마 다이어그램
```mermaid
erDiagram
    User ||--o{ Post : "작성(writes)"
    User {
        Int id PK
        String email UK "이메일 (고유값)"
        String name "Nullable" "이름 (선택)"
    }
    Post {
        Int id PK
        String title "제목"
        String content "Nullable" "본문 (선택)"
        Boolean published "Default: false" "발행 여부"
        Int authorId FK "작성자 ID"
    }
```

## 2. Prisma 스키마 소스 (제안)
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
