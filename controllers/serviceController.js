const { Service } = require('../models');

class ServiceController {
  // Get all services
  static async getAll(req, res) {
    try {
      const services = await Service.findAll();
      res.status(200).json(services);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Get service by ID
  static async getById(req, res) {
    try {
      const { id } = req.params;
      const service = await Service.findByPk(id);
      if (service) {
        res.status(200).json(service);
      } else {
        res.status(404).json({ error: 'Service not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Create a new service
  static async create(req, res) {
    try {
      const service = await Service.create(req.body);
      res.status(201).json(service);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Update an existing service
  static async update(req, res) {
    try {
      const { id } = req.params;
      const [updated] = await Service.update(req.body, {
        where: { id: id }
      });
      if (updated) {
        const updatedService = await Service.findByPk(id);
        res.status(200).json(updatedService);
      } else {
        res.status(404).json({ error: 'Service not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Delete a service
  static async delete(req, res) {
    try {
      const { id } = req.params;
      const deleted = await Service.destroy({
        where: { id: id }
      });
      if (deleted) {
        res.status(204).json();
      } else {
        res.status(404).json({ error: 'Service not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = ServiceController;