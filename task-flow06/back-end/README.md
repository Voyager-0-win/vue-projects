# TaskFlow Backend (CSV edition)

Node.js + TypeScript + Express REST API. Task records are persisted in `data/data.csv`; no database is used.

## Requirements

- Node.js 20+ recommended
- npm

## Run locally

```bash
npm install
cp .env.example .env
npm run dev
```

Windows PowerShell users can copy `.env.example` to `.env` manually. The default API runs at `http://localhost:3000`.

## Build and run production output

```bash
npm run typecheck
npm run build
npm start
```

## Endpoints

- `GET /api/health`
- `GET /api/tasks?keyword=vue&status=todo&priority=high&page=1&pageSize=20&sortBy=createdAt&order=desc`
- `GET /api/tasks/stats`
- `GET /api/tasks/:id`
- `POST /api/tasks`
- `PATCH /api/tasks/:id`
- `DELETE /api/tasks/:id`

### Create task example

```http
POST /api/tasks
Content-Type: application/json
```

```json
{
  "title": "Learn Express",
  "description": "Build TaskFlow APIs",
  "priority": "high",
  "dueDate": "2026-10-30"
}
```

Allowed statuses: `todo`, `in_progress`, `done`.
Allowed priorities: `low`, `medium`, `high`.

## Response shapes

List:

```json
{
  "data": [],
  "pagination": { "page": 1, "pageSize": 20, "total": 0, "totalPages": 0 }
}
```

Errors:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Request validation failed",
    "details": {}
  }
}
```

## CSV notes

The CSV parser/serializer handles commas, quotes and newlines. Mutating operations are serialized within one Node.js process and committed via a temporary file rename. This is suitable for a learning project or low-volume single-process use, not multi-process or high-concurrency production workloads. A process-local queue is not a distributed lock. Back up `data/data.csv` regularly.

## Current scope

This first version implements task CRUD, filters, pagination, sorting, statistics, validation and consistent errors. Authentication and multi-user authorization are intentionally not included yet. Do not expose this API publicly as a multi-user service until authentication and ownership checks are implemented.
