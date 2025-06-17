# ✅ MERN Stack Task Management App

A full-stack task management (To-Do) application built with the MERN stack (MongoDB, Express, React, Node.js). Users can register, login, and manage their tasks using an intuitive Kanban-style drag-and-drop interface.

---

## 🧰 Tech Stack

- **Frontend**: React, Vite, Tailwind CSS, DaisyUI, @hello-pangea/dnd, Axios
- **State Management**: Zustand (for managing auth state and task state)
- **Backend**: Node.js, Express.js, Mongoose, Cloudinary
- **Database**: MongoDB Atlas
- **Authentication**: JWT, bcrypt, HTTP-only Cookies

---

## ✨ Features

- ✅ Manual User Authentication using JWT & bcrypt (No Firebase or Clerk used)
- 🔐 Protected routes handled securely with HTTP-only cookies
- 📦 Register, Login, Logout functionality with proper validations
- 🗂️ Create, update, delete tasks (CRUD)
- 🔀 Kanban-style drag-and-drop with real-time database update
- 💾 Persistent task status using MongoDB and Mongoose
- 🎨 Clean and responsive UI using Tailwind CSS and DaisyUI
- ☁️ Image upload support with Cloudinary
- 💻 Codebase follows modular structure and clean coding principles

---

## 💡 Developer's Note

While third-party services like Firebase or Clerk could have made authentication easier, I chose to implement manual JWT-based authentication with password hashing (using bcrypt) to demonstrate deeper backend development skills. Every interaction, including drag-and-drop, updates the backend database — not just the UI — ensuring data consistency and reliability. I also focused on keeping the codebase clean and maintainable.

---
