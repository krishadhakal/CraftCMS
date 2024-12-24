import PubSub from "underpub-js";

var IframeCentered = function(options) {

	this.options = {
		$el: false,
		baseClass: 'mol-IframeCentered',
	};

	$.extend(true, this.options, options);

};

IframeCentered.prototype.init = function() {

	var self = this;

};

export default IframeCentered;
