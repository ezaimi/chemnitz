const express = require('express');
const { signup, login, logout } = require('../controllers/authController');
const router = express.Router();
const {googleAuthRedirect, googleAuthCallback} = require('../controllers/authGoogleController');

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);

router.get('/google', googleAuthRedirect);  // Redirect to Google
router.get('/google/callback', googleAuthCallback); 


module.exports = router;
