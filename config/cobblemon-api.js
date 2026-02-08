'use strict';

const axios = require('axios');

// Configuration for Cobblemon Legacy API
const API_URL = 'https://api.cobblemon.com/v1'; // Base URL for Cobblemon API
const API_KEY = process.env.COBBLEMON_API_KEY; // API Key from environment variables

// Function to connect to the Cobblemon API
const connectToCobblemonAPI = () => {
    const instance = axios.create({
        baseURL: API_URL,
        headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json',
        },
    });

    return instance;
};

// Utility function to fetch data from the Cobblemon API
const fetchData = async (endpoint) => {
    const api = connectToCobblemonAPI();
    try {
        const response = await api.get(endpoint);
        return response.data;
    } catch (error) {
        console.error('Error fetching data from Cobblemon API:', error);
        throw error;
    }
};

module.exports = {
    connectToCobblemonAPI,
    fetchData,
};
