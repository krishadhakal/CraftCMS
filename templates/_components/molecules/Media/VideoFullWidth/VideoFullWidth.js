import PubSub from "underpub-js";

var VideoFullWidth = function(options) {

	this.options = {
		$el: false,
		baseClass: 'mol-VideoFullWidth',
	};

	$.extend(true, this.options, options);

};

VideoFullWidth.prototype.init = function() {

	var self = this;

};

export default VideoFullWidth;
