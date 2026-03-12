const mysql = require('mysql2');

// Create the connection pool. The pool-specific settings are the defaults
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root', // Default XAMPP user
  password: '', // Default XAMPP password is empty
  database: 'skill_platform', // Matches your new database name
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
  idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0
});

// For pool initialization and checking
pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Database connection was closed.');
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('Database has too many connections.');
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('Database connection was refused. Make sure XAMPP MySQL is running.');
        }
    }
    if (connection) {
        console.log('Successfully connected to the XAMPP MySQL Database');
        connection.release();
    }
    return;
});

// Export the pool to be used in other files via promises
const promisePool = pool.promise();
module.exports = promisePool;
