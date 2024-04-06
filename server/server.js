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

// Define route to fetch hotel rooms based on HotelID and RoomNumber (if provided)
app.get("/hotel_rooms/:hotelId", async (req, res) => {
  try {
    const { hotelId } = req.params;
    const { roomNumber } = req.query;

    let query = `
      SELECT * 
      FROM "Outtatown Web App"."Hotel_Room" 
      WHERE "HotelID" = $1
    `;

    const params = [hotelId];

    if (roomNumber) {
      query += ` AND "RoomNumber" = $2`;
      params.push(roomNumber);
    }

    const result = await client.query(query, params);

    if (result.rows.length === 0) {
      res.status(404).json({ error: "Hotel room not found" });
    } else {
      res.json(result.rows);
    }
  } catch (error) {
    console.error("Error fetching hotel room:", error);
    res.status(500).json({ error: "Failed to fetch hotel room" });
  }
});

// Define route to get all customer information
app.get("/customers", async (req, res) => {
  try {
    const query = 'SELECT * FROM "Outtatown Web App"."Customer"';
    const result = await client.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching customer information:", error);
    res.status(500).json({ error: "Failed to fetch customer information" });
  }
});

// Define route to add a new customer
app.post("/customers", async (req, res) => {
  try {
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

    const query = `
      INSERT INTO "Outtatown Web App"."Customer" 
      ("CustomerID", "FirstName", "LastName", "RegistrationDate", "City", "Province", "StreetName", "Number", "PostalCode")
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    `;
    await client.query(query, [
      sinNumber,
      firstName,
      lastName,
      registrationDate,
      city,
      province,
      streetName,
      houseNumber,
      postalCode,
    ]);

    res.status(201).json({ message: "Customer created successfully" });
  } catch (error) {
    console.error("Error creating customer:", error);
    res.status(500).json({ error: "Failed to create customer" });
  }
});

// Define route to update customer information with PaymentCardNumber
app.put("/customers/:customerId", async (req, res) => {
  try {
    const { customerId } = req.params;
    const { PaymentCardNumber } = req.body;

    const query = `
      UPDATE "Outtatown Web App"."Customer"
      SET "PaymentCardNumber" = $1
      WHERE "CustomerID" = $2
    `;
    await client.query(query, [PaymentCardNumber, customerId]);

    res
      .status(200)
      .json({ message: "Customer payment information updated successfully" });
  } catch (error) {
    console.error("Error updating customer payment information:", error);
    res
      .status(500)
      .json({ error: "Failed to update customer payment information" });
  }
});

// Define route to update customer ID in hotel room
app.put("/hotel_rooms/:hotelId/:roomNumber/:customerId", async (req, res) => {
  try {
    const { hotelId, roomNumber, customerId } = req.params;

    const query = `
      UPDATE "Outtatown Web App"."Hotel_Room"
      SET "CustomerID" = $1
      WHERE "HotelID" = $2 AND "RoomNumber" = $3
    `;
    await client.query(query, [customerId, hotelId, roomNumber]);

    res
      .status(200)
      .json({ message: "Hotel room updated with customer ID successfully" });
  } catch (error) {
    console.error("Error updating hotel room with customer ID:", error);
    res
      .status(500)
      .json({ error: "Failed to update hotel room with customer ID" });
  }
});

// Define route to fetch hotel rooms with optional customer ID filter
app.get("/hotel_rooms", async (req, res) => {
  try {
    const { customerId } = req.query;
    let query = 'SELECT * FROM "Outtatown Web App"."Hotel_Room"';
    const params = [];

    if (customerId) {
      query += ' WHERE "CustomerID" = $1';
      params.push(customerId);
    }

    const result = await client.query(query, params);
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching hotel rooms:", error);
    res.status(500).json({ error: "Failed to fetch hotel rooms" });
  }
});

// Define route to add booking information to database when paying for a room
app.post("/bookings", async (req, res) => {
  try {
    const { bookingDate, hotelId, roomNumber, customerId } = req.body;

    const query = `
      INSERT INTO "Outtatown Web App"."Booking" 
      ("BookingDate", "HotelID", "RoomNumber", "CustomerID")
      VALUES ($1, $2, $3, $4)
    `;
    await client.query(query, [bookingDate, hotelId, roomNumber, customerId]);

    res.status(201).json({ message: "Booking created successfully" });
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ error: "Failed to create booking" });
  }
});

// Start the Express server
app.listen(port, () => console.log(`Server running on port ${port}`));
