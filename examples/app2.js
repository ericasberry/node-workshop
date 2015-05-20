var express = require('express');
var bodyParser = require('body-parser')

var app = express();

// Tell express to use middleware to parse request body
app.use(bodyParser.urlencoded({extended: false}));
// ^^^ npm install body-parser
// the example of use(express.urlencoded()) doesn't work anymore 
// because urlencoded no longer bundled with express


// install custom middleware
function authUser(request, response, next) {
	var user = {
		name: 'Kevin',
		admin: true
	};

	request.user = user;
	next();
};
//app.use(authUser);
// ^ applies middleware to all requests
// but see app.post, passing our middleware as parameter to app.post to
// inject the middleware



app.get('/', function(request, response) {
	response.send({
		foo: 'bar'}
	);
});



app.post('/doStuff', authUser, function(request, response) {
	var param = request.param('foo');
	console.log(param);

	response.send({
		foo: param,
		isAdmin: request.user.admin
	});
});

app.listen(3000);
