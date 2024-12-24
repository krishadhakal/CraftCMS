import PubSub from "underpub-js";

var CallToActionForm = function(options) {

	this.options = {
		$el: false,
		baseClass: 'mol-CallToActionForm',
	};

	$.extend(true, this.options, options);

};

CallToActionForm.prototype.init = function() {

	var self = this;

};

export default CallToActionForm;
