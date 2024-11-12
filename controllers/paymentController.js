const { Organizer, MembershipHistory, User } = require('../models');

class PaymentController {

  static async create(req, res) {
    try {

      //iniciar el pago

      let organizer = await Organizer.findOne({ where: { usersId: req.user.id } });

      if ( organizer ) {
        if (organizer.endMembership >= new Date() ) {
          console.log("organizer aun tiene membresia");
          return res.status(400).json({ message: 'User already has a membership' });
        }

        await Organizer.update({
          status: true,
          startMembership: new Date(),
          endMembership: new Date(new Date().setDate(new Date().getDate() + 31))
        }, { where: { usersId: req.user.id } });

      } else {
        organizer = await Organizer.create({
          usersId: req.user.id,
          status: true,
          startMembership: new Date(),
          endMembership: new Date(new Date().setDate(new Date().getDate() + 31))
        });
      }

      await User.update({ roleId: 2 }, { where: { id: req.user.id } });

      await MembershipHistory.create({
        organizerId: organizer.id,
        price: 100,
      });
      
      res.status(201).json({ message: 'Payment created successfully '});
    } catch (error) {
      res.status(500).json({ message: 'Error creating payment', error });
    }
  }

}

module.exports = PaymentController;