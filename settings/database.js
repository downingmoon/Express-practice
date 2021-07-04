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
    database: config.database,
    typeCast: (field, next) => {
        if(field.type == "VAR_STRING") {
            return field.string()
        }
        return next()
    }
})

if(connection.state == 'disconnected') {
    connection.connect()
}

module.exports = connection