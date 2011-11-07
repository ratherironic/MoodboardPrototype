/**
	@namespace INSPIRE
	@author 
	@date Mon Jul 25 14:52:29 MDT 2011
	@description
	@requires jQuery
*/

var INSPIRE = INSPIRE || {};

INSPIRE.Twitter = (function(){
	
	/*
		-------------------------------------------------
								Begin CONSTRUCTOR
		------------------------------------------------
	*/
	
	function Twitter( name ){
		
		if ( !(this instanceof Twitter) ) { return new INSPIRE.Twitter( name ); }
		
		var self = this; 
		var _API_NAME = name; 
		var _API_URL = 'http://search.twitter.com/search.json?callback=?'; 
		var _DATA_TYPE = 'application/json; charset=utf-8'; 
		var _PAGE_NUM = 1;
		var _COMPLETE_EVENT = 'twitter.complete';
		var _API_TYPE = 'Twitter';
		var _jqXHR = null;
		var _data = {};
		
	
		var _config = {
			result_type: 'mixed', //return type mixed, popular, any
			rpp: '20', //results per page
			page: _PAGE_NUM, //page num
			lang: 'en'
	  };
		
		//and object of the data to be used when events are complete
		var _return_data = null;
		var _ids = null; 
		
		/*
			-------------------------------------------------
									Begin Private AJAX Methods
			------------------------------------------------
		*/
		
		
		var request = function(query, params){
			
			_config["q"] = query; //tags to search for
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
			
			if(data.results.length > 0){
				parse(data, textStatus); 
			}else{
				//need to tell the manager we are not going to send them anything
			}
			
		};
		var onError = function(jqXHR, textStatus, errorThrown) { 
			console.log('-- ' + _API_NAME + ' ERROR: ' + textStatus + ' ' + errorThrown + ' ---'); 
		};
		var onComplete = function(jqXHR, textStatus) { 
			//console.log('--- ' + _API_NAME + ' COMPLETED ---\n\n'); 
		};
		
		/*
			-------------------------------------------------
									Begin PARSE Method
			------------------------------------------------
		*/
		
		//custom parsing function
		var parse = function(data, textStatus){
			
			
			
			var arr = data.results; //path to tweets
			var len = arr.length;
			var item = null;
			
			for (var i = len - 1; i >= 0; i--){
				item = {};
				item['uid'] = _API_NAME + '_' + arr[i]['id_str']; // (Example: Twitter_32424345)
				item['id'] = arr[i]['id_str'];
				
				// removing this as we do not need to have links on the hastags and this is in some cases returning bad html
					//item['tweet'] = arr[i].text.replace(/((ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?)/gi,'<a href="$1">$1</a>') //set urls
					//.replace(/(^|\s)#(\w+)/g,'$1<a href="http://search.twitter.com/search?q=%23$2">#$2</a>') //set hash tags
					//.replace(/(^|\s)@(\w+)/g,'$1<a href="http://twitter.com/$2">@$2</a>'); //set user names
				
				item['profile_image'] = arr[i].profile_image_url;
				item['from_user'] = arr[i].from_user;
				item['date'] = arr[i].created_at; //Wed, 19 Jan 2011 20:42:13 +0000
				item['tweet_url'] = 'http://twitter.com/' + item['from_user'] + '/status/' + item['id'] // http://twitter.com/#!/RealTracyMorgan/status/56081598403194880
				
				item['html'] = ''
				+ '<div id="' + item['uid'] +'" class="twitter">'
				+ '<a href="" class="twitter_btn">'
				
				//+ '<h3>' + item['from_user'] + '</h3>'
				+ '<img src="' + item['profile_image'] + '" class="tweet_image" />'
				+ '<p>'
				//+ item['tweet']
				+ arr[i].text,
				+ '</p>'
				+ '<span class="tweet_date">'
				+ item['date']
				+ '</span>'
				+ '</a>'
				+ '</div>'
				+ '';
				
				_data[item['uid']] = item; //adds unique entry into _data obj for the class
			};
			
			_ids = getArrayOfObject(_data);
			
			_return_data = {
				name: _API_NAME,
				data: _data,
				names: _ids,
				textStatus: textStatus
			}
			
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
		
		//public method
		self.doRequest = function ( query, params ){
			request(query, params);
		}
		
		self.abortRequest = function(){
			if(_jqXHR != null) _jqXHR.abort();
		}
		
		//Example setter function
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
			return _API_TYPE;
		}
		
	} //end constructor
	
	
	return Twitter;
	
})(); //self calling.