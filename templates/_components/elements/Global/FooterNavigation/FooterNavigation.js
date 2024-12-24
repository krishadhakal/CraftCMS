import PubSub from "underpub-js";

var FooterNavigation = function(options) {

	this.options = {
		$el: false,
		baseClass: 'el-FooterNavigation',
	};

	$.extend(true, this.options, options);

};

FooterNavigation.prototype.init = function() {

	var self = this;

};

export default FooterNavigation;
