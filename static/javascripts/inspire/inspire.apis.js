/*
* inspire.global.js
*
*/

var INSPIRE = INSPIRE || {};

INSPIRE.Apis = (function() {

	var self = {
	
		"init": function() {

			/***************************/
			/* Plug-ins                */
			/***************************/
			
			/* debug */ log("Global plug-ins initialized");

			/***************************/
			/* Event listeners         */
			/***************************/

			/* debug */ log("Global bindings complete");
			
			
		} //end init
	};
	return self;
})();
INSPIRE.Controller.queue(INSPIRE.Apis.init);
