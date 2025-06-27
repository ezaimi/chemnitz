const express = require('express');
const userRoute = express.Router();
const {getUser} = require('../controllers/userController');

const {authenticateJWT} = require('../middleware/authMiddleware');

userRoute.get('/getUser', authenticateJWT, getUser);

module.exports = userRoute;
