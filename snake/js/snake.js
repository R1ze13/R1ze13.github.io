$(document).ready(function() {
	
// Canvas
	var canvas = $('#canvas')[0];
	var ctx = canvas.getContext("2d");
	canvas.width = 600;
	canvas.height = 600;
	var width = $("#canvas").width();
	var height = $("#canvas").height();
	var cellWidth = 15;
	var direction = 'right';
	var snakeArray;
	var snakeLength = 4;
	
	function createSnake() {
		snakeArray = [];
		
		for (var i = snakeLength - 1; i >= 0; i--) {
			snakeArray.push({x: i+13, y: 18});
		}
	}
	
	function draw() {
		// field
		ctx.fillStyle = 'rgba(28, 28, 28, 1)';
		ctx.fillRect(0, 0, width, height);
		//	border
//		ctx.strokeStyle = '#000';
//		ctx.strokeRect(0, 0, width, height);
		
		//	snake movement
		var headX = snakeArray[0].x;
		var headY = snakeArray[0].y;
//		headX++;
		
		//	snake turns && movement
		if (direction === 'right') headX++;
		else if (direction === 'down') headY++;
		else if (direction === 'left') headX--;
		else if (direction === 'up') headY--;
		
		var tail = snakeArray.pop();
		tail.x = headX;
		tail.y = headY;
		snakeArray.unshift(tail);
		
		//	snake turns
//		if (direction === 'right') headX++;
//		else if (direction === 'down') headY--;
//		else if (direction === 'left') headX--;
//		else if (direction === 'up') headY++;
		
		//	snake
		for (var i = 0; i < snakeArray.length; i++) {
			var snake = snakeArray[i];
			ctx.fillStyle = "rgba(181, 181, 181, 0.72)";
			ctx.fillRect(snake.x * cellWidth, snake.y * cellWidth, cellWidth, cellWidth);
			ctx.strokeStyle = "#fff";
			ctx.strokeRect(snake.x * cellWidth, snake.y * cellWidth, cellWidth, cellWidth);
		}
	};
	
	createSnake();
	var drawTimer = setInterval(draw, 90);
	
	//	buttons
	$('#game-wrapper__btn-start').click(function() {
		if(typeof drawTimer == "undefined") {
			drawTimer = setInterval(draw, 90);
		}
	});
	
	$('#game-wrapper__btn-pause').click(function() {
		clearInterval(drawTimer);
		drawTimer = undefined;
	});
	
	$('#game-wrapper__btn-reset').click(function() {
		createSnake();
		if(typeof drawTimer == "undefined") {
			drawTimer = setInterval(draw, 90);
		}
	});
	
	// buttons on keyboard
	$(document).keydown(function(event) {
		var key = event.which;
		switch (key) {
			case 37:
				if (direction != 'right') direction = 'left';
				break;
			case 38:
				if (direction != 'down') direction = 'up';
				break;
			case 39:
				if (direction != 'left') direction = 'right';
				break;
			case 40:
				if (direction != 'up') direction = 'down';
				break;
		}
	});
	
});