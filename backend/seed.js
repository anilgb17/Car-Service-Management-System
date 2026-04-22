const { Service, sequelize } = require('./models');

const servicesToSeed = [
  { name: 'Oil Change', category: 'Maintenance', description: 'Premium synthetic oil change with filter replacement.', base_price: 49.99, duration_minutes: 45 },
  { name: 'Wheel Alignment', category: 'Tires', description: 'Precision 4-wheel alignment for improved handling.', base_price: 89.99, duration_minutes: 60 },
  { name: 'Battery Replacement', category: 'Electrical', description: 'High-performance battery installation with warranty.', base_price: 120.00, duration_minutes: 30 },
  { name: 'Engine Diagnostics', category: 'Diagnostics', description: 'Complete computer diagnostic scan and report.', base_price: 99.00, duration_minutes: 60 },
  { name: 'Tire Replacement', category: 'Tires', description: 'Mounting and balancing of 4 new tires.', base_price: 400.00, duration_minutes: 90 },
  { name: 'General Maintenance', category: 'Maintenance', description: 'Comprehensive multipoint inspection and service.', base_price: 150.00, duration_minutes: 120 },
];

const seedServices = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    
    // Check if services already exist to avoid duplicates
    const count = await Service.count();
    if (count === 0) {
      await Service.bulkCreate(servicesToSeed);
      console.log('Services seeded successfully.');
    } else {
      console.log('Services already exist. Skipping seed.');
    }
    
    process.exit(0);
  } catch (error) {
    console.error('Unable to connect to the database or seed:', error);
    process.exit(1);
  }
};

seedServices();
