'use strict';

(function(exports){


var SHOT_SPEED = 200;
var SHOT_TTL = 1250;


function Shot(x, y, dx, dy, angle, ttl){
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

	this.ttl -= delta;
};


exports.Shot = Shot;

})(typeof exports === 'undefined' ? this['shot'] = {} : exports);
