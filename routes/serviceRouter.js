const express = require('express');
const serviceController = require('../controllers/serviceController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Routes
router.get('/', serviceController.getAll);

router.get('/:id', serviceController.getById);

router.post('/', authMiddleware([1, 2]), serviceController.create);

router.patch('/:id', authMiddleware([1, 2]), serviceController.update);

router.delete('/:id', authMiddleware([1, 2]), serviceController.delete);

module.exports = router;