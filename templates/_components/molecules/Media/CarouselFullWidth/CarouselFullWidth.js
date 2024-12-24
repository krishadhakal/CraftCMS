import PubSub from "underpub-js";

var CarouselFullWidth = function(options) {

	this.options = {
		$el: false,
		baseClass: 'mol-CarouselFullWidth',
	};

	$.extend(true, this.options, options);

};

CarouselFullWidth.prototype.init = function() {

	var self = this;

};

export default CarouselFullWidth;
