'use strict';

const express = require('express');
const { Pool } = require('pg');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000;

// PostgreSQL connection
const pool = new Pool({
    user: 'your_db_username',
    host: 'localhost',
    database: 'your_database_name',
    password: 'your_db_password',
    port: 5432,
});

// Connect to PostgreSQL database
pool.connect()
    .then(() => console.log('Connected to PostgreSQL'))
    .catch(err => console.error('Connection error', err.stack));

// Endpoint for Cobblemon API
app.get('/api/cobblemon', async (req, res) => {
    try {
        const response = await axios.get('https://api.cobblemon.com/api/some-endpoint');
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching from Cobblemon API', error);
        res.status(500).send('Error fetching data');
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
