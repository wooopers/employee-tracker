const inquirer = require('inquirer');

// Prompt the menu options
function promptMenu() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'choice',
        message: 'Choose an action:',
        choices: [
          'View Departments',
          'View Roles',
          'Add Employee',
          'Exit'
        ]
      }
    ])
    .then((response) => {
      // Check user's choice and invoke corresponding functions
      switch (response.choice) {
        case 'View Departments':
          viewDepartments();
          break;
        case 'View Roles':
          viewRoles();
          break;
        case 'Add Employee':
          addEmployee();
          break;
        case 'Exit':
          exit();
          break;
        default:
          console.log('Invalid choice');
      }
    });
}

// Function to view departments
function viewDepartments() {
  // Implementation here
}

// Function to view roles
function viewRoles() {
  // Implementation here
}

// Function to add an employee
function addEmployee() {
  // Implementation here
}

// Exit the application
function exit() {
  console.log('Exiting...');
  process.exit(0);
}

// Start the application by prompting the menu
promptMenu();
