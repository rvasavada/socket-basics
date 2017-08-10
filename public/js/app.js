var socket = io();

socket.on('connect', function(socket) {
	console.log('connected to socket.io server!');
});

socket.on('message', function(message) {
	//var momentTimestamp
	var momentTimestamp = moment.utc(message.timestamp).local().format('MMM Do YYYY, h:mm a');

	console.log('new message: ' + message.text);

	jQuery('.messages').append('<p>'+ momentTimestamp+ '</p>'+'<p>'+ message.text+ '</p>')
});

//handles submitting of new message
var $form = jQuery('#message-form');

$form.on('submit', function (event) {
	event.preventDefault();

	var $message = $form.find('input[name=message]');

	socket.emit('message', {
		text: $message.val()
	});

	$message.val('');
});