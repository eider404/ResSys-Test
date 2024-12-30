const express = require('express');
const reservationController = require('../controllers/reservationController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Create a new reservation
router.post('/', authMiddleware([1, 2]), reservationController.create);

// Get all reservations
router.get('/', authMiddleware([1, 2]), reservationController.getAll);

// Get a single reservation by ID
router.get('/:id', authMiddleware([1, 2]), reservationController.getById);

// Update a reservation by ID
router.patch('/:id', authMiddleware([1, 2]), reservationController.update);

// Delete a reservation by ID
router.delete('/:id', authMiddleware([1, 2]), reservationController.delete);

// Create a new reservation for a client
router.post('/create-by-client', authMiddleware([2, 3]), reservationController.createByClient);

module.exports = router;