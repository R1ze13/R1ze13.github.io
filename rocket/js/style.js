$(document).ready(function() {
	// Открытие ul
	$('.dropdown-btn').click(function() {
		$('.dropdown-menu').not(this).fadeOut("fast", "linear");
		$(this).parent().find('.dropdown-menu').stop().fadeToggle("fast", "linear");
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
		(function() {
			if ($(event.target).hasClass('fa')) return;
			if ($(event.target).closest(".menu").length) return;
			$('.menu').stop().animate({
				left: '-285px'
			}, 300);
			$('.header').find('.icon-menu').stop().fadeIn(300);
		})();
		// /MENU
		
		// login
		(function() {
			if ($(event.target).closest(".login").length) return;
			$('.login').find('.dropdown-menu').stop().fadeOut("fast", "linear");
		})();
		// /login
		
		// ul-menus
		(function() {
			if ($(event.target).hasClass('dropdown-btn')) return;
			if ($(event.target).closest(".dropdown-menu").length) return;
			$('.dropdown-menu').fadeOut("fast", "linear");
		})();
		// /ul-menus
		
//		event.stopPropagation();
	});
	// /События по клику мимо
});