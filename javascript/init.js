/*
	Everything that should happen when the page is opened or refreshed.
*/

init = function() {
	g_g.frameRate = 60;
	g_g.fps = g_g.frameRate;
	g_g.lastTick = new Date;
	g_g.thisTick = new Date;
	g_g.delta = 60/g_g.frameRate;
	g_g.debugText = false;

	g_g.canvas = document.getElementById("main-canvas");
	g_g.ctx = g_g.canvas.getContext("2d");
	g_g.canvas.width = window.innerWidth;
	g_g.canvas.height = window.innerHeight;
	g_g.canvasW = g_g.canvas.width;
	g_g.canvasH = g_g.canvas.height;

	g_g.guiCanvas = document.getElementById("gui-canvas");					// really high above everything else
	g_g.guiCtx = g_g.guiCanvas.getContext("2d");
	g_g.guiCanvas.width = window.innerWidth;
	g_g.guiCanvas.height = window.innerHeight;
	g_g.guiCanvasW = g_g.guiCanvas.width;
	g_g.guiCanvasH = g_g.guiCanvas.height;
	$("#gui-canvas").css("z-index", 100);

	var boundSize = 2500;
	g_g.bounds = {
		xSmall: -boundSize,
		ySmall: -boundSize,
		xLarge:  boundSize,
		yLarge:  boundSize
	};

	setInputCallbacks();

	loadMedia();

	reset();


	if(typeof g_g.gameLoop != "undefined") clearInterval(g_g.gameLoop);
	g_g.gameLoop = setInterval(update, 1000/g_g.frameRate);
};