const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Staff = sequelize.define('Staff', {
  staff_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  specialization: {
    type: DataTypes.STRING(100),
  },
  certification: {
    type: DataTypes.TEXT,
  },
  rating: {
    type: DataTypes.DECIMAL(2, 1),
    defaultValue: 0.0,
  },
  total_services: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  is_available: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  salary: {
    type: DataTypes.DECIMAL(10, 2),
  },
  hire_date: {
    type: DataTypes.DATEONLY,
  },
}, {
  tableName: 'staff',
  timestamps: false,
});

module.exports = Staff;
