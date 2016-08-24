$(document).ready(function() {
	// LOGIN
	$('.login').find('p').click(function() {
    $('.login').find('.dropdown-menu').fadeToggle("fast", "linear");
  });
  
	$('.kindOfPipe-group').find('.dropdown-toggle').click(function() {
		$('.kindOfPipe-group').find('.dropdown-menu').fadeToggle(200);
	});
	// /LOGIN
	
	// ACCORDION
  $( "#accordion" ).accordion({
		heightStyle: "content",
		collapsible: true
	});
	// /ACCORDION
	
		// MENU
	$('.icon-menu').click(function() {
		$('.menu').animate({
			left: '0px'    
		}, 300);
		$('.header').find('.icon-menu').fadeOut(300);
	});
	
	$('.icon-close').click(function() {
		$('.menu').animate({
			left: '-285px'
		}, 300);
		$('.header').find('.icon-menu').fadeIn(300);
	});
	// /MENU
});