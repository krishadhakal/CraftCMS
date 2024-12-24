import PubSub from "underpub-js";

var Footer = function(options) {

	this.options = {
		$el: false,
		baseClass: 'mol-Footer',
	};

	$.extend(true, this.options, options);

};

Footer.prototype.init = function() {

	var self = this;

};

export default Footer;
