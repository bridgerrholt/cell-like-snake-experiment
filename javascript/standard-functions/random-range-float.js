/*
	Returns a random float between two values.
*/

randomRangeFloat = function(min, max) {
	return Math.random()*(max-min) + min;
};