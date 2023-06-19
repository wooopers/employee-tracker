const inquirer = require('inquirer');

// Prompt the user with a menu of options
function promptMenu() {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'menuChoice',
          message: 'Select an option:',
          choices: ['View Students', 'Add Student', 'Exit']
        }
      ])
      .then((answers) => {
        const { menuChoice } = answers;
        switch (menuChoice) {
          case 'View Students':
            viewStudents();
            break;
          case 'Add Student':
            addStudent();
            break;
          case 'Exit':
            exit();
            break;
          default:
            console.log('Invalid choice');
            promptMenu();
        }
      });
  }
  
  // View all students
  function viewStudents() {
    db.query('SELECT * FROM students', function (err, results) {
      if (err) {
        console.error(err);
        return;
      }
      console.log(results);
      promptMenu(); // Prompt the menu again after displaying the results
    });
  }
  
  // Add a student
  function addStudent() {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'name',
          message: "Enter the student's name:"
        },
        {
          type: 'input',
          name: 'age',
          message: "Enter the student's age:"
        }
      ])
      .then((answers) => {
        const { name, age } = answers;
        // Perform the database insertion
        db.query('INSERT INTO students (name, age) VALUES (?, ?)', [name, age], function (err, result) {
          if (err) {
            console.error(err);
            return;
          }
          console.log('Student added successfully');
          promptMenu(); // Prompt the menu again after adding the student
        });
      });
  }
  
  // Exit the application
  function exit() {
    console.log('Exiting...');
    process.exit(0);
  }
  
  promptMenu(); // Start the application by prompting the menu