================================================================================
                    AUTOCARE - QUICK START
================================================================================

IMPORTANT: Follow this EXACT order!

STEP 1: Create database tables
-------------------------------
cd backend
rm database.sqlite  (if exists)
npm install
node server.js

Wait for: "Database synced successfully."
Then press: Ctrl + C (to stop)


STEP 2: Seed data
-----------------
node seed.js
node adminSeed.js

Expected: "Services seeded successfully"


STEP 3: Start backend
---------------------
node server.js

Keep this terminal open!


STEP 4: Start frontend (NEW TERMINAL)
-------------------------------------
cd frontend
npm install
npm run dev

Keep this terminal open!


STEP 5: Open browser
--------------------
http://localhost:5173


================================================================================

Admin Login:
  Email: admin@autocare.com
  Password: admin123

Customer: Register new account

================================================================================

Features:
✅ 55 services across 8 categories
✅ Vehicle management
✅ Service booking
✅ Booking history
✅ Admin dashboard

================================================================================

Need help? Check README.md

================================================================================
