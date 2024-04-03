// Connect database to localhost for client 1

const { Client } = require("pg");

//CONNECT WITH POSTGRES DATABASE
const client = new Client({
  user: "postgres",
  password: "Outtatown",
  host: "localhost",
  port: 5432,
  database: "Outtatown",
});

client.connect();

client.query(
  `SELECT "Name" FROM "Outtatown Web App"."Hotel" ORDER BY "Name" ASC`,
  (err, res) => {
    if (!err) {
      console.log(res.rows);
    } else {
      console.log(err.message);
    }
    client.end();
  }
);

module.exports = client;
