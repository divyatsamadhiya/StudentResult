# Student Result API

A TypeScript + Express API for managing student records and computing pass/fail results. The project is structured as a modular monolith and uses MongoDB for persistence.

## Features

- Create student records
- Upload students from CSV
- Fetch all students
- Filter students by pass/fail
- Get a single student’s result by ID

## Tech Stack

- Node.js (v20)
- TypeScript (ESM)
- Express
- MongoDB + Mongoose
- Joi validation
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
    students/
  data/
    students.csv
  models/
    studentModel.ts
  routes/
    studentRoutes.ts
  services/
    students/
  validators/
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

## API Endpoints

Base URL: `http://localhost:3000/api/v1`

### Add Student

**POST** `/students`

```json
{
  "name": "Student Name",
  "age": 20,
  "mark1": 50,
  "mark2": 45,
  "mark3": 50
}
```

### Get All Students

**GET** `/allStudents`

### Get Students By Result

**GET** `/students?resultStatus=passed`

**GET** `/students?resultStatus=failed`

### Get Student Result By ID

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

### Upload Students From CSV

**POST** `/upload`

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

Update the `baseUrl` variable if your port changes.

## Notes

- The `getAllStudents` endpoint is cached in memory for performance. Cache is invalidated on `addStudent` and `csvUpload`.
- All modules use ESM import specifiers (`.js`) to be compatible with Node runtime after TypeScript compilation.
