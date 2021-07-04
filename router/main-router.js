var express = require('express');
var bodyParser = require('body-parser');
var consts = require('../public/constants.js')

var router = express.Router()
router.use(bodyParser.urlencoded({extended: false}))

router.get('/', function (req, res) {
    let sess = req.session
    let data = {}
    data.isLoggedin = sess.isLoggedin
    if(sess.isLoggedin) {
        data.sessionUserInfo = sess[consts.USER_SESSION_INFO]
    }
	res.render('index', data)
})

module.exports = router