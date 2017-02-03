$(document).ready(function () {
	
	//	slider
	$('.arrows__left').click(function () {
		var mS = $('.slider__middleSlide').attr('src');
		var rS = $('.slider__rightSlide').attr('src');
		var lS = $('.slider__leftSlide').attr('src');


		$('.slider__middleSlide').attr('src', lS);
		$('.slider__rightSlide').attr('src', mS);
		$('.slider__leftSlide').attr('src', rS);
	});

	$('.arrows__right').click(function () {
		var mS = $('.slider__middleSlide').attr('src');
		var rS = $('.slider__rightSlide').attr('src');
		var lS = $('.slider__leftSlide').attr('src');

		$('.slider__middleSlide').attr('src', rS);
		$('.slider__rightSlide').attr('src', lS);
		$('.slider__leftSlide').attr('src', mS);
	});
	//	slider
	
	// dropdown-menu
	$('.dropdown-toggle').click(function() {
		$('.dropdown-menu').not($(this).children()).removeClass('dropdown-menu-active');
		$('.dropdown-toggle').not(this).removeClass('nav__item-active');
		$(this).toggleClass('nav__item-active');
		$(this).children('.dropdown-menu').toggleClass('dropdown-menu-active');
	});
	// /dropdown-menu

	function setEqualHeight(columns) {
		$('.equal-height-of-columns').height('auto');
		var tallestColumn = 0;
		var currentHeight = 0;
		columns.each(
			function () {
				currentHeight = $(this).height();
				if (currentHeight > tallestColumn) {
					tallestColumn = currentHeight;
				}
			}
		);
		columns.height(tallestColumn);
	}
	setEqualHeight($(".equal-height-of-columns"));

	$(window).resize(function () {
		setEqualHeight($(".equal-height-of-columns"));
		$('.max-lines').trigger("update.dot");
	});

//	$('.hide-long-text').readmore();


	//	check_email
	$('.newsletter__subscribe').click(function () {
		if ($('.newsletter__email-input').val() != '') {
			var pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;
			if (pattern.test($('.newsletter__email-input').val())) {
				$('.newsletter__check-wrapper').addClass('newsletter__check-wrapper-active');
				$('.newsletter__answer-icon')
					.removeClass('newsletter__answer-icon-cross')
					.addClass('newsletter__answer-icon-tick');
				$('.newsletter__check')
					.removeClass('newsletter__check-not-okay')
					.addClass('newsletter__check-okay')
					.text('thanks, your address has been added');
			} else {
				$('.newsletter__check-wrapper').addClass('newsletter__check-wrapper-active');
				$('.newsletter__answer-icon')
					.removeClass('newsletter__answer-icon-tick')
					.addClass('newsletter__answer-icon-cross');
				$('.newsletter__check')
					.removeClass('newsletter__check-okay')
					.addClass('newsletter__check-not-okay')
					.text('please enter a valid email address');
			}
		}
		setTimeout(function() {
			$('.newsletter__check-wrapper').removeClass('newsletter__check-wrapper-active');
		}, 5000);
	});
	//	/check_email
	
	
	// События по клику мимо
	$(document).click(function(event){
		//	dropdown-menu
		(function() {
			if ($(event.target).hasClass('dropdown-menu')) return;
			if ($(event.target).hasClass('nav__item')) return;
			if ($(event.target).closest(".dropdown-toggle").length) return;
			$('.dropdown-menu-active').removeClass('dropdown-menu-active');
			$('.nav__item-active').removeClass('nav__item-active');
		})();
		// /dropdown-menu
	});
	// /События по клику мимо
	
	$('.max-lines').dotdotdot();
});
