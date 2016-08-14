$(document).ready(function() {

	
	var outsideDiameter, innerDiameter, pipeWallThickness, kindOfPipe, tensileForce, outsideRadius, innerRadius, radius, area, outsideArea, insideArea, innerArea, tension;
	kindOfPipe = 'Inner diameter';
	pipeWallThickness = 0;


	$('.inner-diameter-choice').click(function() {
		$('#kindOfPipeLabel').text('Inner diameter. mm');
		$('#innerDiameter').attr('placeholder', 'Inner diameter');
		$('#kindOfPipeButton').html('Inner diameter <span class="caret"></span>');
		$('.kindOfPipe-group').find('.dropdown-menu').hide(200);
		kindOfPipe = 'Inner diameter';
	});

	$('.pipe-wall-thickness-choice').click(function() {
		$('#kindOfPipeLabel').text('Pipe wall thickness. mm');
		$('#innerDiameter').attr('placeholder', 'Pipe wall thickness');
		$('#kindOfPipeButton').html('Pipe wall thickness <span class="caret"></span>');
		$('.kindOfPipe-group').find('.dropdown-menu').hide(200);
		kindOfPipe = 'Pipe wall thickness';
	});

	function inputError(checkInput, destination) {
		if (isNaN(checkInput)) {
			destination.addClass('inputError');
		}
			else {
				destination.removeClass('inputError');
			}
	}

	function getValues() {
		outsideDiameter = +$('#outsideDiameter').val();
		tensileForce = +$('#tensileForce').val();
		inputError(tensileForce, $('#tensileForce'));
		outsideRadius = outsideDiameter / 2;
		if (kindOfPipe === "Inner diameter") {
			innerDiameter = +$('#innerDiameter').val();
			innerRadius = innerDiameter / 2;
		}
			else if (kindOfPipe === "Pipe wall thickness") {
			pipeWallThickness = +$('#innerDiameter').val();
			innerRadius = outsideRadius - pipeWallThickness;
			if (innerRadius <= 0 && pipeWallThickness !== 0) {
				$('#kindOfPipeLabel').html('It must be less than outside <i>RADIUS</i> !');
			}
				else {
					$('#kindOfPipeLabel').text('Pipe wall thickness. mm');
				}
			}
		return true;
	}

	function radiusInputError()	{
		if ((outsideDiameter <= innerDiameter || outsideRadius <= pipeWallThickness) && outsideDiameter !== 0) {
			$('#outsideDiameter').addClass('inputError');
			$('#innerDiameter').addClass('inputError');
		}
			else {
				inputError(outsideDiameter, $('#outsideDiameter'));
				if (kindOfPipe === 'Inner diameter') {
					inputError(innerDiameter, $('#innerDiameter'));
				}
					else if (kindOfPipe === 'Pipe wall thickness') {
						inputError(pipeWallThickness, $('#innerDiameter'));
					}
			}
	}

	function areaCalc() {
		getValues();
		radiusInputError();
		outsideArea = Math.PI * outsideRadius * outsideRadius;
		if (innerRadius < 0 || (innerRadius <= 0 && kindOfPipe === 'Pipe wall thickness')) {
			return;
		}
		innerArea = Math.PI * innerRadius * innerRadius;
		area = outsideArea - innerArea;
		if (area > 0) {
			if (area > 999999999999999) {
				$('#area').text("More than the entire universe!");
			}
				else {
					$('#area').html('S = ' + area.toFixed(1) + " mm<sup>2</sup>");
				}
		}
			else {
				$('#area').empty();
			}
		return area;
	}

	function tensionCalc() {
		getValues();
		if (area > 0) {
			tension = tensileForce / area;
		}
		return tension;
	}

	function calcMain() {
		areaCalc();
		tensionCalc();
		if (area > 0 && tension > 0) {
			$('#tension').val(tension.toFixed(2));
		}
			else {
				$('#tension').val('').attr('placeholder', 'Tension');
			}
	}
	
	function reset() {
		$('.inputError').removeClass('inputError');
		outsideDiameter, tensileForce, innerDiameter, pipeWallThickness = 0;
	}
	
	$('.keyupCalcMain').keyup(function() {
		reset();
		calcMain();
	});
	$('.clickCalcMain').click(function() {
		reset();
		calcMain();
	});
	
});