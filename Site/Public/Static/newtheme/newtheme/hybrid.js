$(document).ready(function() {
	/* HOME PAGE */
	$(".video-click").click(function(event){		
		event.preventDefault();
		$(".slides, .slider-controls, .slides-text").fadeOut("slow");
		$(".home-video-close").fadeIn("slow");
		$("iframe").fadeIn("slow");
	});

	$(".home-video-close").click(function(event){
		event.preventDefault();
		$(".slides, .slider-controls, .slides-text").fadeIn("slow");
		$(".home-video-close").fadeOut("slow");
		$("iframe").fadeOut("slow");
		$(".home-page-video").attr("src", ""); 		
	});

	$(".video-click").click(function(event){		
		event.preventDefault();
		var src = $(this).attr("href");
		$("html, body").animate({scrollTop: 0}, 500);
		$(".home-page-video").attr("src", src); 
	});

	/* SERVICES NAVIGATION */
	$(".services-link, .back-to-top").click(function(event){		
		event.preventDefault();
		$("html, body").animate({scrollTop:$(this.hash).offset().top}, 500);
	});

	/* LOOKBOOK SLIDESHOW */
   $('#lookbook').flexslider({
	   	slideshow: false,
		animation: "slide",
	    manualControls: ".slider-controls li",
	    controlsContainer: "#lookbook-info",
	    controlNav: true,
	    directionNav: true,
	    prevText: "&larr;",
	    nextText: "&rarr;",
	    useCSS : false,
	    minItems: 1,
	    maxItems: 4,
	    move: 1,
	    itemWidth: 800,
	    itemMargin: 10
   });  

	/* UPCOMING LICENSE list */
	$(".license-top-four").carouFredSel({
		width: '100%',
		height: 'auto',
		auto: {
			items 			: 4,
			duration		: 28500,
			easing			: "linear",
			timeoutDuration	: 0,
			pauseOnHover	: "immediate"
		}
	});
	
	$(".switch").click(function(event){		
		event.preventDefault();
		var src = $(this).attr("href");
		$("html, body").animate({scrollTop: 0}, 500);
		$(".YTV_playback iframe").attr("src", src); 
	});


	/* DISTRO LIST */
	$(".distributor").click(function(event){		
		event.preventDefault();
		var type = $(this).attr("href");
		$(this).addClass("active").siblings().removeClass("active");
		$("#retailer-logos li:not(#" + type + ")").fadeTo('slow', 0.1);

	    $("#retailer-logos li#"+ type).fadeTo('slow', 1);
	    
	});

});
