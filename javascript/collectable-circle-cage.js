/*
	Object that holds a CollectableCircle.
*/

CollectableCircleCage = function(id, x, y) {
	this.id = id;		// The unique number of this circle.
	this.x = x;
	this.y = y;
	this.xReal = this.x-g_g.camera.x;
	this.yReal = this.y-g_g.camera.y;

	this.w = 64;
	this.wHalf = this.w/2.0;

	this.h = 64;
	this.hHalf = this.h/2.0;

	this.circleRadius = this.wHalf-10;

	this.capturePercent = 0.0;
	this.capturePercentChange = 0.01;
	this.captureRadius = this.w*4;
	this.side = 0;
	this.toSide = 1;
	this.sideDisplay = this.toSide;
	this.sidePercent = 0.0;
};

CollectableCircleCage.prototype.update = function() {

	if (pointDis(this.x, this.y, g_g.player.x, g_g.player.y) < this.captureRadius) {
		this.capturePercentInc(this.capturePercentChange);
		this.sidePercentInc(this.capturePercentChange*2, this.toSide);
	}

};


CollectableCircleCage.prototype.draw = function() {
	this.xReal = this.x-g_g.camera.x;
	this.yReal = this.y-g_g.camera.y;

	if (this.xReal+this.wHalf+10 > 0 &&
		this.xReal-this.wHalf-10 <= g_g.canvasW &&
		this.yReal+this.hHalf+10 > 0 &&
		this.yReal-this.hHalf-10 <= g_g.canvasH) {
			this.drawAtPos(this.xReal, this.yReal);
	}

};

CollectableCircleCage.prototype.drawAtPos = function(x, y) {
	g_g.ctx.beginPath();
	g_g.ctx.arc(x, y, this.circleRadius,
		0, 2*Math.PI, false);

	g_g.ctx.fillStyle = "#fff";
	g_g.ctx.strokeStyle = "#fff";
	g_g.ctx.fill();
	g_g.ctx.stroke();

	var perc = 0.6;

	var xMin = x - this.wHalf;
	var xMax = x + this.wHalf;
	var xMinEnd = x - this.wHalf*perc;
	var xMaxEnd = x + this.wHalf*perc;
	var yMin = y - this.hHalf;
	var yMax = y + this.hHalf;
	var yMinEnd = y - this.hHalf*perc;
	var yMaxEnd = y + this.hHalf*perc;

	g_g.ctx.beginPath();
	g_g.ctx.moveTo(xMinEnd, yMin);
	g_g.ctx.lineTo(xMaxEnd, yMin);
	g_g.ctx.quadraticCurveTo(xMax, yMin, xMax, yMinEnd);

	g_g.ctx.lineTo(xMax, yMaxEnd);
	g_g.ctx.quadraticCurveTo(xMax, yMax, xMaxEnd, yMax);

	g_g.ctx.lineTo(xMinEnd, yMax);
	g_g.ctx.quadraticCurveTo(xMin, yMax, xMin, yMaxEnd);

	g_g.ctx.lineTo(xMin, yMinEnd);
	g_g.ctx.quadraticCurveTo(xMin, yMin, xMinEnd, yMin);

	g_g.ctx.lineWidth = 3.0;
	g_g.ctx.fillStyle = "#fff";
	g_g.ctx.strokeStyle = "#fff";
	g_g.ctx.stroke();


	g_g.ctx.beginPath();
	g_g.ctx.arc(x, y, this.captureRadius,
		0.5*Math.PI, 0.5*Math.PI+this.capturePercent*2*Math.PI, false);

	g_g.ctx.strokeStyle = "#fff";
	g_g.ctx.stroke();


	g_g.ctx.beginPath();
	g_g.ctx.arc(x, y, this.circleRadius,
		0.5*Math.PI, 0.5*Math.PI+this.sidePercent*2*Math.PI, false);

	if (this.sideDisplay === 1)
		g_g.ctx.strokeStyle = "#0f0";
	g_g.ctx.stroke();

	g_g.ctx.lineWidth = 1.0;
};



CollectableCircleCage.prototype.speedInc = function(value) {
	this.speed += value;
	if (this.speed > this.speedMax)
		this.speed = this.speedMax;
};

CollectableCircleCage.prototype.speedDec = function(value) {
	this.speed -= value;
	if (this.speed < 0)
		this.speed = 0;
};


CollectableCircleCage.prototype.capturePercentInc = function(value) {
	this.capturePercent += value;
	if (this.capturePercent > 1.0)
		this.capturePercent = 1.0;
};

CollectableCircleCage.prototype.capturePercentDec = function(value) {
	this.capturePercent -= value;
	if (this.capturePercent < 0)
		this.capturePercent = 0;
};


CollectableCircleCage.prototype.sidePercentInc = function(value, toSide) {
	this.sidePercent += value;
	if (this.sidePercent > 1.0) {
		this.sidePercent = 1.0;
		this.side = toSide;
	}
};

CollectableCircleCage.prototype.sidePercentDec = function(value) {
	this.sidePercent -= value;
	if (this.sidePercent < 0)
		this.sidePercent = 0;
};








