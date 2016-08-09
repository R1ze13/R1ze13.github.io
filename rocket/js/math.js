$(document).ready(function() {
	
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

var outsideDiameter, innerDiameter, pipeWallThickness, kindOfPipe, tensileForce, radius, area, tension;

function getValues() {
	outsideDiameter = $('#outsideDiameter').val();
	tensileForce = $('#tensileForce').val();
	radius = outsideDiameter / 2;
	return true;
}
	
function areaCalc() {
	getValues();
	area = Math.PI * radius * radius;
	if (area > 0) {
		if (area > 99999999999999999) {
			$('#area').text("More than the entire universe!")
		}
		else {
			$('#area').html('S = ' + area.toFixed(1) + " mm<sup>2</sup>");
		}
	}
	else $('#area').empty();
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
	else $('#tension').val('').attr('placeholder', 'Tension');
}
	
	$('#outsideDiameter').keyup(function() {
		calcMain();
	});
	$('#tensileForce').keyup(function() {
		calcMain();
	});
	
});