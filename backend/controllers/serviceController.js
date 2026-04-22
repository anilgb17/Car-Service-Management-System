const { Service } = require('../models');

exports.getServices = async (req, res) => {
  try {
    const services = await Service.findAll({ where: { is_active: true } });
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching services' });
  }
};

exports.createService = async (req, res) => {
  try {
    const service = await Service.create(req.body);
    res.status(201).json(service);
  } catch (error) {
    res.status(500).json({ message: 'Error creating service' });
  }
};

exports.updateService = async (req, res) => {
  try {
    const service = await Service.findByPk(req.params.id);
    if (!service) return res.status(404).json({ message: 'Service not found' });
    
    await service.update(req.body);
    res.json(service);
  } catch (error) {
    res.status(500).json({ message: 'Error updating service' });
  }
};

exports.deleteService = async (req, res) => {
  try {
    const service = await Service.findByPk(req.params.id);
    if (!service) return res.status(404).json({ message: 'Service not found' });
    
    // Instead of actual deletion, we can just mark it inactive
    service.is_active = false;
    await service.save();
    res.json({ message: 'Service removed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting service' });
  }
};
