/*
	Everything that should happen whenever the game is restarted, also called in init().
*/

reset = function() {
	g_g.worldRadius = 3000;

	g_g.camera = new Camera(0, 0);
	g_g.player = new Player(0, 0);

	var dis = randomRange(350, 400);
	var dir = randomRange(0, 360);
	var pos = disDir(0, 0, dis, dir);
	g_g.enemies.push(new Enemy(pos.x, pos.y));

	for (var i = 0; i < 5; ++i) {
		g_g.collectableCircleCages.push (
			new CollectableCircleCage(g_g.collectableCircleCages.length,
				0, 0));

		var circleCage =
			g_g.collectableCircleCages[g_g.collectableCircleCages.length-1];

		var x, y;
		while (true) {
			var dis = randomRange(350, g_g.worldRadius-circleCage.captureRadius-50);
			var dir = randomRange(0, 360);
			var pos = disDir(0, 0, dis, dir);

			circleCage.x = pos.x;
			circleCage.y = pos.y;

			var closeToAnother = false;

			for (var j = 0; j < g_g.enemies.length; j += 1) {
				var tooCloseDis = circleCage.captureRadius+g_g.enemies[j].circles[0].radius+100;

				if (pointDis(circleCage.x, circleCage.y,
					g_g.enemies[j].x,
					g_g.enemies[j].y) < tooCloseDis) {
						closeToAnother = true;
						break;
				}
			}

			if (!closeToAnother)
			for (var j = 0; j < g_g.collectableCircleCages.length; ++j) {
				if (j != i) {
					var tooCloseDis = circleCage.captureRadius+g_g.collectableCircleCages[j].captureRadius+100;

					if (pointDis(circleCage.x, circleCage.y,
						g_g.collectableCircleCages[j].x,
						g_g.collectableCircleCages[j].y) < tooCloseDis) {
							closeToAnother = true;
							break;
					}
				}
			}


			if (!closeToAnother)
				break;
		}

	}
};