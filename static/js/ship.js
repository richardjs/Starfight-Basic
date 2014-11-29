'use strict';

(function(exports){

var ACCELERATION = 7;
var MAX_SPEED = 500;
var TURN_SPEED = Math.PI*2;

var WRAP_MARGIN = 30;

var RESPAWN_DELAY = 1500;

function Ship(id, x, y, dx, dy, angle, speed, fireCooldown, respawnTimer){
	this.id = id;
	this.x = x;
	this.y = y;
	this.dx = dx || 0;
	this.dy = dy || 0;
	this.angle = angle || Math.random() * Math.PI*2;
	this.speed = speed || 0;
	this.fireCooldown = fireCooldown || 0;
	this.respawnTimer = respawnTimer || null;
}


Ship.prototype.update = function(delta, controller){
	if(this.respawnTimer !== null){
		this.respawnTimer -= delta;
		return;
	}

	if(controller.turnLeft){
		this.angle -= TURN_SPEED*delta / 1000;
	}
	if(controller.turnRight){
		this.angle += TURN_SPEED*delta / 1000;
	}
	if(controller.accelerate){
		this.dx += Math.cos(this.angle) * ACCELERATION;
		this.dy += Math.sin(this.angle) * ACCELERATION;

		if(this.dx > MAX_SPEED){
			this.dx = MAX_SPEED;
		}else if(this.dx < -MAX_SPEED){
			this.dx = -MAX_SPEED;
		}
		if(this.dy > MAX_SPEED){
			this.dy = MAX_SPEED;
		}else if(this.dy < -MAX_SPEED){
			this.dy = -MAX_SPEED;
		}
	}

	this.x += this.dx*delta / 1000;
	this.y += this.dy*delta / 1000;

	while(this.x > 800 + WRAP_MARGIN){
		this.x -= 800 + WRAP_MARGIN;
	}
	while(this.x < 0 - WRAP_MARGIN){
		this.x += 800 + WRAP_MARGIN;
	}
	while(this.y > 500 + WRAP_MARGIN){
		this.y -= 500 + WRAP_MARGIN;
	}
	while(this.y < 0 - WRAP_MARGIN){
		this.y += 500 + WRAP_MARGIN;
	}

	if(this.fireCooldown > 0){
		this.fireCooldown -= delta;
	}

};


Ship.prototype.die = function(){
	this.x = -1000;
	this.y = -1000;
	this.dx = 0;
	this.dy = 0;

	this.respawnTimer = RESPAWN_DELAY;
}


exports.Ship = Ship;

})(typeof exports === 'undefined' ? this['ship'] = {} : exports);
