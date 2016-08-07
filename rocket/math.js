$(document).ready(function() {
	
	
var diameter, tensileForce, radius, area, tension;

function getValues() {
	diameter = $('#diameter').val();
	tensileForce = $('#tensileForce').val();
	radius = diameter / 2;
	return true;
}

function areaCalc() {
	getValues();
	area = Math.PI * radius * radius;
	if (area > 0) {
		$('#area').html('S = ' + area.toFixed(1) + " mm<sup>2</sup>");
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
	
	$('#diameter').keyup(function() {
		calcMain();
	});
	$('#tensileForce').keyup(function() {
		calcMain();
	});
	
});