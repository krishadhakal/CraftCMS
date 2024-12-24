import PubSub from "underpub-js";

var LayoutSplashPage = function(options) {

	this.options = {
		$el: false,
		baseClass: 'layout-LayoutSplashPage',
	};

	$.extend(true, this.options, options);

};

LayoutSplashPage.prototype.init = function() {

	var self = this;

};

export default LayoutSplashPage;
