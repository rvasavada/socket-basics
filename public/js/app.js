var socket = io();

socket.on('connect', function(socket) {
	console.log('connected to socket.io server!');
});

socket.on('message', function(message) {
	console.log('new message: + ' + message.text);
});