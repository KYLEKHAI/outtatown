// server.js

const express = require("express");
const cors = require("cors");
const pool = require("./db_khai");

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get("/hotel_rooms", async (req, res) => {
  try {
    const query = 'SELECT * FROM "Outtatown Web App"."Hotel_Room"';
    const { rows } = await pool.query(query);
    res.json(rows);
  } catch (error) {
    console.error("Error fetching hotel rooms:", error);
    res.status(500).json({ error: "Failed to fetch hotel rooms" });
  }
});

app.listen(port, () => console.log(`Server running on port ${port}`));
