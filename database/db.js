const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost', //127.0.0.1
    user: 'root',
    password: '',
    database: 'biblioteca de libros'
});

module.exports = db ;