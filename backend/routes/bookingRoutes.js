const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const { verifyToken } = require('../middleware/auth');

router.use(verifyToken);

router.get('/', bookingController.getBookings);
router.post('/', bookingController.createBooking);

module.exports = router;
