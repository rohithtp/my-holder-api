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
   The server will run at [http://localhost:3000](http://localhost:3000).

## API Endpoints

### GET /users/user
Returns a list of users.

**Example request:**
```sh
curl http://localhost:3000/users/user
```
**Response:**
```json
[
  { "name": "John Doe" },
  { "name": "Jane Doe" }
]
```

```
curl -XPOST http://localhost:3000/users/answer --header 'content-type: application/json'  --data '{"query":"get me metrics for 2234X"}'
```
```json
{"answer":"Received query: get me metrics for 25A"}
```

## API Documentation

Swagger UI is available at: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

---

This project uses JWT Bearer authentication in its Swagger definition, but the endpoints in this example do not require authentication.
