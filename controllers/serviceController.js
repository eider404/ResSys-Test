const { Service, Organizer } = require('../models');
const { Op } = require("sequelize");

const validateSlug = async (slug, ServiceModel) => {
  const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  
  if (!slugRegex.test(slug)) {
    throw new Error('El slug tiene un formato inválido. Solo puede contener letras minúsculas, números y guiones.');
  }

  const existingService = await ServiceModel.findOne({ where: { slug } });
  if (existingService) {
    throw new Error('El slug ya existe en la base de datos. Por favor, elige uno diferente.');
  }

  return true; 
};

class ServiceController {
  // Get all services
  static async getAll(req, res) {
    try {
      const { page = 1, limit = process.env.DEFAULT_PAGINATE, status, name, category } = req.query;
      const offset = (page - 1) * limit;

      const nameFilter = name ? { nameService: { [Op.like]: `%${name}%` } } : {};
      const where = { ...nameFilter, ...(status ? { status } : {}), ...(category ? { categoryId:category } : {}) };

      const currentDate = new Date();

      const service = await Service.findAndCountAll({
        where,
        limit: parseInt(limit),
        offset: parseInt(offset),
        include: [
          {
            model: Organizer,
            as: "Organizer",
            where: {
              endMembership: {
                [Op.gte]: currentDate, // Verifica que endMembership no sea menor a la fecha actual
              },
            },
            required: true, // Solo servicios con un organizador que cumpla la condición
          },
        ],
      });

      return res.status(200).json({
        total: service.count,
        pages: Math.ceil(service.count / limit),
        data: service.rows,
      });

    } catch (error) {
      return res.status(500).json({ error: error.message });
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

      const newService = req.body;
      newService.organizerId = await Organizer.findOne({ where: { usersId: req.user.id } }).then((organizer) => organizer?.id);

      if (!newService.organizerId) {
        return res.status(400).json({ error: 'User is not an organizer' });
      }

      await validateSlug(newService.slug, Service);

      const service = await Service.create(newService);

      res.status(201).json(service);
    } catch (error) {
      if (error.name === 'SequelizeValidationError') {
        return res.status(400).json({ errors: error.errors.map(err => err.message) });
      }
      res.status(500).json({ error: error.message });
    }
  }

  // Update an existing service
  static async update(req, res) {
    try {
      const { id } = req.params;

      delete req.body.organizerId;

      const organizer = await Organizer.findOne({ where: { usersId: req.user.id } }).then((organizer) => organizer?.id ? organizer.id : null);

      const [updated] = await Service.update(req.body, {
        where: { id: id , organizerId: organizer }
      });

      if (!updated) {
        return res.status(404).json({ error: 'Service not found' });
      }

      const updatedService = await Service.findByPk(id);

      return res.status(200).json(updatedService);
    } catch (error) {
      if (error.name === 'SequelizeValidationError') {
        return res.status(400).json({ errors: error.errors.map(err => err.message) });
      }
      res.status(500).json({ error: error.message });
    }
  }

  // Delete a service
  static async delete(req, res) {
    try {
      const { id } = req.params;

      const organizer = await Organizer.findOne({ where: { usersId: req.user.id } }).then((organizer) => organizer?.id ? organizer.id : null);

      const deleted = await Service.destroy({
        where: { id: id, organizerId: organizer }
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

  static async getBySlug(req, res) {
    try {
      const { slug } = req.params;
      const service = await Service.findOne({ where: { slug: slug } });
      if (service) {
        res.status(200).json(service);
      } else {
        res.status(404).json({ error: 'Service not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = ServiceController;