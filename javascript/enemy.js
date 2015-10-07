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

	this.circleRadiusDecrease = 1;
	this.nextCircleRadius =
		35 - this.circles.length*this.circleRadiusDecrease;

	this.cagesFound = [];
	this.cagesFoundProperties = [];
	this.dir = randomRange(0, 360);
	this.goalDir = this.dir;
	if (randomRange(0, 2) === 0)
		this.dirChangeSign = -1
	else
		this.dirChangeSign = 1
	this.dirChangeLockedTimer = false;
	this.behavior = 1;		// 1: searching for cages, 2: going after a cage
	this.cageTarget = 0;

	this.touchQueue = [];

	this.vision = 700;
};

Enemy.TouchObject = function(originX, originY, dis, dir) {
	this.origin = {
		x: originX,
		y: originY
	};

	this.dis = dis;
	this.dir = dir;
	var dirChangeDistance = randomRangeFloat(1, 5);
	this.dirChange = dirChangeDistance*360 / (2*Math.PI*this.dis);
	if (randomRange(0, 2) === 0)
		this.dirChange = -this.dirChange;

	this.x = disDirX(originX, dis, dir);
	this.y = disDirY(originY, dis, dir);
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

	//console.log(this.behavior);

	// Decide on if it should go back to a discovered cage or not.
	for (var i = 0; i < this.cagesFound.length; i += 1) {
		var cage = this.cagesFound[i];
		var cageProperties = this.cagesFoundProperties[i];
		cageProperties.ticksSinceSeen += 1;

		// If it's been ~40 seconds.
		if (cageProperties.ticksSinceSeen >= 40*g_g.frameRate) {
			if (!cageProperties.inQueue) {
				this.touchQueue.push(new Enemy.TouchObject (
					cage.x, cage.y,
					randomRange(cage.circleRadius, cage.sideCircleRadius-10),
					randomRange(0, 360)
				));
				cageProperties.inQueue = true;
			}
		}
	}

	if (this.touchQueue.length > 0)
		this.touchQueue[0].update();

	if (this.behavior === 1) {

		while (this.touchQueue.length < 3) {
			var dis = randomRange(200, g_g.worldRadius-circle.radius-100);
			var dir = randomRangeFloat(0, 360);
			var pos = disDir(0, 0, dis, dir);

			if (pointDis(this.x, this.y, pos.x, pos.y) > this.vision) {
				var noneClose = true;
				for (var i = 0; i < this.touchQueue.length; i += 1) {
					if (pointDis(pos.x, pos.y, this.touchQueue[i].x, this.touchQueue.y) < this.vision+200) {
						noneClose = false;
						break;
					}
				}

				if (noneClose) {
					this.touchQueue.push(new Enemy.TouchObject (
						0, 0, dis, dir
					));
				}
			}
		}

		var targetPos = {
			x: this.touchQueue[0].x,
			y: this.touchQueue[0].y
		};

		this.dir = pointDir(this.x, this.y, targetPos.x, targetPos.y);

		/*if (randomRange(0, 5) === 0) {

			if (this.dirChangeLockedTimer === 0 && randomRange(0, 20) === 0) {
				if (randomRange(0, 2) === 0)
					this.dirChangeSign = -1
				else
					this.dirChangeSign = 1
			}

			this.dir += randomRange(0, 2*this.dirChangeSign);
			if (pointDis(0, 0, circle.x, circle.y) > g_g.worldRadius-circle.radius-500) {
				if (randomRange(0, 1) === 0) {
					this.dir += randomRange(0, 5*this.dirChangeSign);
					this.dirChangeLockedTimer = 0;
				}
			}
		}*/

		circle.speedInc(circle.speedAcc);
		var pos = disDir(circle.x, circle.y, circle.speed, this.dir);
		circle.x = pos.x;
		circle.y = pos.y;

		if (pointDis(this.x, this.y, targetPos.x, targetPos.y) <= this.vision) {
			this.touchQueue.splice(0, 1);
		}

		for (var i = 0; i < cages.length; i += 1) {
			if (pointDis(this.x, this.y, cages[i].x, cages[i].y) <= this.vision) {
				var alreadyFound = false;
				var alreadyFoundIndex = 0;
				for (var j = 0; j < this.cagesFound.length; j += 1) {
					if (this.cagesFound[j].id === cages[i].id) {
						alreadyFound = true;
						alreadyFoundIndex = j;
						break;
					}
				}

				var properties = {
					side: cages[i].side,
					sidePercent: cages[i].sidePercent,
					captured: cages[i].captured,
					ticksSinceSeen: 0,
					inQueue: false
				};

				if (!alreadyFound) {
					this.cagesFound.push(cages[i]);
					this.cagesFoundProperties.push(properties);
				}
				else {
					this.cagesFoundProperties[alreadyFoundIndex] = properties;
				}
			}
		}

		if (this.cagesFound.length > 0) {
			var i = 0;
			var disLeast = pointDis(circle.x, circle.y, this.cagesFound[i].x, this.cagesFound[i].y);
			var disLeastIndex = i;
			var disLeastValid = !(this.cagesFoundProperties[i].captured && this.cagesFoundProperties[i].side === 2);
			var dis;

			for (i = 1; i < this.cagesFound.length; i += 1) {
				if (!(this.cagesFoundProperties[i].captured && this.cagesFoundProperties[i].side === 2)) {
					dis = pointDis(circle.x, circle.y, this.cagesFound[i].x, this.cagesFound[i].y);
					if (dis < disLeast || !disLeastValid) {
						disLeast = dis;
						disLeastIndex = i;
						disLeastValid = true;
					}
				}
			}

			var cage = this.cagesFound[disLeastIndex];

			if (disLeastValid) {
				this.cageTarget = cage;
				this.behavior = 2;
			}
		}

		if (this.dirChangeLockedTimer > 0)
			this.dirChangeLockedTimer -= 1;

	}
	else if (this.behavior === 2) {

		/*var i = 0;
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
		}*/

		var cage = this.cageTarget;
		var disLeast = pointDis(circle.x, circle.y, cage.x, cage.y);

		if (disLeast < cage.captureRadius)
			circle.speedDec(circle.speedAcc);
		else
			circle.speedInc(circle.speedAcc);
		var pos = disDirToPoint(circle.x, circle.y, circle.speed, cage.x, cage.y);
		circle.x = pos.x;
		circle.y = pos.y;

		var dis = randomRange(cage.circleRadius, cage.captureRadius);
		var dir = randomRange(0, 360);
		pos = disDir(cage.circleRadius, cage.captureRadius, dis, dir);
		this.targetPos.x = pos.x;
		this.targetPos.y = pos.y;

		if (cage.captured && cage.side === 2)
			this.behavior = 1;
	}

	// REPETITIVE, CHANGE, ALREADY IN CIRCLE.JS
	if (pointDis(0, 0, circle.x, circle.y) > g_g.worldRadius-circle.radius) {
		var pos = disDirToPoint(0, 0, g_g.worldRadius-circle.radius, circle.x, circle.y);
		circle.x = pos.x;
		circle.y = pos.y;

		this.dir = pointDir(circle.x, circle.y, 0, 0);

		if (randomRange(0, 2) === 0)
			this.dirChangeSign = -1
		else
			this.dirChangeSign = 1
	}

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

	this.circles.push(new Circle(cir, x, y, this.nextCircleRadius, 8-this.circles.length*0.2));
	this.circleTotalCount += 1;
	this.nextCircleRadius -= this.circleRadiusDecrease;
};


Enemy.TouchObject.prototype.update = function() {
	this.dir += this.dirChange;

	this.x = disDirX(this.origin.x, this.dis, this.dir);
	this.y = disDirY(this.origin.y, this.dis, this.dir);
};


