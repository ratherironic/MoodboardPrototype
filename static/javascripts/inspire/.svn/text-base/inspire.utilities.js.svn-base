/*
* inspire.utilities.js
*
*/

/*
  @description Normalizes the console.log method
*/
// usage: log('inside coolFunc',this,arguments);
// http://paulirish.com/2009/log-a-lightweight-wrapper-for-consolelog/
window.log = function() {
	/*@cc_on
  return;
  @*/
	if (window.isDebugMode) {
		log.history = log.history || []; // store logs to an array for reference
		log.history.push(arguments);
		if (this.console) {
			console.log(Array.prototype.slice.call(arguments));
		}
	} else {
		log.history = log.history || []; // store logs to an array for reference
		log.history.push(arguments);
	}
};

$(document).ready(function() {
	/*@cc_on
  return;
  @*/
	if (!window.isDebugMode) {
		$(document).keyup(function(e) {
			if (e.keyCode === 192 || e.keyCode === 19) {
				if (window.console) {
					log.history = log.history || []; // store logs to an array for reference
					for (var i = 0, len = log.history.length; i < len; i++) {
						console.log(Array.prototype.slice.call(log.history[i]));
					}
				}
			}
			log.history = [];
		});
	}
});