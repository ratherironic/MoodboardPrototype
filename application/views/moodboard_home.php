<!DOCTYPE html>
<!--[if lt IE 7 ]><html lang="en" class="ie6"><![endif]-->
<!--[if IE 7 ]><html lang="en" class="ie7"><![endif]-->
<!--[if IE 8 ]><html lang="en" class="ie8"><![endif]-->
<!--[if IE 9 ]><html lang="en" class="ie9"><![endif]-->
<!--[if (gt IE 9)|!(IE)]><!--><html lang="en"><!--<![endif]-->
	<head>
		<meta charset="utf-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
		<title>inspire</title> 
		<link rel="stylesheet" href="<?=$base_url?>/static/stylesheets/reset.css" />
		<link rel="stylesheet" href="<?=$base_url?>/static/stylesheets/inspire/inspire.global.css" />
		<link href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/base/jquery-ui.css" />
		<link href='http://fonts.googleapis.com/css?family=Terminal+Dosis:800,200' rel='stylesheet' type='text/css'>
	</head>
	<body class="inspire">
		<!-- BEGIN: Page -->
		<header>
			<h1><a id="logo" class="logo" href="/">The Catalyst</a></h1>
			<form id="search-form">
				<fieldset>
					<input class="button reset" type="reset" value="reset" />
					<input name="q" placeholder="Get Creative" autocomplete="off" type="text" id="SearchQuery" />
					<input class="button submit" type="submit" value="go" />
				</fieldset>
			</form>
			<ul>
				<li class="setting">
					<ul id="SettingsDropDown">
						<li><a href="http://www.twitter.com"><span class="twitter"></span>Twitter</a></li>
						<li><a href="http://www.flickr.com"><span class="flickr"></span>Flickr</a></li>
						<li><a href="http://www.vimeo.com"><span class="vimeo"></span>Vimeo</a></li>
						<li><a href="http://www.youtube.com"><span class="youtube"></span>Youtube</a></li>
						<li><a href="http://www.wikipedia.com"><span class="wikipedia"></span>Wikipedia</a></li>
						<li><a href="http://www.wordnik.com"><span class="wordnik"></span>Wordnik</a></li>
						<li class="bottom"></li>
					</ul>
				</li>
			</ul>
		</header>		
		<div id="container"></div>
		<div id="WelcomeMessage">
			<img src="<?=$base_url?>/static/images/bkg.logo.png" alt="catalyst" />
			<p class="welcome">welcome to the</p>
			<h3>Catalyst</h3>
			<p class="sub-top">the simple search tool</p>
			<p class="sub">to kickstart your creativity</p>
			<p class="journey">Just search a term to start your journey!</p>
		</div>
		<div id="heartedContent">	
			<a id="favoritestab" href="/viewfavorites" class="viewHeartedContent greyButton">View Favorites</a>
			<div id="heartedWrapper">
				<h2>Recent Searches | Favorite Pieces :</h2>
				<ul id="searchTermsContainer"></ul>
			</div>
		</div>
		<!-- END: Page -->
		<script src="<?=$base_url?>/static/javascripts/LAB/LAB.min.js"></script>
		<script>
			$LAB
			.script("<?= $base_url?>/static/javascripts/plugins/jquery-1.6.min.js").wait()
			.script("http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/jquery-ui.min.js").wait()
			.script("<?=$base_url?>/static/javascripts/plugins/jquery.masonry.min.js").wait()
			.script("<?=$base_url?>/static/javascripts/inspire/inspire.flickr.js")
			.script("<?=$base_url?>/static/javascripts/inspire/inspire.twitter.js")
			.script("<?=$base_url?>/static/javascripts/inspire/inspire.youtube.js")
			.script("<?=$base_url?>/static/javascripts/inspire/inspire.request.js")
			.script("<?=$base_url?>/static/javascripts/inspire/inspire.controller.js")
			.script("<?=$base_url?>/static/javascripts/inspire/inspire.global.js")
			.script("<?=$base_url?>/static/javascripts/inspire/inspire.utilities.js")
		</script>
	</body>
</html>
