/*
	Sets up how all the input will affect data structures.
*/

setInputCallbacks = function() {
	// mouse location and buttons
	g_g.mouse = {
		x: Math.floor(g_g.canvasW/2),
		y: Math.floor(g_g.canvasH/2),
		xReal: 0,
		yReal: 0,

		real: {
			x: 0,
			y: 0
		},

		used: false,				// A general check for if the mouse has been used on something already,
									// resets when a mouse button is pressed or released.
		usedQuick: false,			// Resets at the end of every update.
		wheel: {
			deltaX: 0,				// the amount of movement
			deltaY: 0,

			rawX: 0,				// -1, 0, 1
			rawY: 0
		},
		buttons: {
			ld: false,				// left down
			lp: false,				// left pressed
			lr: false,				// left released
			lu: false,				// left used (true when click activates something, false when it unactivates it 
									// example: true when clicking on menu pane to drag it, false when released))

			rd: false,				// right down
			rp: false,				// right pressed
			rr: false,				// right released
			ru: false				// right used (true when click activates something, false when it unactivates it 
		}							// example: true when clicking on menu pane to drag it, false when released))
	};


	// keys press, down, and release
	g_g.keys = {
		d: [],						// key down
		p: [],						// key pressed
		r: []						// key released
	};

	var jQueryKeyAmount = 222;

	for (var i=0; i<=jQueryKeyAmount; ++i) {
		g_g.keys.d[i] = false;
	}

	for (var i=0; i<=jQueryKeyAmount; ++i) {
		g_g.keys.p[i] = false;
	}

	for (var i=0; i<=jQueryKeyAmount; ++i) {
		g_g.keys.r[i] = false;
	}

	g_g.keyMap = {
		shift: 16,
		spacebar: 32,
		e: 69,
		i: 73,
		o: 79,
		p: 80,
		q: 81,
		t: 84,
		w: 87,
		y: 89
	};


	// turns off right click dialogue box
	$(document).on("contextmenu", "canvas", function(e) {
		return false;
	});


	// tracks the mouse position
	document.addEventListener("mousemove", function(evt) {
		var rect = g_g.canvas.getBoundingClientRect();
		g_g.mouse.x = evt.clientX-rect.left;
		g_g.mouse.y = evt.clientY-rect.top;
		g_g.mouse.real.x = g_g.mouse.x+g_g.camera.x;
		g_g.mouse.real.y = g_g.mouse.y+g_g.camera.y;
		//var message = 'Mouse position: ' + g_g.mouse.x + ',' + g_g.mouse.y;
		//console.log(message);
	}, false);


	// gets the moment the mouse is pressed down
	document.onmousedown = function(e) {
		var left, right;
		left = (navigator.appName == "Microsoft Internet Explorer") ? 1 : 0;
		right = 2;

		if (e.button == left) {
			g_g.mouse.buttons.lp = true;
			g_g.mouse.buttons.ld = true;
			g_g.mouse.buttons.lu = false;

		} else if (e.button == right) {
			g_g.mouse.buttons.rp = true;
			g_g.mouse.buttons.rd = true;
			g_g.mouse.buttons.ru = false;
		}

		g_g.mouse.used = false;
	};


	// gets the moment the mouse is released up
	document.onmouseup = function(e) {
		var left, right;
		left = (navigator.appName == "Microsoft Internet Explorer") ? 1 : 0;
		right = 2;

		if (e.button === left) {
			g_g.mouse.buttons.ld = false;
			g_g.mouse.buttons.lr = true;
			g_g.mouse.buttons.lu = false;

		} else if (e.button === right) {
			g_g.mouse.buttons.rd = false;
			g_g.mouse.buttons.rr = true;
			g_g.mouse.buttons.ru = false;
		}

		g_g.mouse.used = false;
	};

	/*$(document).mousewheel(function(e) {
		g_g.mouse.wheel.deltaX = e.deltaX*e.deltaFactor;
		g_g.mouse.wheel.deltaY = e.deltaY*e.deltaFactor;
		g_g.mouse.wheel.rawX = e.deltaX;
		g_g.mouse.wheel.rawY = e.deltaY;
	});*/


	// gets the moment keys are pressed down
	$(document).keydown(function(e) {
		g_g.keys.p[e.which] = true;
		g_g.keys.d[e.which] = true;
	});
	

	// gets the moment keys are released up
	$(document).keyup(function(e) {
		g_g.keys.d[e.which] = false;
		g_g.keys.r[e.which] = true;
	});


	// sets the window to the browser's window
	$(window).resize(function() {
		g_g.canvas.width = window.innerWidth;
		g_g.canvas.height = window.innerHeight;
		g_g.canvasW = g_g.canvas.width;
		g_g.canvasH = g_g.canvas.height;

		g_g.guiCanvas.width = window.innerWidth;
		g_g.guiCanvas.height = window.innerHeight;
		g_g.guiCanvasW = g_g.guiCanvas.width;
		g_g.guiCanvasH = g_g.guiCanvas.height;
	});
};