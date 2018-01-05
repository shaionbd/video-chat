var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');




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

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = function(app){
 
	app.use(session({ secret: 'decima technology', resave: false, saveUninitialized: false, cookie: { maxAge: 6000000 }}));


	// routing pages
	// 
	app.get('/', function(req, res){
		
		User.find({}, function(err, data){
		  	if(err) throw err;
		  	console.log("Users: "+data);
		  	res.render('dashboard', {users: data});
		});

		//if(req.session.login){
			
		//}else{
			//res.redirect('/login');
		//}
		
	});

	// login route
	app.get('/login', function(req, res){
		if(req.session.login){
			res.redirect('/');
		}
		console.log('login page');

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
	  		console.log(data);
	  		req.session.login = true;
	  		req.session.email = data[0].email;
	  		req.session.name = data[0].name;
	  		req.session.chat_id = data[0].chat_id;
	  		res.redirect('/');
	  	}
	  	
	  }); 
	});
	app.post('/add/user', urlencodedParser, function(req, res){
		if (!req.body) return res.sendStatus(400);
		var user1 = User({email: req.body.email, name: req.body.name, pass: req.body.pass, chat_id: 1233233453}).save(function(err){
			if(err) throw err;
			console.log('User saved');
			res.redirect('/');
			//res.json(req.body);
		});
	});

	app.get('/delete/user/:id', function(req, res){
		User.find({_id: req.params.id}).remove(function(err, data){
			if(err) throw err;
			console.log('deleted');
			res.redirect('/');
			//res.json(data);
		});
	});

	// app.delete('/delete/user/:id', function(req, res){
	// 	User.find({id: req.params.id}).remove(function(err, data){
	// 		if(err) throw err;
	// 		res.redirect('/');
	// 		//res.json(data);
	// 	});
	// });

	app.get('/logout', function(req, res){
		req.session.destroy(function(err) {
		  // cannot access session here
		  if(err) throw err;
		  res.redirect('/login');
		});
	});

	// 
};