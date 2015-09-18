/*
	The main enemy object.
*/

Enemy = function(x, y) {
	this.circles = [];
	this.circleTotalCount = 0;
	for (var i = 0; i < 1; i += 1) {
		this.createCircle();
	}
	this.x = x;
	this.y = y;
};



Enemy.prototype.update = function() {
	for (var i = 0; i < this.circles.length; i += 1) {
		this.circles[i].update();
	}

	this.move(this.circles[0]);

	this.x = this.circles[0].x;
	this.y = this.circles[0].y;
	console.log(this.x);
};



Enemy.prototype.move = function(circle) {
	var cages = g_g.collectableCircleCages;
	var i = 0;
	var disLeast = pointDis(circle.x, circle.y, cages[i].x, cages[i].y);
	var disLeastIndex = i;
	var disLeastValid = !(circle.captured && circle.side === 2);
	var dis;

	for (i = 1; i < cages.length; ++i) {
		if (!(circle.captured && circle.side === 2)) {
			dis = pointDis(circle.x, circle.y, cages[i].x, cages[i].y);
			if (dis < disLeast) {
				disLeast = dis;
				disLeastIndex = i;
			}
		}
	}

	var cage = cages[disLeastIndex];

	speed = 4*g_g.delta;
	if (disLeast < this.radius+cage.radius)
		speed = 0*g_g.delta;
	var pos = disDirToPoint(circle.x, circle.y, speed, cage.x, cage.y);

};



Enemy.prototype.draw = function() {
	for (var i = 0; i < this.circles.length; i += 1) {
		this.circles[i].draw();
	}
};



Enemy.prototype.createCircle = function() {
	var cirX, cirY;
	var index = this.circles.length;
	var cirR = 35-this.circles.length;


	if (index === 0) {
		console.log(this.x);
		cirX = this.x;
		cirY = this.y;
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
		cirX, cirY, false));
	++this.circleTotalCount;

	console.log(this.circles);
};



Enemy.prototype.addCircle = function(x, y, rStart) {
	this.circles.push(new Circle(this.circles, this.circleTotalCount,
		this.circles.length, rStart, 35-this.circles.length,
		8 - this.circles.length*0.2, x, y, false));
	++this.circleTotalCount;
};
