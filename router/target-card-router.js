var express = require('express');
var bodyParser = require('body-parser');
var consts = require('../public/constants.js')
var resModel = require('../public/response-model.js')
const cardModel = require('../models/card/card-model.js')

var router = express.Router()
router.use(bodyParser.urlencoded({extended: false}))

// Insert target card
router.post('/target-card/insert', async (req, res) => {
    console.log('Isert taret card, PARAMS : ', req.body)
    let sess = req.session
    if(sess.isLoggedin) {
        let body = req.body
        let user = null;
        user = sess[consts.USER_SESSION_INFO]

        await cardModel.insertUserTargetCard([user.USER_NO, body.cardTitle, body.cardTargetMoney, body.cardCurrentMoney])
        res.send(resModel.getResponseModel(true, '목표카드가 추가되었습니다.', null))
    } else {
        res.send(resModel.getResponseModel(false, '로그인이 필요한 기능입니다.', null))
    }
})

// Logout
router.get('/logout', (req, res) => {
    let sess = req.session
    if(sess.isLoggedin) {
        sess.destroy()
    }
    res.redirect('/login')
})

module.exports = router