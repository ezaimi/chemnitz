const mongoose = require('mongoose');
const Feature  = require('../models/AttractionModel');
const fs = require('fs/promises');
const path = require('path');

const MONGO_URI = process.env.MONGO_URI || process.env.MONGODB_URI;

async function connectDB() {
  try {
    if (!MONGO_URI) {
      console.error('Please provide the Mongo URI');
      process.exit(1);
    }

    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');

    if (mongoose.connection.db) {
      const collections = await mongoose.connection.db.listCollections({ name: 'features' }).toArray();
      if (collections.length === 0) {
        await Feature.createCollection();
        console.log('Feature collection created successfully');
        await seedFeatures();
      } else {
        console.log('Feature collection already exists');
      }
    }

  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
}

async function seedFeatures() {
  try {
    const count = await Feature.countDocuments();
    if (count > 0) {
      console.log('Features already seeded.');
      return;
    }

    const filePath = path.join(process.cwd(), 'Chemnitz.geojson');
    const fileData = await fs.readFile(filePath, 'utf-8');
    const geojson = JSON.parse(fileData);

    await Feature.create({
      type: geojson.type,
      features: geojson.features,
    });

    console.log('GeoJSON features seeded into database.');
  } catch (error) {
    console.error('Error seeding features:', error);
  }
}

// Export connectDB!
module.exports = connectDB;
