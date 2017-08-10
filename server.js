var PORT = process.env.PORT || 3000;
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));
app.use('/socket.io', express.static(__dirname + '/node_modules/socket.io-client/dist/'));

app.use(express.static(__dirname + '/public'));

io.on('connection', function (socket) {
	console.log('user connected via socket.io!');

	socket.on('message', function (message) {
		console.log('message recieved: ' + message.text);

		io.emit('message', message);
	});

	socket.emit('message', {
		text: 'welcome to the chat app'
	});
});

http.listen(PORT, function () {
	console.log('Server started');
});