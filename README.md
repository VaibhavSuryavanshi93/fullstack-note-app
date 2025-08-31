# 📝 Notes App (MERN + Firebase Auth)

A full-stack Notes application built with **React (frontend)**, **Node.js + Express (backend)**, **MongoDB (database)**, and **Firebase Authentication (Google Login)**.
Users can create, view, and delete their own notes securely.

---

## 🚀 Features

* 🔑 **Authentication** with Firebase (Google Sign-In)
* 🛡️ **JWT Middleware** for route protection
* ✍️ Create, read, and delete personal notes
* ⚡ Real-time UI updates with React + Zustand
* 🎨 Styled with TailwindCSS & user can change themes from the setting
* ☁️ Secure handling of Firebase service keys
* 🖼️ whenever user login and signup image change automatically

---

## 🛠️ Tech Stack

**Frontend**

* React
* TailwindCSS
* Zustand (state management)
* Axios
* DaisyUI

**Backend**

* Node.js
* Express.js
* MongoDB + Mongoose
* Firebase Admin SDK
* JWT

---

## 📂 Project Structure

```
project-root/
│── backend/
│   ├── src/
│   │   ├── models/         # Mongoose models
│   │   ├── routes/         # Express routes
│   │   ├── middleware/     # Auth middleware
│   │   ├── controllers/    # Controllers (notes, auth)
│   │   ├── lib/
│   │   │   └── serviceAccountKey.json (IGNORED in git)
│   │   └── index.js        # Server entry
│   └── package.json
│
│── frontend/
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/          # Pages (Login, Notes, etc.)
│   │   ├── store/          # Zustand store
│   │   └── main.jsx
│   └── package.json
│
│── .gitignore
│── README.md
```

---

## ⚙️ Installation & Setup

### 1. Clone the repo

```bash
git clone https://github.com/your-username/notes-app.git
cd notes-app
```

### 2. Backend Setup

```bash
cd backend
npm install
```

* Create a `.env` file inside `backend/` with:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

* Add your Firebase Admin key inside `backend/src/lib/serviceAccountKey.json`
  *(make sure `.gitignore` excludes this file)*

Start the backend:

```bash
npm run dev
```

---

### 3. Frontend Setup

```bash
cd frontend
npm install
```

* Create a `.env` file inside `frontend/`:

```env
VITE_API_URL=http://localhost:5000
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
```

Start the frontend:

```bash
npm run dev
```

---

## 🧪 API Endpoints

| Method | Endpoint         | Description                |
| ------ | ---------------- | -------------------------- |
| GET    | `/api/notes`     | Get user’s notes           |
| POST   | `/api/notes`     | Create a new note          |
| DELETE | `/api/notes/:id` | Delete a note (owner only) |

---

## 🔒 Security

* Firebase Admin key is **ignored in `.gitignore`**
* JWT is used for route protection
* Only note owners can delete their notes

---

