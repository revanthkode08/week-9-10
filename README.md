# Blogg App

Project title: Blogg App (Capstone)

Features:
- User & Author registration
- Login / JWT authentication
- Create, edit, delete, restore articles
- Image upload for profiles and articles
- Role-based access (USER / AUTHOR / ADMIN)

Tech stack:
- Frontend: React + Vite, Tailwind CSS, Axios, Zustand
- Backend: Node.js, Express (deployed on Render)
- Database: MongoDB Atlas

Live URLs:
- Frontend: (deploy to Vercel) https://your-project.vercel.app
- Backend: https://week-9-10-kn3e.onrender.com

Installation (local):
1. Install dependencies for backend and frontend:
	- Backend: `cd backend && npm install`
	- Frontend: `cd frontend && npm install`
2. Start backend (if running locally): `cd backend && npm run dev` (or `node server.js`)
3. Start frontend: `cd frontend && npm run dev`

Deployment notes:
- Frontend: Deploy the `frontend/` folder using Vercel. Build command: `npm run build`. Output dir for Vite: `dist`.
- Backend: Hosted on Render at `https://week-9-10-kn3e.onrender.com`.
- Set environment variable `VITE_API_URL=https://week-9-10-kn3e.onrender.com` in Vercel before deploying.

Final deployment structure:

Frontend (Vercel)
↓
https://your-project.vercel.app

Backend (Render)
↓
https://week-9-10-kn3e.onrender.com

Database
↓
MongoDB Atlas

Notes:
- I updated the frontend API endpoints to point to the Render backend URL `https://week-9-10-kn3e.onrender.com`.

