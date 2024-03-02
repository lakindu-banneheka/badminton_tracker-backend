const express = require('express');
const router = express.Router();
const Match = require('../models/match');

// GET matches with user ID
router.get('/get/:userId', async (req, res) => {
  const userId = req.params.userId;
  try {
    const matches = await Match.find({ userId: userId });
    if (!matches){
        res.status(404).json({ error: 'Match not found' });
    } else {
        res.status(200).json(matches);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
})

// CREATE a new match
router.post('/add', async (req, res) => {
  const match = new Match({
    userId: req.body.userId,
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
    interval_time: req.body.interval_time || 2,

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
    set_winner_i: req.body.set_winner_i || [-1],
    winner: req.body.winner || -1
  });

  console.log(match.userId);

  try {
    if(match.userId){  
      const newMatch = await match.save();
      console.log('tt')    
      res.status(201).json(newMatch);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
    console.log(err)
  }
});

// UPDATE match data
router.put('/update/:matchId', async (req, res) => {
  const matchId = req.params.matchId;

  const updateFields = {};
  if (req.body.team_1_game_points_set_i !== undefined) {
    updateFields.team_1_game_points_set_i = req.body.team_1_game_points_set_i;
  }
  if (req.body.team_2_game_points_set_i !== undefined) {
    updateFields.team_2_game_points_set_i = req.body.team_2_game_points_set_i;
  }
  if (req.body.set_winner_i !== undefined) {
    updateFields.set_winner_i = req.body.set_winner_i;
  }
  if (req.body.winner !== undefined) {
    updateFields.winner = req.body.winner;
  }

  try {
    const updatedMatch = await Match.findByIdAndUpdate(matchId, updateFields, { new: true });

    if (!updatedMatch) {
      return res.status(404).json({ error: 'Match not found' });
    }

    res.json(updatedMatch);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
