'use strict';

(function(exports){

if(typeof require === 'function'){
	var ship = require('./ship.js');
}else{
	var ship = window.ship;
}


function Game(){
	this.ships = [];
}


Game.prototype.update = function(delta){
	this.ships.forEach(function(ship){
		ship.update(delta);
	});
}


exports.Game = Game;


})(typeof exports === 'undefined' ? this['game'] = {} : exports);
