import PubSub from "underpub-js";

var VideoCentered = function(options) {

	this.options = {
		$el: false,
		baseClass: 'mol-VideoCentered',
	};

	$.extend(true, this.options, options);

};

VideoCentered.prototype.init = function() {

	var self = this;

};

export default VideoCentered;
