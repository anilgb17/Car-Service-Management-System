const { User, Staff } = require('../models');
const bcrypt = require('bcryptjs');

exports.getStaff = async (req, res) => {
  try {
    const staffMembers = await User.findAll({
      where: {
        role: ['Mechanic', 'Service Advisor', 'Manager']
      },
      attributes: { exclude: ['password_hash'] }
    });
    res.json(staffMembers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching staff' });
  }
};

exports.addStaff = async (req, res) => {
  try {
    const { first_name, last_name, email, phone, role } = req.body;
    
    // Check if user exists
    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('password123', salt); // default password

    const newStaff = await User.create({
      first_name,
      last_name,
      email,
      phone,
      password_hash: hashedPassword,
      role
    });

    // We can also create a linked Staff profile if needed, but keeping it simple
    await Staff.create({
      user_id: newStaff.user_id,
      specialization: role === 'Mechanic' ? 'General Repair' : 'Customer Service',
      is_available: true
    });

    const staffData = newStaff.toJSON();
    delete staffData.password_hash;
    
    res.status(201).json(staffData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error adding staff' });
  }
};

exports.deleteStaff = async (req, res) => {
  try {
    const staff = await User.findByPk(req.params.id);
    if (!staff) return res.status(404).json({ message: 'Staff not found' });
    
    await Staff.destroy({ where: { user_id: staff.user_id } });
    await staff.destroy();
    
    res.json({ message: 'Staff removed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error removing staff' });
  }
};
