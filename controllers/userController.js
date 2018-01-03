var bodyParser = require('body-parser');
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = function(app){
	// routing pages

	// login route
	app.get('/login', function(req, res){
		res.render('login');
	});
	app.post('/login', urlencodedParser, function (req, res) {
	  if (!req.body) return res.sendStatus(400)
	  // check datbase
	  // go back to login page if username & password are not matched
	  // go to dashboard if login successfully  
	});
	app.delete('/login', function(req, res){

	});

	// 
};