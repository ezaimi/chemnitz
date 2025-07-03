const Feature = require('../models/AttractionModel');


exports.getAllFeatures = async (req, res) => {
  try {
    const features = await Feature.find();
    res.status(200).json(features);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch features', error });
  }
};

const categoryMap = {
 museum: 'tourism',
  gallery: 'tourism',
  artwork: 'tourism',
  guest_house: 'tourism',
  hotel: 'tourism',
  restaurant: 'amenity',
  bench: 'amenity',
  theatre: 'amenity',
  clock: 'amenity',
  deli: 'shop'
};

exports.getFeaturesByCategory = async (req, res) => {
  const categoryField = req.params.field;  // e.g., 'amenity'
  const categoryValue = req.params.value;  // e.g., 'restaurant'

  try {
    const result = await Feature.aggregate([
      { $unwind: "$features" },
      {
        $match: {
          [`features.properties.${categoryField}`]: categoryValue
        }
      },
      {
        $project: {
          _id: 0,
          id: "$features.id", 
          geometry: "$features.geometry", 
          properties: "$features.properties"
        }
      }
    ]);

    //console.log("Datalength: ", result.length);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({
      message: 'Error retrieving features by category',
      error: err.message
    });
  }
};



exports.getFeatureById = async (req, res) => {
  const featureId = req.params.featureId;

  try {
    const result = await Feature.aggregate([
      { $unwind: "$features" },
      {
        $match: {
          "features.id": featureId
        }
      },
       {
        $project: {
          _id: 0,
          id: "$features.id", 
          geometry: "$features.geometry", 
          properties: "$features.properties"
        }
      }
    ]);

    console.log(result);
    if (result.length === 0) {
      return res.status(404).json({ message: `Feature with ID '${featureId}' not found` });
    }

    res.status(200).json(result[0]);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching feature by ID', error: error.message });
  }
};



const Fuse = require('fuse.js');

exports.getFeaturesByFuzzyName = async (req, res) => {
  const searchTerm = req.params.name; 
  try {
    
    const doc = await Feature.findOne({});
    const features = doc ? doc.features : []; 

   
    const fuse = new Fuse(features, {
      keys: ['properties.name'], 
      threshold: 0.4, 
      minMatchCharLength: 1, 
    });

    const result = fuse.search(searchTerm).map(item => ({
      id: item.item.id,
      name: item.item.properties.name,
    }));

    res.status(200).json(result);
  } catch (err) {
    console.error('Error searching features by name (fuzzy)', err);
    res.status(500).json({
      message: 'Error searching features by name (fuzzy)',
      error: err.message,
    });
  }
};
