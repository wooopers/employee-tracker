const mysql = require('mysql2');

// Create the MySQL connection pool
const connection = mysql.createPool({
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: 'MyNewPass',
  database: 'employee_tracker'
});

// Function to view departments
function viewDepartments() {
  connection.query('SELECT * FROM department', (err, results) => {
    if (err) {
      console.error('Error viewing departments: ' + err.stack);
      return;
    }
    console.log('Departments:');
    console.log(results);
  });
}

// Function to view roles
function viewRoles() {
  connection.query('SELECT * FROM role', (err, results) => {
    if (err) {
      console.error('Error viewing roles: ' + err.stack);
      return;
    }
    console.log('Roles:');
    console.log(results);
  });
}

// Function to view employees
function viewEmployees() {
  connection.query('SELECT * FROM employee', (err, results) => {
    if (err) {
      console.error('Error viewing employees: ' + err.stack);
      return;
    }
    console.log('Employees:');
    console.log(results);
  });
}

// Function to add a department
function addDepartment(name) {
  connection.query('INSERT INTO department (name) VALUES (?)', [name], (err, results) => {
    if (err) {
      console.error('Error adding department: ' + err.stack);
      return;
    }
    console.log('Department added successfully.');
  });
}

// Function to add a role
function addRole(title, salary, departmentId) {
  connection.query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', [title, salary, departmentId], (err, results) => {
    if (err) {
      console.error('Error adding role: ' + err.stack);
      return;
    }
    console.log('Role added successfully.');
  });
}

// Function to add an employee
function addEmployee(firstName, lastName, roleId, managerId) {
  connection.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [firstName, lastName, roleId, managerId], (err, results) => {
    if (err) {
      console.error('Error adding employee: ' + err.stack);
      return;
    }
    console.log('Employee added successfully.');
  });
}

// Function to update an employee's role
function updateEmployeeRole(employeeId, roleId) {
  connection.query('UPDATE employee SET role_id = ? WHERE id = ?', [roleId, employeeId], (err, results) => {
    if (err) {
      console.error('Error updating employee role: ' + err.stack);
      return;
    }
    console.log('Employee role updated successfully.');
  });
}

// Export the functions to be used in other files
module.exports = {
  viewDepartments,
  viewRoles,
  viewEmployees,
  addDepartment,
  addRole,
  addEmployee,
  updateEmployeeRole
};

