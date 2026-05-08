const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/egy-store';

// Connect to MongoDB
let mongoConnected = false;
let userController = null;

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    mongoConnected = true;
    // Load controllers only when MongoDB is connected
    userController = require('./controllers/userController');
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    console.log('Running in local storage mode');
    mongoConnected = false;
  });

// Middleware
app.use(cors({ origin: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Make io available in requests
app.use((req, res, next) => {
  req.io = io;
  next();
});

// Socket.io connection
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', mongoConnected });
});

// User routes
if (mongoConnected && userController) {
  const { auth, adminAuth } = require('./middleware/auth');
  app.post('/api/register', userController.register);
  app.post('/api/login', userController.login);
  app.get('/api/users', auth, adminAuth, userController.getUsers);
  app.get('/api/all-users', auth, userController.getUsers);
  app.get('/api/pending-count', auth, adminAuth, userController.getPendingCount);
  app.put('/api/users/:userId/approve', auth, adminAuth, userController.approveUser);
  app.put('/api/users/:userId', auth, adminAuth, userController.updateUser);
} else {
  // Local storage mode - return empty data
  app.post('/api/register', (req, res) => {
    res.json({ success: false, message: 'MongoDB not connected. Running in local mode.' });
  });
  app.post('/api/login', (req, res) => {
    res.json({ success: false, message: 'MongoDB not connected. Running in local mode.' });
  });
  app.get('/api/users', (req, res) => {
    res.json({ users: [] });
  });
  app.get('/api/all-users', (req, res) => {
    res.json({ users: [] });
  });
  app.get('/api/pending-count', (req, res) => {
    res.json({ pendingCount: 0 });
  });
  app.put('/api/users/:userId/approve', (req, res) => {
    res.json({ success: false, message: 'MongoDB not connected. Running in local mode.' });
  });
  app.put('/api/users/:userId', (req, res) => {
    res.json({ success: false, message: 'MongoDB not connected. Running in local mode.' });
  });
}

// Serve frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
