const express = require('express');
const mysql = require('mysql2');
const routes = require('./index');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'classlist_db'
}, () => {
  console.log(`Connected to the classlist_db database.`);
});


