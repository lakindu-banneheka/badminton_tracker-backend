const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();
const matchRoutes = require('./routes/matchRoutes');

const app = express();
const PORT = process.env.PORT || 3001;

// Connect to MongoDB Atlas using the connection string from .env file
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Middleware
app.use(bodyParser.json());
app.use('/matches', matchRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
