/*
	Draws a single clipping from a sprite sheet.
*/

drawSprite = function(x, y, sheet, rect) {
	x -= g_g.camera.x;
	y -= g_g.camera.y;
	var w = rect.w;
	var h = rect.h;
	if (x >= -w && y >= -h && x < g_g.canvasW+w && y < g_g.canvasH+h) {
		g_g.ctx.drawImage(
			sheet,
			rect.x, rect.y,
			w, h,
			x, y,
			w, h);
	}
};