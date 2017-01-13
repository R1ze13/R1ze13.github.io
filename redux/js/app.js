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
	
	$(window).resize(function() {
		setEqualHeight($(".equal-height-for-tablet"));
	});
	
	$('.hide-long-text').readmore();
});
