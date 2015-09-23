/*
	Returns the direction (in degrees) between two points.
*/

pointDir = function(x1, y1, x2, y2) {
	var dir = Math.atan2((y2-y1), (x2-x1)) * (180 / Math.PI);
	if (dir < 0) {
		dir = 360+dir;
	}
	return dir;
};