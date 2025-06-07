require('dotenv').config();  // to load .env variables
const express = require('express');
const connectDB = require('./config/db');  // path to your connection file
const cors = require('cors');

// const testRoute = require('./routes/testRoute');

const authRoutes = require('./routes/authRoutes');


const app = express();
const PORT = process.env.PORT || 5000;

// Allow requests from your frontend origin
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true, // if you use cookies or auth headers
}));

// Connect to MongoDB
connectDB();

app.use(express.json());  // For parsing JSON requests

// Your routes go here...
// app.use('/api/test', testRoute);
app.use('/api/auth', authRoutes);



app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
