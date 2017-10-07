var ball = {
	radius: 5,
	spin: 0,
	position: [300, 10],
	speed: [4, 4],
	acceleration: [0, 0],
	color: "#FFFFFF",
	generate_intial_speed: function() {
		y = Math.random() * (2) + 3;
		x = Math.sqrt(32 - y ** 2); //Make's sure the total velocity is constant at sqrt(32)
		if(Math.random() < 0.5){x = -x}
		this.speed = [x, y];
	},
	draw: function() {
		myGameArea.ctx.beginPath();
		myGameArea.ctx.arc(this.position[0], this.position[1], this.radius, 0, 2 * Math.PI, false);
		myGameArea.ctx.fillStyle = this.color;
		myGameArea.ctx.fill();
		myGameArea.ctx.closePath();		
	},
	update: function() {
		// top and bottom edge collisions
		if (this.position[1] <= this.radius || this.position[1] >= 400 - this.radius) 
			{this.speed[1] = -this.speed[1]} 
		// hits left side
		if (this.position[0] <= left_wall.width + this.radius &&
			this.position[0] >= left_wall.width &&
			this.position[1] >= left_wall.y_pos &&
			this.position[1] <= left_wall.y_pos + left_wall.length)
			{this.speed[0] = -this.speed[0]}
		// hits right side
		if (this.position[0] >= 600 - right_wall.width - this.radius &&
			this.position[0] <= 600 - right_wall.width &&
			this.position[1] >= right_wall.y_pos &&
			this.position[1] <= right_wall.y_pos + right_wall.length)
			{this.speed[0] = -this.speed[0]}		


		this.position[0] += this.speed[0];
		this.position[1] += this.speed[1];
		this.draw();
	}
}

var left_wall = {
	length: 75,
	width: 5,
	x_pos: 0,
	y_pos: 185,
	momentum: 0,
	speed: 0,
	color: "#FFFFFF",
	update: function() {
		if (myGameArea.keys && myGameArea.keys[87]) {this.y_pos -= this.speed; } //w
		if (myGameArea.keys && myGameArea.keys[83]) {this.y_pos += this.speed; } //s
		if (this.y_pos < 0) {this.y_pos = 0; }
		if (this.y_pos > 400 - this.length) {this.y_pos = 400 - this.length; }
		myGameArea.ctx.fillStyle = this.color;
		myGameArea.ctx.fillRect(this.x_pos, this.y_pos, this.width, this.length);
	}
}

var right_wall = {
	length: 75,
	width: 5,
	x_pos: 595,
	y_pos: 185,
	momentum: 0,
	speed: 0,
	color: "#FFFFFF",
	update: function() {
		if (myGameArea.keys && myGameArea.keys[38]) {this.y_pos -= this.speed; } //up
		if (myGameArea.keys && myGameArea.keys[40]) {this.y_pos += this.speed; }	//down
		if (this.y_pos < 0) {this.y_pos = 0; }
		if (this.y_pos > 400 - this.length) {this.y_pos = 400 - this.length; }
		myGameArea.ctx.fillStyle = this.color;
		myGameArea.ctx.fillRect(this.x_pos, this.y_pos, this.width, this.length);
	}	
}

var score_chart = {
	left_score: 0,
	right_score: 0,
	left_score_x: 40,
	left_score_y: 30,
	right_score_x: 550,
	right_score_y: 30,
	text_color: "#FFFFFF",
	update: function() {
		myGameArea.ctx.fillStyle = this.text_color;
		myGameArea.ctx.font = "24px Arial";
		myGameArea.ctx.fillText(this.left_score, this.left_score_x, this.left_score_y);
		myGameArea.ctx.fillText(this.right_score, this.right_score_x, this.right_score_y);
	}
}

var new_game_button = {
	length: 60, //vertical
	width: 160, //horizontal
	x_pos: 220,
	y_pos: 170,
	corner_radius: 15,
	color: "#FFFFFF",
	color_normal: "#FFFFFF",
	color_on_hover: "#F7B733",
	show: function() {
		if (myGameArea.x > 333 && myGameArea.x < 494 &&
			myGameArea.y > 185 && myGameArea.y < 250)
			{this.color = this.color_on_hover}
		else {this.color = this.color_normal}
		//draws rounded rectangle
		myGameArea.ctx.beginPath();
		myGameArea.ctx.moveTo(this.x_pos + this.corner_radius, this.y_pos);
		myGameArea.ctx.lineTo(this.x_pos + this.width - this.corner_radius, this.y_pos);
		myGameArea.ctx.arcTo(this.x_pos + this.width, this.y_pos, this.x_pos + this.width,
			this.y_pos + this.corner_radius, this.corner_radius);
		myGameArea.ctx.lineTo(this.x_pos + this.width, this.y_pos + this.length - this.corner_radius);
		myGameArea.ctx.arcTo(this.x_pos + this.width, this.y_pos + this.length, 
			this.x_pos + this.width - this.corner_radius, this.y_pos + this.length, this.corner_radius);		
		myGameArea.ctx.lineTo(this.x_pos + this.corner_radius, this.y_pos + this.length);
		myGameArea.ctx.arcTo(this.x_pos, this.y_pos + this.length, 
			this.x_pos, this.y_pos + this.length - this.corner_radius, this.corner_radius);
		myGameArea.ctx.lineTo(this.x_pos, this.y_pos + this.corner_radius);
		myGameArea.ctx.arcTo(this.x_pos, this.y_pos, 
			this.x_pos + this.corner_radius, this.y_pos, this.corner_radius);
		myGameArea.ctx.lineWidth = 5;
		myGameArea.ctx.stroke();
		myGameArea.ctx.fillStyle = this.color;
		myGameArea.ctx.fill();
		myGameArea.ctx.fillStyle = "#000000";
		myGameArea.ctx.font = "24px Arial";
		myGameArea.ctx.fillText("New Game", 240, 208);
	}
}

var start_button = {
	length: 60, //vertical
	width: 100, //horizontal
	x_pos: 250,
	y_pos: 170,
	corner_radius: 15,
	color: "#FFFFFF",
	color_normal: "#FFFFFF",
	color_on_hover: "#F7B733",
	show: function() {
		if (myGameArea.x > 363 && myGameArea.x < 464 &&
			myGameArea.y > 185 && myGameArea.y < 250)
			{this.color = this.color_on_hover}
		else {this.color = this.color_normal}
		//draws rounded rectangle
		myGameArea.ctx.beginPath();
		myGameArea.ctx.moveTo(this.x_pos + this.corner_radius, this.y_pos);
		myGameArea.ctx.lineTo(this.x_pos + this.width - this.corner_radius, this.y_pos);
		myGameArea.ctx.arcTo(this.x_pos + this.width, this.y_pos, this.x_pos + this.width,
			this.y_pos + this.corner_radius, this.corner_radius);
		myGameArea.ctx.lineTo(this.x_pos + this.width, this.y_pos + this.length - this.corner_radius);
		myGameArea.ctx.arcTo(this.x_pos + this.width, this.y_pos + this.length, 
			this.x_pos + this.width - this.corner_radius, this.y_pos + this.length, this.corner_radius);		
		myGameArea.ctx.lineTo(this.x_pos + this.corner_radius, this.y_pos + this.length);
		myGameArea.ctx.arcTo(this.x_pos, this.y_pos + this.length, 
			this.x_pos, this.y_pos + this.length - this.corner_radius, this.corner_radius);
		myGameArea.ctx.lineTo(this.x_pos, this.y_pos + this.corner_radius);
		myGameArea.ctx.arcTo(this.x_pos, this.y_pos, 
			this.x_pos + this.corner_radius, this.y_pos, this.corner_radius);
		myGameArea.ctx.lineWidth = 5;
		myGameArea.ctx.stroke();
		myGameArea.ctx.fillStyle = this.color;
		myGameArea.ctx.fill();
		myGameArea.ctx.fillStyle = "#000000";
		myGameArea.ctx.font = "24px Arial";
		myGameArea.ctx.fillText("Start", 275, 208);
	}
}

function game_menu() {
	myGameArea.clear();
	left_wall.update();
	right_wall.update();
	score_chart.update();
	start_button.show();
	if (myGameArea.click_x > 363 && myGameArea.click_x < 464 &&
		myGameArea.click_y > 185 && myGameArea.click_y < 250)
		{
			left_wall.speed = 4;
			right_wall.speed = 4;
			ball.position = [300, 10];
			ball.generate_intial_speed();
			clearInterval(myGameArea.interval);
			myGameArea.interval = setInterval(updateGameArea, 20);
		}
}

function new_game_menu() {
	myGameArea.clear();
	left_wall.update();
	right_wall.update();
	score_chart.update();
	new_game_button.show();
	if (myGameArea.click_x > 333 && myGameArea.click_x < 494 &&
		myGameArea.click_y > 185 && myGameArea.click_y < 250)
		{
			left_wall.speed = 4;
			right_wall.speed = 4;
			ball.position = [300, 10];
			ball.generate_intial_speed();
			clearInterval(myGameArea.interval);
			myGameArea.interval = setInterval(updateGameArea, 20);
		}	
}

function updateGameArea() {
	myGameArea.clear();
	left_wall.update();
	right_wall.update();
	ball.update();
	score_chart.update();
	if(ball.position[0] < -50 || ball.position[0] > 650)
		{
			if(ball.position[0] < -50) {score_chart.right_score += 1}
			else {score_chart.left_score += 1}
			left_wall.speed = 0;
			right_wall.speed = 0;
			clearInterval(myGameArea.interval);
			myGameArea.interval = setInterval(new_game_menu, 20);
		 }
}

var myGameArea = {
	canvas: document.getElementById("ball_game"),
	start: function() {
		this.ctx = this.canvas.getContext("2d");
		this.interval = setInterval(game_menu, 20);
        window.addEventListener('mousemove', function (e) {
            myGameArea.x = e.pageX;
            myGameArea.y = e.pageY;
        });
        window.addEventListener('mousedown', function (e) {
            myGameArea.click_x = e.pageX;
            myGameArea.click_y = e.pageY;
        });
        window.addEventListener('mouseup', function (e) {
            myGameArea.click_x = false;
            myGameArea.click_y = false;
        })
        window.addEventListener('keydown', function (e) {
            myGameArea.keys = (myGameArea.keys || []);
            myGameArea.keys[e.keyCode] = true;
        })
        window.addEventListener('keyup', function (e) {
            myGameArea.keys[e.keyCode] = false; 
        })	
        window.addEventListener("keydown", function(e) {
    		// space and arrow keys
    		if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        		e.preventDefault();
    		}
		}, false);
	},
	clear: function() {
		this.ctx.clearRect(0, 0, 600, 400);
	}
}

myGameArea.start()
