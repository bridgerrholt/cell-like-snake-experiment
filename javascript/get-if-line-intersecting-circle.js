/*
	Uses a line and a circle to check if colliding
*/

getIfLineIntersectingCircle = function(x1,y1, x2,y2, cx,cy, cr) {
	// find the closest point on the line segment to the center of the circle
	var line = {
		x: x2-x1,
		y: y2-y1
	};

	//var lineDot = Item1*other.Item1 + Item2*other.Item2;
	var lineLength = Math.sqrt(line.x*line.x + line.y*line.y);
	var lineNorm = {
		x: (1/lineLength)*line.x,
		y: (1/lineLength)*line.y
	};
	var segmentToCircle = {
		x: cx - x1,
		y: cy - y1
	};
	var segmentToCircleDotLine = segmentToCircle.x*line.x + segmentToCircle.y*line.y;
	var closestPointOnSegment = segmentToCircleDotLine / lineLength;

	// Special cases where the closest point happens to be the end points
	var closest = {};
	if (closestPointOnSegment < 0) {
		closest = {
			x: x1,
			y: y1
		};
	} else if (closestPointOnSegment > lineLength) {
		closest = {
			x: x2,
			y: y2
		};
	} else {
		closest = {
			x: x1 + closestPointOnSegment*lineNorm,
			y: y1 + closestPointOnSegment*lineNorm
		};
	}

	// Find that distance.  If it is less than the radius, then we 
	// are within the circle
	var distanceFromClosest = {
		x: cx - closest.x,
		y: cy - closest.y
	};
	var distanceFromClosestLength = Math.sqrt(distanceFromClosest.x*distanceFromClosest.x + distanceFromClosest.y*distanceFromClosest.y);
	if (distanceFromClosestLength > cr) return false;

	// So find the distance that places the intersection point right at 
	// the radius.  This is the center of the circle at the time of collision
	// and is different than the result from Doswa
	/*var offset = (radius - distanceFromClosestLength) *
	((1/distanceFromClosestLength)*distanceFromClosest);
	circleWhenHit = circle - offset;*/

	return true;
}


/*getIfLineIntersectingCircle = function(x1, y1, x2, y2, cx, cy, cr) {
	var xDiff = x2-x1;
	var yDiff = y2-y1;
	var xInv = x1-x2;
	var yInv = y1-y2;
	var xSimp = xDiff*cx + xInv*y1;
	var ySimp = yDiff*cy + yInv*x1;
	var posAbs = Math.abs(xSimp + ySimp);
	var dis = Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yInv, 2));

	return (posAbs/dis <= cr);
}*/