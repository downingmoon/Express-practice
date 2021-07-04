var express = require('express');
var bodyParser = require('body-parser');
const db = require('../settings/database.js');
const connection = require('../settings/database.js');
var resModel = require('../public/response-model.js')
var consts = require('../public/constants.js')

var router = express.Router()
router.use(bodyParser.urlencoded({extended: false}))

router.get('/login', (req, res) => {
    console.log('Login Page')
    var sess = req.session
    if(sess.isLoggedin) {
        res.redirect('/')
    } else {
        res.render('./login/login', {})
    }
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
            res.send(resModel.getResponseModel(false, 'ERROR'))
        } else if(typeof row == 'undefined' || row == null || row.length < 1) {
            res.send(resModel.getResponseModel(false, '존재하지 않거나 비밀번호가 잘못되었습니다.', null))
        } else {
            let user = row[0]
            if(body.password == user.USER_PASSWORD) {
                let sess = req.session
                sess.isLoggedin = true
                sess[consts.USER_SESSION_INFO] = row[0]
                res.send(resModel.getResponseModel(true))
            } else {
                res.send(resModel.getResponseModel(false, '존재하지 않거나 비밀번호가 잘못되었습니다.'))
            }
        }
    })
    
})

router.get('/logout', (req, res) => {
    let sess = req.session
    if(sess.isLoggedin) {
        sess.destroy()
    }
    res.redirect('/login')
})

module.exports = router