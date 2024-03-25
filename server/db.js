const {Pool} = require("pg").Pool;

//CONNECT WITH POSTGRES DATABASE
const pool = new Pool({
    user: "postgres",
    password: "rootUser",
    host: "localhost",
    port: 5432,
    database: "Outtatown"
});

pool.connect();
