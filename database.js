'use strict';

const { Client } = require('pg');

const client = new Client({
    host: 'localhost',
    user: 'your_username',
    password: 'your_password',
    database: 'your_database',
    port: 5432,
});

client
    .connect()
    .then(() => console.log('Connected to PostgreSQL database'))
    .catch(err => console.error('Connection error', err.stack));

// Database initialization code
const initDB = async () => {
    try {
        await client.query(`CREATE TABLE IF NOT EXISTS users (\
            id SERIAL PRIMARY KEY,\
            name VARCHAR(100),\
            email VARCHAR(100) UNIQUE NOT NULL\
        );`);
        console.log('Database initialized');
    } catch (err) {
        console.error('Initialization error', err.stack);
    }
};

initDB();

module.exports = client;