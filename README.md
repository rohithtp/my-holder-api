# my-holder-api

A simple Express API project with Swagger documentation.

## Setup

1. Install dependencies:
   ```sh
   npm install
   ```
2. Start the server:
   ```sh
   node app.js
   ```
   The server will run at [http://localhost:8800](http://localhost:8800).

## API Endpoints

### GET /users/user
Returns a list of users.

**Example request:**
```sh
curl http://localhost:8800/users/user
```
**Response:**
```json
[
  { "name": "John Doe" },
  { "name": "Jane Doe" }
]
```

### POST /users/answer
Handles a query and returns the answer.

**Example request:**
```sh
curl -XPOST http://localhost:8800/users/answer --header 'content-type: application/json'  --data '{"query":"get me metrics for 2234X"}'
```
**Response:**
```json
{"answer": "Received query:\n get me metrics for 2234X"}
```

### POST /api/second-brain/chat
Handles a chat request and returns an assistant response.

**Example request:**
```sh
curl -XPOST http://localhost:8800/api/second-brain/chat \
  --header 'content-type: application/json' \
  --data '{
    "id": "chat-uuid",
    "message": {
      "id": "message-uuid",
      "createdAt": "2024-06-01T12:00:00Z",
      "role": "user",
      "content": "Hello, how are you?",
      "parts": [{ "type": "text", "text": "Hello, how are you?" }]
    },
    "selectedChatModel": "chat-model",
    "selectedVisibilityType": "private"
  }'
```
**Response:**
```json
{
  "id": "assistant-message-uuid",
  "role": "assistant",
  "createdAt": "2024-06-01T12:00:01Z",
  "parts": [{ "type": "text", "text": "I'm good, how can I help you today?" }]
}
```

## API Documentation

Swagger UI is available at: [http://localhost:8800/api-docs](http://localhost:8800/api-docs)

---

This project uses JWT Bearer authentication in its Swagger definition, but the endpoints in this example do not require authentication.
