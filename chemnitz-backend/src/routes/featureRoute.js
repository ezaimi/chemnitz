const express = require('express');
const featureRoute = express.Router();
const featureController = require('../controllers/featureController');


// Simple test route
featureRoute.get('/getAll', featureController.getAllFeatures);
featureRoute.get('/id/:featureId', featureController.getFeatureById);
featureRoute.get('/category/:field/:value', featureController.getFeaturesByCategory);
featureRoute.get('/search/:name', featureController.getFeaturesByFuzzyName);




module.exports = featureRoute;
