/*
	The main user-controlled object.
*/

Player = function(x, y) {
	this.circles = [];
	this.circleTotalCount = 0;
	for (var i = 0; i < 1; ++i) {
		this.createCircle();
	}
	this.x = x;
	this.y = y;
};

Player.prototype.update = function() {
	for (var i = 0; i < this.circles.length; i++) {
		this.circles[i].update();
	}

	this.x = this.circles[0].x;
	this.y = this.circles[0].y;
};

Player.prototype.createCircle = function() {
	this.circles.push(new Circle(this.circles, this.circleTotalCount,
		this.circles.length, 35-this.circles.length,
		8 - this.circles.length*0.2));
	++this.circleTotalCount;
};

Player.prototype.draw = function() {
	for (var i = 0; i < this.circles.length; ++i) {
		this.circles[i].draw();
	}
};