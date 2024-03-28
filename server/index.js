//THIS IS TO BE CHANGED WHEN POSTGRESQL IS IMPLEMENTED AND CONNECTED AS PORT

// Record libraries
const express = require("express");

// Create an express app and run it
const app = express();

const cors = require("cors");

const pool = require("./db");

// middleware
app.use(cors());

// Gives access to the request body and get json data
app.use(express.json());

// ROUTES (CRUD)

//create a todo
app.post("/todos", async (req, res) => {
  try{
    const {description} = req.body;
    const newTodo = await pool.query("INSERT INTO todo (description) VALUES($1)", [description]);
    res.json(newTodo.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
});

//get all todos
app.get("/todos", async (req, res) => {
  try{
    const allTodos = await pool.query("SELECT * FROM todo");
    res.json(allTodos.rows);
  } catch (err) {
    console.log(err.message);
  }
});

//get a todo
app.get("/todos/:id", async (req, res) => {
  try{
    const { id } = req.params;
    const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [id]);
    res.json(newTodo.rows[0]);
  } catch (err) {
    console.log(err.message);
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
    console.log(err.message);
  }
});

//delete a todo
app.put("/todos/:id", async (req, res) => {
  try{
    const { id } = req.params;
    const deleteTodo = await pool.query("DELETE FROM todo WHERE = $1", [id]);
    res.json("Todo was deleted");
  } catch (err) {
    console.log(err.message);
  }
});

// Listen to port
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});

//RECEIVED AND INPUTS DATA IN CUSTOMER SCHEMA
router.post('/signup', async (req, res) => {
  const {
    firstName,
    lastName,
    customerID,
    registrationDate,
    city,
    province,
    number,
    streetName,
    postalCode
  } = req.body;

  try {
    const newUser = await pool.query(
      `INSERT INTO "Outtatown Web App".customer (FirstName, LastName, CustomerID, RegistrationDate, City, Province, Number, StreetName, PostalCode)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       RETURNING *`,
      [firstName, lastName, customerID, registrationDate, city, province, number, streetName, postalCode]
    );
    res.status(201).json(newUser.rows[0]);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
