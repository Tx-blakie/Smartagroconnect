# Smart AgroConnect Backend API

This is the backend API for the Smart AgroConnect platform, built with Node.js, Express, and MongoDB.

## Features

- User authentication (register, login, profile management)
- Product management (create, read, update, delete)
- Role-based authorization
- RESTful API design

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)

## Installation

1. Clone the repository
2. Navigate to the backend directory:
   ```
   cd Backend
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/smartAgroConnect
   JWT_SECRET=your_jwt_secret_key_here
   ```

## Running the Server

- Development mode:
  ```
  npm run dev
  ```

- Production mode:
  ```
  npm start
  ```

## API Endpoints

### Authentication
- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - User login
- `GET /api/users/profile` - Get user profile (protected)
- `PUT /api/users/profile` - Update user profile (protected)

### Products
- `GET /api/products` - Get all products (with optional filters)
- `GET /api/products/:id` - Get a single product by ID
- `POST /api/products` - Create a new product (protected)
- `PUT /api/products/:id` - Update a product (protected)
- `DELETE /api/products/:id` - Delete a product (protected)
- `GET /api/products/user/myproducts` - Get products by the logged-in user (protected)

## License

MIT 