/*
	Provides the means for objects to be drawn based off the position in the world.
*/

Camera = function(x, y) {
	this.x = x-Math.floor(g_g.canvasW/2);
	this.y = y-Math.floor(g_g.canvasH/2);
};

Camera.prototype.update = function() {

};

Camera.prototype.draw = function() {

};