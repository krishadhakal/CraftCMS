import PubSub from "underpub-js";

var CallToActionFormInset = function(options) {

	this.options = {
		$el: false,
		baseClass: 'mol-CallToActionFormInset',
	};

	$.extend(true, this.options, options);

};

CallToActionFormInset.prototype.init = function() {

	var self = this;

};

export default CallToActionFormInset;
