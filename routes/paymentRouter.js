const express = require('express');
const paymentController = require('../controllers/paymentController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Routes
router.post('/', authMiddleware([2, 3]), paymentController.create );

module.exports = router;