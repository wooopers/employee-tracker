const inquirer = require('inquirer');

inquirer
  .prompt([
    // Prompt options here
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
      // Add more cases for other choices
      default:
        console.log('Invalid choice');
    }
  });

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
  
  promptMenu(); // Start the application by prompting the menu