/*
	The basic object making up the player.
*/

Circle = function(parentArray, id, index, radius, speedMax) {
						// The array containing this circle.
	this.parentArray = parentArray; 
	this.id = id;		// The unique number of this circle.
	this.index = index;	// This circle's position in the parent array.
	this.r = radius;

	this.moving = false;
	this.speedMax = speedMax*g_g.delta;
	this.speed = 0;
	this.speedAcc = speedMax/60.0;

	if (this.index === 0) {
		this.x = g_g.mouse.x + g_g.camera.x;
		this.y = g_g.mouse.y + g_g.camera.y;
	}
	else {
		var dir;
		if (this.index === 1) {
			dir = 90;
		}
		else {
			dir = pointDir(this.parentArray[this.index-2].x,
				this.parentArray[this.index-2].y,
				this.parentArray[this.index-1].x,
				this.parentArray[this.index-1].y);
		}

		var pos = disDir(this.parentArray[this.index-1].x,
			this.parentArray[this.index-1].y,
			this.r+this.parentArray[this.index-1].r+5, dir);
		this.x = pos.x;
		this.y = pos.y;
	}
};

Circle.prototype.update = function() {
	this.move();
};

Circle.prototype.move = function() {
	var targetX, targetY, targetR;
	var setDis = false;

	if (this.index === 0) {
		targetX = g_g.mouse.x+g_g.camera.x;
		targetY = g_g.mouse.y+g_g.camera.y;

		if (pointDis(this.x, this.y, targetX, targetY) <= this.speed+this.r+30) {
			this.moving = false;
		}
		else {
			this.moving = true;
		}

		var pos = disDir(this.x, this.y, this.speed,
			pointDir(this.x, this.y, targetX, targetY));
		this.x = pos.x;
		this.y = pos.y;
	}

	else {
		//targetX = this.parentArray[this.index-1].x;
		//targetY = this.parentArray[this.index-1].y;
		targetR = this.parentArray[this.index-1].r;

		var disToTarget = pointDis(this.x, this.y, this.parentArray[this.index-1].x, this.parentArray[this.index-1].y)
		var radiuses = this.r+targetR;
		var extraDis = radiuses+4;

		if (this.moving) {
			if (disToTarget <= extraDis) {
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
					var pos = disDir(this.x, this.y, this.speed,
						pointDir(this.x, this.y, this.parentArray[this.index-1].x, this.parentArray[this.index-1].y));
					this.x = pos.x;
					this.y = pos.y;
				}
			}
		}

		else {
			if (disToTarget > radiuses+16) 
				this.moving = true;
			if (disToTarget <= extraDis) {
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
};

Circle.prototype.draw = function() {

	if (this.x-g_g.camera.x+this.r+10 > 0 &&
		this.x-g_g.camera.x-this.r-10 <= g_g.canvasW &&
		this.y-g_g.camera.y+this.r+10 > 0 &&
		this.y-g_g.camera.y-this.r-10 <= g_g.canvasH) {
			this.drawAtPos(this.x, this.y);
	}

};

Circle.prototype.drawAtPos = function(x, y) {
	g_g.ctx.beginPath();
	g_g.ctx.arc(x-g_g.camera.x, y-g_g.camera.y, this.r,
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