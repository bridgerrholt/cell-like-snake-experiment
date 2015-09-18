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
	this.capturePercentChange = 0.005*g_g.delta;
	this.captureRadius = this.w*4;

	this.sideCircleRadius = this.captureRadius*2+20;

	this.side = 0;
	this.toSide = 0;
	this.sideDisplay = this.toSide;
	this.sidePercent = 0.0;
	this.sidePercentChange = this.capturePercentChange*2;
	this.captured = false;

	this.captureShieldPercent = 0.0;
	this.captureShieldPercentChange = 0.001*g_g.delta;
	this.captureShieldPercentDecrease = this.captureShieldPercentChange*4;
	this.captureShieldPercentDecreaseFull = this.captureShieldPercentChange*2;
	this.captureShieldFull = false;

	this.circleContained = true;
	this.sideReachedZero = false;

	this.sideGoodObjects = [];
	this.sideBadObjects = [];
};

CollectableCircleCage.prototype.update = function() {

	if (this.sidePercent < 1.0) {
		this.captured = false;
	}
	
	this.sideReachedZero = false;


	if (this.sidePercent >= 1.0 && this.capturePercent >= 1.0) {
		this.captured = true;

		if (this.circleContained) {
			this.circleContained = false;
			var objectsArray;
			if (this.side === 1)
				objectsArray = this.sideGoodObjects;
			else if (this.side === 2)
				objectsArray = this.sideBadObjects;

			var randomIndex = randomRange(0, objectsArray.length);

			objectsArray[randomIndex].addCircle(this.x, this.y, this.circleRadius);
		}
	}

	if (this.captureShieldPercent >= 1.0) {
		this.captureShieldFull = true;
	}


	var sideGoodAmount = 0;
	var sideBadAmount = 0;
	var side = 0;
	var containsObjects = false;

	this.sideGoodObjects = [];
	this.sideBadObjects = [];

	if (pointDis(this.x, this.y, g_g.player.x, g_g.player.y) < this.captureRadius) {
		sideGoodAmount++;
		containsObjects = true;
		this.sideGoodObjects.push(g_g.player);
	}

	if (g_g.keys.d[g_g.keyMap.t]) {				// Replace with checks to bad guys.
		sideBadAmount++;
		containsObjects = true;
	}

	if (sideGoodAmount == 0 && sideBadAmount > 0) {
		side = 2;
	}
	else if (sideBadAmount == 0 && sideGoodAmount > 0) {
		side = 1;
	}

	if (this.captured && (side === this.side || side === 0)) {
		this.captureShieldPercentInc(this.captureShieldPercentChange, this.side);
	}

	if (side === 0) {
		if (this.captured === false && containsObjects === false) {
			this.capturePercentDec(this.capturePercentChange/2);
			this.sidePercentDec(this.sidePercentChange/2);
		}
	}
	else {
		if (this.captureShieldPercent <= 0.0) {
			this.captureShieldFull = false;
			this.capturePercentInc(this.capturePercentChange);
			this.sidePercentInc(this.sidePercentChange, side);
		}

		if (side !== this.side) {
			if (this.captureShieldFull)
				this.captureShieldPercentDec(this.captureShieldPercentDecreaseFull);
			else
				this.captureShieldPercentDec(this.captureShieldPercentDecrease);
		}
	}
};


CollectableCircleCage.prototype.draw = function() {
	this.xReal = this.x-g_g.camera.x;
	this.yReal = this.y-g_g.camera.y;

	if (this.xReal+this.captureRadius+10 > 0 &&
		this.xReal-this.captureRadius-10 <= g_g.canvasW &&
		this.yReal+this.captureRadius+10 > 0 &&
		this.yReal-this.captureRadius-10 <= g_g.canvasH) {
			this.drawAtPos(this.xReal, this.yReal);
	}

};

CollectableCircleCage.prototype.drawAtPos = function(x, y) {
	g_g.ctx.fillStyle = "#fff";
	g_g.ctx.strokeStyle = "#fff";

	if (this.circleContained) {
		g_g.ctx.beginPath();
		g_g.ctx.arc(x, y, this.circleRadius,
			0, 2*Math.PI, false);

		g_g.ctx.fill();
		g_g.ctx.stroke();
	}

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
	g_g.ctx.arc(x, y, this.captureRadius,
		0.5*Math.PI, 0.5*Math.PI+this.captureShieldPercent*2*Math.PI, false);

	if (this.side === 1)
		g_g.ctx.strokeStyle = "#0f0";
	else if (this.side === 2)
		g_g.ctx.strokeStyle = "#f00";

	g_g.ctx.stroke();


	g_g.ctx.beginPath();
	g_g.ctx.arc(x, y, this.circleRadius*2+20,
		0.5*Math.PI, 0.5*Math.PI+this.sidePercent*2*Math.PI, false);

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

	if (this.side !== 0 && this.side !== toSide) {
		this.sidePercent -= value;
		if (this.sidePercent < 0) {
			this.sidePercent = -this.sidePercent;
			this.side = toSide;
		}
	}

	else {
		this.side = toSide;
		this.sidePercent += value;
		if (this.sidePercent >= 1.0) {
			this.sidePercent = 1.0;
		}
	}

	console.log(this.side);
};

CollectableCircleCage.prototype.sidePercentDec = function(value) {
	this.sidePercent -= value;
	if (this.sidePercent < 0)
		this.sidePercent = 0;
};



CollectableCircleCage.prototype.captureShieldPercentInc = function(value, side) {
	this.captureShieldPercent += value;
	if (this.captureShieldPercent >= 1.0) {
		this.captureShieldPercent = 1.0;
	}
}

CollectableCircleCage.prototype.captureShieldPercentDec = function(value) {
	this.captureShieldPercent -= value;
	if (this.captureShieldPercent <= 0.0) {
		this.captureShieldPercent = 0.0;
	}
}
















