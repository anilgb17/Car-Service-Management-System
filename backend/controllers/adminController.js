const { User, Booking, Service, Vehicle, sequelize } = require('../models');
const { Op } = require('sequelize');

exports.getDashboardMetrics = async (req, res) => {
  try {
    const totalCustomers = await User.count({ where: { role: 'Customer' } });
    const totalBookings = await Booking.count();
    
    const completedBookings = await Booking.findAll({ where: { status: 'Completed' } });
    const totalRevenue = completedBookings.reduce((sum, b) => sum + parseFloat(b.total_price), 0);

    // Get recent bookings
    const recentBookings = await Booking.findAll({
      limit: 5,
      order: [['created_at', 'DESC']],
      include: [
        { model: User, as: 'customer', attributes: ['first_name', 'last_name'] },
        { model: Service, as: 'service', attributes: ['name'] }
      ]
    });

    res.json({
      metrics: {
        totalCustomers,
        totalBookings,
        completedServices: completedBookings.length,
        totalRevenue: totalRevenue.toFixed(2)
      },
      recentBookings
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching dashboard metrics' });
  }
};

exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.findAll({
      include: [
        { model: User, as: 'customer', attributes: ['first_name', 'last_name', 'email', 'phone'] },
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

exports.updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const booking = await Booking.findByPk(req.params.id);
    
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    booking.status = status;
    await booking.save();
    
    res.json(booking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating booking' });
  }
};

exports.getAllCustomers = async (req, res) => {
  try {
    const customers = await User.findAll({
      where: { role: 'Customer' },
      include: [
        { model: Booking, as: 'bookings', attributes: ['booking_id'] }
      ],
      order: [['created_at', 'DESC']]
    });

    // Format data to include total bookings count
    const formattedCustomers = customers.map(c => {
      const data = c.toJSON();
      data.totalBookings = data.bookings ? data.bookings.length : 0;
      delete data.password_hash; // Don't send password hash
      return data;
    });

    res.json(formattedCustomers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching customers' });
  }
};
