'use strict';

(function(exports){

function Ship(x, y){
	this.x = x;
	this.y = y;
}

exports.Ship = Ship;

})(typeof exports === 'undefined' ? this['ship'] = {} : exports);
