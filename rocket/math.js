function areaCalc() {
	var diameter = $('#diameter').val();
	var tensileStrength = $('#tensileStrength').val();
	var radius = diameter / 2;
	var area = Math.PI * radius * radius;
	if (area > 0) {
		$('#area').html('S = ' + area.toFixed(1) + " mm<sup>2</sup>");
	}
	else $('#area').empty();
	return area;
};

function tensionCalc() {
	var tensileStrength = $('#tensileStrength').val();
	var tension = tensileStrength / areaCalc();
	if (areaCalc() !== 0 && areaCalc() !== undefined && tension !== Infinity && tension > 0) {
		$('#tension').val(tension);
	}
	else $('#tension').val('').attr('placeholder', 'Tension');
	return tension;
};