const { Booking, Service, Vehicle } = require('../models');

exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.findAll({
      where: { user_id: req.user.user_id },
      include: [
        { model: Service, as: 'service' },
        { model: Vehicle, as: 'vehicle' }
      ],
      order: [['booking_date', 'DESC'], ['booking_time', 'DESC']]
    });
    res.json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching bookings' });
  }
};

exports.createBooking = async (req, res) => {
  try {
    const { service_ids, total_price, ...restData } = req.body;
    
    if (service_ids && Array.isArray(service_ids)) {
      // Create multiple bookings if multiple services selected
      // We divide the total price roughly, or just rely on the frontend's calculation per booking if needed
      // Actually, since the frontend sends total_price for the whole order, we should fetch individual service prices or let frontend send an array of objects.
      // To keep it simple, we'll fetch the services to get their prices.
      const services = await Service.findAll({ where: { service_id: service_ids } });
      
      const bookingsToCreate = services.map(service => ({
        ...restData,
        service_id: service.service_id,
        user_id: req.user.user_id,
        status: 'Confirmed',
        total_price: service.base_price
      }));
      
      const newBookings = await Booking.bulkCreate(bookingsToCreate);
      res.status(201).json(newBookings);
    } else {
      // Fallback for single service
      const bookingData = { ...req.body, user_id: req.user.user_id, status: 'Confirmed' };
      const newBooking = await Booking.create(bookingData);
      res.status(201).json([newBooking]); // return array to be consistent
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating booking' });
  }
};
