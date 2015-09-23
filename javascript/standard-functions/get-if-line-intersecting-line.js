getIfLineIntersectingLine = function(ax1, ay1, ax2, ay2,  bx1, by1, bx2, by2) {
	var denominator = ((ax2 - ax1) * (by2 - by1)) - ((ay2 - ay1) * (bx2 - bx1));
	var numerator1 = ((ay1 - by1) * (bx2 - bx1)) - ((ax1 - bx1) * (by2 - by1));
	var numerator2 = ((ay1 - by1) * (ax2 - ax1)) - ((ax1 - bx1) * (ay2 - ay1));

	// Detect coincident lines (has a problem, read below)
	if (denominator == 0) return numerator1 == 0 && numerator2 == 0;

	var r = numerator1 / denominator;
	var s = numerator2 / denominator;

	return ((r >= 0 && r <= 1) && (s >= 0 && s <= 1));
};