const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Adjust path if needed
const bcrypt = require('bcrypt');

// SIGN UP Route
router.post('/signup', async (req, res) => {
  console.log("POST /signup triggered");

  const { name, email, password } = req.body;

  try {
    // Check if user already exists by email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send('User with this email already exists.');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword
    });

    await newUser.save();
    console.log(`✅ New user registered: ${email}`);

    // Optional: Auto-login after signup
    req.session.user = { name: newUser.name, email: newUser.email };

    // Redirect to homepage or login page
    res.redirect('/signin.html'); 
  } catch (err) {
    console.error("❌ Error during signup:", err);
    res.status(500).send('Server error during signup.');
  }
});

// SIGN IN Route
router.post('/signin', async (req, res) => {
  console.log("POST /signin triggered");

  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send('Invalid email or password.');
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send('Invalid email or password.');
    }

    // Set session
    req.session.user = { name: user.name, email: user.email };
    console.log(`✅ ${email} signed in successfully`);

    // Redirect to homepage
    res.redirect('/main.html');
  } catch (err) {
    console.error("❌ Error during signin:", err);
    res.status(500).send('Server error during signin.');
  }
});

module.exports = router;
