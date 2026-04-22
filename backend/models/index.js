const sequelize = require('../config/database');
const User = require('./User');
const Vehicle = require('./Vehicle');
const Service = require('./Service');
const Booking = require('./Booking');
const Staff = require('./Staff');
const Payment = require('./Payment');

// Associations

// User -> Vehicles (1:N)
User.hasMany(Vehicle, { foreignKey: 'user_id', as: 'vehicles' });
Vehicle.belongsTo(User, { foreignKey: 'user_id', as: 'owner' });

// User -> Bookings (1:N)
User.hasMany(Booking, { foreignKey: 'user_id', as: 'bookings' });
Booking.belongsTo(User, { foreignKey: 'user_id', as: 'customer' });

// Vehicle -> Bookings (1:N)
Vehicle.hasMany(Booking, { foreignKey: 'vehicle_id', as: 'bookings' });
Booking.belongsTo(Vehicle, { foreignKey: 'vehicle_id', as: 'vehicle' });

// Service -> Bookings (1:N)
Service.hasMany(Booking, { foreignKey: 'service_id', as: 'bookings' });
Booking.belongsTo(Service, { foreignKey: 'service_id', as: 'service' });

// Staff -> Bookings (1:N) - Assigned Technician
Staff.hasMany(Booking, { foreignKey: 'assigned_technician', as: 'assigned_bookings' });
Booking.belongsTo(Staff, { foreignKey: 'assigned_technician', as: 'technician' });

// User -> Staff (1:1) - A user can be a staff member
User.hasOne(Staff, { foreignKey: 'user_id', as: 'staff_profile' });
Staff.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

// Booking -> Payment (1:1 or 1:N depending on implementation, let's assume 1:N for multiple payment attempts)
Booking.hasMany(Payment, { foreignKey: 'booking_id', as: 'payments' });
Payment.belongsTo(Booking, { foreignKey: 'booking_id', as: 'booking' });

// User -> Payment (1:N)
User.hasMany(Payment, { foreignKey: 'user_id', as: 'payments' });
Payment.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

module.exports = {
  sequelize,
  User,
  Vehicle,
  Service,
  Booking,
  Staff,
  Payment,
};
