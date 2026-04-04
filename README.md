# 🚀 Knowledge Base Web App

A full-stack **Knowledge Base Web Application** that allows users to create, manage, search, and update articles with secure authentication.

---

## 🌟 Features

### 🔐 Authentication

* User Signup & Login
* JWT-based authentication
* Protected routes

### 📝 Article Management

* Create articles (title, description, content, tags)
* Edit articles (only by owner)
* Delete articles (only by owner)

### 📄 Article Viewing

* View all articles in a dashboard
* View individual article details

### 🔍 Search

* Search articles by title or description

### 📊 Pagination

* Server-side pagination using MongoDB

### 🎨 UI/UX

* Clean and responsive UI
* Custom color palette
* User-friendly dashboard

---

## 🛠️ Tech Stack

### Frontend

* Next.js
* React
* Tailwind CSS

### Backend

* Node.js
* Express.js
* MongoDB (Mongoose)

### Deployment

* Backend: Railway
* Frontend: Netlify / Vercel

---

## 📂 Project Structure

```
knowledge-base-app/
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── server.js
│
├── frontend/
│   ├── pages/
│   ├── services/
│   ├── components/
│   └── styles/
│
└── README.md
```

---

## ⚙️ Environment Variables

### Backend (`.env`)

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### Frontend (`.env.local`)

```
NEXT_PUBLIC_API_URL=https://your-backend-url.up.railway.app
```

---

## 🚀 Getting Started

### Clone the repository

```
git clone https://github.com/your-username/knowledge-base-app.git
cd knowledge-base-app
```

---

### Backend Setup

```
cd backend
npm install
npm run dev
```

---

### Frontend Setup

```
cd frontend
npm install
npm run dev
```

---

## 🌍 Live Demo

* Frontend: https://your-frontend-url
* Backend: https://your-backend-url

---

## 🔐 Security

* JWT authentication
* Protected API routes
* User-based authorization

---

## 🧠 Key Learnings

* Full-stack application architecture
* REST API development
* Authentication using JWT
* MongoDB pagination
* Deployment using Railway & Netlify/Vercel
* Handling production vs development environments

---

## 🚀 Future Improvements

* Rich text editor
* Image upload support
* Role-based access control
* Dark mode

---

## 👨‍💻 Author

**Nishtha Singh**

---

## ⭐ Show Some Love

If you liked this project, give it a ⭐ on GitHub!
