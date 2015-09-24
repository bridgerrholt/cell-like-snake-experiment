/*
	The main game loop, updates all the data and calls draw();
*/

update = function() {
	g_g.thisTick = new Date;
	g_g.fps = 1000/(g_g.thisTick-g_g.lastTick);

	g_g.mouse.real.x = g_g.mouse.x+g_g.camera.x;
	g_g.mouse.real.y = g_g.mouse.y+g_g.camera.y;

	if (g_g.imgs.loadedTotal >= g_g.imgs.loadedNeed) {			// if the images are loaded

		g_g.settings.update();

		g_g.player.update();
		
		for (var i = 0; i < g_g.enemies.length; i++) {
			g_g.enemies[i].update();
		}

		g_g.camera.update();

		for (var i = 0; i < g_g.collectableCircleCages.length; i++) {
			g_g.collectableCircleCages[i].update();
		}

		draw();
	} else {													// if the images are not loaded
		g_g.ctx.fillStyle = "#fff";
		g_g.ctx.fillRect(0, 0, g_g.canvasW, g_g.canvasH);
	}


	g_g.mouse.buttons.lp = false;
	g_g.mouse.buttons.lr = false;
	g_g.mouse.buttons.rp = false;
	g_g.mouse.buttons.rr = false;

	g_g.mouse.wheel.deltaX = 0;
	g_g.mouse.wheel.deltaY = 0;
	g_g.mouse.wheel.rawX = 0;
	g_g.mouse.wheel.rawY = 0;

	for (var i=0; i<g_g.keys.p.length; ++i) {
		g_g.keys.p[i] = false;
	}

	for (var i=0; i<g_g.keys.r.length; ++i) {
		g_g.keys.r[i] = false;
	}

	g_g.mouse.usedQuick = false;


	g_g.lastTick = g_g.thisTick;
};