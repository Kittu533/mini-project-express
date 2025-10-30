const { sequelize } = require('../models');
const fs = require('fs');
const path = require('path');

async function migrate() {
  try {
    // Ambil semua file migrasi
    const migrationsPath = path.join(__dirname, '../migrations');
    const migrationFiles = fs.readdirSync(migrationsPath).filter(file => file.endsWith('.js'));
    
    // Urutkan file migrasi berdasarkan nama
    migrationFiles.sort();
    
    // Impor dan jalankan setiap migrasi
    for (const file of migrationFiles) {
      const migration = require(path.join(migrationsPath, file));
      console.log(`Running migration: ${file}`);
      await migration.up(sequelize.getQueryInterface(), sequelize.constructor);
    }
    
    console.log('All migrations have been executed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error running migrations:', error);
    process.exit(1);
  }
}

migrate();