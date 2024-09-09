// db.js
const { Client } = require('pg');

const client = new Client({
    user: 'rhlee',                 // Use the existing PostgreSQL role
    host: 'localhost',
    database: 'personal_project',  // Your database name
    password: 'yourNewPassword',      // Replace with your actual PostgreSQL password
    port: 5432,                    // Default PostgreSQL port
});

client.connect();

module.exports = client;
