const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json()); // Middleware for parsing JSON


// Database connection with Mongoose 
mongoose.connect('mongodb://localhost:27017/Social_Network_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB database'))
.catch((err) => console.error('Could not connect to MongoDB', err));

// Routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/thoughts', require('./routes/thoughtRoutes'));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

