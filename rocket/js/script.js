$(document).ready(function() {
  $('p').click(function() {
    $('.dropdown-menu').toggle();
  });
  
  $( "#accordion" ).accordion({
		heightStyle: "content",
		collapsible: true
	});
});