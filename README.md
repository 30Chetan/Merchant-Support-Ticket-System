# Merchant Support Ticket System

A production-ready full-stack MERN application designed for merchants to create, view, and manage support inquiries efficiently. Developed specifically to match modern enterprise architectural standards.


<img width="1464" height="709" alt="Dashboard-preview" src="https://github.com/user-attachments/assets/35e774f5-d2e7-41fc-8cb8-da0dbe9c4df6" />

## 🚀 Objective
To create a seamless, scalable, and beautifully designed full-stack application that handles the complete lifecycle of merchant support tickets, adhering strictly to technical requirements and professional UI/UX standards.

---

## 💻 Technical Stack Overview

### Backend Framework
- **Node.js & Express.js:** Hand-tailored lightweight server handling API routing with extremely low latency.
- **MongoDB & Mongoose:** Strict schema definitions ensuring data integrity before persistence.

### Frontend Framework
- **React (Vite):** Lightning-fast HMR (Hot Module Replacement) and optimized production builds.
- **Tailwind CSS v4:** Utility-first styling combined with `@theme` configurations to build custom, glass-morphic enterprise designs without polluting standard HTML elements.

---

## 🏛️ Architectural Choices & Design Patterns

I utilized a strictly **Modular Enterprise Structure** on both the frontend and the backend.

### 1. Backend: The MVC + Service Layer Pattern
Unlike basic Express apps where controllers handle everything, this backend isolates layers mathematically:
* **Routes (`/routes`)**: Only defines endpoints (`POST`, `GET`, `PATCH`). Absolutely no logic lives here.
* **Controllers (`/controllers`)**: Manages the HTTP layer. It parses the request `req.body` and sends the JSON `res.status`, acting as a clean bridge.
* **Services (`/services`)**: The "Brain". All business logic and MongoDB `Mongoose` queries execute here. If we ever swap MongoDB for PostgreSQL, the Controllers remain untouched.
* **Middleware (`/middleware`)**: Centralized global error handling ensuring crashes never leak stack traces into production.
* **Models (`/models`)**: Built-in strict enum validations (`['NEW', 'INVESTIGATING', 'RESOLVED']` for Status, and `['Low', 'Medium', 'High']` for Priority).

### 2. Frontend: Component-Driven SaaS Architecture
To create a fluid, dashboard-like feel similar to professional enterprise suites (like Vercel or Linear):
* **Custom Hooks (`/hooks/useTickets.js`)**: Encapsulates all side-effects and asynchronous fetch boundaries. Components shouldn't know *how* data is fetched, only *when*.
* **API Service Abstraction (`/services/api.js`)**: All `fetch` calls are housed in one unified file. This allows effortless updates to headers or auth tokens universally.
* **Vite API Proxying (`vite.config.js`)**: Instead of handling CORS headers manually on the Express server, Vite dynamically proxies frontend `/api` requests to `http://localhost:5001`. This strictly protects the backend from exposing origins in development, mirroring a production NGINX reverse-proxy setup perfectly.

---

## ⚙️ Core Features Implemented

### 1. Robust API Development
The application is driven by 3 tightly secured REST endpoints:
- `POST /api/tickets`: Creates a newly instantiated Support Ticket. Requires a rigorous `subject` and `message`, and accepts a `priority` level.
- `GET /api/tickets`: Fetches all tickets, dynamically sorting by date. Includes built-in server-side filtering via `?status=` and `?priority=` queries.
- `PATCH /api/tickets/:id`: Targeted fast-updates exclusively for altering a ticket's procedural status (`NEW` → `INVESTIGATING` → `RESOLVED`).

### 2. Premium Dashboard User Interface
- **Slide-in Creation Modal:** Modern, animated form overlay for creating new inquiries without aggressively routing the user away from their dashboard context.
- **Reactive Ticket List View:** A comprehensive, sleek table displaying `Subject`, `Priority`, `Status`, and neatly formatted `Creation Dates`.
- **Dynamic Status Indicators:** Visual cues are hardcoded via CSS mappings to display vivid Red/Orange/Green semantic colors based purely on priority and status levels.
- **Top-Level KPI Board:** A visually tracking stats layout summarizing the holistic state of all tickets across the system (Total, Awaiting Review, In Progress, Closed).

---

## 📂 Folder Structure

The project is divided cleanly into a Backend and Frontend to ensure total separation of concerns.

```text
Support-Ticket-System/
├── backend/                  # Node.js + Express API
│   ├── config/               # Database configuration
│   ├── controllers/          # Request handlers
│   ├── middleware/           # Custom error handler
│   ├── models/               # Mongoose schemas
│   ├── routes/               # API endpoints setup
│   ├── services/             # Core business logic
│   ├── .env.example          # Template for backend environment variables
│   └── server.js             # Main backend application entry point
│
├── frontend/                 # React + Vite Application
│   ├── public/               # Static assets
│   ├── src/                  
│   │   ├── api/              # Axios/Fetch configurations
│   │   ├── components/       # Reusable UI architecture (Sidebar, Header)
│   │   │   ├── layout/       # Structural components
│   │   │   ├── tickets/      # Ticket specific rendering (Table, Stats, Modal)
│   │   │   └── ui/           # Generic raw components (Toast notifications)
│   │   ├── hooks/            # Custom logic (useTickets, useToast)
│   │   ├── services/         # API Service
│   │   ├── App.jsx           # Main generic layout and state host
│   │   └── index.css         # Tailwind v4 directives and CSS configuration
│   └── vite.config.js        # Vite config including reverse proxy setup
└── README.md
```

---

## 🏃‍♂️ Installation & Running Locally

To run this application, **you must open two separate terminal windows**—one specifically for your React frontend, and one specifically for your Node backend.

### Prerequisites
- Install **Node.js** (v18 or higher recommended).
- Ensure you have **MongoDB** installed locally (running on `mongodb://localhost:27017`) OR have a MongoDB Atlas URL ready.

---

### Terminal 1: Setting up the Backend
Open your first terminal window and execute the following commands:
```bash
# 1. Navigate into the backend directory
cd backend

# 2. Install all backend dependencies
npm install

# 3. Create your environment file
cp .env.example .env

# 4. Start the backend Node server using Nodemon
npm run dev
```
> ✅ **Success:** The terminal should output that the server is successfully running on `http://localhost:5001` and connected to MongoDB. Do not close this terminal.

---

### Terminal 2: Setting up the Frontend
Open a **new, second terminal window**, and ensure you start from the root of the project:
```bash
# 1. Navigate into the frontend directory
cd frontend

# 2. Install all React and Tailwind dependencies
npm install

# 3. Spin up the Vite development server
npm run dev
```
> ✅ **Success:** The terminal should output that the React application is running at `http://localhost:5173`. 
> You can now open your browser and navigate to **http://localhost:5173** to view and interact with the application.

---

## 🚀 Production Deployment Guide

If you wish to deploy this project securely to the live web, here is the standard infrastructure approach:

### 1. Database Deployment (MongoDB Atlas)
- Create a free cluster on [MongoDB Atlas](https://www.mongodb.com/atlas).
- Whitelist your IP addresses (or `0.0.0.0/0` for universal external server fetching).
- Copy your unique connection URI.

### 2. Backend Deployment (Render or Heroku)
- Push your application to a GitHub repository.
- Inside [Render](https://render.com), create a new **"Web Service"** and connect your GitHub repository.
- Point the **Root Directory** to `backend`.
- Set the **Build Command** to `npm install`.
- Set the **Start Command** to `node server.js`.
- Under Environment Variables, add:
  - `PORT`: `5001`
  - `MONGO_URI`: `*(Your MongoDB Atlas URI)*`
- Render will yield a live URL (e.g., `https://your-api.onrender.com`).

### 3. Frontend Deployment (Vercel or Netlify)
- In [Vercel](https://vercel.com), add a new Project and import the exact same GitHub repository.
- Set the **Framework Preset** to `Vite` and change the **Root Directory** to `frontend`.
- *Crucial Step*: Open your frontend proxy logic inside `vite.config.js` or `api.js` and alter the base URL string to target your live Render API URL instead of `http://localhost:5001`.
- Click **Deploy**. Vercel will bundle your React app and host the static files globally on their CDN.

You now have a globally hosted MERN application!
