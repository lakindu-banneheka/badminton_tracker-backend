const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const matchRoutes = require('./routes/matchRoutes');
const authRoutes = require('./routes/authRoutes');


const app = express();
const PORT = process.env.PORT || 3001;

// Connect to MongoDB Atlas using the connection string from .env file
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/matches', matchRoutes);
app.use('/auth', authRoutes);



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
