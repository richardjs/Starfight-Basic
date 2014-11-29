'use strict';

(function(exports){


var SHOT_SPEED = 200;
var SHOT_TTL = 1250;

var WRAP_MARGIN = 30;


function Shot(shipID, x, y, dx, dy, angle, ttl){
	this.shipID = shipID;
	this.x = x;
	this.y = y;
	if(angle){
		this.dx = dx + Math.cos(angle) * SHOT_SPEED;
		this.dy = dy + Math.sin(angle) * SHOT_SPEED;
	}else{
		this.dx = dx;
		this.dy = dy;
	}
	this.ttl = ttl || SHOT_TTL;
}


Shot.prototype.update = function(delta){
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

	this.ttl -= delta;
};


exports.Shot = Shot;

})(typeof exports === 'undefined' ? this['shot'] = {} : exports);
