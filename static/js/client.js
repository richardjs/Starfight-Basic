'use strict';

(function(exports){

if(typeof require === 'function'){
	var game = require('./game.js');
	var ship = require('./ship.js');
	var shot = require('./shot.js');
}else{
	var game = window.game;
	var ship = window.ship;
	var shot = window.shot;
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
				new ship.Ship(
					serverShip.x,
					serverShip.y,
					serverShip.dx,
					serverShip.dy,
					serverShip.angle,
					serverShip.speed,
					serverShip.fireCooldown
				)
			);
		});
		client.game.shots = [];
		game.shots.forEach(function(serverShot){
			client.game.shots.push(
				new shot.Shot(
					serverShot.x,
					serverShot.y,
					serverShot.dx,
					serverShot.dy,
					null,
					serverShot.ttl
				)
			);
		});
		client.game.controllers = [];
		game.controllers.forEach(function(serverController){
			client.game.controllers.push(
				serverController
			);
		});
	});

	document.addEventListener('keydown', function(event){
		switch(event.keyCode){
			case 38:
				client.game.controllers[client.id]['accelerate'] = true;
				break;
			case 37:
				client.game.controllers[client.id]['turnLeft'] = true;
				break;
			case 39:
				client.game.controllers[client.id]['turnRight'] = true;
				break;
			case 32:
				client.game.controllers[client.id]['firing'] = true;
				break;
			default:
				return;
		}
		client.socket.emit('controller update', client.game.controllers[client.id]);
	});
	document.addEventListener('keyup', function(event){
		switch(event.keyCode){
			case 38:
				client.game.controllers[client.id]['accelerate'] = false;
				break;
			case 37:
				client.game.controllers[client.id]['turnLeft'] = false;
				break;
			case 39:
				client.game.controllers[client.id]['turnRight'] = false;
				break;
			case 32:
				client.game.controllers[client.id]['firing'] = false;
				break;
			default:
				return;
		}
		client.socket.emit('controller update', client.game.controllers[client.id]);
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
			ship.angle,
			ship.angle - Math.PI - Math.PI/10
		);
		this.ctx.fill();
		this.ctx.beginPath();
		this.ctx.arc(
			ship.x,
			ship.y,
			10,
			ship.angle - Math.PI + Math.PI/10,
			ship.angle
		);
		this.ctx.fill();
	}.bind(this));

	// Draw shots
	this.game.shots.forEach(function(shot){
		this.ctx.fillStyle = '#a33';
		this.ctx.beginPath();
		this.ctx.arc(
			shot.x,
			shot.y,
			3,
			0,
			Math.PI*2
		);
		this.ctx.fill();
	}.bind(this));
}


exports.Client = Client;


})(typeof exports === 'undefined' ? this['client'] = {} : exports);
