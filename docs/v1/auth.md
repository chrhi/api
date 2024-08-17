# Auth API Documentation

This API provides authentication functionality, including login and fetching user information. The user must provide an access token to access protected routes.

## API Endpoints

### Login

- **Endpoint**: `POST /auth/login`
- **Description**: Authenticates a user with email and password, returning an access token if successful.
- **Request Body**:
  - `email` (string): The user's email.
  - `password` (string): The user's password.
- **Response**: A JSON object containing the access token and user information.

  **Example Request**:

  ```javascript
  fetch('http://localhost:3000/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: 'example@example.com',
      password: 'password123',
    }),
  })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error('Error:', error));
  ```

### Get User Info

- **Endpoint**: `GET /auth/user-info`
- **Description**: Retrieves the authenticated user's information. The user's ID is stored in the access token, so no need to pass it separately.
- **Headers**:
  - `Authorization`: Bearer token (e.g., `Bearer eyJhbGciOiJIUNiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJlMWNhMjA4OC02OTQyLTQwZTAtYjBjMS01OTYyZjY4ODlhZGYiLCJlbWFpbCI6Im1haGRpLmNoYWhyaTU1QGdtYWlsLmNvbSIsImlhdCI6MTcyMzg1MzU0NiwiZXhwIjoxNzIzOTM5OTQ2fQ.6hrCK4z2bEvP021qgxsCQ87mt-4rKur_XFpXzwlSUMU`).
- **Response**: A JSON object representing the authenticated user's information.

  **Example Request**:

  ```javascript
  fetch('http://localhost:3000/auth/user-info', {
    method: 'GET',
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUNiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJlMWNhMjA4OC02OTQyLTQwZTAtYjBjMS01OTYyZjY4ODlhZGYiLCJlbWFpbCI6Im1haGRpLmNoYWhyaTU1QGdtYWlsLmNvbSIsImlhdCI6MTcyMzg1MzU0NiwiZXhwIjoxNzIzOTM5OTQ2fQ.6hrCK4z2bEvP021qgxsCQ87mt-4rKur_XFpXzwlSUMU',
    },
  })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error('Error:', error));
  ```

## Authentication

- The access token must be included in the `Authorization` header in the format `Bearer <token>` when accessing protected routes like `/auth/user-info`.
- The user ID is stored within the access token, so there is no need to pass the user ID separately.

## Error Handling

The API uses standard HTTP status codes to indicate the success or failure of requests. Common error responses include:

- **401 Unauthorized**: When the access token is missing, invalid, or expired.
- **500 Internal Server Error**: When there is an error processing the request.
