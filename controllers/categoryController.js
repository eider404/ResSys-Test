const { Category } = require('../models');

// Obtener todas las categorías
const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener las categorías' });
  }
};

// Crear una nueva categoría
const createCategory = async (req, res) => {
  const { categoryName } = req.body;

  try {
    const category = await Category.create({ categoryName });
    res.status(201).json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear la categoría' });
  }
};

// Obtener una categoría por su ID
const getCategoryById = async (req, res) => {
  const { id } = req.params;

  try {
    const category = await Category.findByPk(id);
    if (category) {
      res.json(category);
    } else {
      res.status(404).json({ message: 'Categoría no encontrada' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener la categoría' });
  }
};

// Actualizar una categoría por su ID
const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { categoryName } = req.body;

  try {
    const category = await Category.findByPk(id);
    if (category) {
      category.categoryName = categoryName;
      await category.save();
      res.json(category);
    } else {
      res.status(404).json({ message: 'Categoría no encontrada' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar la categoría' });
  }
};

// Eliminar una categoría por su ID
const deleteCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const category = await Category.findByPk(id);
    if (category) {
      await category.destroy();
      res.json({ message: 'Categoría eliminada correctamente' });
    } else {
      res.status(404).json({ message: 'Categoría no encontrada' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar la categoría' });
  }
};

module.exports = {
  getAllCategories,
  createCategory,
  getCategoryById,
  updateCategory,
  deleteCategory
};