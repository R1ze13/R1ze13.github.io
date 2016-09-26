$(document).ready(function() {
	// LOGIN
	$('.login').find('p').click(function() {
    $('.login').find('.dropdown-menu').fadeToggle("fast", "linear");
  });
	// /LOGIN
  
	// Выбор ввода во втором поле
	$('.kindOfPipe-group').find('.dropdown-toggle').click(function() {
		$('.kindOfPipe-group').find('.dropdown-menu').fadeToggle("fast", "linear");
	});
	// /Выбор ввода во втором поле
	
	
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