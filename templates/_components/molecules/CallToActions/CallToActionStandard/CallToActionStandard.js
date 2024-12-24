import PubSub from "underpub-js";

var CallToActionStandard = function(options) {

	this.options = {
		$el: false,
		baseClass: 'mol-CallToActionStandard',
	};

	$.extend(true, this.options, options);

};

CallToActionStandard.prototype.init = function() {

	var self = this;

};

export default CallToActionStandard;
