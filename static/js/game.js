'use strict';

(function(exports){

if(typeof require === 'function'){
	var ship = require('./ship.js');
	var shot = require('./shot.js');
}else{
	var ship = window.ship;
	var shot = window.shot;
}


var FIRE_COOLDOWN = 150;
var COLLISION_DISTANCE = 10;


function Game(){
	this.ships = [];
	this.shots = [];
	this.controllers = [];
}


Game.prototype.update = function(delta){
	for(var i = 0; i < this.ships.length; i++){
		var ship = this.ships[i];
		ship.update(delta, this.controllers[i]);

		if(ship.respawnTimer !== null){
			continue;
		}

		if(this.controllers[i].firing){
			if(ship.fireCooldown <= 0){
				ship.fireCooldown = FIRE_COOLDOWN;
				this.shots.push(
					new shot.Shot(
						ship.id,
						ship.x,
						ship.y,
						ship.dx,
						ship.dy,
						ship.angle
					)
				);
			}
		}
	}

	this.shots.forEach(function(shot){
		shot.update(delta);

		this.ships.forEach(function(ship){
			if(ship.id == shot.shipID){
				return;
			}
			var distance = Math.sqrt(Math.pow(ship.x - shot.x, 2) + Math.pow(ship.y - shot.y, 2));
			if(distance < COLLISION_DISTANCE){
				ship.die();
				this.shots.splice(this.shots.indexOf(shot), 1);
			}
		}.bind(this));

		if(shot.ttl <= 0){
			this.shots.splice(this.shots.indexOf(shot), 1);
		}
	}.bind(this));
}


exports.Game = Game;


})(typeof exports === 'undefined' ? this['game'] = {} : exports);
