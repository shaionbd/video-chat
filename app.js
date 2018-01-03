var express = require('express');
// controllers
var userController = require('./controllers/userController');

// execute express framework
var app = express();

// set up template engine
app.set('view engine', 'ejs');
// middleware access for assets folder
app.use('/assets', express.static('assets'));

// fire controllers
userController(app);

app.listen(3000);
console.log('Server is running at 3000 port');