$(document).ready(function() {
	// Открытие ul
	$('.dropdown-btn').click(function() {
		$(this).parent().find('.dropdown-menu').fadeToggle("fast", "linear");
	});
	// /Открытие ul
	
	
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
	
	// События по клику мимо
	$(document).click(function(event){
		//MENU
		if ($(event.target).hasClass('fa')) return;
		if ($(event.target).closest(".menu").length) return;
		$('.menu').animate({
			left: '-285px'
		}, 300);
		$('.header').find('.icon-menu').fadeIn(300);
		event.stopPropagation();
		// /MENU
		
		if ($(event.target).closest(".login").length) return;
		$('.login').find('.dropdown-menu').fadeOut("fast", "linear");
	});
	// /События по клику мимо
});