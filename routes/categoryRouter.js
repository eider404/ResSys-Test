const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController.js');

//get all
router.get('/', categoryController.getAllCategories);

//get by id
router.get('/:id', categoryController.getCategoryById);

//create
router.post('/', categoryController.createCategory);

//update
router.patch('/:id', categoryController.updateCategory);

//delete
router.delete('/:id', categoryController.deleteCategory);

module.exports = router;