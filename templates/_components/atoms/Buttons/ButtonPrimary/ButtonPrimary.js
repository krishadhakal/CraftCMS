import PubSub from "underpub-js";

var ButtonPrimary = function(options) {

	this.options = {
		$el: false,
		baseClass: 'atom-ButtonPrimary',
	};

	$.extend(true, this.options, options);

};

ButtonPrimary.prototype.init = function() {

	var self = this;

};

export default ButtonPrimary;
