const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { Pool } = require('pg');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://user:password@localhost:5432/cobblemon_db'
});

// Middleware
app.use(cors());
app.use(express.json());

// Test database connection
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Database connection error:', err);
  } else {
    console.log('Database connected!', res.rows);
  }
});

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running!' });
});

// Pokemon routes
app.get('/api/pokemon', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM pokemon ORDER BY id');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch Pokemon' });
  }
});

app.get('/api/pokemon/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM pokemon WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Pokemon not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch Pokemon' });
  }
});

// Players routes
app.get('/api/players', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM players ORDER BY username');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch players' });
  }
});

app.get('/api/players/:username', async (req, res) => {
  try {
    const { username } = req.params;
    const result = await pool.query('SELECT * FROM players WHERE username = $1', [username]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Player not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch player' });
  }
});

// Leaderboard routes
app.get('/api/leaderboards/caught', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT username, pokemon_caught, playtime, gym_wins 
      FROM players 
      ORDER BY pokemon_caught DESC 
      LIMIT 50
    `);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
});

app.get('/api/leaderboards/playtime', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT username, pokemon_caught, playtime, gym_wins 
      FROM players 
      ORDER BY playtime DESC 
      LIMIT 50
    `);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
});

app.get('/api/leaderboards/gym-wins', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT username, pokemon_caught, playtime, gym_wins 
      FROM players 
      ORDER BY gym_wins DESC 
      LIMIT 50
    `);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
});

// Quests routes
app.get('/api/quests', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM quests ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch quests' });
  }
});

app.get('/api/player-quests/:username', async (req, res) => {
  try {
    const { username } = req.params;
    const result = await pool.query(`
      SELECT pq.*, q.title, q.description, q.reward 
      FROM player_quests pq
      JOIN quests q ON pq.quest_id = q.id
      WHERE pq.username = $1
      ORDER BY pq.started_at DESC
    `, [username]);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch player quests' });
  }
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
