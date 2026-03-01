# Student Result API

A TypeScript + Express API for managing student records and computing pass/fail results. The project is structured as a modular monolith and uses MongoDB for persistence.

## Features

- Admin login and student login using JWT
- Bootstrap admin creation (first admin can be created without auth)
- Create student records (admin only)
- Upload students from CSV (admin only)
- Fetch all students (admin only)
- Filter students by pass/fail (admin only)
- Students can view their own result after login

## Tech Stack

- Node.js (v20)
- TypeScript (ESM)
- Express
- MongoDB + Mongoose
- Joi validation
- JWT auth
- Jest (unit tests)
- Prettier (formatting)

## Project Structure

```
src/
  app.ts
  configs/
    db.ts
    env.ts
  controllers/
    auth/
    students/
  data/
    students.csv
  middlewares/
    auth.ts
  models/
    adminModel.ts
    studentModel.ts
  routes/
    authRoutes.ts
    studentRoutes.ts
  services/
    auth/
    students/
  validators/
    authSchema.ts
    studentSchema.ts
```

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create `.env`:

```
MONGO_URI=<your MongoDB connection string>
PORT=3000
NODE_ENV=development
JWT_SECRET=<your secret>
JWT_EXPIRES_IN=30m
```

3. Run in development (TypeScript watch):

```bash
npm run dev
```

4. Build and run:

```bash
npm run build
npm start
```

## Admin Setup

Admins are stored in MongoDB. The first admin can be created via the bootstrap endpoint without authentication. After the first admin exists, only admins can create new admins.

## API Endpoints

Base URL: `http://localhost:3000/api/v1`

### Admin Register (Bootstrap/Admin)

**POST** `/auth/admin/register`

```json
{
  "email": "admin@example.com",
  "password": "secret123"
}
```

### Admin Login

**POST** `/auth/admin/login`

```json
{
  "email": "admin@example.com",
  "password": "secret123"
}
```

### Student Login

**POST** `/auth/student/login`

```json
{
  "email": "student@example.com",
  "password": "secret123"
}
```

### Add Student (Admin)

**POST** `/students`

```json
{
  "name": "Student Name",
  "email": "student@example.com",
  "password": "secret123",
  "age": 20,
  "mark1": 50,
  "mark2": 45,
  "mark3": 50
}
```

### Get All Students (Admin)

**GET** `/allStudents`

### Get Students By Result (Admin)

**GET** `/students?resultStatus=passed`

**GET** `/students?resultStatus=failed`

### Get Student Result By ID (Student/Admin)

**GET** `/students/:id/result`

Response example:

```json
{
  "name": "Student Name",
  "mark1": 50,
  "mark2": 45,
  "mark3": 50,
  "result": "passed"
}
```

### Upload Students From CSV (Admin)

**POST** `/upload`

CSV must include: `name,email,password,age,mark1,mark2,mark3`

## Auth Header

For protected routes, send:

```
Authorization: Bearer <token>
```

## Tests

Run tests:

```bash
npm test
```

## Formatting

Run Prettier:

```bash
npm exec prettier -- --write "**/*.{ts,js,json,md}"
```

## Postman

Import the collection:

- `StudentResult.postman_collection.json`

Update the `baseUrl`, `adminToken`, and `studentToken` variables as needed.

## Notes

- The `getAllStudents` endpoint is cached in memory for performance. Cache is invalidated on `addStudent` and `csvUpload`.
- All modules use ESM import specifiers (`.js`) to be compatible with Node runtime after TypeScript compilation.
