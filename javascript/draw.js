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

	var lineSpacingX = 64;
	var lineSpacingY = 64;
	var offsetX = g_g.camera.x % lineSpacingX;
	var offsetY = g_g.camera.y % lineSpacingY;

	for (var i = 0; i < Math.ceil(g_g.canvasW/lineSpacingX)+1; ++i) {
		var posX = Math.round(i*lineSpacingX-offsetX);
		g_g.ctx.beginPath();
		g_g.ctx.moveTo(posX, 0);
		g_g.ctx.lineTo(posX, g_g.canvasH);

		g_g.ctx.strokeStyle = "#444";
		g_g.ctx.stroke();
	}

	for (var i = 0; i < Math.ceil(g_g.canvasH/lineSpacingY)+1; ++i) {
		var posY = Math.round(i*lineSpacingY-offsetY);
		g_g.ctx.beginPath();
		g_g.ctx.moveTo(0, posY);
		g_g.ctx.lineTo(g_g.canvasW, posY);

		g_g.ctx.strokeStyle = "#444";
		g_g.ctx.stroke();
	}
	
	g_g.ctx.restore();

	g_g.ctx.beginPath();
	g_g.ctx.arc(-g_g.camera.x, -g_g.camera.y, g_g.worldRadius,
		0, 2*Math.PI, false);
	g_g.ctx.strokeStyle = "#fff";
	g_g.ctx.lineWidth = 5.0;
	g_g.ctx.stroke();
	g_g.ctx.lineWidth = 1.0;


	for (var i = 0; i < g_g.collectableCircleCages.length; i++) {
		g_g.collectableCircleCages[i].draw();
	}

	for (var i = 0; i < g_g.enemies.length; i++) {
		g_g.enemies[i].draw();
	}

	g_g.player.draw();


	g_g.ctx.save();
	g_g.ctx.translate(0.5, 0.5);

	// draw end
	g_g.camera.draw();

	var playerOwned = 0;
	var enemyOwned = 0;
	var notOwned = 0;
	for (var i = 0; i < g_g.collectableCircleCages.length; i += 1) {
		if (g_g.collectableCircleCages[i].captured) {
			if (g_g.collectableCircleCages[i].side === 1)
				playerOwned += 1;
			else
				enemyOwned += 1;
		}
		else {
			notOwned += 1;
		}
	}

	g_g.ctx.textAlign = "left";
	if (g_g.debugText) {
		drawText(g_g.ctx, [
			"FPS: " + String(roundFloat(g_g.fps, 1)),
			"Camera: " + String(roundFloat(g_g.camera.x, 1)) + ", " + String(roundFloat(g_g.camera.y, 1)),
			"Player: " + String(roundFloat(g_g.player.x, 1)) + ", " + String(roundFloat(g_g.player.y, 1)),
			"Mouse: " + String(g_g.mouse.x) + ", " + String(g_g.mouse.y),
			"Player:  " + String(playerOwned),
			"Enemy:   " + String(enemyOwned),
			"Neutral: " + String(notOwned)
		], "#f00", 16, "times", 0, 0);
	}

	g_g.ctx.restore();
	g_g.guiCtx.restore();
};