var main = function() {
	// ARTICLES
	//Клик по названию статьи - открыть и закрыть её описание
	$('.article').click(function() {
		$('.article').removeClass('current');
		$('.description').not($(this).children('.description')).hide(); // скрываем все описания, кроме текущего

		$(this).addClass('current');
		$('.current').children('.description').toggle(); // по клику открываем и закрываем описание
	});

//	$(document).keypress(function(events) {   // events ЧТОБЫ РАБОТАЛО
		$('.article').keypress(function(event) {
		// управление в статьях с помощью клавиш
		// не работает || с числами. почему?
		if(event.which === 111) { // O
			$('.current').children('.description').toggle();
		}
		else if (event.which === 100) { // D
			$('.current').children('.description').toggle();
		}
		
		else if(event.which === 110) { // N
			var currentArticle = $('.current');
			var nextArticle = currentArticle.next();
	
			currentArticle.removeClass('current');
			nextArticle.addClass('current');
		}
		else if (event.which === 115) { // S
			var currentArticle = $('.current');
			var nextArticle = currentArticle.next();
	
			currentArticle.removeClass('current');
			nextArticle.addClass('current');
		}
		
		else if (event.which === 112) { // P
			var currentArticle = $('.current');
			var prevArticle = currentArticle.prev();
			
			currentArticle.removeClass('current');
			prevArticle.addClass('current');
		}
		else if (event.which === 119) { // W
			var currentArticle = $('.current');
			var prevArticle = currentArticle.prev();
			
			currentArticle.removeClass('current');
			prevArticle.addClass('current');
		}
		
		function everlastArticles() {
			// сделать так, чтобы выделение статей шло по кругу
		};
	});
	// /ARTICLES
	
	// MENU
	 $('.icon-menu').click(function() {
        $('.menu').animate({
            left: '0px'    
        }, 200);
        
        $('body').animate({
            left: '285px'
        }, 200);
    });
    
    $('.icon-close').click(function() {
        $('.menu').animate({
            left: '-285px'
        }, 200);
        
        $('body').animate({
            left: '0'
        }, 200);
    });
	// /MENU
  
	// header dropdown
	$('.dropdown').click(function(){
		$('.dropdown-menu').toggle();
	});
	// /header dropdown
	
	// posts
	$('.btn-posts').click(function() {
    var post = $('.status-box').val();
    $('<li>').text(post).prependTo('.posts');
    $('.status-box').val('');
    $('.counter').text('140');
    $('.btn-posts').addClass('disabled'); 
  });
  
  $('.status-box').keyup(function() {
    var postLength = $(this).val().length;
    var charactersLeft = 140 - postLength;
    $('.counter').text(charactersLeft);
  
    if(charactersLeft < 0) {
      $('.btn-posts').addClass('disabled');
			$('.counter').text('too much letters');
    }
    else if(charactersLeft == 140) {
      $('.btn-posts').addClass('disabled');
    }
    else {
      $('.btn-posts').removeClass('disabled');
    }
  });
  
  $('.btn-posts').addClass('disabled');
	// /posts
}

$(document).ready(main);