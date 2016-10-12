$(document).ready(function() {
	
	$('.dropdown-btn').click(function() {
		$('.dropdown-menu').not(this).fadeOut("fast", "linear");
		$(this).parent().find('.dropdown-menu').stop().fadeToggle("fast", "linear");
	});
	
	
	$(document).click(function(event){
		(function() {
			if ($(event.target).closest(".login").length) return;
			$('.login').find('.dropdown-menu').stop().fadeOut("fast", "linear");
		})();
		event.stopPropagation();
	});
	
});