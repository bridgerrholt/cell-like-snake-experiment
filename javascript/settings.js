/*
	Handles all settings data.
*/

Settings = function() {
	var itemArray = [
		["debugText",            false, 'p', 'r'],
		["playerAutoMove",       false, 'e', 'r'],
		["cameraFollowingEnemy", false, 'r', 'r']
	];

	this.items = {};

	for (var i = 0; i < itemArray.length; i += 1) {
		this.items[itemArray[i][0]] = this.makeSetting (
			itemArray[i][1],
			itemArray[i][2],
			itemArray[i][3]
		);

		this[itemArray[i][0]] = itemArray[i][1];
	}

};


Settings.prototype.update = function() {
	for (var item in this.items) {
		if (this.items.hasOwnProperty(item)) {

			var keyArray = g_g.keys[this.items[item].keyStroke];
			var keyItem = keyArray[g_g.keyMap[this.items[item].key]];

			if (keyItem === true) {
				if (this.items[item].keyStroke === 'd') {
					this.items[item].on = true;
					this[item] = true;
				}
				else {
					this.items[item].on = !this.items[item].on;
					this[item] = !this[item];
				}
			}
			else {
				if (this.items[item].keyStroke === 'd') {
					this.items[item].on = false;
					this[item] = false;
				}
			}

		}
	}
};


Settings.prototype.makeSetting = function(defaultBool, keyName, keyStroke) {
	return {
		on: defaultBool,
		key: keyName,
		keyStroke: keyStroke
	};
};