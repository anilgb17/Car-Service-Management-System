const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { verifyToken, verifyRole } = require('../middleware/auth');

// Protect all admin routes with Token AND Role Check
router.use(verifyToken);
router.use(verifyRole(['Admin']));

router.get('/dashboard', adminController.getDashboardMetrics);
router.get('/bookings', adminController.getAllBookings);
router.put('/bookings/:id/status', adminController.updateBookingStatus);
router.get('/customers', adminController.getAllCustomers);
router.delete('/customers/:id', adminController.deleteCustomer);

const staffController = require('../controllers/staffController');
router.get('/staff', staffController.getStaff);
router.post('/staff', staffController.addStaff);
router.delete('/staff/:id', staffController.deleteStaff);

module.exports = router;
