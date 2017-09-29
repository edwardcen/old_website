function draw() {
	ctx.clearRect(0,0, canvas.width, canvas.height)

	//Change vertical direction if it hits top wall
	if(y + dy < ball_radius) {
		dy = -dy;
	}

	//Controls what happens when it approaches bottom wall
	else if(y + dy > canvas.height - ball_radius - paddle_height) {
		if(x > paddleX && x < paddleX + paddle_width && 
			y + dy < canvas.height - ball_radius - paddle_height + 3) {
			dy = -1 * (dy * ((momentum / 100) + 1));
			
		}
		else if (y + dy > canvas.height + ball_radius + 20) {			
			alert("Game Over");
			y = 20;
		}
	}

	// Change horizontal direction if it hits side walls
	if(x + dx < ball_radius || x + dx > canvas.width - ball_radius) {
		dx = -dx;
	}

	// Change position of the moving block
	if(rightPressed && paddleX < canvas.width - paddle_width) {
		paddleX += 5;
		momentum += 1;
	}

	else if(leftPressed && paddleX > 0) {
		paddleX -= 5;
		momentum +=1;		
	}
	else {
		momentum = 0;
	}

	x += dx;
	y += dy;
	draw_ball();
	draw_paddle();
}



function draw_ball() {
	ctx.beginPath();
	ctx.arc(x, y, ball_radius, 0, Math.PI*2, false);
	ctx.fillStyle = "green";
	ctx.fill();
	ctx.closePath();
}

function draw_paddle() {
	ctx.beginPath();
	ctx.rect(paddleX, canvas.height - paddle_height, paddle_width, paddle_height);
	ctx.fillStyle = "#0095DD";
	ctx.fill();
	ctx.closePath();

}

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var paddle_height = 10;
var paddle_width = 75;
var paddleX = (canvas.width-paddle_width)/2;
var momentum = 0;

var right_press = false;
var left_press = false;

var ball_radius = 10;
var x = 100;
var y = 200;
var dx = 2;
var dy = 2;


document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = true;
    }
    else if(e.keyCode == 37) {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = false;
    }
    else if(e.keyCode == 37) {
        leftPressed = false;
    }
}

setInterval(draw, 10)