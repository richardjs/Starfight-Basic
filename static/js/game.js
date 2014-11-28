'use strict';

(function(exports){

if(typeof require === 'function'){
	var ship = require('./ship.js');
}else{
	var ship = window.ship;
}


function Game(){
	this.ships = [];
	this.controllers = [];
}


Game.prototype.update = function(delta){
	for(var i = 0; i < this.ships.length; i++){
		this.ships[i].update(delta, this.controllers[i]);
	}
}


exports.Game = Game;


})(typeof exports === 'undefined' ? this['game'] = {} : exports);
