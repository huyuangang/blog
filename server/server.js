
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');

var app = express();
mongoose.connect('mongodb://localhost/blog');

app.set('view engine','jade');
app.set('views',path.join(__dirname,'../app/view'));
app.use('/public',express.static(path.join(__dirname,'../app/public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());
app.use(session({
	secret:'secret',
	resave:true,
	cookie:{maxAge:null},
	saveUninitialized:true
}))

require('./user/user.js')(app);
require('./admin/admin.js')(app);

var server = app.listen(8081,function(){
    var port = server.address().port;
    console.log('This server is listen at localhost:%s',port);
})