const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.getUser = async (req, res) => {
    try {
        if (!req.user) {
            res.status(401).json({ message: 'User not authenticated' });
            return;
        }
        res.json({ email: req.user.email, roles: req.user.roles });

    } catch (err) {
        console.error(err);
        res.status(401).json({ message: 'Invalid or expired token' });
    }
};
