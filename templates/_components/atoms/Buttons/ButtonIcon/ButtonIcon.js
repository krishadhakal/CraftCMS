import PubSub from "underpub-js";

var ButtonIcon = function(options) {

	this.options = {
		$el: false,
		baseClass: 'atom-ButtonIcon',
	};

	$.extend(true, this.options, options);

};

ButtonIcon.prototype.init = function() {

	var self = this;

};

export default ButtonIcon;
