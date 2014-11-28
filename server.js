var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var Game = require('./static/js/game.js').Game;
var Ship = require('./static/js/ship.js').Ship;

app.use(express.static(__dirname + '/static'));


var game = new Game();
var sockets = [];

// New connection
io.on('connection', function(socket){
	var address = socket.handshake.address;;
	console.log('connection from ' + address);
	socket.on('disconnect', function(){
		console.log('disconnect from ' + address);

		var id = sockets.indexOf(socket);
		sockets.splice(id, 1)
		game.ships.splice(id, 1);
	});

	socket.emit('set id', sockets.length);
	sockets.push(socket);

	game.ships.push(
		new Ship(
			Math.random() * 800,
			Math.random() * 400
		)
	);
});


// Game loop
var lastTime = 0;
var x = 0;
function frame(){
	var time = new Date().getTime();
	if(lastTime){
		var delta = time - lastTime;
	}else{
		delta = 1;
	}
	lastTime = time;

	game.update(delta);

	sockets.forEach(function(socket){
		socket.volatile.emit('state update', game)
	});
}
setInterval(frame, 25);


http.listen(3000);
console.log('server started');
