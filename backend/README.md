# Text-to-SQL Backend

Backend service for converting natural language queries to SQL using CSV data upload.

## Features

- CSV file upload and parsing
- In-memory SQLite database for data storage
- Natural language to SQL conversion using Claude AI
- RESTful API endpoints

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## Installation

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   - Copy `.env` file
   - Add your Anthropic API key:
     ```
     ANTHROPIC_API_KEY=your_api_key_here
     ```
   - Get your API key from: https://console.anthropic.com/

## Running the Server

```bash
npm start
```

The server will start on port 5000 (or the port specified in .env).

## API Endpoints

### Health Check
```
GET /
GET /health
```

### Upload CSV
```
POST /api/upload
Content-Type: multipart/form-data

Request:
- file: CSV file

Response:
{
  "message": "CSV loaded successfully",
  "columns": ["column1", "column2", ...],
  "rowCount": 100,
  "preview": [...]
}
```

### Query
```
POST /api/query
Content-Type: application/json

Request:
{
  "question": "show me top 5 sales by region",
  "columns": ["region", "sales", ...],
  "sampleRows": [...]
}

Response:
{
  "sql": "SELECT * FROM dataset ...",
  "results": [...],
  "rowCount": 5
}
```

### Get Table Info
```
GET /api/table-info

Response:
{
  "hasData": true,
  "columns": [...],
  "rowCount": 100
}
```

## Project Structure

```
backend/
├── config/
│   └── db.js          # SQLite database instance
├── routes/
│   ├── upload.js      # CSV upload route
│   └── query.js       # Text-to-SQL query route
├── uploads/           # Temporary file storage
├── server.js          # Main server file
├── package.json       # Dependencies
└── .env               # Environment variables
```

## Usage Flow

1. User uploads a CSV file via `/api/upload`
2. Backend parses CSV and loads data into in-memory SQLite
3. User sends a natural language question via `/api/query`
4. Backend uses Claude AI to convert question to SQL
5. SQL is executed against the in-memory database
6. Results are returned to the client

## Error Handling

All errors return a JSON response with an error message:
```json
{
  "error": "Error message description"
}
```