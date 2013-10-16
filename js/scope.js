$(window).on("load", function() {
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