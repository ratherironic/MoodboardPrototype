/*
* inspire.request.js
*
*/

var INSPIRE = INSPIRE || {};

INSPIRE.Request = (function() {
	
	var _flickr = { name: 'Flickr', type: 'Flickr', params: {} },
		_twitter = { name: 'Twitter', type: 'Twitter', params: {} },
		_wordnik = { name: 'Wordnik', type: 'WordnikRelated', params: {} },
		_youtube = { name: 'YouTube', type: 'YouTube', params: {} },
		_flickr_instagram = { name: 'Flickr-Instagram', type: 'Flickr', params: { machine_tags: 'uploaded:by=instagram' } },
		 _flickrRequest,
		_flickrRequestInstagram,
		_twitterRequest,
		_youtubeRequest,
		_outputData = [],
		_totalRequests = 0,
		_maxRequests = 3;

	var self = {
	
		"init": function ( queryTerm ) {
			_outputData = [];
			_totalRequests = 0;
			
			/***************************/
			/* Plug-ins                */
			/***************************/
			
			_flickrRequest = INSPIRE.Flickr('flickr');
			_flickrRequest.doRequest( queryTerm, _flickr );
		
			_twitterRequest = INSPIRE.Twitter('twitter');
			_twitterRequest.doRequest( queryTerm, _twitter );
			
			_youtubeRequest = INSPIRE.YouTube('youtube');
			_youtubeRequest.doRequest( queryTerm, _youtube );
			
			/***************************/
			/* Event listeners         */
			/***************************/
			$(window).bind('flickr.complete', function(e, name){ 
				_handleRequest(e, name);
				$(window).unbind('flickr.complete');
			});

			$(window).bind('twitter.complete', function(e, name){ 
				_handleRequest(e, name); 
				$(window).unbind('twitter.complete');
			});

			$(window).bind('youtube.complete', function(e, name){ 
				_handleRequest(e, name);
				$(window).unbind('youtube.complete'); 
			});
			
 			$(window).bind('objects.complete', _buildView);
			
		}, //end init
		
		"doMasonry" : function (object, element){
			object.imagesLoaded(function(){
			  object.masonry({
				isAnimated: true,
				isFitWidth: true,
		    	itemSelector : element,
				gutterWidth: 5,
		    	columnWidth : 130
			  });
			});
		}
	};
	
	_handleRequest = function(e, name){
		var data = null,
			className = "";

		switch( name )
		{
			case "twitter":
				//get twitter data
				data = _twitterRequest.getData();
				className = "col1";
				break;
			case "flickr":
				//get flickr data
				data = _flickrRequest.getData();
				className = "col2";
				break;
			case "instagram":
				//get wordnik data
				data = _flickrRequestInstagram.getData();
				className = "col2";
				break;
			case "youtube":
				//get youtube data
				data = _youtubeRequest.getData()
				className = "col3";
				break;
			default:
		}
		
		//console.log('LENGTH = '+ data.names.length);
		
		for (var i = data.names.length - 1; i >= 0; i--){
			var html = '<div class="item '+className+'">';
			var id = data.names[i];
			var item = data.data[id]['html'];
			html += item;
			html += '</div>';
			_outputData.push( html );
		};
		
		$(window).trigger('objects.complete');
	}
	
	_buildView = function(){
		var $container = $('#container');
		
		$('#Loading').remove();
		
		_totalRequests++;
			
		if(_totalRequests >= _maxRequests){
			
			$container.masonry('destroy');
			
			for (var i = _outputData.length - 1; i >= 0; i--){
				var item = Math.floor(Math.random() * _outputData.length);
				$container.append( _outputData[item] );
				_outputData.splice( item, 1 );
			}
			
			self.doMasonry($container);
			$(window).unbind('objects.complete');
		
		}	
	}
	
	return self;
})();
