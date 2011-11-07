/*
* inspire.global.js
*
*/

var INSPIRE = INSPIRE || {};

INSPIRE.Global = (function() {
	var _hearts = [],
		_favoritedIsOPen = false,
		_itemCounter = 0;
		
	var self = {
		"init": function() {
			$('#search-form').submit(function(e) {
				e.preventDefault();
				var searchValue = $("#SearchQuery").val();
				var queryTerm = encodeURIComponent( searchValue );
				
				$('#WelcomeMessage').hide();
				$('#searchTermsContainer').append('<li><a href="" class="searchTerm" data="'+searchValue+'">'+searchValue+'</a></li>');
				$('#container').html('<div id="Loading"><img src="images/ajax-loader.gif" /></div>');
				
				INSPIRE.Request.init( queryTerm );
			  return false;
			});
			$('#search-form').find('.reset').click(function(e){
				$('#WelcomeMessage').show();
				$('#container').empty();
			});
			
			$("#container").delegate(".favoriteButton", "click", function(e){
				e.preventDefault();
				_itemCounter++;
				var $container = $('#container');
				var item = $(this).closest('.item');
				var id = 'dragItem'+_itemCounter;
				var addedItem = '<div id="'+id+'" class="heartedItem">'+item.html()+'</div>';
				$('#favoritestab').addClass('hearted');
				
				_hearts.push(addedItem);
				$('#heartedWrapper').append( addedItem );
				item.remove();
				INSPIRE.Request.doMasonry($('#container'), '.item');
				$(".heartedItem").draggable();
				//console.log($(id).draggable());
			});
	
			$('#container').delegate(".flickr_btn", "mouseover", function(e){
				e.preventDefault();
				_hideButtons();
				$(this).append('<div class="buttonHover flickrHover"></div>');
				$(this).closest('div').append('<a href="#" class="favoriteButton">Mark as Favorite</a>');
				$(this).append('<span class="type">Flickr ></span>');
			});
			
			$('#container').delegate(".twitter_btn", "mouseover", function(e){
				e.preventDefault();
				_hideButtons();
				$(this).append('<div class="buttonHover twitterHover"></div>');
				$(this).closest('div').append('<a href="#" class="favoriteButton">Mark as Favorite</a>');
				$(this).append('<span class="type">twitter ></span>');
			});
			
			$('#container').delegate(".youtube_btn", "mouseover", function(e){
				e.preventDefault();
				_hideButtons();
				$(this).append('<div class="buttonHover youtubeHover"></div>');
				$(this).closest('div').append('<a href="#" class="favoriteButton">Mark as Favorite</a>');
				$(this).append('<span class="type">youtube ></span>');
			});
			
			$('#container').delegate(".playVideoButton", "click", function(e){
				e.preventDefault();
				$(document.body).prepend('<div id="modal"><iframe id="youtube-player" src="http://www.youtube.com/embed/' + $(this).attr("data") + '" frameborder="0"></iframe></div>');
			});
			
			$(document.body).delegate(".searchTerm", "click", function(e){
				e.preventDefault();
				console.log( $(this).attr("data") );
				_doSearch( $(this).attr("data") );
			});
			
			$(document.body).delegate("#modal", "click", function(e){
				e.preventDefault();
				$('#modal').remove();
			});
			
			
			$('#favoritestab').bind('click', function(e) {
			  e.preventDefault();
				
				if(_favoritedIsOPen == false){
				
						$('#heartedContent').animate({
						top: 65
					  }, {
					    duration: 500,
					    specialEasing: {
					      width: 'linear',
					      height: 'easeOutBounce'
					    },
					    complete: function() {
					     	_favoritedIsOPen = true;
					    }
					});
				
			}else{
							$('#heartedContent').animate({
							top: '100%'
						  }, {
						    duration: 500,
						    specialEasing: {
						      width: 'linear',
						      height: 'easeOutBounce'
						    },
						    complete: function() {
						     	_favoritedIsOPen = false;
						    }
						});
				
			}
			});
		}, //end init
		
		"getObject" : function(html, type){
			return _hearts;
		}
		
	};
	
	_doSearch = function(term){
		var queryTerm = encodeURIComponent( term );
		$('#container').html('<div id="Loading"><img src="images/ajax-loader.gif" /></div>');
		INSPIRE.Request.init( queryTerm );
	}
	
	_hideButtons = function(){
		$('.buttonHover').remove();
		$('.favoriteButton').remove();
		$('.type').remove();
	}
	return self;
})();
INSPIRE.Controller.queue(INSPIRE.Global.init);
