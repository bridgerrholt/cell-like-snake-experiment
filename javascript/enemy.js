/*
	The main enemy object.
*/

Enemy = function(x, y) {
	this.circles = [];
	this.circleTotalCount = 0;
	this.x = x;
	this.y = y;

	this.targetPos = {
		x: this.x,
		y: this.y
	};

	for (var i = 0; i < 1; i += 1) {
		this.createCircle();
	}
};



Enemy.prototype.update = function() {
	this.move(this.circles[0]);

	for (var i = 1; i < this.circles.length; i += 1) {
		this.circles[i].update();
	}

	this.x = this.circles[0].x;
	this.y = this.circles[0].y;
};



Enemy.prototype.move = function(circle) {
	var cages = g_g.collectableCircleCages;
	var i = 0;
	var disLeast = pointDis(circle.x, circle.y, cages[i].x, cages[i].y);
	var disLeastIndex = i;
	var disLeastValid = !(cages[i].captured && cages[i].side === 2);
	var dis;

	for (i = 1; i < cages.length; i += 1) {
		if (!(cages[i].captured && cages[i].side === 2)) {
			dis = pointDis(circle.x, circle.y, cages[i].x, cages[i].y);
			if (dis < disLeast || !disLeastValid) {
				disLeast = dis;
				disLeastIndex = i;
			}
		}
	}

	var cage = cages[disLeastIndex];

	if (disLeast < cage.captureRadius)
		circle.speedDec(circle.speedAcc);
	else
		circle.speedInc(circle.speedAcc);
	var pos = disDirToPoint(circle.x, circle.y, circle.speed, cage.x, cage.y);
	circle.x = pos.x;
	circle.y = pos.y;

	var dis = randomRange(cage.circleRadius, cage.captureRadius);
	var dir = randomRange(0, 360);

	console.log(disLeastIndex);

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
		console.log(cirX);
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


	this.addCircle(cirX, cirY, cirR);

	/*this.circles.push(new Circle(this.circles, this.circleTotalCount,
		this.circles.length, cirR, cirR,
		8 - this.circles.length*0.2,
		cirX, cirY, false, new RgbColor(255, 0, 0), 2));
	++this.circleTotalCount;*/

	console.log(this.circles);
};



Enemy.prototype.addCircle = function(x, y, rStart) {
	var cir = {
		parentArray: this.circles,
		id: this.circleTotalCount,
		index: this.circles.length,
		radiusStart: rStart,
		mouseControlled: false,
		targetPos: this.targetPos,
		rgbColor: new RgbColor(255, 0, 0),
		side: 2
	};

	this.circles.push(new Circle(cir, x, y, 35-this.circles.length, 8-this.circles.length*0.2));

	/*this.circles.push(new Circle(this.circles, this.circleTotalCount,
		this.circles.length, rStart, 35-this.circles.length,
		8 - this.circles.length*0.2, x, y, false, new RgbColor(255, 0, 0), 2));*/
	++this.circleTotalCount;
};




