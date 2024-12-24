import PubSub from "underpub-js";

var HeroStandard = function(options) {

	this.options = {
		$el: false,
		baseClass: 'mol-HeroStandard',
	};

	$.extend(true, this.options, options);

};

HeroStandard.prototype.init = function() {

	var self = this;

};

export default HeroStandard;
