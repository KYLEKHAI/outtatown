# outtatown

## CSI 2132 PROJECT

This is a website to browse hotels using relational databases!

### Installation

To install and run the project, follow these steps:

**Make sure you have Node.js and npm installed on your machine before proceeding with the installation.**

1. Clone the repository:

   ```bash
   git clone git@github.com:KYLEKHAI/outtatown.git
   ```

2. Navigate to the project directory:

   ```bash
   cd outtatown
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. After configuring the valid credentials with the imported sql file and using your database management system (pgAdmin4 or MySQL)

Ensure the following is changed in server.js

const client = new Client({
user: "postgres",
password: "(your_DBMS_server_password)",
host: "localhost",
port: 5432,
database: "your_database_name",
});

**Note that the default name is outtatown.sql but this may changed depending on how you choose to rename it when importing ouutatown.sql**

5.  After importing the database, navigate to the server folder in the terminal and open the express.js connection port:

```bash
cd server
```

```bash
node server.js
```

6.  When the express connection is set, naviagate to the client folder to open the react app:

```bash
cd client
```

```bash
npm start
```

<u>You can now view a simulated hotel booking system!
