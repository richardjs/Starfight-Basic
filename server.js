var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var Game = require('./static/js/game.js').Game;

app.use(express.static(__dirname + '/static'));

io.on('connection', function(socket){
	var address = socket.handshake.address;;
	console.log('connection from ' + address);
	socket.on('disconnect', function(){
		console.log('disconnect from ' + address);
	});

	var game = new Game();
	var lastTime = 0;
	var x = 0;
	function frame(){
		var time = new Date().getTime();
		if(lastTime){
			var delta = time - lastTime;
			lastTime = time;
		}else{
			delta = 1;
		}

		game.update(delta);
		
		socket.volatile.emit('state update', game)
	}
	setInterval(frame, 25);
});

http.listen(3000);
console.log('server started');
