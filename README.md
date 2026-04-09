# Merchant Support Ticket System

A production-ready full-stack MERN application designed for merchants to create, view, and manage support inquiries efficiently. Developed specifically to match modern enterprise architectural standards.

![Dashboard Preview](https://via.placeholder.com/1000x500.png?text=TicketIQ+Dashboard) *(Replace with actual screenshot)*

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

## 🏃‍♂️ Getting Started (Running Locally)

### Prerequisites
- Node.js installed (v18 and above recommended).
- MongoDB installed locally (running on `mongodb://localhost:27017`) or access to an Atlas connection string.

### Step 1: Initialize the Backend
Open a terminal and execute the following:
```bash
cd backend
npm install
# Ensure .env is set to your local mongodb: MONGO_URI=mongodb://localhost:27017/support-tickets
npm run dev
```
*The backend server will spin up actively on `http://localhost:5001`.*

### Step 2: Initialize the Frontend
Open a **new** separate terminal and execute:
```bash
cd frontend
npm install
npm run dev
```
*The frontend React application will launch securely on `http://localhost:5173`.*

---

## 🧪 Testing the Application
1. **Navigate to `http://localhost:5173`** in your browser.
2. Click **"New Ticket"** to verify the Express `POST` route.
3. Once populated, use the targeted dropdown under the "Update Status" column to dynamically trigger a `PATCH` request.
4. Utilize the top Action-bar dropdowns to filter the active ticket table through specific specific statuses natively processed via the `GET` route filters.
