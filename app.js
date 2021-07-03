var express = require('express');
var app = express();

var morgan = require('morgan')
var mysql = require('mysql')
var bodyParser = require('body-parser')
var session = require('express-session')

// Middleware Settings
app.use(morgan('short'))
app.use(express.static('./public'))
app.use(bodyParser.urlencoded({ extended: false }))

// Router
var loginRouter = require('./router/login-router.js')
app.use(loginRouter)

// Ejs
app.set('view engine', 'ejs')
app.set('views', './views')

// Session
app.use(session({
	secret: 'downing session secret',
	resave: false,
	saveUninitialized: true
}))

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
	res.render('index')
});

app.listen(80, () => {
	console.log('App Started')
});