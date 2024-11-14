// app.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const nodeRoutes = require('./routes/nodeRoutes');
const authRoutes = require('./routes/authRoutes'); // Assume you have routes for auth
const edgeRoutes = require('./routes/edgeRoutes');
const app = express();

// Load environment variables from .env
require('dotenv').config();

// Middleware
app.use(express.json()); // Parse JSON requests
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(helmet()); // Enhance security
app.use(morgan('dev')); // Log HTTP requests

// Routes
app.use('/api/nodes', nodeRoutes); // Routes for node operations
app.use('/api/edges', edgeRoutes);
app.use('/api/auth', authRoutes); // Routes for authentication

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

module.exports = app;
