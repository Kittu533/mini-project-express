const { sequelize } = require('../models');
const fs = require('fs');
const path = require('path');

async function seed() {
  try {
    // Ambil semua file seeder
    const seedersPath = path.join(__dirname, '../seeders');
    const seederFiles = fs.readdirSync(seedersPath).filter(file => file.endsWith('.js'));
    
    // Urutkan file seeder berdasarkan nama
    seederFiles.sort();
    
    // Impor dan jalankan setiap seeder
    for (const file of seederFiles) {
      const seeder = require(path.join(seedersPath, file));
      console.log(`Running seeder: ${file}`);
      await seeder.up(sequelize.getQueryInterface(), sequelize.constructor);
    }
    
    console.log('All seeders have been executed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error running seeders:', error);
    process.exit(1);
  }
}

seed();