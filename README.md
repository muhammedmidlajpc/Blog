# MERN Blog App 📝

A full-stack blog application built using **MongoDB**, **Express.js**, **React.js**, and **Node.js**. Users can create, view, edit, and delete blogs. Authentication is handled using **JWT (JSON Web Tokens)**.

---

## 🚀 Features

- JWT-based User Authentication
- Create, Read, Update, Delete (CRUD) blogs
- Backend Pagination
- Responsive UI with Tailwind CSS
- Toast notifications with React Toastify

---

## 🛠️ Tech Stack

**Frontend:**
- React
- Tailwind CSS
- React Router
- Axios
- React Toastify

**Backend:**
- Express.js
- MongoDB (MongoDB Atlas)
- Mongoose
- JWT Authentication
- dotenv

---

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
cd YOUR_REPO_NAME
2. Setup the backend
bash
Copy
Edit
cd backend
npm install
Create a .env file inside the backend directory with the following variables:

env
Copy
Edit
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
Start the backend server:

bash
Copy
Edit
npm start
3. Setup the frontend
bash
Copy
Edit
cd ../frontend
npm install
npm start
🔐 Authentication
JWT authentication is used for login/signup. Tokens are stored using sessionStorage and attached to protected routes via HTTP headers.

🌐 Live Demo
If deployed, add the URL here:

Live App

📝 License
This project is licensed under the MIT License. See the LICENSE file for more information.

📧 Contact
Created by Muhammed Midlaj PC
email:midlajpc531@gmail.com
 – feel free to contact me!