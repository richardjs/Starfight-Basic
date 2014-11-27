'use strict';

(function(exports){

if(typeof require === 'function'){
	var game = require('./game.js');
}else{
	var game = window.game;
}

function Client(){
	var client = this;
	this.game = new game.Game();
	this.socket = io();

	this.socket.on('state update', function(serverGame){
		client.game.ship = serverGame.ship;
	});

	this.canvas = document.getElementById('canvas');
	this.ctx = this.canvas.getContext('2d');

	var lastTime = 0;
	function frame(time){
		time = time || 0;
		var delta = time - lastTime;
		lastTime = time;

		client.update(delta);
		client.render();

		requestAnimationFrame(frame);
	}
	frame();
}

Client.prototype.update = function(delta){
	this.game.update(delta);
}

Client.prototype.render = function(){
	this.ctx.fillStyle = '#001';
	this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

	this.ctx.fillStyle = '#9a9';
	this.ctx.beginPath()
	this.ctx.arc(
		this.game.ship.x,
		this.game.ship.y,
		10,
		0,
		Math.PI*2
	);
	this.ctx.fill();
}

exports.Client = Client;

})(typeof exports === 'undefined' ? this['client'] = {} : exports);
