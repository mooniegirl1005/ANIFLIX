const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const path = require('path');
const authRoutes = require('./routes/auth');
require('dotenv').config();

const app = express();
const PORT = 3000;

 // adjust if path is different



 app.use(express.json());
 

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

// Session setup
app.use(session({
  secret: 'aniflixSecret',
  resave: false,
  saveUninitialized: true
}));
app.use('/auth', authRoutes);
// Show sign-in page first
app.get('/', (req, res) => {
  if (req.session.user) {
    res.sendFile(path.join(__dirname, 'public', 'main.html'));
  } else {
    res.redirect('/signin');
  }
});
// MongoDB Connection
mongoose.connect('mongodb://127.0.0.1:27017/aniflixdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB error:", err));
app.get('/signin', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'signin.html'));
});

app.post('/signin', (req, res) => {
  const { email, password } = req.body;

  // Dummy login check
  if (email === 'admin@gmail.com' && password === '1234') {
    req.session.user = username;
    res.redirect('/');
  } else {
    res.send('Invalid credentials <a href="/signin">Try again</a>');
  }
});

app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'signup.html'));
});

app.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/signin');
});

app.listen(PORT, () => {
    console.log("🚀 Server is running at http://localhost:" + PORT);
});