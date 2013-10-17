jQuery(function($) {
	$(window).on("load", function() {

function animateOnLoad() {
	var $fTop = $('.promo h1');
	var $fBot = $('.promo .company-desc');	
	var $sep = $('.promo .sep');
	$fTop.animate({ opacity: '1' }, 1200 ).css({'-moz-transform': 'translate(0px, 0px)', '-o-transform': 'translate(0px, 0px)', '-webkit-transform': 'translate3d(0px, 0px, 0px)', '-ms-transform': 'translate(0px, 0px)', 'transform': 'translate(0px, 0px)'}); 
	$fBot.animate({ opacity: '1' }, 1200 ).css({'-moz-transform': 'translate(0px, 0px)', '-o-transform': 'translate(0px, 0px)', '-webkit-transform': 'translate3d(0px, 0px, 0px)', '-ms-transform': 'translate(0px, 0px)', 'transform': 'translate(0px, 0px)'});	
	$sep.animate({ opacity: '1' }, 1600 );
}
function adjustPromoHeight() {
	var winHeight = $(window).height();
	var headerHeight = $('header').height();
	var footerHeight = $('footer').height();
	var resizeBlock = $('article .promo');
	resizeBlock.height( winHeight - ( footerHeight + headerHeight) );
}
function fadeInNavIfNone() {
	var nav = $('nav'),
		windowObj = $(window);	
		
	if ( windowObj.width() > 1003 && nav.attr( 'style' ) ) {
		$('nav, .phone, .mailto').removeAttr( 'style' );
	}
}
$(document).ready( function(){
	adjustPromoHeight();
});
$(window).resize( function(){
	adjustPromoHeight();
	fadeInNavIfNone();
});
$(".scroll, #menu-item-portfolio").click(function() {
    $('html, body').animate({
        scrollTop: $(".portfolio").offset().top
    }, 2000);
});
$('.morelink').click( function(){
	var nav = $('nav'),
	    others = $('.phone, .mailto');
	    
	    if ( nav.css('display') == 'none' ) { 
	    	nav.slideToggle( 800, function() { others.fadeIn( 800 ); });
	    }
	    else {
	    	others.fadeOut( 600, function() { 
	    							others.removeAttr( 'style' ); 
	    							nav.slideUp( 600, function() {
	    							  	 nav.removeAttr( 'style' ); 
	    							}); 
	    						 });
	    }
});



	Typekit.load();
	animateOnLoad();

	var scopeImages = [
		"http://media-cache-ec0.pinimg.com/736x/ba/30/13/ba3013a07ff3508095064edc2e0829a0.jpg",
		"http://media-cache-ec0.pinimg.com/236x/6f/77/57/6f7757a20914c650ecbd3c61b7b3d68e.jpg",
		"http://media-cache-ec0.pinimg.com/736x/aa/1e/7f/aa1e7f7313191a261525056e58a937e6.jpg"
	];

	try {
		var container = $(".graphemescope"); 			    
		var dragContainer = $(".promo");

		var scope = new Graphemescope( container[0] );

		var currentIndex = 0;
		function changeImage() {
			scope.setImage(scopeImages[currentIndex]);
			currentIndex = (currentIndex + 1) % scopeImages.length;

			setTimeout(changeImage, 8000);
		}

		changeImage();

	    var dragdrop = new DragDrop(dragContainer[0],  function (files) {
	        var filter = /^image/i;
	        var file = files[0];

	        if(filter.test(file.type)) {
	            var reader = new FileReader();
	            reader.onload = function(event) {
	                scope.setImage( event.target.result );
	            };
	            reader.readAsDataURL(file);
	        } 
	    });


	    function moveKaleidoscope(factorx, factory) {
	            scope.kaleidoscope.angleTarget = factorx;
	            scope.kaleidoscope.zoomTarget  = 1.0 + 0.5 * factory;
	    }

	    $(window).mousemove(function(event) {
	        moveKaleidoscope(
	            event.pageX / $(window).width(),
	            event.pageY / $(window).height()
	        );
	    });

	    dragContainer.on("touchmove", function(evt) {
	        evt.preventDefault();
	        var originalEvent = evt.originalEvent;
	        
	        var touch = originalEvent.touches[0];  
	        moveKaleidoscope(
	            touch.pageX / $(window).width(),
	            touch.pageY / $(window).height()
	        );
	    });

	} catch(e) {}
});	


});
