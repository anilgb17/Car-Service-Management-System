# 🚗 AutoCare - Car Service Management System

Premium car service management application with Tesla/BMW-inspired design.

---

## 🚀 Quick Start

### Option 1: PowerShell Script (Windows)
```powershell
.\setup.ps1
```

### Option 2: Manual Setup (Correct Order)
```bash
# 1. Backend - Create tables first
cd backend
rm database.sqlite  # Delete old database (if exists)
npm install
node server.js      # Wait for "Database synced", then Ctrl+C to stop

# 2. Seed data
node seed.js        # Seeds 55 services
node adminSeed.js   # Creates admin user (optional)

# 3. Start backend
node server.js      # Keep running

# 4. Frontend (new terminal)
cd frontend
npm install
npm run dev         # Keep running

# 5. Browser
# Open: http://localhost:5173
```

---

## ✅ What's Included

### 55 Services Across 8 Categories
- **Routine Maintenance** (10) - Oil change, filters, brakes, etc.
- **Major Services** (7) - Full service, timing belt, transmission, etc.
- **Repair Services** (7) - Engine, brake, clutch, AC, etc.
- **Cleaning & Detailing** (9) - Wash, wax, ceramic coating, PPF, etc.
- **Emergency Services** (6) - Roadside, towing, jump start, etc.
- **Inspection** (5) - Diagnostics, emission, safety, etc.
- **Bodywork** (4) - Denting, painting, accident repair, etc.
- **Customization** (5) - Audio, camera, GPS, lighting, etc.

### Features
- ✅ User registration & authentication
- ✅ Vehicle management (add/edit/delete)
- ✅ Service booking wizard (4 steps)
- ✅ Vehicle requirement check
- ✅ Booking history & cancellation
- ✅ Invoice download (PDF)
- ✅ Admin dashboard with metrics
- ✅ Premium Tesla/BMW design

---

## 🔐 Login

**Admin:**
```
Email: admin@autocare.com
Password: admin123
```

**Customer:** Register a new account

---

## 🛠️ Tech Stack

**Frontend:** React 18, Vite, React Router, Zustand, TailwindCSS  
**Backend:** Node.js, Express, Sequelize, SQLite, JWT  
**Charts:** Recharts | **PDF:** jsPDF | **Icons:** Lucide React

---

## 📁 Project Structure

```
autocare/
├── backend/
│   ├── controllers/      # Business logic
│   ├── models/          # Database models
│   ├── routes/          # API endpoints
│   ├── seed.js          # Seeds 55 services
│   └── server.js        # Express server
├── frontend/
│   └── src/
│       ├── pages/       # Page components
│       ├── components/  # Reusable components
│       └── store/       # State management
├── setup.ps1           # Automated setup
└── README.md           # This file
```

---

## 🐛 Troubleshooting

### "No services available"
**Fix:** Backend not running or not seeded
```bash
cd backend
rm database.sqlite
node server.js
# New terminal: node seed.js
```

### "Error deleting vehicle"
**Fix:** Backend not running
```bash
cd backend
node server.js
```

### Port 5000 in use
```powershell
netstat -ano | findstr :5000
taskkill /PID XXXX /F
```

---

## 📝 API Endpoints

- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `GET /api/services` - Get all services
- `GET /api/vehicles` - Get user vehicles
- `POST /api/vehicles` - Add vehicle
- `DELETE /api/vehicles/:id` - Delete vehicle
- `GET /api/bookings` - Get user bookings
- `POST /api/bookings` - Create booking
- `PUT /api/bookings/:id/cancel` - Cancel booking
- `GET /api/admin/dashboard` - Admin dashboard
- `GET /api/admin/bookings` - All bookings
- `PUT /api/admin/bookings/:id/status` - Update status

---

## 🎨 Design System

**Colors:**
- Background: #0B0B0D (deep black)
- Primary: #1E90FF (electric blue)
- Accent: #00E5FF (cyan glow)
- Success: #22C55E

**Features:**
- Premium cards with hover glow
- Glass morphism effects
- Smooth animations (300ms)
- Count-up number animations
- Status badges with pulse

---

## 📄 License

MIT License

---

**Made with ❤️ for AutoCare**
