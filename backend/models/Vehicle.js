const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Vehicle = sequelize.define('Vehicle', {
  vehicle_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  make: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  model: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  year: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  color: {
    type: DataTypes.STRING(50),
  },
  registration_number: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  vin: {
    type: DataTypes.STRING(50),
  },
  mileage: {
    type: DataTypes.INTEGER,
  },
  fuel_type: {
    type: DataTypes.STRING(50),
  },
  transmission: {
    type: DataTypes.STRING(50),
  },
}, {
  tableName: 'vehicles',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

module.exports = Vehicle;
