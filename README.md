# Authentication and Authorization System

This project implements a robust authentication and authorization system, including support for Two-Factor Authentication (2FA).

## Features
- User registration and login.
- Two-Factor Authentication (2FA) setup and verification.
- Secure handling of user credentials.

## Project Structure
```
/backend
  ├── src
      ├── controllers
      ├── routes
      ├── models
      ├── middlewares
/frontend
  ├── src
      ├── components
      ├── pages
      ├── services
      ├── utils
```

## Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB

## Setup Instructions
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd Authentication-Authorization
   ```

2. Install dependencies:
   ```bash
   cd backend
   npm install
   ```

3. Configure environment variables:
   Create a `.env` file in the `backend` directory and add the following:
   ```
   PORT=5000
   MONGO_URI=<your-mongodb-uri>
   JWT_SECRET=<your-jwt-secret>
   ```

4. Start the server:
   ```bash
   npm start
   ```

5. The server will run at `http://localhost:3010`.

## Frontend Flow
1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   Create a `.env` file in the `frontend` directory and add the following:
   ```
   REACT_APP_API_URL=http://localhost:3010
   ```

4. Start the development server:
   ```bash
   npm start
   ```

5. The frontend will run at `http://localhost:3000`.

## API Endpoints
### Authentication Routes
- `POST /register` - Register a new user.
- `POST /login` - Login an existing user.
- `POST /setup-2fa` - Setup Two-Factor Authentication.
- `POST /verify-2fa` - Verify Two-Factor Authentication.

## License
This project is licensed under the MIT License.
