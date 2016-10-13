'use strict';
$(document).ready(function() {
	
// Canvas
	let canvas = $('#canvas')[0],
			ctx = canvas.getContext("2d");
	canvas.width = 600;
	canvas.height = 600;
	
	let width = $("#canvas").width(),
			height = $("#canvas").height(),
			cellWidth = 15,
			direction = 'right', 
			snakeArray,
			snakeLength = 5,
			food,
			score = 0,
			speed = 150,
			isRotateAllowed = true,
			gameOver = false;
	
	let drawTimer,
			foodTimer;
	
	let headX, headY;
	
	$('.canvas-wrapper').css({
		'height': '600px',
		'width': '600px'
	});
	
	init();
	function init() {
		createField();
		createSnake();
		createFood();
		draw();
	}
	
	function createSnake() {
		snakeArray = []
		for (let i = snakeLength; i > 0; i--) {
			snakeArray.push({x: i+13, y: 18});
		}
	}
	
	function createFood() {
		food = {
			x: Math.round(Math.random()*( (width - cellWidth) / cellWidth)),
			y: Math.round(Math.random()*( (height - cellWidth) / cellWidth))
		};
		for (let i = 0; i < snakeArray.length; i++) {
			if (snakeArray[i].x === food.x && snakeArray[i].y === food.y) createFood();
		}
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
			ctx.fillRect(food.x * cellWidth - 1, food.y * cellWidth - 1, cellWidth + 1, cellWidth + 1);
			let tail = snakeArray.push({ 
				x: headX,
				y: headY
			});
			speed -= 2;
			score += 10;
			$('.canvas-wrapper').addClass('change').attr('data-content', 'score: ' + score);
			clearInterval(drawTimer);
			drawTimer = setInterval(draw, speed);
			createFood();
		}
	}
	
	function createField() {
		ctx.fillStyle = 'rgba(28, 28, 28, 1)';
		ctx.fillRect(0, 0, width, height);
	}
	
//	checkCollision();
	function checkCollision() {
		for (let i = 1; i < snakeArray.length; i++) {
			if (headX === snakeArray[i].x && headY === snakeArray[i].y) {
				clearInterval(drawTimer);
				drawTimer = undefined;
				$('.game-overlay').stop().fadeIn('linear');
				$('.game-overlay').find('p').text('Score: ' + score);
				gameOver = true;
			}
		}
	}
	
	function reset() {
		init();
		headX = undefined;
		headY = undefined;
		speed = 150;
		score = 0;
		$('.canvas-wrapper').addClass('change').attr('data-content', 'score: ' + score);
		direction = 'right';
		$('.game-overlay').stop().fadeOut('linear');
		if(typeof drawTimer == "undefined") {
			drawTimer = setInterval(draw, speed);
		}
	}
	
	function draw() {
		createField();
		dropFood();
		checkCollision();
		eatFood();
		
		//	snake movement
		headX = snakeArray[0].x;
		headY = snakeArray[0].y;
		
		//	snake turns && movement
		if (direction === 'right') headX++;
		else if (direction === 'down') headY++;
		else if (direction === 'left') headX--;
		else if (direction === 'up') headY--;
		let tail = snakeArray.pop();
		tail.x = headX;
		tail.y = headY;
		snakeArray.unshift(tail);
		isRotateAllowed = true;
		
		//	teleport
		if (headX === width/cellWidth) snakeArray[0].x = 0;
		if (headX === -1) snakeArray[0].x = width/cellWidth - 1;
		if (headY === height/cellWidth) snakeArray[0].y = 0;
		if (headY === -1) snakeArray[0].y = height/cellWidth - 1;
		
		//	snake draw
		for (let i = 0; i < snakeArray.length; i++) {
			let snake = snakeArray[i];
			ctx.fillStyle = "rgba(181, 181, 181, 1)";
			ctx.fillRect(snake.x * cellWidth, snake.y * cellWidth, cellWidth, cellWidth);
			ctx.strokeStyle = "#fff";
			ctx.strokeRect(snake.x * cellWidth, snake.y * cellWidth, cellWidth, cellWidth);
		}
	}
	
	//	buttons
	$('#game-wrapper__btn-start').click(function() {
		if (gameOver === false) {
			if(typeof drawTimer == "undefined") {
				drawTimer = setInterval(draw, speed);
			}
			$('.game-overlay').stop().fadeOut('linear');
		}
		else reset();
	});
	
	$('#game-wrapper__btn-pause').click(function() {
		clearInterval(drawTimer);
		drawTimer = undefined;
		
		$('.game-overlay').stop().fadeIn('linear');
		$('.game-overlay').find('h2').text('PAUSE');
	});
	
	$('#game-wrapper__btn-reset').click(function() {
		reset();
	});
	
	// buttons on keyboard
	$(document).keydown(function(event) {
		let key = event.which;
		if (isRotateAllowed === true) {
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
			isRotateAllowed = false;
		}
	});
	
});