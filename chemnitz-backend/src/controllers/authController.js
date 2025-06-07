const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET;

exports.signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

const newUser = new User({
    name,
    email,
    password: hashedPassword,
    role: role || 'user'  
  });

  await newUser.save();

    const token = jwt.sign(
      {
        email: newUser.email,
        role: newUser.role
      },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({ token });

    // res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error(err); 
    res.status(500).json({ message: 'Server error' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });


    const token = jwt.sign(
  {
    email: user.email,
    role: user.role   
  },
  process.env.JWT_SECRET,
  { expiresIn: '7d' } // ⏰ Valid for 7 days
    );



    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
