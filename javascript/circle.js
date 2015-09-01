/*
	The basic object making up the player.
*/

Circle = function(parentArray, id, index, radius, speedMax) {
						// The array containing this circle.
	this.parentArray = parentArray; 
	this.id = id;		// The unique number of this circle.
	this.index = index;	// This circle's position in the parent array.
	this.r = radius;
	this.speedMax = speedMax;

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
	var targetX;
	var targetY;
	if (this.index === 0) {
		targetX = g_g.mouse.x+g_g.camera.x;
		targetY = g_g.mouse.y+g_g.camera.y;

		if (pointDis(this.x, this.y, targetX, targetY) >= this.speedMax) {
			this.x = targetX;
			this.y = targetY;
		}
		else {
			var pos = disDir(this.x, this.y, this.speedMax,
				pointDir(this.x, this.y, targetX, targetY));
		}
	}
	else {
		targetX = parentArray[index-1].x;
		targetY = parentArray[index-1].y;
	}
};

Circle.prototype.draw = function() {
	g_g.ctx.beginPath();
	g_g.ctx.arc(this.x-g_g.camera.x, this.y-g_g.camera.y, this.r,
		0, 2*Math.PI, false);

	g_g.ctx.fillStyle = "#fff";
	g_g.ctx.strokeStyle = "#fff";
	g_g.ctx.fill();
	g_g.ctx.stroke();
};