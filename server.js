var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var Game = require('./static/js/game.js').Game;
var Ship = require('./static/js/ship.js').Ship;

app.use(express.static(__dirname + '/static'));


var game = new Game();
var sockets = [];

var nextShipID = 0;

// New connection
io.on('connection', function(socket){
	var address = socket.handshake.address;;
	console.log('connection from ' + address);
	
	socket.emit('set id', sockets.length);
	sockets.push(socket);

	socket.on('disconnect', function(){
		console.log('disconnect from ' + address);

		var id = sockets.indexOf(socket);
		sockets.splice(id, 1)
		game.ships.splice(id, 1);
		game.controllers.splice(id, 1);

		for(var i = 0; i < sockets.length; i++){
			sockets[i].emit('set id', i);
		}
	});

	socket.on('controller update', function(controller){
		var id = sockets.indexOf(socket);
		game.controllers[id] = controller;
	});

	// TODO: need to account for sockets disconnecting

	game.ships.push(
		new Ship(
			nextShipID++,
			Math.random() * 800,
			Math.random() * 400
		)
	);
	game.controllers.push({});
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
	game.ships.forEach(function(ship){
		if(ship.respawnTimer < 0){
			ship.respawnTimer = null;
			Math.random();
			ship.x = Math.random() * 800;
			ship.y = Math.random() * 400;
		}
	});

	sockets.forEach(function(socket){
		socket.volatile.emit('state update', game)
	});
}
setInterval(frame, 10);


http.listen(3000);
console.log('server started');
