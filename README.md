# Merchant Support Ticket System

A production-ready full-stack MERN application for merchants to create, view, and manage support inquiries efficiently.

## 📸 Screenshots / Preview
<!-- Placeholder for dashboard UI images -->
<img width="1464" height="709" alt="Dashboard-preview" src="https://github.com/user-attachments/assets/7830c2a8-952a-4498-83ad-f85f2723e26e" />


---

## 🚀 Run Locally

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## ⚙️ Environment Variables

Create a `.env` file in the `backend/` directory with the following variables:

```env
PORT=5001
MONGO_URI=your_mongodb_connection_string
```

---

## 📡 API Request Example

### Create a Ticket (`POST /api/tickets`)

**Request Body:**
```json
{
  "subject": "Payment failed",
  "message": "Transaction not completed",
  "priority": "High"
}
```

---

## 🚀 Objective
To build a scalable and modular full-stack application that handles the lifecycle of merchant support tickets, adhering to professional UI/UX standards and enterprise backend architecture.

---

## 💻 Technical Stack Overview

### Backend Structure
- **Node.js & Express.js:** Lightweight Express server for scalable API routing and middleware handling.
- **MongoDB & Mongoose:** NoSQL database with strict schema validation for data integrity.

### Frontend Structure
- **React (Vite):** Fast, component-driven UI library with optimized bundling.
- **Tailwind CSS v4:** Utility-first CSS framework configured for a modern, responsive interface including dark mode support.

---

## 🏛️ Architectural Choices

The project uses a standard **Modular Architecture** pattern.

### Backend: MVC + Service Pattern
The backend separates responsibilities across different layers:
* **Routes (`/routes`)**: Defines API endpoints (`POST`, `GET`, `PATCH`) and forwards requests to controllers.
* **Controllers (`/controllers`)**: Manages the HTTP layer (request parsing, response formatting).
* **Services (`/services`)**: Contains core business logic and database interactions.
* **Middleware (`/middleware`)**: Handles global request errors centrally.
* **Models (`/models`)**: Defines data schemas and enum validations (e.g., Status: `NEW`, `INVESTIGATING`, `RESOLVED`).

### Frontend: Component-Driven Architecture
* **Custom Hooks (`useTickets.js`)**: Encapsulates external side-effects and backend data fetching logic.
* **API Service (`api.js`)**: Centralizes fetch calls, making it easier to manage headers and base URLs.
* **Vite Proxy:** Uses Vite's proxy feature (`/api` routes to `http://localhost:5001`) to handle internal routing smoothly without manual CORS configuration during development.

---

## 🛠️ Core Features Implemented

1. **Robust REST API:**
   - `POST /api/tickets`: Creates a new ticket.
   - `GET /api/tickets`: Fetches tickets with support for server-side filtering by status and priority.
   - `PATCH /api/tickets/:id`: Updates an existing ticket's operational status.

2. **Dashboard User Interface:**
   - **Slide-in Modal:** Form interface for ticket creation.
   - **Data Table:** Displays tickets with visual status indicators.
   - **Real-time Statistics:** KPI cards summarizing total, open, and resolved tickets.
   - **Theme Toggling:** Built-in light and dark mode toggling.

---

## 📂 Folder Structure

```text
Support-Ticket-System/
├── backend/                  # Node.js + Express API
│   ├── config/               
│   ├── controllers/          
│   ├── middleware/           
│   ├── models/               
│   ├── routes/               
│   ├── services/             
│   ├── .env.example          
│   └── server.js             
│
├── frontend/                 # React + Vite Application
│   ├── public/               
│   ├── src/                  
│   │   ├── components/       # Reusable UI (Sidebar, Table, Modals)
│   │   ├── hooks/            # Custom logic 
│   │   ├── services/         # API Service
│   │   ├── App.jsx           
│   │   └── index.css         
│   └── vite.config.js        
└── README.md
```

---

## 🌐 Production Deployment Guide

To deploy this project to the live web:

### 1. Database Deployment (MongoDB Atlas)
- Create a cluster on [MongoDB Atlas](https://www.mongodb.com/atlas).
- Whitelist your IP (`0.0.0.0/0` for universal external fetching).
- Copy your unique connection URI.

### 2. Backend Deployment (Render or Heroku)
- Connect your GitHub repository as a new Web Service in [Render](https://render.com).
- Set the **Root Directory** to `backend`.
- Set **Build Command** to `npm install` and **Start Command** to `node server.js`.
- Add `PORT` and `MONGO_URI` to your Render Environment Variables.

### 3. Frontend Deployment (Vercel or Netlify)
- Import your repository to [Vercel](https://vercel.com).
- Set the **Framework Preset** to `Vite` and change the **Root Directory** to `frontend`.
- *Wait:* In your frontend's `api.js` or `vite.config.js`, update the API base URL to target your live Render backend instead of `localhost`.
- Deploy to generate your global URL.
