var express = require('express');
var bodyParser = require('body-parser');
var consts = require('../public/constants.js')

var cardModel = require('../models/card/card-model.js')

var router = express.Router()
router.use(bodyParser.urlencoded({extended: false}))

router.get('/', async function (req, res) {
    let sess = req.session
    let data = {}
    data.isLoggedin = sess.isLoggedin
    data.targetCardList = null
    if(sess.isLoggedin) {
        data.sessionUserInfo = sess[consts.USER_SESSION_INFO]
        data.targetCardList = await cardModel.selectUserCardListWithUserNo([data.sessionUserInfo.USER_NO])
    }
	res.render('index', data)
})

module.exports = router