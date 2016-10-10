$(document).ready(function() {
	
// Canvas
	var canvas = $('#canvas')[0],
			ctx = canvas.getContext("2d");
	canvas.width = 600;
	canvas.height = 600;
	
	var width = $("#canvas").width(),
			height = $("#canvas").height(), 
			cellWidth = 15, 
			direction = 'right', 
			snakeArray,
			snakeLength = 4,
			food;
	
	var drawTimer,
			foodTimer;
	
	var headX, headY;
	
	init();
	function init() {
		createField();
		createSnake();
		createFood();
		draw();
	};
	
	function createSnake() {
		snakeArray = [];
		
		for (var i = snakeLength; i >= 0; i--) {
			snakeArray.push({x: i+13, y: 18});
		}
	}
	
	function createFood() {
		food = {
			x: Math.round(Math.random()*(width / cellWidth)),
			y: Math.round(Math.random()*(height / cellWidth))
		};
	}
	
	function dropFood() {
		ctx.fillStyle = 'yellow';
		ctx.fillRect(food.x * cellWidth, food.y*cellWidth, cellWidth - 1, cellWidth - 1);
		ctx.strokeStyle = 'orange';
		ctx.strokeRect(food.x * cellWidth, food.y*cellWidth, cellWidth - 1, cellWidth - 1);
	}
	
	function eatFood() {
		if (headX === food.x && headY === food.y) {
			ctx.fillStyle = 'rgba(28, 28, 28, 1)';
			ctx.fillRect(food.x * cellWidth - 1, food.y*cellWidth - 1, cellWidth + 1, cellWidth + 1);
			var tail = snakeArray.push({ 
				x: headX,
				y: headY
			});
			createFood();
		}
	}
	
	function createField() {
		ctx.fillStyle = 'rgba(28, 28, 28, 1)';
		ctx.fillRect(0, 0, width, height);
	}
	
	function draw() {
		createField();
		dropFood();
		eatFood();
		//	snake movement
		headX = snakeArray[0].x;
		headY = snakeArray[0].y;
		
		//	snake turns && movement
		if (direction === 'right') headX++;
		else if (direction === 'down') headY++;
		else if (direction === 'left') headX--;
		else if (direction === 'up') headY--;
		
		var tail = snakeArray.pop();
		tail.x = headX;
		tail.y = headY;
		snakeArray.unshift(tail);
		
		//	teleport
		if (headX === width/cellWidth) snakeArray[0].x = 0;
		if (headX === -1) snakeArray[0].x = width/cellWidth - 1;
		if (headY === height/cellWidth) snakeArray[0].y = 0;
		if (headY === -1) snakeArray[0].y = height/cellWidth - 1;
		
		//	snake draw
		for (var i = 0; i < snakeArray.length; i++) {
			var snake = snakeArray[i];
			ctx.fillStyle = "rgba(181, 181, 181, 1)";
			ctx.fillRect(snake.x * cellWidth, snake.y * cellWidth, cellWidth, cellWidth);
			ctx.strokeStyle = "#fff";
			ctx.strokeRect(snake.x * cellWidth, snake.y * cellWidth, cellWidth, cellWidth);
		}
		
		// painting place under the tale
//		ctx.fillStyle = 'rgba(28, 28, 28, 1)';
//		ctx.fillRect( snakeArray[snakeArray.length - 1].x * cellWidth, snakeArray[snakeArray.length - 1].y * cellWidth, cellWidth, cellWidth );
//		ctx.strokeStyle = 'rgba(28, 28, 28, 1)';
//		ctx.strokeRect( snakeArray[snakeArray.length - 1].x * cellWidth, snakeArray[snakeArray.length - 1].y * cellWidth, cellWidth, cellWidth );
	};
	
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
		init();
		direction = 'right';
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