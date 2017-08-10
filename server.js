var PORT = process.env.PORT || 3000;
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var moment = require('moment');

app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));
app.use('/socket.io', express.static(__dirname + '/node_modules/socket.io-client/dist/'));
app.use('/moment', express.static(__dirname + '/node_modules/moment/'));

app.use(express.static(__dirname + '/public'));

io.on('connection', function (socket) {
	console.log('user connected via socket.io!');

	socket.on('message', function (message) {
		console.log('message recieved: ' + message.text);

		message.timestamp = moment.valueOf();
		io.emit('message', message);
	});

	// timestamp property - Javascript timestamp (miliseconds)

	socket.emit('message', {
		name: 'System',
		text: 'welcome to the chat app',
		timestamp: moment.valueOf()
	});
});

http.listen(PORT, function () {
	console.log('Server started');
});