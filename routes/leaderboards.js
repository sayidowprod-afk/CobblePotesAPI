const express = require('express');
const router = express.Router();

// Mock data for leaderboards
const leaderboards = {
  catches: [],
  playtime: [],
  gymWins: []
};

// Endpoint for leaderboard sorted by catches
router.get('/leaderboards/catches', (req, res) => {
  res.json({ type: 'leaderboard', data: leaderboards.catches });
});

// Endpoint for leaderboard sorted by playtime
router.get('/leaderboards/playtime', (req, res) => {
  res.json({ type: 'leaderboard', data: leaderboards.playtime });
});

// Endpoint for leaderboard sorted by gym wins
router.get('/leaderboards/gymWins', (req, res) => {
  res.json({ type: 'leaderboard', data: leaderboards.gymWins });
});

module.exports = router;