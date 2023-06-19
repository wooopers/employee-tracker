const express = require('express');
const mysql = require('mysql2');
const fs = require('fs');
const { connection, performDatabaseOperations } = require('./node');
const routes = require('./index');

const app = express();
const PORT = process.env.PORT || 3001;

// Read the contents of the schema.sql file
const schemaSQL = fs.readFileSync('schema.sql', 'utf8');

// MySQL connection pool
const pool = mysql.createPool({
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: 'MyNewPass',
  database: 'employee_tracker'
});

// Connect to the MySQL database
pool.getConnection((err, conn) => {
  if (err) {
    console.error('Error connecting to the database: ' + err.stack);
    return;
  }
  console.log('Connected to the database.');

  // Create the tables using SQL queries from schema.sql
  conn.query(schemaSQL, (err) => {
    if (err) {
      console.error('Error creating tables: ' + err.stack);
      conn.release();
      return;
    }
    console.log('Tables created successfully.');

    // Call functions to handle actions
    performDatabaseOperations(conn);

    conn.release();
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
