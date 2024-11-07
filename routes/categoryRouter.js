const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController.js');
const authMiddleware = require('../middlewares/authMiddleware');

//get all
router.get('/', categoryController.getAllCategories);

//get by id
router.get('/:id', categoryController.getCategoryById);

//create
router.post('/', authMiddleware([1]), categoryController.createCategory);

//update
router.patch('/:id', authMiddleware([1]), categoryController.updateCategory);

//delete
router.delete('/:id', authMiddleware([1]), categoryController.deleteCategory);

module.exports = router;