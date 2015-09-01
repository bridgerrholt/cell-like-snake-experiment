/*
	An RGB color structure.
*/

RgbColor = function(r, g, b) {
	this.r = r;
	this.g = g;
	this.b = b;
	this.rgb = "RGB(" +
		String(this.r) + ',' +
		String(this.g) + ',' +
		String(this.b) + ')';
};