/*
	Returns a new y-position based off an y-position, distance, and direction (in degrees).
*/

disDirY = function(y, dis, dir) {
	return y+dis*Math.sin(dir*Math.PI/180);
};