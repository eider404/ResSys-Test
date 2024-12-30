const { Reservation, Schedule, ReserveTable } = require('../models');
const sequelize = require('../models/index');

class ReservationController {
  static async create(req, res) {
    try {
      const reservation = await Reservation.create(req.body);
      res.status(201).json(reservation);
    } catch (error) {
      if (error.name === 'SequelizeValidationError') {
        return res.status(400).json({ errors: error.errors.map(err => err.message) });
      }
      res.status(400).json({ error: error.message });
    }
  }

  static async getAll(req, res) {
    try {
      const reservations = await Reservation.findAll();
      res.status(200).json(reservations);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async getById(req, res) {
    try {
      const reservation = await Reservation.findByPk(req.params.id);
      if (reservation) {
        res.status(200).json(reservation);
      } else {
        res.status(404).json({ error: 'Reservation not found' });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async update(req, res) {
    try {
      const [updated] = await Reservation.update(req.body, {
        where: { id: req.params.id }
      });
      if (updated) {
        const updatedReservation = await Reservation.findByPk(req.params.id);
        res.status(200).json(updatedReservation);
      } else {
        res.status(404).json({ error: 'Reservation not found' });
      }
    } catch (error) {
      if (error.name === 'SequelizeValidationError') {
        return res.status(400).json({ errors: error.errors.map(err => err.message) });
      }
      res.status(400).json({ error: error.message });
    }
  }

  static async delete(req, res) {
    try {
      const deleted = await Reservation.destroy({
        where: { id: req.params.id }
      });
      if (deleted) {
        res.status(204).json();
      } else {
        res.status(404).json({ error: 'Reservation not found' });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async createByClient(req, res) {
    const transaction = await sequelize.transaction();

    try {

      const newService = req.body;
      newService.userClient = req.user.id;
      newService.folio = `${newService.serviceId}-${req.user.id}-${Date.now()}`
      

      const reservation = await Reservation.create(newService);

      const schedule = await Schedule.create(newService.schedule);

      let reserveTable = {};
      if(newService.hasTable){
        reserveTable = await ReserveTable.create(newService.reserveTable);
      }

      await transaction.commit();

      res.status(201).json({...reservation, ...schedule, ...reserveTable});

    } catch (error) {
      await transaction.rollback();

      if (error.name === 'SequelizeValidationError') {
        return res.status(400).json({ errors: error.errors.map(err => err.message) });
      }
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = ReservationController;