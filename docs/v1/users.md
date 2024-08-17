# Users API Documentation

This API allows you to manage users within your application. It includes endpoints for retrieving users, finding users by ID or email, and creating new users.

## API Endpoints

### Get All Users

- **Endpoint**: `GET /users/all-users`
- **Description**: Retrieves all users from the database.
- **Response**: A JSON array of user objects.

  **Example Request**:

  ```javascript
  fetch('http://localhost:3000/users/all-users')
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error('Error:', error));
  ```

### Get User by ID

- **Endpoint**: `GET /users/id/:id`
- **Description**: Retrieves a user by their ID.
- **Parameters**:
  - `id`: The ID of the user.
- **Response**: A JSON object representing the user, or a 404 error if not found.

  **Example Request**:

  ```javascript
  fetch('http://localhost:3000/users/id/1')
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error('Error:', error));
  ```

### Find User by Email

- **Endpoint**: `GET /users/email/:email`
- **Description**: Finds a user by their email.
- **Parameters**:
  - `email`: The email of the user.
- **Response**: A JSON object representing the user, or a 404 error if not found.

  **Example Request**:

  ```javascript
  fetch('http://localhost:3000/users/email/example@example.com')
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error('Error:', error));
  ```

### Create User

- **Endpoint**: `POST /users/create`
- **Description**: Creates a new user in the database.
- **Request Body**:
  - `email` (string): The user's email.
  - `password` (string): The user's password.
  - `fname` (string): The user's first name.
  - `phone` (number): The user's phone number.
- **Response**: A JSON object representing the newly created user, or a 500 error if something goes wrong.

  **Example Request**:

  ```javascript
  fetch('http://localhost:3000/users/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: 'newuser@example.com',
      password: 'password123',
      fname: 'Jane',
      phone: 987654321,
    }),
  })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error('Error:', error));
  ```

## Error Handling

The API uses standard HTTP status codes to indicate the success or failure of requests. Common error responses include:

- **404 Not Found**: When a user cannot be found by ID or email.
- **500 Internal Server Error**: When there is an error creating a user or a general server error occurs.
