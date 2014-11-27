'use strict';

(function(exports){

if(typeof require === 'function'){
	var ship = require('./ship.js');
}else{
	var ship = window.ship;
}

function Game(){
	this.ship = new ship.Ship(400, 400);
}

Game.prototype.update = function(delta){
}

exports.Game = Game;

})(typeof exports === 'undefined' ? this['game'] = {} : exports);
