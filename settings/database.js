const mysql = require('mysql')
const config = require('./db-config.json')

// Database
const connection = mysql.createConnection({
    connectionLimit: 10,
    connectTimeout: 1000,
    host: config.host,
    port: config.port,
    user: config.user,
    password: config.password,
    database: config.database
})

if(connection.state == 'disconnected') {
    connection.connect()
}

// function connectDatabase() {
//     try {
//         connection.connect()
//     } catch (err) {
//         console.error('Error connecting Databse.\n ERR : ', err)
//     }
// }
// function closeConn() {
//     connection.end()
// }

module.exports = connection