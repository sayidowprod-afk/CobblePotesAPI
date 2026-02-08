const express = require('express');
const router = express.Router();

// Mock data for player profiles
const players = [
    { id: 1, name: 'Player One', age: 25, team: 'Team A' },
    { id: 2, name: 'Player Two', age: 30, team: 'Team B' },
];

// Endpoint to get all player profiles
router.get('/profiles', (req, res) => {
    res.json(players);
});

// Endpoint to get player statistics
router.get('/statistics/:id', (req, res) => {
    const playerId = parseInt(req.params.id);
    // Mock statistics data
    const statistics = {
        1: { goals: 10, assists: 5 },
        2: { goals: 8, assists: 7 },
    };
    
    if (!players.find(player => player.id === playerId)) {
        return res.status(404).json({ error: 'Player not found' });
    }
    res.json(statistics[playerId] || {});
});

module.exports = router;