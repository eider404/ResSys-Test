const express = require('express');
const UserController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Routes
router.get('/', authMiddleware([1]), UserController.getUsers);

router.get('/:id', authMiddleware([1]), UserController.getUserById);

router.post('/', authMiddleware([1]), UserController.createUser);

router.patch('/:id', authMiddleware([1]), UserController.updateUser);

router.delete('/:id', authMiddleware([1]), UserController.deleteUser);

module.exports = router;