const {Client} = require("pg");

//CONNECT WITH POSTGRES DATABASE
const client = new Client({
    user: "postgres",
    password: "Rayan2004*",
    host: "localhost",
    port: 5432,
    database: "Outtatown"
});

client.connect();


client.query(`Select * from "Outtatown Web App"."HotelChain" Where "ChainID" = 5000`, (err, res) => {
    if (!err){
        console.log(res.rows);
    } else {
        console.log(err.message)
    }
    client.end();
})