var PORT = process.env.PORT || 3000;
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));
app.use('/socket.io', express.static(__dirname + '/node_modules/socket.io-client/dist/'));

app.use(express.static(__dirname + '/public'));

io.on('connection', function () {
	console.log('user connected via socket.io!');
});

http.listen(PORT, function () {
	console.log('Server started');
});