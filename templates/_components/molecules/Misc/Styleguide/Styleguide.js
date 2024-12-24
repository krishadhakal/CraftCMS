import PubSub from "underpub-js";

var Styleguide = function(options) {

	this.options = {
		$el: false,
		baseClass: 'mol-Styleguide',
	};

	$.extend(true, this.options, options);

};

Styleguide.prototype.init = function() {

	var self = this;

};

export default Styleguide;
