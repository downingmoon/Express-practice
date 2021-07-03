var express = require('express');
var router = express.Router()
var bodyParser = require('body-parser');
const db = require('../settings/database.js');
const connection = require('../settings/database.js');

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
    console.log('Login Process, PARAMS : ', req.body)
    var body = req.body
    let sql = "SELECT USER_NO, USER_ID, USER_PASSWORD FROM MD_USER WHERE USER_ID = ?"
    db.query(sql, [body.id], (err, row) => {
        console.log(`EXECUTE QUERY - ${sql}`)
        if(err != null) {
            console.log('Error quering databse, error : ', err)
            res.send({result: false, msg: 'ERROR'})
        } else if(typeof row == 'undefined' || row == null || row.length < 1) {
            res.send({result: false, msg: '존재하지 않거나 비밀번호가 잘못되었습니다.'})
        } else {
            let user = row[0]
            if(body.password == user.USER_PASSWORD) {
                res.send({result: true, msg: ''})
            } else {
                res.send({result: false, msg: '존재하지 않거나 비밀번호가 잘못되었습니다.'})
            }
        }
    })
    
    // getConnection().query(sql, [body.id], (err, result) => {
    //     console.log(`##### QUERY : ${sql}\n##### RESULT : ${result}`)
    // })
})

module.exports = router