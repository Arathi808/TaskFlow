# TaskFlow – Full Stack Task Manager App

---

## Overview
TaskFlow is a full-stack web application designed to help users manage their tasks efficiently. It supports authentication, task creation, and task tracking with a clear workflow: To-Do, In Progress, and Completed.

---

## Features
- User authentication (Register / Login)
- Secure JWT-based session handling
- Create, update, and delete tasks
- Task priority management (Low, Medium, High)
- Task status workflow:
  - To-Do
  - In Progress
  - Completed
- Protected routes for authenticated users
- Real-time UI updates after actions

---

## Tech Stack

### Frontend
- React (Vite)
- React Router DOM
- Axios
- CSS

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- bcrypt.js

---

## Installation & Setup

### 1. Clone Repository
```bash
git clone https://github.com/Arathi808/TaskFlow.git
cd TaskFlow
```
**2. Backend Setup**
```
cd server
npm install
```
**3. Frontend Setup**
```
cd client
npm install
```

**4. Environment Setup (Backend)**

**Create a .env file inside the server folder:**
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```
**5. Run Project**
**Backend**
```
cd server
npm start
```
**Frontend**
```
cd client
npm run dev
```
**Authentication Flow**
```
User registers or logs in
Server validates credentials
JWT token is generated
Token is used for protected API requests
