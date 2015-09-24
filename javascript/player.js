/*
	The main user-controlled object.
*/

Player = function(x, y) {
	this.circles = [];
	this.circleTotalCount = 0;
	this.x = x;
	this.y = y;

	this.autoMove = true;

	for (var i = 0; i < 1; i += 1) {
		this.createCircle();
	}
};



Player.prototype.update = function() {
	var moving = g_g.settings.playerAutoMove;

	if (g_g.keys.d[g_g.keyMap.shift])
		moving = !moving;

	//console.log(moving);

	for (var i = 0; i < this.circles.length; i += 1) {
		this.circles[i].update(moving);
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
	var mouseControlled = false;

	if (index === 0) {
		cirX = g_g.mouse.x + g_g.camera.x;
		cirY = g_g.mouse.y + g_g.camera.y;
		mouseControlled = true;
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
		cirX, cirY, mouseControlled, new RgbColor(255, 255, 255), 1));
	++this.circleTotalCount;*/

	console.log(this.circles);
};



Player.prototype.addCircle = function(x, y, rStart) {
	var mouseControlled = false;
	if (this.circles.length === 0)
		mouseControlled = true;

	/*this.circles.push(new Circle(this.circles, this.circleTotalCount,
		this.circles.length, rStart, 35-this.circles.length,
		8 - this.circles.length*0.2, x, y, mouseControlled, new RgbColor(255, 255, 255), 1));
	++this.circleTotalCount;*/


	var cir = {
		parentArray: this.circles,
		id: this.circleTotalCount,
		index: this.circles.length,
		radiusStart: rStart,
		mouseControlled: mouseControlled,
		targetPos: g_g.mouse.real,
		rgbColor: new RgbColor(255, 255, 255),
		side: 1
	};

	this.circles.push(new Circle(cir, x, y, 35-this.circles.length, 8-this.circles.length*0.2));

	/*this.circles.push(new Circle(this.circles, this.circleTotalCount,
		this.circles.length, rStart, 35-this.circles.length,
		8 - this.circles.length*0.2, x, y, false, new RgbColor(255, 0, 0), 2));*/
	this.circleTotalCount += 1;
};
