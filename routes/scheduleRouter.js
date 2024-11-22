const express = require('express');
const scheduleController = require('../controllers/scheduleController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Create a new schedule
router.post('/', authMiddleware([2, 3]), scheduleController.create);

// Get all schedules
router.get('/', authMiddleware([2, 3]), scheduleController.getAll);

// Get a single schedule by ID
router.get('/:id', authMiddleware([2, 3]), scheduleController.getById);

// Update a schedule by ID
router.patch('/:id', authMiddleware([2, 3]), scheduleController.update);

// Delete a schedule by ID
router.delete('/:id', authMiddleware([2, 3]), scheduleController.delete);

router.get('/get-schedule-reserved-by-service/:serviceId', scheduleController.getScheduleReservedByService);

module.exports = router;