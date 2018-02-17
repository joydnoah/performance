// Scroll goes to top to activate all wow animations
$(document).on("ready", function(){
  $(this).scrollTop(0);
});

$(window).load(scrollUpPage);

function scrollUpPage(){
	// http://stackoverflow.com/questions/19057731/scrolltop-on-page-reload-doesnt-work-possible-script-conflict
	$("html,body").animate({scrollTop: 0}, 1);
}

// Div is shown when document is ready to avoid a lag with the animation
$(window).on("ready", function() {
  $("body").removeClass("visibility-hidden");
});