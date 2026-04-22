const bcrypt = require('bcryptjs');
const { User, sequelize } = require('./models');

const seedAdmin = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    
    // Check if admin already exists
    const adminExists = await User.findOne({ where: { email: 'admin@autocare.com' } });
    
    if (!adminExists) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('admin123', salt);
      
      await User.create({
        first_name: 'System',
        last_name: 'Admin',
        email: 'admin@autocare.com',
        phone: '555-000-0000',
        password_hash: hashedPassword,
        role: 'Admin'
      });
      console.log('Admin user seeded successfully. Email: admin@autocare.com, Password: admin123');
    } else {
      console.log('Admin user already exists.');
    }
    
    process.exit(0);
  } catch (error) {
    console.error('Unable to connect to the database or seed:', error);
    process.exit(1);
  }
};

seedAdmin();
