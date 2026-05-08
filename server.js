const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
require('dotenv').config();

const { auth, adminAuth } = require('./middleware/auth');
const userController = require('./controllers/userController');

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
mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

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
  res.json({ status: 'ok' });
});

// User routes
app.post('/api/register', userController.register);
app.post('/api/login', userController.login);
app.get('/api/users', auth, adminAuth, userController.getUsers);
app.get('/api/all-users', auth, userController.getUsers); // For frontend to load users
app.get('/api/pending-count', auth, adminAuth, userController.getPendingCount);
app.put('/api/users/:userId/approve', auth, adminAuth, userController.approveUser);
app.put('/api/users/:userId', auth, adminAuth, userController.updateUser);

// Serve frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Start server
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.listen(PORT, () => {
  console.log(`EGY STORE auth server running on port ${PORT}`);
});
