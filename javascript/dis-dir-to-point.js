/*
	Returns a new position based off a position, distance, and an (x, y) coordinate.
*/

disDirToPoint = function(x1, y1, dis, x2, y2) {
	var dir = pointDir(x1, y1, x2, y2);
	return {
		x: x1+dis*Math.cos(dir*Math.PI/180),
		y: y1+dis*Math.sin(dir*Math.PI/180)
	};
};