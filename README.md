# Full-Stack Task Management Application

A modern, full-stack web application that allows users to manage tasks efficiently through features like user authentication, task creation, filtering, and analysis. Built with the MERN (MongoDB, Express, React, Node.js) stack and deployed using Vercel, Render, and MongoDB Atlas.

---

## 📌 Project Overview

This project is a fully responsive task management solution where users can:

- Register and log in with secure password validation.
- Create, update, delete, and manage personal tasks.
- Filter tasks by status (completed, pending, overdue).
- Sort tasks by date and assignee.
- Track task statistics via a dynamic dashboard.

---

## ⚙️ Technology Stack

### Frontend

- React.js (Vite)
- React Router DOM
- Axios

### Backend

- Node.js
- Express.js
- MongoDB (Atlas)
- Mongoose
- bcrypt (Password Hashing)
- dotenv (Environment Variables)
- CORS

### Deployment

- **Frontend**: [Vercel](https://vercel.com/)
- **Backend**: [Render](https://render.com/)
- **Database**: [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

---

## ✅ Features

### Authentication

- Secure user registration and login
- Password strength validation using RegEx
- bcrypt for password hashing
- Basic session management (JWT)

### Task Management

- Create, read, update, and delete tasks
- Toggle task status (Pending / Completed)
- Filter tasks by status
- Detect and highlight overdue tasks
- Sort tasks by due date or assignee
- Dashboard summary of total, pending, completed, and overdue tasks

### User Experience

- Responsive UI for both desktop and mobile devices
- Animated transitions
- Error handling and form validation on both frontend and backend

---

## 🔄 Frontend–Backend Integration

The frontend communicates with the backend via RESTful API calls using Axios.

### Example API Interaction:

**Frontend (React + Axios):**

```javascript
axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/tasks`, {
  title: "New Task",
  dueDate: "2025-07-15",
});
