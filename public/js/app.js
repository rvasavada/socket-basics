var name = getQueryVariable('name') || 'Anonymous';
var room = getQueryVariable('room');
var socket = io();

console.log(name + ' wants to join ' + room);


socket.on('connect', function(socket) {
	console.log('connected to socket.io server!');
});

socket.on('message', function(message) {
	//var momentTimestamp
	var momentTimestamp = moment.utc(message.timestamp).local().format('MMM Do YYYY, h:mm a');
	var $message = jQuery('.messages');

	console.log('new message: ' + message.text);

	$message.append('<p><strong>'+ message.name + ' ' + momentTimestamp + '</strong></p>');
	$message.append('<p>'+ message.text + '</p>')
});

//handles submitting of new message
var $form = jQuery('#message-form');

$form.on('submit', function (event) {
	event.preventDefault();

	var $message = $form.find('input[name=message]');

	socket.emit('message', {
		name: name,
		text: $message.val()
	});

	$message.val('');
});