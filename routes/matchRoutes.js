const express = require('express');
const router = express.Router();
const Match = require('../models/match');

// GET all matches
router.get('/get', async (req, res) => {
  try {
    const matches = await Match.find();
    res.json(matches);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// CREATE a new match
router.post('/add', async (req, res) => {
  const match = new Match({
    tournament_name: req.body.tournament_name,
    date: req.body.date,
    time: req.body.time, 
    match_no: req.body.match_no,
    match_category: req.body.match_category,
    age_category: req.body.age_category,
    game_point: req.body.game_point || 21,
    interval_point: req.body.interval_point || 11, 
    game_cap: req.body.game_cap || 30,
    num_of_sets: req.body.num_of_sets || 3,
    team1_name: req.body.team1_name,
    team1_player1_name: req.body.team1_player1_name,
    team1_player2_name: req.body.team1_player2_name,
    team1_country: req.body.team1_country,
    team1_club: req.body.team1_club,
    team2_name: req.body.team2_name,
    team2_player1_name: req.body.team2_player1_name,
    team2_player2_name: req.body.team2_player2_name,
    team2_country: req.body.team2_country,
    team2_club: req.body.team2_club,
    team_1_game_points_set_i: req.body.team_1_game_points_set_i || [],
    team_2_game_points_set_i: req.body.team_2_game_points_set_i || [],
    winner: req.body.winner || -1
  });

  try {
    const newMatch = await match.save();
    res.status(201).json(newMatch);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
