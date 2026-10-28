# Library Management API

A REST API built using Node.js and Express.js to manage books, library members, and borrowing records.

## Technologies
- Node.js
- Express.js
- JavaScript
- Postman

## Installation

```bash
npm install
npm run dev
```

Server runs at `http://localhost:3000`.

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/library/books` | Add a book |
| GET | `/api/library/books` | Get all books |
| POST | `/api/library/members` | Register a member |
| GET | `/api/library/members` | Get all members |
| POST | `/api/library/borrow/:bookId` | Borrow a book |
| PUT | `/api/library/return/:borrowId` | Return a book |
| GET | `/api/library/borrowed` | Get all borrowing records |

## Data Storage

All data is stored in local JavaScript arrays. No database is used. Data resets when the server restarts.

## Validation

The API handles missing fields, invalid IDs, unavailable copies, missing records, and attempts to return an already returned book.
