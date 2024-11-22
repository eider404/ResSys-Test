const { Schedule } = require('../models');

class ScheduleController {
  static async create(req, res) {
    try {
      const schedule = await Schedule.create(req.body);
      res.status(201).json(schedule);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async getAll(req, res) {
    try {
      const schedules = await Schedule.findAll();
      res.status(200).json(schedules);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async getById(req, res) {
    try {
      const schedule = await Schedule.findByPk(req.params.id);
      if (schedule) {
        res.status(200).json(schedule);
      } else {
        res.status(404).json({ error: 'Schedule not found' });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async update(req, res) {
    try {
      const [updated] = await Schedule.update(req.body, {
        where: { id: req.params.id }
      });
      if (updated) {
        const updatedSchedule = await Schedule.findByPk(req.params.id);
        res.status(200).json(updatedSchedule);
      } else {
        res.status(404).json({ error: 'Schedule not found' });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async delete(req, res) {
    try {
      const deleted = await Schedule.destroy({
        where: { id: req.params.id }
      });
      if (deleted) {
        res.status(204).send();
      } else {
        res.status(404).json({ error: 'Schedule not found' });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async getScheduleReservedByService(req, res) {
    try {
      const { serviceId } = req.params;
      const schedules = await Schedule.findAll({
        where: { serviceId }
      });
      res.status(200).json(schedules);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = ScheduleController;