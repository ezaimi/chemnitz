
require('dotenv').config();  // to load .env variables
const express = require('express');
const connectDB = require('./config/db');  // path to your connection file
const cors = require('cors');
const cookieParser = require('cookie-parser');


// const testRoute = require('./routes/testRoute');

const authRoutes = require('./routes/authRoutes');
const userRoute = require('./routes/userRoute');
const featureRoute = require('./routes/featureRoute');


const app = express();
const PORT = process.env.PORT || 5000;

// Allow requests from your frontend origin
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true, 
}));

// Connect to MongoDB
connectDB();

app.use(express.json());  
app.use(cookieParser()); 


// Your routes go here...

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoute);
app.use('/api/feature', featureRoute );




app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
