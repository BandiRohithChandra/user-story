const express = require('express');
const connectDB = require('./config/db');
const sessionMiddleware = require('./config/redis'); // Import the session middleware
const authRoutes = require('./routes/authRoutes');
const errorHandler = require('./middleware/errorHandler');
const logger = require('./utils/logger');

const app = express();

require('dotenv').config();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(sessionMiddleware); // Use the session middleware
app.use(logger);

// Routes
app.use('/auth', authRoutes);

// Error Handling
app.use(errorHandler);

module.exports = app;