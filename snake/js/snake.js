'use strict';
$(document).ready(function() {
	
// Canvas
	let canvas = $('#canvas')[0],
			ctx = canvas.getContext("2d");
	canvas.width = 600;
	canvas.height = 600;
	
	// cw - cell width
	// bw - border width
	let width = $("#canvas").width(),
			height = $("#canvas").height(),
			cw = 15,
			bw = 10,
			direction = 'right', 
			snakeArray,
			snakeLength = 5,
			food,
			score = 0,
			speed = 150,
			isRotateAllowed = true,
			isOptionsAllowed = true,
			isTeleportAllowed = true,
			gameOver = false,
			currentLevel = 1,
			_setLevel,
			borders = [];
	
	let drawTimer,
			foodTimer;
	
	let headX, headY;
	
	$('.canvas-wrapper').css({
		'height': height + 'px',
		'width': width + 'px'
	});
	
	init();
	function init() {
		getValues();
		createField();
		createSnake();
		createFood();
		draw();
	}
	
	function getValues() {
		if (isOptionsAllowed === false) return;
		let speedInput = +$('.options__speed-input').val();
		if ( speedInput !== 0 ) {
			speed = speedInput;
		}
		
		let snakeLengthInput = +$('.options__snake-length-input').val();
		if ( snakeLengthInput !== 0 ) {
			snakeLength = snakeLengthInput;
		}
		
		let lvlInput = +$('.options__lvl').val();
		if ( lvlInput !== 0 ) {
			_setLevel = lvlInput;
		}
	}
	
	function createSnake() {
		snakeArray = [];
		for (let i = snakeLength; i > 0; i--) {
			snakeArray.push({x: i+13, y: 18});
		}
	}
	
	function createFood() {
		food = {
			x: Math.round(Math.random()*( (width - cw) / cw )),
			y: Math.round(Math.random()*( (height - cw) / cw ))
		};
		
		for (let i = 0; i < snakeArray.length; i++) {
			if (snakeArray[i].x === food.x && snakeArray[i].y === food.y) createFood();
		}
		
		if (currentLevel !== 1) {
			for (let i = 1; i < borders.length; i++) {
				if (food.x === borders[i].x && food.y === borders[i].y) {
					createFood();
				}
			}
		}
	}
	
	function dropFood() {
		ctx.fillStyle = 'yellow';
		ctx.fillRect(food.x * cw, food.y * cw, cw, cw);
		ctx.strokeStyle = 'orange';
		ctx.strokeRect(food.x * cw, food.y * cw, cw, cw);
	}
	
	function eatFood() {
		if (headX === food.x && headY === food.y) {
			ctx.fillStyle = 'rgba(28, 28, 28, 1)';
			ctx.fillRect(food.x * cw - 1, food.y * cw - 1, cw + 1, cw + 1);
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
	
	function gameIsOver() {
		clearInterval(drawTimer);
		drawTimer = undefined;
		$('.game-overlay').stop().fadeIn('linear');
		$('.game-overlay').find('h2').text('GAME OVER');
		$('.game-overlay').find('p').text('Score: ' + score);
		gameOver = true;
		currentLevel = 1;
	}
	
	function checkCollision() {
		//	duct tape. or snake will die due to changes in options
		if (isOptionsAllowed === true) return;
		
		// checking collision directly from snake's tale
		for (let i = 1; i < snakeArray.length; i++) {
			if (headX === snakeArray[i].x && headY === snakeArray[i].y) {
				gameIsOver();
			}
		}
		
		// check collisions in levels
		if (currentLevel === 2) {
			for (let i = 1; i < borders.length; i++) {
				if (headX === borders[i].x && headY === borders[i].y) {
					gameIsOver();
				}
			}
		}
	}
	
	function reset() {
		speed = 150;
		score = 0;
		currentLevel = 1;
		borders = [];
		gameOver = false;
		$('.canvas-wrapper').addClass('change').attr('data-content', 'score: ' + score);
		direction = 'right';
		$('.game-overlay').stop().fadeOut('linear');
	}
	
	function teleport() {
		if (headX === width/cw) snakeArray[0].x = 0;
		if (headX === -1) snakeArray[0].x = (width - cw) / cw;
		if (headY === height/cw) snakeArray[0].y = 0;
		if (headY === -1) snakeArray[0].y = (height - cw) / cw;
	}
	
	
	function setLevel() {
		if (gameOver) return;
		
		if ( score === 0 || _setLevel === 1) {
			currentLevel = 1;
			borders = [];
		}
		
		if ( (score >= 20 && score <= 80) || _setLevel === 2 ) {
			currentLevel = 2;
			setLevelTwo();
		}
		
		if ( (score >= 90 && score <= 150) || _setLevel === 3 ) {
			currentLevel = 3;
			setLevelThree();
		}
	}
	
	function setLevelTwo() {
		// borders
//		for (let i = 0; i < width / cw; i++) {
//			ctx.fillStyle = "rgb(62, 0, 0)";
//			ctx.fillRect(i * cw, 0 * cw, cw, cw / 2);
//			ctx.fillRect(width - cw / 2, i * cw, cw / 2, cw);
//			ctx.fillRect(i * cw, height - (cw / 2), cw, cw / 2);
//			ctx.fillRect(0, i * cw, cw / 2, cw);
//		}
		
		borders = [];
		for (let i = 0; i < width / cw; i++) {
			borders.push({x: i, y: 0});
			borders.push({x: 0, y: i});
		}
		for (let i = width / cw - 1; i > 0; i--) {
			borders.push({x: i, y: width / cw - 1});
			borders.push({x: width / cw - 1, y: i});
		}
	}
	
	function setLevelThree() {
		borders = [];
		
	}
	
	function draw() {
		headX = snakeArray[0].x;
		headY = snakeArray[0].y;
		createField();
		checkCollision();
		dropFood();
		eatFood();
		
		//	snake turns && movement
		if (gameOver === false) {
			if (direction === 'right') headX++;
			else if (direction === 'down') headY++;
			else if (direction === 'left') headX--;
			else if (direction === 'up') headY--;
			let tail = snakeArray.pop();
			tail.x = headX;
			tail.y = headY;
			snakeArray.unshift(tail);
			isRotateAllowed = true;
		}
		
		//	teleport
		if (isTeleportAllowed === true) teleport();
		
		//	snake draw
		for (let i = 0; i < snakeArray.length; i++) {
			let snake = snakeArray[i];
			ctx.fillStyle = "rgba(181, 181, 181, 1)";
			ctx.fillRect(snake.x * cw, snake.y * cw, cw, cw);
			ctx.strokeStyle = "#fff";
			ctx.strokeRect(snake.x * cw, snake.y * cw, cw, cw);
		}
		
		setLevel();
		// lvl draw
		for (let i = 0; i < borders.length; i++) {
			let border = borders[i];
			ctx.fillStyle = "rgb(57, 0, 0)";
			ctx.fillRect(border.x * cw, border.y * cw, cw, cw);
		}
	}
	
	//	options
	$('.options__options-input').keyup(function() {
		if (isOptionsAllowed === false) return;
		getValues();
		createSnake();
		draw();
	});
	
	//	buttons
	//	start button
	$('#game-wrapper__btn-start').click(function() {
		isOptionsAllowed = false;
		$('.options__options-input').attr('disabled', true);
		
		if (gameOver === false) {
			$('.game-overlay').stop().fadeOut('linear');
		}
		else {
			reset();
			init();
		}
		if(typeof drawTimer == "undefined") {
				drawTimer = setInterval(draw, speed);
		}
	});
	
	//	pause button
	$('#game-wrapper__btn-pause').click(function() {
		clearInterval(drawTimer);
		drawTimer = undefined;
		
		$('.game-overlay').stop().fadeIn('linear');
		$('.game-overlay').find('h2').text('PAUSE');
		$('.game-overlay').find('p').text('Score: ' + score);
	});
	
	//	reset button
	$('#game-wrapper__btn-reset').click(function() {
		$('.options__options-input').attr('disabled', false);
		isOptionsAllowed = true;
		clearInterval(drawTimer);
		drawTimer = undefined;
		gameOver = true;
		reset();
		init();
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