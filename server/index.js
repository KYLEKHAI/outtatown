//THIS IS TO BE CHANGED WHEN POSTGRESSQL IS IMPLEMENTED AND CONNECTED AS PORT

// Record libraries
const express = require("express");

// Create an express app and run it
const app = express();

const cors = require("cors");

// middleware
app.use(cors());

// Gives access to the request body and get json data
app.use(express.json());

// ROUTES (CRUD)

// Listen to port
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
