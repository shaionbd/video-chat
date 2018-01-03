var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// connect to database
mongoose.connect('mongodb://shaion:fs0c!3ty@ds239557.mlab.com:39557/video_chat');

// Create a schema
var userSchema = new mongoose.Schema({
	email: String,
	name: String,
	pass: String,
	chat_id: String
});

var User = mongoose.model('User', userSchema);
// var user1 = User({email: 'admin@gmail.com', name: 'Admin', pass: '12345', chat_id: '0987654321'}).save(function(err){
// 	if(err) throw err;
// 	console.log('User saved');
// });

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