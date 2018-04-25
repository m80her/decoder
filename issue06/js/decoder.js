/* =============================================================================
   Functions
   ========================================================================== */


// make page full screen height
function pageHeight() {
	var vHeight = $(window).height();
	$('body').css({'height': (vHeight - 20) });
	if (vHeight > 700) {
		$('footer').addClass('fixed');
	}
}

// set nav and subnav item widths
function navItemWidths() {
			
	// count the number of total nav items
	var navItemsTotal = $('nav ul li').length;
	var subNavItems = $('nav ul li ul li').length;
	var navCategories = navItemsTotal - subNavItems;
	
	// alert(navItemsTotal);
	// alert(subNavItems);
	// alert(navCategories);
	
	// divide the width by number of nav items to get the width for each
	var itemWidth = Math.floor(940 / subNavItems);
	
	$('nav ul:first-child > li ul').each(function() {
				
		// count the number of nav items in each category
		var subNavItems = $(this).children('li').length;
		
		// multiply the number of nav items in each category by the dynamic item width
		var categoryWidth = (subNavItems * itemWidth);
		
		// set the width of the category
		$(this).css({'width': (categoryWidth - 6) + 'px'}).addClass('block');
		$(this).parents('li').css({'width': (categoryWidth - 7) + 'px'});
		$(this).parents('li').children('div').css({'width': (categoryWidth - 16) + 'px'});
		
	});
	
	$('nav ul:first-child > li ul li').css({'width': (itemWidth - 21)});
			
}

// slide in the nav categories and slide down the nav items
$.fn.navCategories = function() {
	var navCategory = $('.contents nav ul:first-child li').first();
	var $id = setInterval(function() {
		navCategory.addClass('animate');
		navCategory = navCategory.next();
		if (navCategory.length == 0) {
			clearInterval($id);
		}
	}, 160);
}

/*
$.fn.navCategorItems = function() {
	var navItems = $('.contents nav ul:first-child li').first();
	var $id = setInterval(function() {
		navItems.navItemsAnimate();
		navItems = navItems.next();
		if (navItems.length == 0) {
			clearInterval($id);
		}
	}, 80);
}
*/	

$.fn.navItemsAnimate = function() {
	var navItem = $('nav ul li ul li');
	var $id = setInterval(function() {
		navItem.addClass('animate');
		navItem = navItem.next();
		if (navItem.length == 0) {
			clearInterval($id);
		}
	}, 80);
}
	

function navToggle() {
	
	if ($('html').hasClass('touch')) {
		
		// touch nav to reveal all subnavs
		$('nav#primaryNav ul').bind('click', function() {
			$(this).children('li').children('ul').toggleClass('animated');
		})
		
	} else {
		
		// hover to reveal individual subnavs
		$('nav#primaryNav li').hover(function() {
			$(this).children('ul').addClass('animated');
		}, function() {
			$(this).children('ul').removeClass('animated');
		});
		
	}
	
}

function cover() {

	$('#page').addClass('animate');
	
	// cycle through the screenshots
	function phone() {
		var navCategory = $('.cover .phone .screen div').first();
		var $id = setInterval(function() {
			navCategory.addClass('animate');
			navCategory = navCategory.next();
			if (navCategory.length == 0) {
				clearInterval($id);
			}
		}, 600);
	}
	
	phone();
	
	// animate the ribbon
	function ribbon() {
		var navCategory = $('.cover .ribbon div').first();
		var $id = setInterval(function() {
			navCategory.addClass('animate');
			navCategory = navCategory.next();
			if (navCategory.length == 0) {
				clearInterval($id);
			}
		}, 360);
	}
	
	ribbon();
		
}


function apps() {
	
	function appIcons() {
		var navCategory = $('.appIcons li').first();
		var $id = setInterval(function() {
			navCategory.addClass('animate');
			navCategory = navCategory.next();
			if (navCategory.length == 0) {
				clearInterval($id);
			}
		}, 160);
	}
		
	$('.copy').addClass('animateIn');
	$('.copy a').bind('click', function() {
		$('.copy').removeClass('animateIn').addClass('animateOut');
		appIcons();
		$('.appIcons li').bind('click' , function() {
			$('.appIcons li').removeClass('animate');
			
			var app = $(this).attr('class');
			
			$('.appInfo').addClass('animate');
			
			$('.appInfo .'+ app).show();
			
			$('.close').bind('click', function() {
				$('.appInfo').removeClass('animate');
				appIcons();
				$('.appInfo .'+ app).hide();
			});
			
		});
		
	});
	
}



function awards() {
	
	// scale in the h1
	$('.awards h1').addClass('animate');
	
	// add the animate class to the h1 spans
	function awardsH1() {
		var navCategory = $('.awards h1 span').first();
		var $id = setInterval(function() {
			navCategory.addClass('animate');
			navCategory = navCategory.next();
			if (navCategory.length == 0) {
				clearInterval($id);
			}
		}, 200);
	}

	// awardsH1();

	// scale in the map
	$('.awards .map').addClass('animate');
	
	// slide up the header copy
	$('.awards .headerCopy').addClass('animate');
	
	// side up the map key
	$('.awards .mapKey').addClass('animate');
	
	// animate in the pins
	$('.awards .map ul:first-child li').addClass('animate');
	
	// open the popups
	$('.awards .map li .pin').bind('click', function() {
		// close all other popups
		$('.popup').removeClass('open');
		
		// open this popup
		$(this).siblings('.popup').addClass('open');
		
		// display the first info tab and make first tab link active
		$(this).siblings('.popup').find('.tab_01').addClass('active');
		
		// alternate display of info tabs and tab link active states
		$(this).siblings('.popup').find('ul li a').bind('click', function() {
			$('.popup .active').removeClass('active');
			$(this).addClass('active');
			
			var tab = $(this).attr('class').split(" ")[0];
			
			$('.popup .info .'+tab).addClass('active');
			
		});
		
		$('#page, .popup .close').bind('click', function() {
			$('.popup').removeClass('open');
			$('.popup').find('.active').removeClass('active');
		});
		
		$('.popup').click(function(event) {
			event.stopPropagation();
		});
		
		return false;		
	});
	
}



/* =============================================================================
   On Docuent Ready
   ========================================================================== */

$(document).ready(function() {

	// viewport height
	pageHeight();
	
	// set nav and subnav item widths
	navItemWidths();
	navToggle();
	
	// contents page nav animations
	if ($('#page').hasClass('contents')) {
		$(this).delay(400).queue(function() {
			$(this).navCategories();
			$(this).dequeue();
		});
		$(this).delay(1800).queue(function() {
			$(this).navItemsAnimate();
			$(this).dequeue();
		});
	}
	
	$('header nav').css({'opacity': '1'});
	
	if ($('#page').hasClass('cover')) {
		cover();
	}
	
	if ($('#page').hasClass('apps')) {
		apps();
	}
	
	if ($('#page').hasClass('awards')) {
		awards();
	}
		
});
