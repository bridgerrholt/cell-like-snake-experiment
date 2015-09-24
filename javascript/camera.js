/*
	Provides the means for objects to be drawn based off the position in the world.
*/

Camera = function(x, y) {
	this.x = x-Math.floor(g_g.canvasW/2);
	this.y = y-Math.floor(g_g.canvasH/2);
};

Camera.prototype.update = function() {
	if (g_g.settings.cameraFollowingEnemy) {
		this.x = g_g.enemies[0].x-Math.floor(g_g.canvasW/2);
		this.y = g_g.enemies[0].y-Math.floor(g_g.canvasH/2);
	}
	else {
		this.x = g_g.player.x-Math.floor(g_g.canvasW/2);
		this.y = g_g.player.y-Math.floor(g_g.canvasH/2);
	}
};

Camera.prototype.draw = function() {

};