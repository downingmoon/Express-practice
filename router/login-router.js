var express = require('express');
var router = express.Router()
var mysql = require('mysql')
var ejs = require('ejs')
var fs = require('fs')
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({extended: false}))

router.get('/login', (req, res) => {
    console.log('Login Page')
    res.render('./login/login', {
        foo: 'bar'
    })
    // fs.readFile('./login/login.html', 'UTF-8', (err, data) => {
    //     res.send(ejs.render(data, {
    //         data: null,
    //         foo: 'bar'
    //     }))
    // })
})

router.post('/login', (req, res) => {
    var body = req.body
    console.log('Login Process ID : {}, INPUT PW : {}', body.id, body.password)
    getConnection().query('', [], (err, result) => {

    })
})

var connection = mysql.createPool({
    connectionLimit: 10,
    connectTimeout: 10,
    host: 'http://everypick.co.kr',
    port: '3306',
    user: 'everypick',
    password: 'qQ!0203040',
    database: 'everypick'
})

function getConnection() {
    return connection    
}

module.exports = router