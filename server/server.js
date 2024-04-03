// Backend routes to connect frontend and database

const express = require("express");
const cors = require("cors");
const { Client } = require("pg");

const app = express();
const port = process.env.PORT || 3001;

// Database connection configuration
const client = new Client({
  user: "postgres",
  password: "outtatown_khai_pass",
  host: "localhost",
  port: 5432,
  database: "outtatown_khai",
});

// Connect to the database
client
  .connect()
  .then(() => console.log("Connected to the database"))
  .catch((error) => console.error("Error connecting to the database:", error));

app.use(cors());
app.use(express.json());

// Define route to fetch hotel rooms
app.get("/hotel_rooms", async (req, res) => {
  try {
    const query = 'SELECT * FROM "Outtatown Web App"."Hotel_Room"';
    const result = await client.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching hotel rooms:", error);
    res.status(500).json({ error: "Failed to fetch hotel rooms" });
  }
});

// Define route to fetch data from the available_rooms_per_city view
app.get("/available_rooms_per_city", async (req, res) => {
  try {
    const query = 'SELECT * FROM "Outtatown Web App".available_rooms_per_city';
    const result = await client.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching data from available_rooms_per_city:", error);
    res
      .status(500)
      .json({ error: "Failed to fetch data from available_rooms_per_city" });
  }
});

// Define route to fetch data from the capacity_per_hotel view
app.get("/capacity_per_hotel", async (req, res) => {
  try {
    const query = `
      SELECT hr."HotelID",
        h."Name" AS "HotelName",
        sum(
          CASE hr."RoomCapacity"
              WHEN 'Single'::text THEN 2
              WHEN 'Double'::text THEN 4
              ELSE 0
          END)::integer AS "TotalCapacity"
      FROM "Outtatown Web App"."Hotel_Room" hr
      JOIN "Outtatown Web App"."Hotel" h ON hr."HotelID" = h."HotelID"
      GROUP BY hr."HotelID", h."Name"
      ORDER BY hr."HotelID";
    `;
    const result = await client.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching data from capacity_per_hotel:", error);
    res
      .status(500)
      .json({ error: "Failed to fetch data from capacity_per_hotel" });
  }
});

// Define route to fetch hotels based on city
app.get("/hotels", async (req, res) => {
  try {
    const city = req.query.city;
    const query = `SELECT * FROM "Outtatown Web App"."Hotel" WHERE "City" = $1`;
    const result = await client.query(query, [city]);
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching hotels by city:", error);
    res.status(500).json({ error: "Failed to fetch hotels by city" });
  }
});

// Define route to fetch hotel rooms based on HotelID
app.get("/hotel_rooms/:hotelId", async (req, res) => {
  try {
    const hotelId = req.params.hotelId;
    const query =
      'SELECT * FROM "Outtatown Web App"."Hotel_Room" WHERE "HotelID" = $1';
    const result = await client.query(query, [hotelId]);
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching hotel rooms by hotel ID:", error);
    res.status(500).json({ error: "Failed to fetch hotel rooms by hotel ID" });
  }
});

// Start the Express server
app.listen(port, () => console.log(`Server running on port ${port}`));
