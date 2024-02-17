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
    type: req.body.type,
    category: req.body.category,
    winning_score: req.body.winning_score || 21, 
    player1_name: req.body.player1_name,
    player1_country: req.body.player1_country,
    player2_name: req.body.player2_name,
    player2_country: req.body.player2_country,
    player1_score: req.body.player1_score || 0, 
    player2_score: req.body.player2_score || 0,
    winner: req.body.winner || '' 
  });

  try {
    const newMatch = await match.save();
    res.status(201).json(newMatch);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
