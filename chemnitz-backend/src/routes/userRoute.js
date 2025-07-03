const express = require('express');
const userRoute = express.Router();
const { getUser } = require('../controllers/userController');

const {
    addFavorite,
    removeFavorite,
    getFavorites
} = require('../controllers/favoriteController');

const {
  addReview,
  getReviews,
  deleteReview
} = require('../controllers/reviewController');


const { authenticateJWT } = require('../middleware/authMiddleware');

const { updateUserProfile } = require('../controllers/userController');


userRoute.get('/getUser', authenticateJWT, getUser);


userRoute.post('/favorites', authenticateJWT, addFavorite);                  
userRoute.delete('/favorites/:featureId', authenticateJWT, removeFavorite);  
userRoute.get('/favorites', authenticateJWT, getFavorites);


userRoute.post('/reviews/:featureId', authenticateJWT, addReview);
userRoute.get('/reviews/:featureId', getReviews);
//todo delete, review needs an id
userRoute.delete('/reviews/:featureId', authenticateJWT, deleteReview);


userRoute.patch('/profile', authenticateJWT, updateUserProfile);


module.exports = userRoute;
