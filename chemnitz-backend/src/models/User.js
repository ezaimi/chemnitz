const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  role: { type: String, enum: ['user', 'admin'], default: 'user' }, 
  googleId: { type: String, unique: true },  
  googleToken: { type: String },
});

module.exports = mongoose.model('User', userSchema);
