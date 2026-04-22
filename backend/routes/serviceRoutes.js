const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController');
const { verifyToken, verifyRole } = require('../middleware/auth');

// Services are public to view
router.get('/', serviceController.getServices);

// Admin only routes for managing services
router.use(verifyToken);
router.use(verifyRole(['Admin']));

router.post('/', serviceController.createService);
router.put('/:id', serviceController.updateService);
router.delete('/:id', serviceController.deleteService);

module.exports = router;
