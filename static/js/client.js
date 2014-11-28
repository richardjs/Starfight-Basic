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

	this.canvas = document.getElementById('canvas');
	this.ctx = this.canvas.getContext('2d');

	this.socket.on('set id', function(id){
		client.id = id;
	});

	this.socket.on('state update', function(game){
		client.game.ships = [];
		game.ships.forEach(function(serverShip){
			client.game.ships.push(
				new ship.Ship(serverShip.x, serverShip.y)
			);
		});
	});

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
	// Draw background
	this.ctx.fillStyle = '#001';
	this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

	// Draw ships
	this.game.ships.forEach(function(ship){
		this.ctx.fillStyle = '#9a9';
		this.ctx.beginPath()
		this.ctx.arc(
			ship.x,
			ship.y,
			10,
			0,
			Math.PI*2
		);
		this.ctx.fill();
	}.bind(this));
}


exports.Client = Client;


})(typeof exports === 'undefined' ? this['client'] = {} : exports);
