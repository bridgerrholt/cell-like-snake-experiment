/*
	The main user-controlled object.
*/

Player = function(x, y) {
	this.circles = [];
	this.circleTotalCount = 0;
	for (var i = 0; i < 5; ++i) {
		this.createCircle();
	}
};

Player.prototype.update = function() {
	for (var i = 0; i < this.circles.length; ++i) {
		this.circles[i].update();
	}
};

Player.prototype.createCircle = function() {
	this.circles.push(new Circle(this.circles, this.circleTotalCount,
		this.circles.length, 10-this.circles.length,
		5 - this.circles.length*0.0));
	++this.circleTotalCount;
};

Player.prototype.draw = function() {
	for (var i = 0; i < this.circles.length; ++i) {
		this.circles[i].draw();
	}
};