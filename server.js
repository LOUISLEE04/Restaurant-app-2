const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;
const db = require('./db');

// Middleware to parse JSON bodies
app.use(express.json());

// Use CORS middleware
app.use(cors({
  origin: 'http://localhost:4200' // Update this if your Angular app runs on a different port
}));

// Welcome message
app.get('/', (req, res) => {
    res.send('Welcome to the Restaurant API!');
});

// Route to fetch all restaurants
app.get('/restaurant', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM restaurant order by table_id'); // Adjust table name as needed
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching data', err);
        res.status(500).send('Internal Server Error');
    }
});

// Route to fetch all menus with filtering, sorting, and search functionality
app.get('/menu', async (req, res) => {
    const { categories, sort, search } = req.query;
    try {
        let query = 'SELECT * FROM menu WHERE 1=1';
        let params = [];

        // Search functionality
        if (search) {
            query += ` AND name ILIKE $${params.length + 1}`;
            params.push(`%${search}%`);
        }

        // Filter by categories
        if (categories) {
            const categoryArray = categories.split(',');
            query += ` AND category = ANY($${params.length + 1}::text[])`;
            params.push(categoryArray);
        }

        // Sorting
        let sortOrder = 'ASC'; // Default sort by ascending order
        if (sort === 'desc') {
            sortOrder = 'DESC';
        }
        query += ` ORDER BY item_price ${sortOrder}`;

        console.log('Query:', query); // Log the query for debugging
        console.log('Params:', params); // Log the params for debugging

        // Executing the query
        const result = await db.query(query, params);
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching menu items:', err.message);
        res.status(500).send('Internal Server Error V3');
    }
});

// Route to fetch all tables
app.get('/res_table', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM res_table');
        res.json(result.rows);
    } catch (err) {
        console.error('Error loading database', err);
        res.status(500).send('Internal Server Error')
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
