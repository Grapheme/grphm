try{Typekit.load({ active: $(window).load(function(){ animateOnLoad(); })  });}catch(e){}

animateOnLoad(); 

$(function() {
				var imagePath = "http://media-cache-ak0.pinimg.com/736x/4a/77/ab/4a77aba8f172f67c5b34ca672f2f17a2.jpg";
			
				var container = $(".graphemescope");
			    var dragContainer = $(".promo");
				var kaleidoscope = new Kaleidoscope( container[0] );
			
			    // Init Drag'n'Drop 
			    var dragdrop = new DragDrop(dragContainer[0], /^image/i, function (result) {
			    	var img = new Image();
			        img.src = result;
			        kaleidoscope.image = img;
			    });
			       
			    setInterval(function() {
			    	kaleidoscope.draw();
			    }, 1000 / 30);
			
			    var image = new Image();
			    image.src = imagePath;
			    image.onload = function() {
			        kaleidoscope.image = image;
			    };
			
			    $(window).mousemove(function(event) {
					var factorx = event.pageX / $(window).width();
					var factory = event.pageY / $(window).height();
			
					kaleidoscope.angleTarget = factorx;
					kaleidoscope.zoomTarget  = 1.0 + 1.5 * factory;
			    });
			
			});