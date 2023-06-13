const mysql = require('mysql2');

// Create the MySQL connection
const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'MyNewPass',
  database: 'employee_tracker'
});

// Connect to the MySQL database
connection.getConnection((err, conn) => {
  if (err) {
    console.error('Error connecting to the database: ' + err.stack);
    return;
  }
  console.log('Connected to the database.');

  // Create the tables using SQL queries
  conn.query(`
    CREATE TABLE department (
      id INT PRIMARY KEY,
      name VARCHAR(30)
    );

    CREATE TABLE role (
      id INT PRIMARY KEY,
      title VARCHAR(30),
      salary DECIMAL,
      department_id INT,
      FOREIGN KEY (department_id) REFERENCES department(id)
    );

    CREATE TABLE employee (
      id INT PRIMARY KEY,
      first_name VARCHAR(30),
      last_name VARCHAR(30),
      role_id INT,
      manager_id INT,
      FOREIGN KEY (role_id) REFERENCES role(id),
      FOREIGN KEY (manager_id) REFERENCES employee(id)
    );
  `, (err) => {
    if (err) {
      console.error('Error creating tables: ' + err.stack);
      conn.release();
      return;
    }
    console.log('Tables created successfully.');

    // Execute the SELECT query
    conn.query('SELECT * FROM departments', (err, results) => {
      if (err) {
        console.error(err);
        conn.release();
        return;
      }
      console.log(results);
      conn.release();
    });
  });
});

// Handle the MySQL connection error
connection.on('error', (err) => {
  console.error('MySQL connection error: ' + err.stack);
});