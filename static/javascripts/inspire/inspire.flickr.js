/**
	@namespace INSPIRE
	@author 
	@date Mon Jul 25 14:26:59 MDT 2011
	@description
	@requires jQuery
*/

var INSPIRE = INSPIRE || {};

INSPIRE.Flickr = (function(){
	
	/*
		-------------------------------------------------
								Begin CONSTRUCTOR
		------------------------------------------------
	*/
	
	function Flickr(name){
		
		if ( !(this instanceof Flickr) ) { return new INSPIRE.Flickr(name); }
		
		var self = this; //reference to object to low conflicts
		var _API_NAME = name; //setting the internal naming convention
		var _API_URL = 'http://api.flickr.com/services/rest/?jsoncallback=?'; //base URL to be used for API calls
		var _DATA_TYPE = 'application/json; charset=utf-8'; //expected data type from API ('text/plain; charset=x-user-defined' || 'application/xml; charset=utf-8')
		var _PAGE_NUM = 1;
		var _COMPLETE_EVENT = 'flickr.complete';
		var _API_TYPE = "Flickr";
		
		var _jqXHR = null; // jQuery XMLHttpRequest (jqXHR) 
		
		var _data = {}; //internal data object
		
		//default params
		var _config = {
			api_key: "3e7d277fbcb5d06a8e82b4b9a7adb348",
			per_page: "20",
			page: _PAGE_NUM,
			media: "photos",
			format: "json",
			tagmode: "any",
			method: "flickr.photos.search"
	  };
		
		//and object of the data to be used when events are complete
		var _return_data = null;
		var _ids = null; //array of unique IDS in the return data object
		
		//console.log('{{ setup ' + _API_NAME + ' data }}');
		
		
		/*
			-------------------------------------------------
									Begin Private AJAX Methods
			------------------------------------------------
		*/
		
		
		var request = function(query, params){
			
			_config["tags"] = query; //tags to search for
			$.extend(_config, params); //smash the objects together
			
			// Assign handlers immediately after making the request,
			// and remember the jqxhr object for this request
			_jqXHR = $.ajax({ 
				url: _API_URL,
				type: 'POST',
				dataType: 'json', //xml, html, script,json,jsonp,text
				contentType: _DATA_TYPE,
				data: _config,
				global: false,
				crossDomain: true,
				statusCode: {
				    404: function() {
				      console.error('404 ' + _API_URL +  'page not found');
				    }
				  }, //end status codes
				timeout: 5000 //2 secs
				 })
				.success( function(data, textStatus, jqXHR){
					onSuccess(data, textStatus)
				} ) //end success
				.error( function(jqXHR, textStatus, errorThrown){
					onError(jqXHR, textStatus, errorThrown)
				} ) //end error
				.complete( function(jqXHR, textStatus){
					onComplete(jqXHR, textStatus)
				} ); //end complete
		} //end request
		
		// handlers for ajax callbacks
		var onSuccess = function(data, textStatus, jqXHR) {
			//console.log('--- ' + _API_NAME + ' ' + textStatus + ' ---');
			parse(data, textStatus); 
		};
		var onError = function(jqXHR, textStatus, errorThrown) { 
			console.log('-- ' + _API_NAME + ' ERROR: ' + textStatus + ' ' + errorThrown + ' ---'); 
		};
		var onComplete = function(jqXHR, textStatus) { 
			//console.log('--- ' + _API_NAME + ' COMPLETED ---\n\n'); 
		};
		
		/*
			-------------------------------------------------
									Begin PRIVATE PARSE Method
			------------------------------------------------
		*/
		
		//custom parsing function
		var parse = function(data, textStatus){
			
			var arr = data.photos.photo; //path to tweets
			var len = arr.length;
			var item = null;
			
			for (var i = len - 1; i >= 0; i--){
				item = {};
				item['uid'] = _API_NAME + '_' + arr[i]['id']; // (Example: Flickr_32424345)
				item['id'] = arr[i]['id'];
				var imageURL = 'http://farm'+ arr[i].farm +'.static.flickr.com/'+ arr[i].server +'/'+ arr[i].id +'_'+ arr[i].secret + '_m' + '.jpg';
				item['html'] = ''
				//+ _config.before //adds li element if needed
				+ '<div id="' + item['uid'] +'" class="flickr">'
				+ '<a href="'+imageURL+'" class="flickr_btn">'
				+ '<img id="'+item['id']+'" src="'+imageURL+'" title="' +arr[i].title+ '" />' //close tag
				+ '</a>'
				+ '</div>'
				+ '';
				item.url = 'http://www.flickr.com/photos/' + arr[i].owner + '/' + arr[i].id;
				item.title = arr[i].title;
				item.owner = arr[i].owner;
				
				_data[item['uid']] = item; //adds unique entry into _data obj for the class
			};
			
			_ids = getArrayOfObject(_data);
			
			_return_data = {
				name: _API_NAME,
				data: _data,
				names: _ids,
				textStatus: textStatus
			}
			
			//console.log(_return_data);
			console.log('--- ' + _API_NAME + ' parsing data complete ---');
			
			//return _return_data;
			$(window).trigger(_COMPLETE_EVENT, _API_NAME );
		}
		
		/*
			-------------------------------------------------
									Begin PRIVATE UTILITY methods
			------------------------------------------------
		*/
		
		
		//RECOMENDED MOVE TO A UTIL CLASS
		var getArrayOfObject = function(obj){
			var arr = [];

			for (item in obj){
				arr.push(item);
			}
			return arr;
		}		
		
		/*
			-------------------------------------------------
									Begin PUBLIC methods
			------------------------------------------------
		*/
		
		//public method to allow new requests to be made through the current object
		self.doRequest = function ( query, params ){
			request(query, params);
		}
		
		//kills all active requests to the api
		self.abortRequest = function(){
			if(_jqXHR != null) _jqXHR.abort();
		}
		
		//Example setter function to reset the APIS name
		self.setName = function (value){
			_API_NAME = value;
		}
		
		//Example getter function
		self.getName = function(){
			return _API_NAME;
		}
		
		//Example of getting data
		self.getData = function (){
			return _return_data;
		}
		
		//return page num
		self.getPageNum = function(){
			return _PAGE_NUM;
		}
		
		//return api type
		self.getType = function(){
			return "Flickr";
		}
		
	} //end constructor
	
	
	return Flickr;
	
})(); //self calling.