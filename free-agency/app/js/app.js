$(document).ready(function () {
	
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
	});
	
	
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
});
