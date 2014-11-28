'use strict';

(function(exports){

function Ship(x, y, angle, speed){
	this.x = x;
	this.y = y;
	this.angle = angle || 0;
	this.speed = speed || 0;
}


Ship.prototype.update = function(delta){
	var dx = Math.cos(this.angle) * this.speed;
	var dy = Math.sin(this.angle) * this.speed;
	this.x += dx*delta / 1000;
	this.y += dy*delta/1000;
};


exports.Ship = Ship;

})(typeof exports === 'undefined' ? this['ship'] = {} : exports);
