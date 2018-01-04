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

var userSessionData = {};

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = function(app){
	// routing pages
	// 
	app.get('/', function(req, res){
		User.find({email: 'admin@gmail.com', pass: '123456'}, function(err, data){
		  	if(err) throw err;
		  	if(data.length == 0){
		  		console.log('No user found!');
		  	}
		  	console.log(data);
		  	res.render('dashboard', {data: data});
	  	}); 
	});

	// login route
	app.get('/login', function(req, res){

		res.render('login', {error: false});
	});
	app.post('/login', urlencodedParser, function (req, res) {
	  if (!req.body) return res.sendStatus(400);
	  // check datbase
	  User.find({email: req.body.email, pass: req.body.pass}, function(err, data){
	  	if(err) throw err;

	  	if(data.length == 0){
	  		res.render('login', {error: true});
	  	}else{
	  		// save user info on session 
	  		res.render('dashboard');
	  	}
	  	
	  }); 
	});
	app.post('/add/user', urlencodedParser, function(req, res){
		if (!req.body) return res.sendStatus(400);
		var user1 = User({email: req.body.email, name: req.body.name, pass: req.body.pass, chat_id: req.body.chat_id}).save(function(err){
			if(err) throw err;
			console.log('User saved');
			res.json(req.body);
		});
	});

	app.delete('/delete/user/:email', function(req, res){
		User.find({email: req.params.email}).remove(function(err, data){
			if(err) throw err;
			res.json(data);
		});
	});

	// 
};