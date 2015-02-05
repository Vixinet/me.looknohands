<?php
	
	require_once('TwitterOAuth.php');

	define('CONSUMER_KEY', 'ChLDCtTLfeEx7nZBtMtqm5bwt');
	define('CONSUMER_SECRET', 'pzEXAeVoFRA4o2219ugjNJL1IFGgG28IkVYqxhUYK0z51hmnAA');
	define('ACCESS_TOKEN', '557657519-Ul2ZH8nW5oGXIwcUAfODA32npEmtR95hhz6hOYDV');
	define('ACCESS_TOKEN_SECRET', 'jijyp0CLQXG4K2ABki8BShNxQdvrpUKBv5fm6rLthSDyT');

	# Create the connection
	$twitter = new TwitterOAuth(CONSUMER_KEY, CONSUMER_SECRET, ACCESS_TOKEN, ACCESS_TOKEN_SECRET);

	# Migrate over to SSL/TLS
	$twitter->ssl_verifypeer = true;

	# Load the Tweets
	$tweets = $twitter->get('statuses/user_timeline', array(
		'screen_name' => 'michelle_vandy', 
		'exclude_replies' => 'true', 
		'include_rts' => 'false', 
		'count' => 1));

	$_tweets = array();

	if(!empty($tweets)) {
	    foreach($tweets as $tweet) {
	    	
	        # Access as an object
	        $tweetText = $tweet->{'text'};

	        # Make links active
	        $tweetText = preg_replace("#(http://|(www.))(([^s<]{4,68})[^s<]*)#", '<a href="http://$2$3" target="_blank">$1$2$4</a>', $tweetText);
	        # Linkify user mentions
	        $tweetText = preg_replace("/@(w+)/", '<a href="http://www.twitter.com/$1" target="_blank">@$1</a>', $tweetText);
	        # Linkify tags
	        $tweetText = preg_replace("/#(w+)/", '<a href="http://search.twitter.com/search?q=$1" target="_blank">#$1</a>', $tweetText);

	        # Output
	        $_tweets[] = $tweetText;
	    }
	}

	header('Content-Type: application/json');
	die(json_encode(array('last' => $_tweets[0])));
?>