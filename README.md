# Support Ticket Management System

Create a full-stack application that allows merchants to create, view, and manage support inquiries.

## Technical Stack
- **Backend:** Node.js (Express), MongoDB (Mongoose)
- **Frontend:** React (Vite), Tailwind CSS v4

---

## 🛠️ Architectural Choices

### Backend (MVC Pattern)
The backend follows a modular **Model-View-Controller (MVC) + Services Layer** structure. This is an enterprise-standard approach that ensures separation of concerns:
1. **Controllers** (`ticketController.js`): Responsible only for handling request/response logic and catching errors.
2. **Services** (`ticketService.js`): Contains the core business logic and MongoDB operations. This makes the code easier to test and prevents controllers from becoming bloated.
3. **Models** (`Ticket.js`): Defines strict Mongoose schemas with built-in validation for Enums (`['Low', 'Medium', 'High']` for priority, and `['NEW', 'INVESTIGATING', 'RESOLVED']` for status).
4. **Middleware** (`errorMiddleware.js`): A centralized error boundary catches API exceptions and formats them cleanly rather than crashing the node process.

### Frontend (Component-Driven SaaS Layout)
The frontend implements a modern, responsive layout inspired by premium SaaS applications (like Linear or Vercel):
1. **Component Modularity:** Reusable components like `<TicketTable />`, `<CreateTicketModal />`, `<StatsRow />`, and `<Sidebar />` separate logic and UI.
2. **Custom Hooks:** `useTickets.js` abstracts API side-effects and state management (fetching tickets, updating statuses, showing partial loading states). `useToast.js` handles temporary success/error notifications.
3. **Vite Proxy:** We leverage Vite's local proxy feature (`/api` routes to `localhost:5001`). This eliminates the need for complex CORS config or hardcoded backend URLs, seamlessly translating well for production environments using Nginx.
4. **Vanilla CSS via Tailwind Directive:** We've built the styling with a deep base level CSS implementation over Tailwind v4 variables (using `@theme`) to ensure uniform custom styling (like the glass-morphism effect, subtle border highlights, and Skeleton loaders) without polluting the React code with too many utilities.

---

## 🚀 Running the Application Local

### Prerequisites
- Node.js (v18+)
- MongoDB (Running locally on `mongodb://localhost:27017` or via MongoDB Compass)

### 1. Backend Setup
```bash
cd backend
npm install
npm run dev
```
> Server runs on http://localhost:5001

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
> App runs on http://localhost:5173

---

## 🔥 Features
- **Create Inquiries:** User-friendly modal for entering support requests.
- **Filtering System:** Server-side filtering by `Status` and `Priority`.
- **Live Status Toggling:** Select dropdown to instantly update the status of any ticket.
- **Dynamic Stats Board:** Real-time progress bars reflecting the overall status breakdown of your tickets.
