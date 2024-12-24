import PubSub from "underpub-js";

var Header = function(options) {

	this.options = {
		$el: false,
		baseClass: 'mol-Header',
	};

	$.extend(true, this.options, options);

};

Header.prototype.init = function() {

	var self = this;

};

export default Header;
