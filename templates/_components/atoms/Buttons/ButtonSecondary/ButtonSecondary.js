import PubSub from "underpub-js";

var ButtonSecondary = function (options) {

	this.options = {
		$el: false,
		baseClass: 'atom-ButtonSecondary',
	};

	$.extend(true, this.options, options);

};

ButtonSecondary.prototype.init = function () {

	var self = this;

};

export default ButtonSecondary;
