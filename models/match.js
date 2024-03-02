// models/match.js
const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
  userId: {
    type: String,
  },
  tournament_name: {
    type: String,
    // required: true
  },
  date: {
    type: String
  },
  time: {
    type: String
  },
  match_no: {
    type: String,
    // required: true
  },
  match_category: {
    type: String
  },
  age_category: {
    type: String
  },
  game_point: {
    type: Number,
    required: true
  },
  interval_point: {
    type: Number,
    required: true
  },
  game_cap: {
    type: Number,
    required: true
  },
  num_of_sets: {
    type: Number,
    required: true
  },
  interval_time: {
    type: Number,
    required: true
  },
  team1_name: {
    type: String,
    // required: true
  },
  team1_player1_name: {
    type: String,
    required: true
  },
  team1_player2_name: {
    type: String
  },
  team1_country: {
    type: String,
    // required: true
  },
  team1_club: {
    type: String,
    // required: true
  },
  team2_name: {
    type: String,
    // required: true
  },
  team2_player1_name: {
    type: String,
    required: true
  },
  team2_player2_name: {
    type: String
  },
  team2_country: {
    type: String,
    // required: true
  },
  team2_club: {
    type: String,
    // required: true
  },
  team_1_game_points_set_i: {
    type: Array,
    required: true
  },
  team_2_game_points_set_i: {
    type: Array,
    required: true
  },
  set_winner_i: {
    type: Array,
    required: true
  },
  winner: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Match', matchSchema);