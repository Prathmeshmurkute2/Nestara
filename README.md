# Nestara 🏡  
A Full-Stack MERN Application

🔗 Live Demo: https://nestara-u.vercel.app  
🔗 Backend API: https://nestara-a4pt.onrender.com  
🔗 GitHub Repo: https://github.com/Prathmeshmurkute2/Nestara  

---

## 📌 About the Project
Nestara is a full-stack MERN web application inspired by modern rental and listing platforms.  
It allows users to browse listings, add reviews, search properties, and authenticate securely.

This project demonstrates **real-world full-stack development and deployment** using modern tools and best practices.

---

## 🚀 Features
- User authentication with Passport.js (session-based)
- Property listings with reviews
- Search functionality
- Secure cookies and sessions
- RESTful API architecture
- Error handling middleware
- Responsive frontend UI

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Vite
- JavaScript
- CSS / Tailwind

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- Passport.js
- Express-session
- Connect-mongo

### Deployment
- Frontend: **Vercel**
- Backend: **Render**
- Database: **MongoDB Atlas**

---

## 🔐 Authentication & Security
- Session-based authentication
- Secure cookies (`httpOnly`, `sameSite: none`, `secure`)
- CORS configured for cross-domain communication
- Environment variable based configuration

---

## 🌍 Deployment Architecture
- Frontend hosted on Vercel
- Backend hosted on Render
- Cross-origin communication handled via CORS
- Sessions stored in MongoDB

---

## 🧠 Challenges Faced & Solutions
- **CORS issues between Vercel and Render**  
  → Solved by configuring allowed origins properly  
- **Session handling across domains**  
  → Implemented secure cookies and MongoDB session store  
- **Deployment debugging**  
  → Fixed production-only issues like double slashes and env mismatches

---

## 📂 Installation & Setup (Local)

```bash
git clone https://github.com/Prathmeshmurkute2/Nestara.git
npm install
npm run dev   # starts the backend server
