const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
// const contactRoutes = require('./routes/contacts');

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cors({
  origin: ['https://your-render-service.onrender.com', 'http://localhost:3000'],
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);
// app.use('/api/contacts', contactRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Server error'
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});