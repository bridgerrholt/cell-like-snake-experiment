/*
	The main user-controlled object.
*/

Player = function(x, y) {
	this.circles = [];
	this.circleTotalCount = 0;
	for (var i = 0; i < 10; i += 1) {
		this.createCircle();
	}
	this.x = x;
	this.y = y;
};



Player.prototype.update = function() {
	for (var i = 0; i < this.circles.length; i += 1) {
		this.circles[i].update();
	}

	this.x = this.circles[0].x;
	this.y = this.circles[0].y;
};



Player.prototype.draw = function() {
	for (var i = 0; i < this.circles.length; i += 1) {
		this.circles[i].draw();
	}
};



Player.prototype.createCircle = function() {
	var cirX, cirY;
	var index = this.circles.length;
	var cirR = 35-this.circles.length;


	if (index === 0) {
		cirX = g_g.mouse.x + g_g.camera.x;
		cirY = g_g.mouse.y + g_g.camera.y;
	}
	else {
		var dir;
		if (index === 1) {
			dir = 90;
		}
		else {
			dir = pointDir(this.circles[index-2].x,
				this.circles[index-2].y,
				this.circles[index-1].x,
				this.circles[index-1].y);
		}

		var pos = disDir(this.circles[index-1].x,
			this.circles[index-1].y,
			cirR+this.circles[index-1].radius+5, dir);
		cirX = pos.x;
		cirY = pos.y;
	}

	this.circles.push(new Circle(this.circles, this.circleTotalCount,
		this.circles.length, cirR, cirR,
		8 - this.circles.length*0.2,
		cirX, cirY));
	++this.circleTotalCount;

	console.log(this.circles);
};



Player.prototype.addCircle = function(x, y, rStart) {
	this.circles.push(new Circle(this.circles, this.circleTotalCount,
		this.circles.length, rStart, 35-this.circles.length,
		8 - this.circles.length*0.2, x, y));
	++this.circleTotalCount;
};
