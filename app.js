var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

// set up template engine
app.set('view engine', 'ejs');
// middleware access for assets folder
app.use('/assets', express.static('assets'));

// routing pages
app.get('/login', function(req, res){
	res.render('login');
});

// POST /login gets urlencoded bodies
app.post('/login', urlencodedParser, function (req, res) {
  if (!req.body) return res.sendStatus(400)
  // check datbase
  // go back to login page if username & password are not matched
  // go to dashboard if login successfully
  
})

app.listen(3000);