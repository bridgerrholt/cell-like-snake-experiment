/*
	Returns a new x-position based off an x-position, distance, and direction (in degrees).
*/

disDirX = function(x, dis, dir) {
	return x+dis*Math.cos(dir*Math.PI/180);
};