/**
	@namespace INSPIRE.YouTube
	@author 
	@date Mon Jul 25 18:01:39 MDT 2011
	@description
	@requires jQuery
*/

var INSPIRE = INSPIRE || {};

INSPIRE.YouTube = (function( name ){
	
	/*
		-------------------------------------------------
							Begin INSPIRE.YouTube CONSTRUCTOR
		------------------------------------------------s
	*/
	
	function YouTube(){
		
		if ( !(this instanceof YouTube) ) { return new INSPIRE.YouTube( name ); }
		
		var self = this; //reference to object to low conflicts
		var _API_NAME = 'youtube'; //setting the internal naming convention
		
		var _API_URL = 'http://gdata.youtube.com/feeds/api/videos/'; //base URL to be used for API calls
		var _DATA_TYPE = 'application/json; charset=utf-8'; //expected data type from API ('text/plain; charset=x-user-defined' || 'application/xml; charset=utf-8')
		var _PAGE_NUM = 1;
		var _COMPLETE_EVENT = 'youtube.complete';
		var _API_TYPE = 'YouTube';
		
		var _jqXHR = null; // jQuery XMLHttpRequest (jqXHR) 
		
		var _data = {}; //internal data object
		
		//default params
		var _config = {
			v: 2,
			alt: 'json',
			'max-results': 10,
			'start-index': _PAGE_NUM, //page
			key: 'AI39si5RVUUKN_qjxBqW5HznvCI0rGJbp_febuWAHpWkW-csq8Lv8En5zim7thHJE3TmpfVc5QTWto7VqtEzZdXGevgWAW-sOg'
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
		
		
		var request = function(query, paramssss){
			
			var params = {
				'q': query
			}
			
			_API_URL = _API_URL +'?callback=?';
			
			$.extend(_config, params); //smash the objects together
			
			// Assign handlers immediately after making the request,
			// and remember the jqxhr object for this request
			_jqXHR = $.ajax({ 
				url: _API_URL,
				type: 'GET',
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
					//onError(jqXHR, textStatus, errorThrown)
				} ) //end error
				.complete( function(jqXHR, textStatus){
					//onComplete(jqXHR, textStatus)
				} ); //end complete
		} //end request
			
		
		// handlers for ajax callbacks
		var onSuccess = function(data, textStatus, jqXHR) {
			//console.log('--- ' + _API_NAME + ' ' + textStatus + ' ---');
			if(data.feed.entry.length != 0){
				parse(data, textStatus); 
			}else{
				//notify the system that results were empty
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
			
			var arr = data.feed.entry; //path to tweets
			var len = arr.length;
			var item = null;
			var id_arr = null;
			
			for (var i = len - 1; i >= 0; i--){
				item = {};
				
				id_arr = arr[i]['id']['$t'].split(':');
				
				item['id'] = _API_NAME + '_' + id_arr[3]; // (Example: YouTube_32424345)
				item['video_id'] = id_arr[3];
				item['author'] = arr[i]['author'][0]['name']['$t'];
				item['url'] = arr[i]['link'][0]['href'];
				item['title'] = arr[i]['title']['$t'];
				item['thumbnail'] = arr[i]['media$group']['media$thumbnail'][0]['url'];
				item['image'] = arr[i]['media$group']['media$thumbnail'][1]['url'];
				
				//show image
				//show iframe
					item['html'] = ''
					+ '<div id="' + item['id'] +'" class="youtube">'
					+ '<a href="" class="youtube_btn">'
				//show iframe - removing since this is flash everytime masonry adjusts the layout, the video iframe reload causing the page to render slowly
					//+ '<iframe width="256" height="144" src="http://www.youtube.com/embed/'+item['video_id']+'" frameborder="0" allowfullscreen></iframe>'
				//show image	
					+ '<img src="' + item['image'] + '" alt="'+item['title']+'" title="'+item['title']+'" />'
					+ '</a>'
					+ '<a href="http://www.youtube.com/v/'+item['video_id']+'" class="playVideoButton" data="'+item['video_id']+'">Play Video</a>'
					+ '</div>'
					+ '';
				
				_data[item['id']] = item; //adds unique entry into _data obj for the class
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
						Begin PUBLIC methods for INSPIRE.YouTube
			------------------------------------------------
		*/
		
		//public method
		self.doRequest = function (query, params ){
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
	
	
	return YouTube;
	
})(); //self calling.