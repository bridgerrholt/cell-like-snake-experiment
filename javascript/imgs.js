/*
	Loads and holds all the images.
*/

Imgs = function() {
	var root = "resources/images/";
	var srcWires = root + "wires/wires-";
	var srcBackground = root + "backgrounds/background-";

	this.loaded = [];
	this.loadedNeed = 0;
	this.loadedTotal = 0;
};

Imgs.prototype.loadImage = function(src) {
	//this.loaded.push(false);
	this.loadedNeed += 1;
	var img = new Image();

	img.onload = function() {
		g_g.imgs.loadedTotal += 1;
	};

	img.src = src;

	return img;
};
