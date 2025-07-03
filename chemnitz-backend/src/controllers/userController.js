const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.getUser = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'User not authenticated' });
        }

        // Load full user from DB (you may have just partial data in req.user)
        const user = await User.findOne({ email: req.user.email }, "-password -googleToken");
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Return all relevant fields (including favorites)
        res.json({

            name: user.name,
            email: user.email,
            favorites: user.favorites
        });

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




exports.updateUserProfile = async (req, res) => {
  try {
    if (!req.user || !req.user.email) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const { name, password } = req.body;
    const updateFields = {};

    if (typeof name === 'string' && name.trim()) {
      updateFields.name = name.trim();
    }
    if (typeof password === 'string' && password.trim()) {
      // Uncomment the next line to hash passwords (recommended!)
      // updateFields.password = await bcrypt.hash(password, 10);
      updateFields.password = password.trim(); // WARNING: for demo/testing only!
    }

    if (Object.keys(updateFields).length === 0) {
      return res.status(400).json({ message: "Nothing to update" });
    }

    // Find by email
    const user = await User.findOneAndUpdate(
      { email: req.user.email },
      { $set: updateFields },
      { new: true, projection: "-password -googleToken" }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      name: user.name,
      email: user.email,
      favorites: user.favorites,
    });
  } catch (err) {
    console.error("Error updating profile:", err);
    res.status(500).json({ message: "Failed to update profile" });
  }
};
