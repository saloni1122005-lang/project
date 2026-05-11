require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const mysql = require('mysql2/promise');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Import Routes
const authRoutes = require('./routes/auth');
const tripsRoutes = require('./routes/trips');
const itineraryRoutes = require('./routes/itinerary');
const citiesRoutes = require('./routes/cities');
const activitiesRoutes = require('./routes/activities');
const budgetRoutes = require('./routes/budget');
const checklistRoutes = require('./routes/checklist');
const notesRoutes = require('./routes/notes');
const profileRoutes = require('./routes/profile');
const shareRoutes = require('./routes/share');

// Global error handler middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/trips', tripsRoutes);
app.use('/api/itinerary', itineraryRoutes);
app.use('/api/cities', citiesRoutes);
app.use('/api/activities', activitiesRoutes);
app.use('/api/budget', budgetRoutes);
app.use('/api/checklist', checklistRoutes);
app.use('/api/notes', notesRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/share', shareRoutes);

// Serve frontend
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'signup.html'));
});

app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

app.get('/trips', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'trips.html'));
});

app.get('/create-trip', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'create-trip.html'));
});

app.get('/itinerary/:tripId?', (req, res) => {
  if (!req.params.tripId) {
    return res.redirect('/trips');
  }
  res.sendFile(path.join(__dirname, 'public', 'itinerary-builder.html'));
});

app.get('/trip/:tripId', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'trip-view.html'));
});

app.get('/cities', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'cities.html'));
});

app.get('/profile', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'profile.html'));
});

app.get('/trip/:shareId/view', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'shared-trip.html'));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Traveloop server running on http://localhost:${PORT}`);
});

module.exports = app;
