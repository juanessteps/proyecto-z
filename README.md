# 🌫️ Silent Hill 2 — Fan Portal

![Silent Hill 2](https://img.shields.io/badge/Game-Silent%20Hill%202%20Remake-red?style=for-the-badge&logo=playstation)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite)
![MUI](https://img.shields.io/badge/MUI-v5-007FFF?style=for-the-badge&logo=mui)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-4169E1?style=for-the-badge&logo=postgresql)
![JWT](https://img.shields.io/badge/Auth-JWT-black?style=for-the-badge&logo=jsonwebtokens)

> An atmospheric fan portal dedicated to the **Silent Hill 2 Remake (2024)**. Explore the lore, characters, items, and survival tips of Toluca Lake's most haunted town. Role-based authentication lets community members comment while admins curate all content.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🔐 JWT Auth | Secure login/register with role-based access (Admin / Cliente) |
| 👁️ Lore Archive | Game story entries grouped by chapter |
| 🧍 Characters | Profiles for James, Maria, Angela, Eddie & more |
| 🔫 Items & Weapons | Filterable database of in-game items |
| 📋 Survival Guide | Tips with difficulty rating |
| 💬 Comments | Authenticated users can comment on any entry |
| 🛡️ Admin Dashboard | Full CRUD for all content, protected by role |
| 🎨 Dark Theme | Atmospheric UI with fog, glitch text & cinematic hero |

---

## 🛠️ Tech Stack

```
Frontend  → React 18 + Vite + Material UI v5 (Dark Theme)
Backend   → Node.js + Express
Database  → PostgreSQL
Auth      → JWT + bcrypt (Roles: admin / cliente)
```

---

## 🚀 Setup

### Prerequisites
- Node.js ≥ 18
- PostgreSQL ≥ 14

### 1. Clone the repo
```bash
git clone https://github.com/juanessteps/proyecto-z.git
cd proyecto-z
```

### 2. Backend setup
```bash
cd backend
npm install
cp .env.example .env   # Fill in your DB credentials and JWT secret
psql -U your_user -d your_db -f schema.sql  # Create tables
npm run dev
```

### 3. Frontend setup
```bash
cd ../frontend
npm install
npm run dev
```

The app will be available at **http://localhost:5173** and the API at **http://localhost:3001**.

### 4. Create an admin user
Register normally, then promote via SQL:
```sql
UPDATE users SET role = 'admin' WHERE email = 'your@email.com';
```

---

## 📁 Project Structure

```
proyecto-z/
├── backend/
│   ├── src/
│   │   ├── config/         # DB connection (pg pool)
│   │   ├── middlewares/    # JWT auth + role guard
│   │   ├── routes/         # auth, characters, lore, items, tips, comments
│   │   └── controllers/    # Business logic per resource
│   ├── schema.sql          # Full PostgreSQL schema
│   ├── .env.example
│   └── package.json
└── frontend/
    ├── src/
    │   ├── api/            # Axios instance + service modules
    │   ├── context/        # AuthContext (JWT state)
    │   ├── components/     # Navbar, FogOverlay, GlitchText, ProtectedRoute
    │   ├── pages/          # Home, Login, Register, Lore, Characters, Items, Tips, Admin
    │   └── theme.js        # MUI dark theme (SH2 palette)
    └── package.json
```

---

## 🎮 Screenshots

> _Coming soon — run locally to experience the full atmospheric UI_

---

## 📜 License

This is a **fan project** created for educational and portfolio purposes. Silent Hill is a registered trademark of **Konami Digital Entertainment**. No copyright infringement intended.
