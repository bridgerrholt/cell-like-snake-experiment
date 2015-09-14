/*
	The basic object making up the player.
*/

Circle = function(parentArray, id, index, radiusStart, radiusEnd, speedMax, x, y) {
						// The array containing this circle.
	this.parentArray = parentArray;
	this.id = id;		// The unique number of this circle.
	this.index = index;	// This circle's position in the parent array.
	this.radius = radiusStart;
	this.radiusEnd = radiusEnd;
	this.radiusIncreaseAmount = 0.2;

	if (this.radius < 1)
		this.radius = 1;

	this.moving = false;
	this.speedMax = speedMax*g_g.delta;
	this.speed = 0;
	this.speedAcc = speedMax/60.0;

	this.dir = 0;

	this.x = x;
	this.y = y;
};

Circle.prototype.update = function() {
	this.move();

	if (this.radius < this.radiusEnd) {
		this.radius += this.radiusIncreaseAmount;
		if (this.radius > this.radiusEnd)
			this.radius = this.radiusEnd;
	}
};

Circle.prototype.move = function() {
	var targetX, targetY, targetRadius;
	var setDis = false;

	if (this.index === 0) {
		targetX = g_g.mouse.x+g_g.camera.x;
		targetY = g_g.mouse.y+g_g.camera.y;

		if (pointDis(this.x, this.y, targetX, targetY) <= this.radius+45) {
			this.moving = false;
		}
		else {
			this.moving = true;
			this.dir = pointDir(this.x, this.y,
				targetX, targetY)
		}

		var pos = disDir(this.x, this.y,
			this.speed,
			this.dir);
		this.x = pos.x;
		this.y = pos.y;
	}

	else {
		//targetX = this.parentArray[this.index-1].x;
		//targetY = this.parentArray[this.index-1].y;
		targetRadius = this.parentArray[this.index-1].radius;

		var disToTarget = pointDis(this.x, this.y, this.parentArray[this.index-1].x, this.parentArray[this.index-1].y)
		var radiuses = this.radius+targetRadius;
		var extraDis = radiuses+4;

		if (this.moving) {

			if (disToTarget <= extraDis+this.speed) {
				if (!this.parentArray[this.index-1].moving)
					this.moving = false;
				setDis = true;

			} else {
				var pos = disDirToPoint(this.x, this.y, this.speed,
					this.parentArray[this.index-1].x,
					this.parentArray[this.index-1].y);
				this.x = pos.x;
				this.y = pos.y;
			}

			/*if (disToTarget <= extraDis) {
				if (!this.parentArray[this.index-1].moving)
					this.moving = false;
				setDis = true;
			}

			else {
				if (disToTarget <= this.speed+extraDis) {
					if (!this.parentArray[this.index-1].moving)
						this.moving = false;
					setDis = true;
				}
				else {
					var pos = disDirToPoint(this.x, this.y, this.speed,
						this.parentArray[this.index-1].x, this.parentArray[this.index-1].y);
					this.x = pos.x;
					this.y = pos.y;
				}
			}*/
		}

		else {
			if (disToTarget > radiuses+16+this.speed) 
				this.moving = true;
			if (disToTarget <= extraDis+this.speed) {
				setDis = true;
			}
		}
	}


	if (setDis) {
		/*var pos = disDir(this.parentArray[this.index-1].x,
			this.parentArray[this.index-1].y, extraDis,
			pointDir(this.parentArray[this.index-1].x,
				this.parentArray[this.index-1].y,
				this.x, this.y));*/
		var pos = disDirToPoint(this.parentArray[this.index-1].x,
			this.parentArray[this.index-1].y, extraDis,
			this.x, this.y);
		this.x = pos.x;
		this.y = pos.y;
	}

	if (this.moving) {
		this.speedInc(this.speedAcc);
	}
	else {
		this.speedDec(this.speedAcc);
	}

	if (pointDis(0, 0, this.x, this.y) > g_g.worldRadius-this.radius) {
		var pos = disDirToPoint(0, 0, g_g.worldRadius-this.radius, this.x, this.y);
		this.x = pos.x;
		this.y = pos.y;
	}
};

Circle.prototype.draw = function() {

	if (this.x-g_g.camera.x+this.radius+10 > 0 &&
		this.x-g_g.camera.x-this.radius-10 <= g_g.canvasW &&
		this.y-g_g.camera.y+this.radius+10 > 0 &&
		this.y-g_g.camera.y-this.radius-10 <= g_g.canvasH) {
			this.drawAtPos(this.x, this.y);
	}

};

Circle.prototype.drawAtPos = function(x, y) {
	g_g.ctx.beginPath();
	g_g.ctx.arc(x-g_g.camera.x, y-g_g.camera.y, this.radius,
		0, 2*Math.PI, false);

	g_g.ctx.fillStyle = "#fff";
	g_g.ctx.strokeStyle = "#fff";
	g_g.ctx.fill();
	g_g.ctx.stroke();
};

Circle.prototype.speedInc = function(value) {
	this.speed += value;
	if (this.speed > this.speedMax)
		this.speed = this.speedMax;
};

Circle.prototype.speedDec = function(value) {
	this.speed -= value;
	if (this.speed < 0)
		this.speed = 0;
};