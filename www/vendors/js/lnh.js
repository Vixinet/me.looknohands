$(document).ready(function(){
	
	$(window).resize(function() {
		resizeAreas();
	});

	$('img.michelle').bind('load', resizeAreas);

	$('a.next').show();
	$('.readMore, .readLess').css('display', 'block');
	$('.toRead, .video').hide();

	jQuery('.logo').addClass("animate-hidden").viewportChecker({
		classToAdd: 'animate-visible animated swing'
	});

	jQuery('.toAnimate').addClass("animate-hidden").viewportChecker({
		classToAdd: 'animate-visible animated fadeIn'
	});

	$('a.canMouseDown').bind('mousedown', buttonMouseDown);
	$('a.canMouseDown').bind('mouseup', buttonMouseUp);
	$('a.canMouseDown').bind('mouseout', buttonMouseOut);

	$('img.play-btn').bind('mouseenter', buttonPlayHover);
	$('img.play-btn').bind('mouseout', buttonPlayOut);
	$('img.play-btn').bind('mousedown', buttonPlayDown);
	$('img.play-btn').bind('mouseup', buttonPlayHover);
	$('img.play-btn').bind('click', buttonPlayClick);

	$('a.readMore').bind('click', readMore);
	$('a.readLess').bind('click', readLess);
	$('a.nav-on-picture.next').bind('click', galleryNext);
	$('a.nav-on-picture.prev').bind('click', galleryPrev);

	$('.work-thumb a').click(function() {
		return changeWorkPicture(this);;
	});

	$('.video-thumb a').click(function() {
		return changeVideoPicture(this, true);
	});

	// changeVideoPicture($($('.video-thumb a')[0]), false);

	$.get('last-tweet.php', cbLastTweet);
});

var buttonPlayHover = function() {
	$(this).attr('src', 'images/play-btn-hover.png');
}
var buttonPlayOut = function() {
	$(this).attr('src', 'images/play-btn.png');
}
var buttonPlayDown = function() {
	$(this).attr('src', 'images/play-btn-down.png');
}

var buttonPlayClick = function() {
	$('.video').show().attr('src', '//www.youtube.com/embed/'+$('.video-preview').attr('video-code')+'?autoplay=1&amp;rel=0&amp;showinfo=0');
	$('.play-btn').hide();
	$('.video-preview').css({'background': 'transparent'});
}

var cbLastTweet = function(data, status) {
	$('.last-tweet').append('<p class="last-tweet-text">'+data.last+'</p>');
}

var currentMichelleId = 1;

var galleryNext = function() {
	currentMichelleId++;
	refreshMichellePicture();
};

var galleryPrev = function() {
	currentMichelleId--;
	refreshMichellePicture();
};

var buttonMouseDown = function() {
	$(this).addClass('down');
};

var buttonMouseUp = function() {
	$(this).removeClass('down');
};

var buttonMouseOut = buttonMouseUp;

var readMore = function() {
	$('.toRead').fadeIn(1000);
	$(this).hide();
};

var readLess = function() {
	scrollToAnchor('my-story');
	$('.toRead').fadeOut(1000);
	$('a.readMore').show();
};


function refreshMichellePicture() {
	if(currentMichelleId == 1) {
		$('.nav-on-picture.prev').hide();
	} else {
		$('.nav-on-picture.prev').show();
	}

	if(currentMichelleId == 5) {
		$('.nav-on-picture.next').hide();
	} else {
		$('.nav-on-picture.next').show();
	}

	var url = 'images/michelle-'+currentMichelleId+'.jpg';
	$('img.michelle').fadeOut(300, function(){
		$(this).attr('src', url).bind('onreadystatechange load', function(){
			if (this.complete) $(this).fadeIn(300);
		});
	});
}

function changeWorkPicture(link) {
	scrollToAnchor('work-preview');
	$('.work-preview img').attr('src', $(link).attr('href'));
	$('.work-thumb .active').removeClass('active');
	$(link).closest('.cell').addClass('active');
	return false;
}

function changeVideoPicture(link, scroll) {
	if(scroll) scrollToAnchor('video-preview');
	
	$('.video').hide().attr('src', '');
	$('.play-btn').show();

	$('.video-preview').css({
		'background': 'url('+$(link).attr('href')+') center center no-repeat'
	}).attr('video-code', $(link).attr('video-code'))

	$('.video-thumb .active').removeClass('active');
	$(link).closest('.cell').addClass('active');

	return false;
}

function resizeAreas() {
	
	$('.nav-on-picture').css({
		top: (($('img.michelle').height()-64)/2)+'px'
	});
	$('div.michelle-picture').css({
		height: $('img.michelle').height()+'px'
	});
}

function scrollToAnchor(aid) {
    var aTag = $("#"+aid);
    $('html,body').animate({scrollTop: aTag.offset().top},'slow');
}

