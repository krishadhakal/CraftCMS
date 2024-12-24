import PubSub from "underpub-js";

var CarouselCentered = function(options) {

	this.options = {
		$el: false,
		baseClass: 'mol-CarouselCentered',
	};

	$.extend(true, this.options, options);

};

CarouselCentered.prototype.init = function() {

	var self = this;

};

export default CarouselCentered;
