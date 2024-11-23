const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const notesRoute = require('./routes/notesRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes 
app.use('/notes', notesRoute);

// Database Connection
mongoose
  .connect('mongodb://localhost:27017/notes-manager', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    connectTimeoutMS: 30000,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

  mongoose.connection.on('connected', () => {
    console.log('MongoDB connected successfully');
  });
  
  // Connection error 
  mongoose.connection.on('error', (err) => {
    console.error(`MongoDB connection error: ${err.message}`);
  }); 

// Start Server
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
