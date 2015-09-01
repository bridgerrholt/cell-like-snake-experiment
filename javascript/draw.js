/*
	Called every update, draws the whole scene.
*/

draw = function() {
	// background
	g_g.guiCtx.clearRect(0, 0, g_g.guiCanvas.width, g_g.guiCanvas.height);
	g_g.ctx.fillStyle = "#000";
	g_g.ctx.fillRect(0, 0, g_g.canvasW, g_g.canvasH);



	// draw
	g_g.ctx.save();
	g_g.ctx.translate(0.5, 0.5);

	g_g.player.draw();

	// draw end
	g_g.camera.draw();

	g_g.ctx.textAlign = "left";
	if (g_g.debugText) {
		drawText(g_g.ctx, [
			"FPS: " + String(roundFloat(g_g.fps, 1)),
			"Camera: " + String(roundFloat(g_g.camera.x, 1)) + ", " + String(roundFloat(g_g.camera.y, 1)),
			"Mouse: " + String(g_g.mouse.x) + ", " + String(g_g.mouse.y),
			"Wheel: " + String(g_g.mouse.wheel.deltaX) + ", " + String(g_g.mouse.wheel.deltaY),
			"Dir from center: " + String(pointDir(g_g.canvasW/2, g_g.canvasH/2, g_g.mouse.x, g_g.mouse.y))
		], "#f00", 16, "times", 0, 0);
	}

	g_g.ctx.restore();
	g_g.guiCtx.restore();
};