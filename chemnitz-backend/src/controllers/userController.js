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

exports.getAllUsers = async (req, res) => {
    try {
        // Optional: Check if current user is admin
        // if (req.user.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });

        const users = await User.find({}, "-password -googleToken"); // Exclude sensitive fields!
        res.json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to get users' });
    }
};

