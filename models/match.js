// models/match.js
const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  winning_score: {
    type: Number,
    default: 21
  },
  player1_name: {
    type: String,
    required: true
  },
  player1_country: {
    type: String,
    required: true
  },
  player2_name: {
    type: String,
    required: true
  },
  player2_country: {
    type: String,
    required: true
  },
  player1_score: {
    type: Number,
    default: 0
  },
  player2_score: {
    type: Number,
    default: 0
  },
  winner: {
    type: String,
    default: ''
  }
});

module.exports = mongoose.model('Match', matchSchema);