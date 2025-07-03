const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const authRoutes = require('./routes/auth'); // Adjust the path if needed
require('dotenv').config();

const app = express(); // ✅ Make sure this comes BEFORE app.use

const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: true })); // To parse form data
app.use(express.static(path.join(__dirname, 'public'))); // ✅ Serve public folder

// Database Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Routes
app.use('/auth', authRoutes); // ✅ Use after app is defined

// Start the Server
app.listen(PORT, () => {
    console.log("🚀 Server is running at http://localhost:" + PORT);});