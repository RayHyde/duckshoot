$(function() {
	//some basic variables, nothing much here
	var $gallery = $('#gallery'),
			duckQty = ($gallery.width() / 100) + 2, //number of ducks is dependent on the width of the gallery
			count = 0,
			$counter = $('#counter'),
			shots = duckQty * 2, //you get twice as many bullets as there are ducks
			$tries = $('#tries'),
			gameOver = 0,
			holeCount = 1;

	/*** FUNCTIONS ***/

	//calls a new row of moving duscks and resets the score
	function start() {
		$counter.find('.ducks').html(duckQty);
		$tries.find('.shots').html(shots);
		$('.plural').show();

		$gallery.css({'cursor': 'url(../img/crosshairs.png) 25 25, crosshair'});
		for ( var i = 0; i < duckQty; i++ ) {
			$('.duckwrap').append('<div class="duck duck' + i + '"></div>');
			$('.duck'+ i).css('animation-delay', (i * 500) + 'ms');
		}
	}

	/*** INITIALS ***/

	//calls a new row of moving ducks and resets the score
	start();

	/*** EVENTS ***/

	//This happens when you click anywhere in the gallery
	$gallery.click(function(e) {
		if (gameOver == 0) {
			if (shots >= 1) {
				shots--; //countdown the # of bullets left
			}
			$tries.find('.shots').html(shots); //add it to the scoreboard
			if (shots == 1) {
				//hide the "s" in the scoreboard if only one duck is left
				$tries.find('.plural').hide();
			}
			if (shots == 0) { //if no shots are left
				$tries.find('.plural').show();
				$('#card.alas').show();
				gameOver = 1;
				$gallery.css({'cursor': 'default'});
			}
		}
	//leave some holes:
	var parentOffset = $(this).offset();
	var relX = e.pageX - parentOffset.left;
	var relY = e.pageY - parentOffset.top;
	if (holeCount != 0) {
		//if a duck is hit, remove its hole from the gallery background
		$gallery.append('<div class="hole" style="left:' + relX + 'px; top:'+relY+'px"></div>');
	}
	holeCount = 1;
	});

	//this happens when you hit a duck
	$('.duckwrap').on('click', '.duck', function() {
		if (gameOver == 0) {
			$(this)
			//dead ducks can fly!
			.animate({width: 500, height: 500, top:-600},500);
			count++;
			$counter.find('.ducks').html(duckQty - count);
			if (count == duckQty - 1) {
				//hide the "s" in the scoreboard if only one duck is left
				$counter.find('.plural').hide();
			} else {
				$counter.find('.plural').show();
			}
			if (count == duckQty) {
				$('#card.hooray').fadeIn('slow');
				gameOver = 1;
				$gallery.css({'cursor': 'default'});
			}
		}
		holeCount = 0;
	});

	//what would a funfair be without a giant useless prize?
	$('.collect').click(function() {
		$('#teddy').fadeIn('slow');
	});

	$('#teddy .closeTeddy').click(function() {
		$('#teddy').fadeOut('slow');
	});

	//Try again
	$('.again').click(function(){
		count = 0;
		holeCount = 1;
		gameOver = 0;
		$('.hooray').hide();
		$('.alas').hide();

		shots = (duckQty * 2) + 1;
		$('.duck').remove();
		start();
	});


});
