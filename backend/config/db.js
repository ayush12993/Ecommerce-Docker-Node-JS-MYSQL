const mysql = require('mysql2');

const pool = mysql.createPool({
 host: 'localhost',
            user: 'root',
            password: '',
            database: 'newappec'
 
});

module.exports = pool.promise(); // Use promise-based interface