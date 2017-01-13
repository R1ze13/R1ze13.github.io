$(document).ready(function () {

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

	function setEqualHeight(columns) {
		$('.equal-height-for-tablet').height('auto');
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
	setEqualHeight($(".equal-height-for-tablet"));

	$(window).resize(function () {
		setEqualHeight($(".equal-height-for-tablet"));
	});

	$('.hide-long-text').readmore();


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
});
