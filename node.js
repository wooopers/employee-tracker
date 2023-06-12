const mysql = require('mysql2')

const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'MyNewPass',
    database: 'employee_tracker'
  });

  connection.query('SELECT * FROM departments', (err, results) => {
    if (err) {
      console.error(err);
      return;
    }
    
    console.log(results);
  });