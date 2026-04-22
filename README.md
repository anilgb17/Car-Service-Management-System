# AutoCare — Car Service Management System

A full-stack web application for booking and managing automotive services. Customers can register, add their vehicles, and book multi-service appointments through a guided wizard. Admins get a dedicated portal to manage bookings, staff, services, customers, and finances.

---

## Tech Stack

| Layer | Tech |
|---|---|
| Frontend | React 19, Vite, Tailwind CSS 4, Zustand, React Router 7 |
| Backend | Node.js, Express 5, Sequelize ORM |
| Database | SQLite3 |
| Auth | JWT + bcryptjs |
| Charts | Recharts |
| PDF | jsPDF |

---

## Features

**Customer**
- Register / Login
- Manage vehicles
- Multi-step booking wizard (service → vehicle → schedule → payment)
- View booking history

**Admin**
- Dashboard with revenue, bookings, and customer KPIs
- Manage bookings, services, staff, customers, and finances
- Update booking statuses
- Role-based access control

---

## Project Structure

```
├── backend/
│   ├── controllers/     # Route handlers
│   ├── models/          # Sequelize models (User, Vehicle, Service, Booking, Staff, Payment)
│   ├── routes/          # Express routers
│   ├── middleware/       # JWT auth & role verification
│   └── server.js
└── frontend/
    └── src/
        ├── pages/       # Customer & admin pages
        ├── components/  # Layout, guards
        └── store/       # Zustand stores
```

---

## Getting Started

### Backend

```bash
cd backend
npm install
node server.js
```

Runs on `http://localhost:5000`

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Runs on `http://localhost:5173`

---

## API Overview

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register user |
| POST | `/api/auth/login` | Login & get JWT |
| GET | `/api/vehicles` | Get user vehicles |
| POST | `/api/bookings` | Create booking |
| GET | `/api/services` | List services (public) |
| GET | `/api/admin/dashboard` | Admin metrics |

---

## Seed Data

```bash
cd backend
node seed.js        # seed services & sample data
node adminSeed.js   # seed admin user
```
