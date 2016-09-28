$(document).ready(function() {

	
	var outsideDiameter, innerDiameter, pipeWallThickness, kindOfPipe, tensileForce,
			outsideRadius, innerRadius, radius, area, outsideArea,
			insideArea, innerArea, stress, kindOfForce;
	kindOfForce = 'H';
	kindOfPipe = 'Inner diameter';
	pipeWallThickness = 0;


	$('.inner-diameter-choice').click(function() {
		$('#kindOfPipeLabel').text('Inner diameter, mm');
//		$('#kindOfPipeButton').html('Inner diameter <span class="caret"></span>');
		$('.kindOfPipe-group').find('.dropdown-menu').fadeOut(200);
		kindOfPipe = 'Inner diameter';
	});

	$('.pipe-wall-thickness-choice').click(function() {
		$('#kindOfPipeLabel').text('Pipe wall thickness, mm');
//		$('#kindOfPipeButton').html('Pipe wall thickness <span class="caret"></span>');
		$('.kindOfPipe-group').find('.dropdown-menu').fadeOut(200);
		kindOfPipe = 'Pipe wall thickness';
	});
	
	// kind of force
	$('.h-choice').click(function() {
		$('#tensile-force-label').text('Tensile force, H');
//		$('#kindOfForceButton').html(' <span class="caret"></span>');
		$('.kindOfPipe-group').find('.dropdown-menu').fadeOut(200);
		kindOfForce = 'H';
	});

	$('.kg-choice').click(function() {
		$('#tensile-force-label').text('Tensile force, kg');
//		$('#kindOfForceButton').html('Pipe wall thickness <span class="caret"></span>');
		$('.kindOfPipe-group').find('.dropdown-menu').fadeOut(200);
		kindOfForce = 'kg';
	});
	// /kind of force

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
		outsideRadius = outsideDiameter / 2;
		
		if (kindOfForce === 'H') {
			tensileForce = +$('#tensileForce').val();
		}
		else if (kindOfForce === 'kg') {
			tensileForce = +$('#tensileForce').val();
			tensileForce = tensileForce * 9.806651;
		}
		inputError(tensileForce, $('#tensileForce'));
		
		if (kindOfPipe === "Inner diameter") {
			innerDiameter = +$('#innerDiameter').val();
			innerRadius = innerDiameter / 2;
		}
			else if (kindOfPipe === "Pipe wall thickness") {
			pipeWallThickness = +$('#innerDiameter').val();
			innerRadius = outsideRadius - pipeWallThickness;
			if (innerRadius <= 0 && pipeWallThickness !== 0 && outsideRadius !==0) {
				$('#kindOfPipeLabel').html('It must be ≤ than outside <i>R</i> !');
			}
				else {
					$('#kindOfPipeLabel').text('Pipe wall thickness, mm');
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
	
	function areaCheck(check, destination, signature) {
		if (signature === undefined) signature = '';
		if (check > 0) {
			if (check > 99999999999) {
				destination.text('More than the entire universe!');
			}
				else {
					destination.html('S <sub>' + signature + '</sub> = ' + check.toFixed(1) + " mm<sup>2</sup>");
				}
		}
			else {
				destination.html('S <sub>' + signature + '</sub> = 0');
			}
	}

	function areaCalc() {
		getValues();
		radiusInputError();
		outsideArea = Math.PI * outsideRadius * outsideRadius;
		if (innerRadius < 0 || (innerRadius <= 0 && kindOfPipe === 'Pipe wall thickness')) {
			$('#area').html('S <sub>total</sub> = 0');
			$('#innerArea').html('S <sub>inner</sub> = 0');
			return;
		}
		innerArea = Math.PI * innerRadius * innerRadius;
		area = outsideArea - innerArea;
		areaCheck(area, $('#area'), 'total');
		areaCheck(innerArea, $('#innerArea'), 'inner');
		return area;
	}

	function stressCalc() {
		getValues();
		if (area > 0) {
			stress = tensileForce / area;
		}
		return stress;
	}

	function calcMain() {
		areaCalc();
		stressCalc();
		if (area > 0 && stress > 0) {
			$('#stress').val(stress.toFixed(2));
		}
			else {
//				$('#stress').val('').attr('placeholder', 'Stress');
			}
	}
	
	function reset() {
		$('.inputError').removeClass('inputError');
		outsideDiameter = tensileForce = innerDiameter = pipeWallThickness = 0;
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