const { Service, sequelize } = require('./models');

const servicesToSeed = [
  // 1. Routine Maintenance Services
  { name: 'Engine Oil Change', category: 'Routine Maintenance', description: 'Premium synthetic oil change service', base_price: 49.99, duration_minutes: 30 },
  { name: 'Oil Filter Replacement', category: 'Routine Maintenance', description: 'Replace oil filter for optimal engine performance', base_price: 25.00, duration_minutes: 20 },
  { name: 'Air Filter Replacement', category: 'Routine Maintenance', description: 'Replace air filter for better fuel efficiency', base_price: 30.00, duration_minutes: 15 },
  { name: 'Cabin Air Filter Replacement', category: 'Routine Maintenance', description: 'Replace cabin air filter for clean air inside', base_price: 35.00, duration_minutes: 15 },
  { name: 'Coolant Top-up / Replacement', category: 'Routine Maintenance', description: 'Coolant system service and refill', base_price: 45.00, duration_minutes: 30 },
  { name: 'Brake Inspection', category: 'Routine Maintenance', description: 'Complete brake system inspection', base_price: 40.00, duration_minutes: 30 },
  { name: 'Battery Check', category: 'Routine Maintenance', description: 'Battery health check and terminal cleaning', base_price: 20.00, duration_minutes: 15 },
  { name: 'Tire Rotation', category: 'Routine Maintenance', description: 'Rotate tires for even wear', base_price: 35.00, duration_minutes: 30 },
  { name: 'Wheel Balancing', category: 'Routine Maintenance', description: 'Balance all four wheels', base_price: 50.00, duration_minutes: 45 },
  { name: 'Wheel Alignment', category: 'Routine Maintenance', description: 'Precision 4-wheel alignment', base_price: 89.99, duration_minutes: 60 },

  // 2. Periodic / Major Services
  { name: 'Full Car Service', category: 'Major Service', description: 'Comprehensive car service with all checks', base_price: 299.00, duration_minutes: 180 },
  { name: 'Spark Plug Replacement', category: 'Major Service', description: 'Replace spark plugs for better performance', base_price: 80.00, duration_minutes: 45 },
  { name: 'Timing Belt Replacement', category: 'Major Service', description: 'Replace timing belt to prevent engine damage', base_price: 450.00, duration_minutes: 240 },
  { name: 'Transmission Fluid Change', category: 'Major Service', description: 'Replace transmission fluid for smooth shifting', base_price: 150.00, duration_minutes: 60 },
  { name: 'Fuel System Cleaning', category: 'Major Service', description: 'Clean fuel injectors and system', base_price: 120.00, duration_minutes: 90 },
  { name: 'Suspension Check', category: 'Major Service', description: 'Complete suspension system inspection', base_price: 60.00, duration_minutes: 45 },
  { name: 'Differential Oil Change', category: 'Major Service', description: 'Replace differential oil', base_price: 100.00, duration_minutes: 45 },

  // 3. Repair Services
  { name: 'Engine Repair', category: 'Repair', description: 'Engine diagnostic and repair service', base_price: 500.00, duration_minutes: 300 },
  { name: 'Brake Repair', category: 'Repair', description: 'Brake pad and rotor replacement', base_price: 250.00, duration_minutes: 120 },
  { name: 'Clutch Repair', category: 'Repair', description: 'Clutch replacement and adjustment', base_price: 600.00, duration_minutes: 240 },
  { name: 'AC Repair & Gas Refill', category: 'Repair', description: 'AC system repair and refrigerant refill', base_price: 180.00, duration_minutes: 90 },
  { name: 'Electrical System Repair', category: 'Repair', description: 'Electrical wiring and component repair', base_price: 200.00, duration_minutes: 120 },
  { name: 'Exhaust System Repair', category: 'Repair', description: 'Exhaust pipe and muffler repair', base_price: 220.00, duration_minutes: 90 },
  { name: 'Steering System Repair', category: 'Repair', description: 'Power steering repair and service', base_price: 280.00, duration_minutes: 120 },

  // 4. Cleaning & Detailing Services
  { name: 'Basic Car Wash', category: 'Cleaning', description: 'Exterior wash and dry', base_price: 15.00, duration_minutes: 20 },
  { name: 'Foam Wash', category: 'Cleaning', description: 'Premium foam wash with wax', base_price: 25.00, duration_minutes: 30 },
  { name: 'Interior Vacuum Cleaning', category: 'Cleaning', description: 'Complete interior vacuum service', base_price: 20.00, duration_minutes: 30 },
  { name: 'Seat Shampooing', category: 'Cleaning', description: 'Deep clean all seats', base_price: 60.00, duration_minutes: 60 },
  { name: 'Dashboard Polishing', category: 'Cleaning', description: 'Dashboard and interior trim polishing', base_price: 30.00, duration_minutes: 30 },
  { name: 'Exterior Waxing', category: 'Cleaning', description: 'Premium wax coating for shine', base_price: 80.00, duration_minutes: 90 },
  { name: 'Ceramic Coating', category: 'Cleaning', description: 'Professional ceramic coating protection', base_price: 500.00, duration_minutes: 240 },
  { name: 'Paint Protection Film (PPF)', category: 'Cleaning', description: 'Clear protective film application', base_price: 1200.00, duration_minutes: 480 },
  { name: 'Headlight Restoration', category: 'Cleaning', description: 'Restore cloudy headlights', base_price: 70.00, duration_minutes: 60 },

  // 5. Emergency & Support Services
  { name: 'Roadside Assistance', category: 'Emergency', description: '24/7 roadside assistance service', base_price: 50.00, duration_minutes: 60 },
  { name: 'Towing Service', category: 'Emergency', description: 'Vehicle towing to nearest garage', base_price: 100.00, duration_minutes: 45 },
  { name: 'Jump Start Service', category: 'Emergency', description: 'Battery jump start assistance', base_price: 30.00, duration_minutes: 20 },
  { name: 'Flat Tire Assistance', category: 'Emergency', description: 'On-site tire change service', base_price: 40.00, duration_minutes: 30 },
  { name: 'Fuel Delivery Service', category: 'Emergency', description: 'Emergency fuel delivery', base_price: 35.00, duration_minutes: 30 },
  { name: 'Lockout Assistance', category: 'Emergency', description: 'Car lockout opening service', base_price: 60.00, duration_minutes: 30 },

  // 6. Inspection & Diagnostic Services
  { name: 'Computer Diagnostics (OBD Scan)', category: 'Inspection', description: 'Complete OBD diagnostic scan', base_price: 80.00, duration_minutes: 45 },
  { name: 'Pre-Purchase Inspection', category: 'Inspection', description: 'Comprehensive pre-purchase check', base_price: 150.00, duration_minutes: 90 },
  { name: 'Emission Testing', category: 'Inspection', description: 'Emission test and certification', base_price: 50.00, duration_minutes: 30 },
  { name: 'Safety Inspection', category: 'Inspection', description: 'Complete safety inspection', base_price: 60.00, duration_minutes: 45 },
  { name: 'Battery Health Check', category: 'Inspection', description: 'Battery load test and health report', base_price: 25.00, duration_minutes: 15 },

  // 7. Bodywork & Insurance Services
  { name: 'Denting & Painting', category: 'Bodywork', description: 'Dent removal and paint touch-up', base_price: 300.00, duration_minutes: 240 },
  { name: 'Scratch Removal', category: 'Bodywork', description: 'Minor scratch removal and polishing', base_price: 100.00, duration_minutes: 60 },
  { name: 'Insurance Claim Assistance', category: 'Bodywork', description: 'Help with insurance claim process', base_price: 50.00, duration_minutes: 60 },
  { name: 'Accident Repair', category: 'Bodywork', description: 'Complete accident damage repair', base_price: 1500.00, duration_minutes: 720 },

  // 8. Customization & Accessories
  { name: 'Car Accessories Installation', category: 'Customization', description: 'Install various car accessories', base_price: 80.00, duration_minutes: 60 },
  { name: 'Audio System Installation', category: 'Customization', description: 'Install premium audio system', base_price: 200.00, duration_minutes: 120 },
  { name: 'Reverse Camera Installation', category: 'Customization', description: 'Install rear view camera', base_price: 150.00, duration_minutes: 90 },
  { name: 'GPS Tracker Installation', category: 'Customization', description: 'Install GPS tracking device', base_price: 120.00, duration_minutes: 60 },
  { name: 'Lighting Upgrades', category: 'Customization', description: 'LED headlight and interior lighting', base_price: 180.00, duration_minutes: 90 },
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
