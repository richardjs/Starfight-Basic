'use strict';

(function(exports){

var ACCELERATION = 5;
var MAX_SPEED = 500;
var TURN_SPEED = Math.PI*2;
var WRAP_MARGIN = 30;

function Ship(x, y, dx, dy, angle, speed){
	this.x = x;
	this.y = y;
	this.dx = dx || 0;
	this.dy = dy || 0;
	this.angle = angle || 0;
	this.speed = speed || 0;
}


Ship.prototype.update = function(delta, controller){
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
};


exports.Ship = Ship;

})(typeof exports === 'undefined' ? this['ship'] = {} : exports);
