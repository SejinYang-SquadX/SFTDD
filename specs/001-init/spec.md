# Specification: Initial Project Setup (001-init)

## 1. Overview
Establish the foundational infrastructure for the blog platform. The goal is to verify the Schema-Driven Development (SDD) workflow using a simple domain model.

## 2. Goals
- Set up Node.js environment with TypeScript.
- Verify Prisma v6 integration.
- Implement basic "User" and "Post" management features to prove the architecture.

## 3. Features
### 3.1 User Management
- **Create User**: Ability to register a new user with an email and optional name.
- **View User**: Retrieve user details.

### 3.2 Post Management
- **Create Post**: A user can create a post with a title and optional content.
- **Publish Post**: A draft post can be published.
- **View Feed**: Retrieve a list of published posts.

## 4. Non-Functional Requirements
- **Type Safety**: All inputs and outputs must use Prisma-generated types.
- **Data Integrity**: Database constraints (unique email) must be respected.
