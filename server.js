const express = require('express');
const mysql = require('mysql2');
const fs = require('fs');
const { viewDepartments, viewRoles, viewEmployees, addDepartment, addRole, addEmployee, updateEmployeeRole } = require('./index');

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

    // Routes

    // View departments
    app.get('/departments', (req, res) => {
      viewDepartments(conn, (err, results) => {
        if (err) {
          console.error('Error viewing departments: ' + err.stack);
          res.status(500).send('Internal Server Error');
          return;
        }
        res.json(results);
      });
    });

    // View roles
    app.get('/roles', (req, res) => {
      viewRoles(conn, (err, results) => {
        if (err) {
          console.error('Error viewing roles: ' + err.stack);
          res.status(500).send('Internal Server Error');
          return;
        }
        res.json(results);
      });
    });

    // View employees
    app.get('/employees', (req, res) => {
      viewEmployees(conn, (err, results) => {
        if (err) {
          console.error('Error viewing employees: ' + err.stack);
          res.status(500).send('Internal Server Error');
          return;
        }
        res.json(results);
      });
    });

    // Add department
    app.post('/departments', (req, res) => {
      const name = req.body.name;
      addDepartment(conn, name, (err) => {
        if (err) {
          console.error('Error adding department: ' + err.stack);
          res.status(500).send('Internal Server Error');
          return;
        }
        res.send('Department added successfully.');
      });
    });

    // Add role
    app.post('/roles', (req, res) => {
      const { title, salary, departmentId } = req.body;
      addRole(conn, title, salary, departmentId, (err) => {
        if (err) {
          console.error('Error adding role: ' + err.stack);
          res.status(500).send('Internal Server Error');
          return;
        }
        res.send('Role added successfully.');
      });
    });

    // Add employee
    app.post('/employees', (req, res) => {
      const { firstName, lastName, roleId, managerId } = req.body;
      addEmployee(conn, firstName, lastName, roleId, managerId, (err) => {
        if (err) {
          console.error('Error adding employee: ' + err.stack);
          res.status(500).send('Internal Server Error');
          return;
        }
        res.send('Employee added successfully.');
      });
    });

    // Update employee role
    app.put('/employees/:id/role', (req, res) => {
      const employeeId = req.params.id;
      const roleId = req.body.roleId;
      updateEmployeeRole(conn, employeeId, roleId, (err) => {
        if (err) {
          console.error('Error updating employee role: ' + err.stack);
          res.status(500).send('Internal Server Error');
          return;
        }
        res.send('Employee role updated successfully.');
      });
    });

    // Start the server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });

    conn.release();
  });
});
