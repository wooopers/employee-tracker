const mysql = require('mysql2');

// Create the MySQL connection pool
const connection = mysql.createPool({
  host: 'localhost',
  port: '3306',
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

    // Call functions to handle actions
    viewDepartments(conn);
    viewRoles(conn);
    viewEmployees(conn);
    addDepartment(conn, 'Engineering');
    addRole(conn, 'Software Engineer', 100000, 1);
    addEmployee(conn, 'John', 'Doe', 1, null);
    updateEmployeeRole(conn, 1, 2);

    conn.release();
  });
});

// Function to view departments
function viewDepartments(conn) {
  conn.query('SELECT * FROM department', (err, results) => {
    if (err) {
      console.error('Error viewing departments: ' + err.stack);
      return;
    }
    console.log('Departments:');
    console.log(results);
  });
}

// Function to view roles
function viewRoles(conn) {
  conn.query('SELECT * FROM role', (err, results) => {
    if (err) {
      console.error('Error viewing roles: ' + err.stack);
      return;
    }
    console.log('Roles:');
    console.log(results);
  });
}

// Function to view employees
function viewEmployees(conn) {
  conn.query('SELECT * FROM employee', (err, results) => {
    if (err) {
      console.error('Error viewing employees: ' + err.stack);
      return;
    }
    console.log('Employees:');
    console.log(results);
  });
}

// Function to add a department
function addDepartment(conn, name) {
  conn.query('INSERT INTO department (name) VALUES (?)', [name], (err, results) => {
    if (err) {
      console.error('Error adding department: ' + err.stack);
      return;
    }
    console.log('Department added successfully.');
  });
}

// Function to add a role
function addRole(conn, title, salary, departmentId) {
  conn.query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', [title, salary, departmentId], (err, results) => {
    if (err) {
      console.error('Error adding role: ' + err.stack);
      return;
    }
    console.log('Role added successfully.');
  });
}

// Function to add an employee
function addEmployee(conn, firstName, lastName, roleId, managerId) {
  conn.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [firstName, lastName, roleId, managerId], (err, results) => {
    if (err) {
      console.error('Error adding employee: ' + err.stack);
      return;
    }
    console.log('Employee added successfully.');
  });
}

// Function to update an employee's role
function updateEmployeeRole(conn, employeeId, roleId) {
  conn.query('UPDATE employee SET role_id = ? WHERE id = ?', [roleId, employeeId], (err, results) => {
    if (err) {
      console.error('Error updating employee role: ' + err.stack);
      return;
    }
    console.log('Employee role updated successfully.');
  });
}
