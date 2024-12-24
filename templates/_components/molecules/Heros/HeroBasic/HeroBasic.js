import PubSub from "underpub-js";

var HeroBasic = function(options) {

	this.options = {
		$el: false,
		baseClass: 'mol-HeroBasic',
	};

	$.extend(true, this.options, options);

};

HeroBasic.prototype.init = function() {

	var self = this;

};

export default HeroBasic;
