/*
* inspire.controller.js
*
*/

var INSPIRE = INSPIRE || {};

INSPIRE.Controller = (function() {
	
	var _initQueue = [];
	
	var self = {
		"init": function() {
			if (_initQueue.length > 0) {
				for (var i = 0; i < _initQueue.length; i++) {
					if (typeof _initQueue[i] === "function") {
						_initQueue[i]();
					}
				}
				_initQueue = [];
			}
		}, // end init
		"queue": function() {
			if (arguments.length > 0) {
				for (var j = 0; j < arguments.length; j++) {
					_initQueue.push(arguments[j]);
				}
			}
		} // end queue
	};
	return self;
})();

$(function() {
	INSPIRE.Controller.init();
});
