# Task Management Application

## 🚀 Overview

A modern, real-time Task Management Application where users can add, edit, delete, and reorder tasks with a drag-and-drop interface. Tasks are categorized into **To-Do, In Progress, and Done** sections, with changes instantly saved to a database for persistence. The app features **Firebase authentication, real-time updates, and a responsive UI** for both desktop and mobile users.

## 🌐 Live Demo

🔗 [Live Application](#) _(https://taskmanagement-254ee.web.app/)_

## 📜 Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Troubleshooting](#troubleshooting)
- [Contributors](#contributors)
- [License](#license)

## ✨ Features

✅ **User Authentication:** Secure Firebase authentication with Google Sign-In.  
✅ **Task Management:** Users can **add, edit, delete, and reorder** tasks.  
✅ **Drag-and-Drop:** Move tasks between categories with a smooth UX.  
✅ **Real-Time Sync:** Instant updates using WebSockets and MongoDB Change Streams.  
✅ **Persistent Data:** Tasks remain saved even after refreshing or reopening the app.  
✅ **Fully Responsive:** Works seamlessly on mobile and desktop devices.  
✅ **Dark Mode (Bonus):** Toggle between light and dark themes.

## 🛠 Technologies Used

### **Frontend (Client-Side)**

- **React 19** (Framework)
- **Vite** (Development & Build Tool)
- **React Router** (Routing)
- **Firebase Authentication** (User Login)
- **Framer Motion** (Animations)
- **React DnD** (Drag and Drop)
- **React Toastify** (Notifications)
- **Tailwind CSS + DaisyUI** (Styling)

### **Backend (Server-Side)**

- **Node.js + Express.js** (Server)
- **MongoDB + Mongoose** (Database)
- **Socket.io** (Real-time Updates)
- **JWT (JSON Web Tokens)** (Authentication)
- **dotenv & CORS** (Security & Configuration)

## 📦 Dependencies

### **Server-Side Dependencies**

```json
{
  "cors": "^2.8.5",
  "dotenv": "^16.4.7",
  "express": "^4.21.2",
  "jsonwebtoken": "^9.0.2",
  "mongoose": "^8.10.1",
  "nodemon": "^3.1.9",
  "socket.io": "^4.8.1"
}
```

### **Client-Side Dependencies**

```json
{
  "firebase": "^11.3.1",
  "framer-motion": "^12.4.7",
  "lucide-react": "^0.475.0",
  "react": "^19.0.0",
  "react-dnd": "^16.0.1",
  "react-dnd-html5-backend": "^16.0.1",
  "react-dom": "^19.0.0",
  "react-icons": "^5.5.0",
  "react-router-dom": "^7.2.0",
  "react-toastify": "^11.0.3"
}
```

## 🛠 Installation

### **1. Clone the Repository**

```sh
git clone https://github.com/swapnilahmedshishir/TaskManagementServer.git
```

```sh
git clone https://github.com/swapnilahmedshishir/TaskManagementClient.git
```

### **2. Install Dependencies**

#### **Backend**

```sh
cd TaskManagementServer
npm install
```

#### **Frontend**

```sh
cd TaskManagementClient
npm install
```

### **3. Set Up Environment Variables**

#### **Backend (`server/.env`)**

```env
MONGO_URI=
PORT=5001
ACCESS_TOKEN_SECRET=your-secret-key
```

#### **Frontend (`client/.env`)**

```env
VITE_apiKey=
VITE_authDomain=
VITE_projectId=
VITE_storageBucket=
VITE_messagingSenderId=
VITE_appId=
VITE_measurementId=
VITE_CLOUDINARY_CLOUD_NAME=
```

### **4. Start the Application**

#### **Backend**

```sh
npm run start
```

#### **Frontend**

```sh
npm run dev
```

## 📡 API Endpoints

| Method | Endpoint     | Description                     |
| ------ | ------------ | ------------------------------- |
| POST   | `/tasks`     | Add a new task                  |
| GET    | `/tasksget`  | Retrieve all tasks for the user |
| PUT    | `/tasks/:id` | Update task details             |
| DELETE | `/tasks/:id` | Delete a task                   |

## 🔧 Troubleshooting

- **MongoDB Connection Issues?** Ensure `MONGO_URI` is correctly set in `.env`.
- **Firebase Authentication Not Working?** Check if the Firebase API key is correct.
- **Frontend Not Loading?** Ensure Vite is running properly (`npm run dev`).
- **Socket.io Not Updating in Real-Time?** Check if the backend WebSocket server is running.

## 👨‍💻 Contributors

- [Your Name](https://github.com/swapnilahmedshishir)

## 📄 License

This project is licensed under the **MIT License**.  
Feel free to modify and use it as needed!
