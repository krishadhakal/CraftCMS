import PubSub from "underpub-js";

var HeroComplex = function(options) {

	this.options = {
		$el: false,
		baseClass: 'mol-HeroComplex',
	};

	$.extend(true, this.options, options);

};

HeroComplex.prototype.init = function() {

	var self = this;

};

export default HeroComplex;
