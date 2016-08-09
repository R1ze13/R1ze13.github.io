$(document).ready(function() {
  $('.login').find('p').click(function() {
    $('.login').find('.dropdown-menu').fadeToggle("fast", "linear");
  });
  
	$('.kindOfPipe-group').find('.dropdown-toggle').click(function() {
		$('.kindOfPipe-group').find('.dropdown-menu').fadeToggle(200);
	});
	
  $( "#accordion" ).accordion({
		heightStyle: "content",
		collapsible: true
	});
});