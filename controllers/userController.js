const { User } = require('../models');
const bcrypt = require('./../node_modules/bcryptjs');

class UserController {
  // Create a new user
  static async createUser(req, res) {
    try {
      let { name, email, password, roleId, status } = req.body;

      if (!name || !email || !password || !roleId || !status) {
        return res.status(400).json({ error: 'All fields are required' });
      }

      password = await bcrypt.hash(password, 10);

      const newUser = await User.create({ name, email, password, roleId, status });
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Get users with pagination and filter by status
  static async getUsers(req, res) {
    try {
      const { page = 1, limit = 10, status } = req.query;
      const offset = (page - 1) * limit;
      const where = status ? { status } : {};

      const users = await User.findAndCountAll({
        where,
        limit: parseInt(limit),
        offset: parseInt(offset),
      });

      res.status(200).json({
        total: users.count,
        pages: Math.ceil(users.count / limit),
        data: users.rows,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Get a single user by ID
  static async getUserById(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Update a user by ID
  static async updateUser(req, res) {
    try {
      const { id } = req.params;
      const updates = req.body;
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      await user.update(updates);
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Delete a user by ID
  static async deleteUser(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      await user.destroy();
      res.status(204).json();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = UserController;