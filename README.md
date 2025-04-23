# Node.js Express API - JWT Authentication with Role-Based Access

This is a REST API built using **Node.js**, **Express**, and **MongoDB** with **JWT authentication**. It includes user registration, login, fetching user details, and role-based access control through middleware. It also integrates **Swagger** for API documentation.

## Features

- ✅ User Registration
- ✅ User Login with JWT Token
- ✅ Protected Routes using JWT Middleware
- ✅ Role-Based Access Control (Admin/User)
- ✅ Get Authenticated User Details
- ✅ Swagger API Documentation

## Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- JSON Web Token (JWT)
- Bcrypt.js (for password hashing)
- Dotenv
- Swagger (OpenAPI)

## Installation

1. **Clone the repository:**

```bash
git clone https://github.com/dograshaurya/node-role-based-auth.git
cd node-role-based-auth
```
2. **Install dependencies:**
```bash
npm install

```

3. **Set up your .env file:**
```bash
PORT=5000
MONGODB_URI=your_mongo_db_connection_string
DB_NAME=your_database
SECRET_KEY=your_encription_keys
JWT_SECRET=your_jwt_secret
JWT_EXPIRATION_TIME=24h

```


4. **Run the project:**
```bash
npm start


```