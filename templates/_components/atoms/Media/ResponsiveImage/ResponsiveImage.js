import PubSub from "underpub-js";

var ResponsiveImage = function(options) {

	this.options = {
		$el: false,
		baseClass: 'atom-ResponsiveImage',
	};

	$.extend(true, this.options, options);

};

ResponsiveImage.prototype.init = function() {

	var self = this;

};

export default ResponsiveImage;
