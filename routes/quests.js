const express = require('express');
const router = express.Router();

// Sample data structure for quests
let quests = [];

// Endpoint to create a new quest
router.post('/quests', (req, res) => {
    const { title, description } = req.body;
    const newQuest = { id: quests.length + 1, title, description, completed: false };
    quests.push(newQuest);
    res.status(201).json(newQuest);
});

// Endpoint to get all quests
router.get('/quests', (req, res) => {
    res.status(200).json(quests);
});

// Endpoint to update a quest status
router.patch('/quests/:id', (req, res) => {
    const { id } = req.params;
    const { completed } = req.body;
    const quest = quests.find(q => q.id === parseInt(id));
    if (!quest) return res.status(404).send('Quest not found');
    quest.completed = completed;
    res.status(200).json(quest);
});

module.exports = router;