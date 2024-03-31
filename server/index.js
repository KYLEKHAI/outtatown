// Import required modules
const express = require('express');
const router = express.Router();
const pool = require('./db'); 
const app = express();

// Listen to port
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

//route to retrive all customers
app.get("/get-all-customers", async (req, res) => {
  try {
    const query = 'SELECT * FROM "Outtatown Web App"."Customer"';
    const { rows } = await pool.query(query);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'No customers found' });
    }

    res.json(rows); // Return all rows as JSON response
  } catch (error) {
    console.error('Error retrieving customers:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//route to retrieve a single customer
app.get("/get-customer/:customerId", async (req, res) => {
  try {
    const customerId = req.params.customerId;

    const query = 'SELECT * FROM "Outtatown Web App"."Customer" WHERE "CustomerID" = $1';
    const { rows } = await pool.query(query, [customerId]);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    res.json(rows[0]); 
  } catch (error) {
    console.error('Error retrieving customer:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to return all hotels based on rating
app.get("/hotels-by-rating/:rating", async (req, res) => {
  try {
    const rating = req.params.rating;
    const query = 'SELECT * FROM "Outtatown Web App"."Hotel" WHERE "Rating" = $1 ORDER BY "HotelID" ASC';
    const { rows } = await pool.query(query, [rating]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Hotels not found for the given rating' });
    }
    res.json(rows);
  } catch (error) {
    console.error('Error retrieving hotels by rating:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//returns hotels based on city or province
app.get("/hotels-by-location/:location", async (req, res) => {
  try {
    const location = req.params.location;
    const partialLocation = `%${location}%`;
    const query = `
      SELECT * 
      FROM "Outtatown Web App"."Hotel" 
      WHERE LOWER("City") LIKE LOWER($1) OR LOWER("Province") LIKE LOWER($1)
    `;
    const { rows } = await pool.query(query, [partialLocation]);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Hotels not found for the given location' });
    }

    res.json(rows);
  } catch (error) {
    console.error('Error retrieving hotels by location:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// Return all hotels based on partial hotel name
app.get('/hotels-by-name/:partialName', async (req, res) => {
  try {
    const partialName = req.params.partialName;

    const query = `SELECT * FROM "Outtatown Web App"."Hotel" WHERE "Name" LIKE '%${partialName}%'`;
    const { rows } = await pool.query(query);

    res.json(rows);
  } catch (error) {
    console.error('Error retrieving hotels by partial name:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//return all hotels based on the hotel chain name
app.get("/hotels-by-chain/:chainName", async (req, res) => {
  try {
    const chainName = req.params.chainName;
    const partialChainName = `%${chainName}%`; 

    const query = `
      SELECT h.*
      FROM "Outtatown Web App"."Hotel" h
      JOIN "Outtatown Web App"."HotelChain" hc ON h."ChainID" = hc."ChainID"
      WHERE LOWER(hc."Name") LIKE LOWER($1)
      ORDER BY "HotelID" ASC
    `;

    const { rows } = await pool.query(query, [partialChainName]);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Hotels not found for the given chain name' });
    }

    res.json(rows);
  } catch (error) {
    console.error('Error retrieving hotels by chain name:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route for retrieving hotels with room prices lower than or equal to a specified maximum price
router.get("/hotels-by-max-price/:maxPrice", async (req, res) => {
  try {
    const { maxPrice } = req.params;
    const query = `
      SELECT * 
      FROM "Outtatown Web App"."Hotel" 
      WHERE "Price" <= $1
      ORDER BY "Price" ASC
    `;
    const { rows } = await pool.query(query, [maxPrice]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Hotels not found for the given maximum price' });
    }
    res.json(rows);
  } catch (error) {
    console.error('Error retrieving hotels by maximum price:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route for retrieving hotels with room prices higher than or equal to a specified minimum price
router.get("/hotels-by-min-price/:minPrice", async (req, res) => {
  try {
    const { minPrice } = req.params;
    const query = `
      SELECT * 
      FROM "Outtatown Web App"."Hotel" 
      WHERE "Price" >= $1
      ORDER BY "Price" ASC
    `;
    const { rows } = await pool.query(query, [minPrice]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Hotels not found for the given minimum price' });
    }
    res.json(rows);
  } catch (error) {
    console.error('Error retrieving hotels by minimum price:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route for retrieving hotels with room prices within a specified price range
router.get("/hotels-by-price-range/:minPrice/:maxPrice", async (req, res) => {
  try {
    const { minPrice, maxPrice } = req.params;
    const query = `
      SELECT * 
      FROM "Outtatown Web App"."Hotel" 
      WHERE "Price" >= $1 AND "Price" <= $2
      ORDER BY "Price" ASC
    `;
    const { rows } = await pool.query(query, [minPrice, maxPrice]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Hotels not found for the given price range' });
    }
    res.json(rows);
  } catch (error) {
    console.error('Error retrieving hotels by price range:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;


/* Route to handle sign-up requests
router.post('/signup', async (req, res) => {
  const {
    firstName,
    lastName,
    sinNumber,
    registrationDate,
    city,
    province,
    streetName,
    houseNumber,
    postalCode,
  } = req.body;

  try {
    // Insert user data into the database
    const newUser = await pool.query(
      'INSERT INTO "Outtatown Web App"."Customer" ("FirstName", "LastName", "CustomerID", "RegistrationDate", "City", "Province", "StreetName", "Number", "PostalCode") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
      [firstName, lastName, sinNumber, registrationDate, city, province, streetName, houseNumber, postalCode]
    );

    // Respond with the newly created user
    res.json(newUser.rows[0]);
    console.log("THIS WORKED!")
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Server Error');
  }
});*/

//THIS IS TO BE CHANGED WHEN POSTGRESQL IS IMPLEMENTED AND CONNECTED AS PORT
/* 
// Record libraries
const express = require("express");

// Create an express app and run it
const app = express();

const router = express.Router();

const cors = require("cors");

const pool = require("./db");

// middleware
app.use(cors());

// Gives access to the request body and get json data
app.use(express.json());

ROUTES (CRUD)

//create a todo
app.post("/todos", async (req, res) => {
  try{
    const {description} = req.body;
    const newTodo = await pool.query("INSERT INTO todo (description) VALUES($1) RETURNING *", [description]);
    res.json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//get all todos
app.get("/todos", async (req, res) => {
  try{
    const allTodos = await pool.query("SELECT * FROM todo");
    res.json(allTodos.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//get a todo
app.get("/todos/:id", async (req, res) => {
  try{
    const { id } = req.params;
    const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [id]);
    res.json(todo.rows[0]); // changed from newTodo to todo
  } catch (err) {
    console.error(err.message);
  }
});

//update a todo
app.put("/todos/:id", async (req, res) => {
  try{
    const { id } = req.params;
    const { description } = req.body;
    const updateTodo = await pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2", [description, id]);
    res.json("Todo was updated");
  } catch (err) {
    console.error(err.message);
  }
});

//delete a todo
app.delete("/todos/:id", async (req, res) => { // corrected the HTTP method to DELETE
  try{
    const { id } = req.params;
    const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [id]); // corrected the SQL query
    res.json("Todo was deleted");
  } catch (err) {
    console.error(err.message);
  }
});*/
