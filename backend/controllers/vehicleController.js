const { Vehicle } = require('../models');

exports.getVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.findAll({ where: { user_id: req.user.user_id } });
    res.json(vehicles);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching vehicles' });
  }
};

exports.addVehicle = async (req, res) => {
  try {
    const vehicleData = { ...req.body, user_id: req.user.user_id };
    const newVehicle = await Vehicle.create(vehicleData);
    res.status(201).json(newVehicle);
  } catch (error) {
    res.status(500).json({ message: 'Error adding vehicle' });
  }
};

exports.deleteVehicle = async (req, res) => {
  try {
    const result = await Vehicle.destroy({ 
      where: { vehicle_id: req.params.id, user_id: req.user.user_id } 
    });
    if (result) {
      res.json({ message: 'Vehicle deleted successfully' });
    } else {
      res.status(404).json({ message: 'Vehicle not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting vehicle' });
  }
};
