// Connect database to localhost for client 2

const { Client } = require("pg");

// CONNECT WITH POSTGRES DATABASE
const client = new Client({
  user: "postgres",
  password: "outtatown_khai_pass",
  host: "localhost",
  port: 5432,
  database: "outtatown_khai",
});

async function runQuery() {
  try {
    await client.connect();

    // Input the query to run (For Tests)
    const query = `SELECT * FROM "Outtatown Web App"."Hotel_Room"`;
    const result = await client.query(query);

    console.log(result.rows);
  } catch (error) {
    console.error("Error executing query:", error);
  } finally {
    await client.end();
  }
}

runQuery();
