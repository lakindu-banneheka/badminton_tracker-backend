const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const matchRoutes = require('./routes/matchRoutes');
const authRoutes = require('./routes/authRoutes');
const os = require('os');

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

app.get('/local-ip', (req, res) => {
  console.log('test')
  const networkInterfaces = os.networkInterfaces();
  let localIpAddress = '';

  // Iterate over network interfaces to find the local IP address
  Object.keys(networkInterfaces).forEach(interfaceName => {
    const interfaces = networkInterfaces[interfaceName];
    interfaces.forEach(interfaceInfo => {
      if (interfaceInfo.family === 'IPv4' && !interfaceInfo.internal) {
        localIpAddress = interfaceInfo.address;
      }
    });
  });

  res.json({ localIpAddress });
});


// WebSocket server
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

let timer = {
  seconds: 0,
  intervalSeconds: 0,
  isIntervalActive: false
}

let score = {
  team: -1,
  value: 0
}

let matchData = {
  userId: null,
    tournament_name: '',
    date: '',
    time: '',

    match_no: '',
    match_category: '',
    age_category: '',
    game_point: 21,
    interval_point: 11,
    game_cap: 30,
    num_of_sets: 3,
    interval_time: 1,

    team1_name: '',
    team1_player1_name: '',
    team1_player2_name: '',
    team1_country: '',
    team1_club: '',

    team2_name: '',
    team2_player1_name: '',
    team2_player2_name: '',
    team2_country: '',
    team2_club: '',
    
    team_1_game_points_set_i: [0],
    team_2_game_points_set_i: [0],
    set_winner_i: [-1],
    winner: -1
}

let isMatchOnGoing = false;

wss.on('connection', function connection(ws) {

  ws.on('message', function incoming(message) {
    const data = JSON.parse(message);
    const { type, value } = data;
    if (type == 'TIMER_UPDATE') {
      wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
          timer = value;
          client.send(JSON.stringify({ type: 'TIMER_UPDATE', timer }));
        }
      });
    } else if (type == 'MATCH_UPDATE') {
      wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
          matchData = value;
          client.send(JSON.stringify({ type: 'MATCH_UPDATE',  matchData}));
        }
      });
    } else if (type == 'SCORE_UPDATE_MOBILE') {
      wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
          score = value;
          client.send(JSON.stringify({ type: 'SCORE_UPDATE_MOBILE',  score}));
        }
      });
    } else if (type == 'MATCH_STATUS') {
      wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
          isMatchOnGoing = value;
          client.send(JSON.stringify({ type: 'MATCH_STATUS',  isMatchOnGoing}));
        }
      });
    } 
    
  });
});



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
