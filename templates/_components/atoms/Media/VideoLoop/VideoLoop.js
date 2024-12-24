import PubSub from "underpub-js";

var VideoLoop = function (options) {

	this.options = {
		$el: false,
		baseClass: 'atom-VideoLoop',
	};

	$.extend(true, this.options, options);

};

VideoLoop.prototype.init = function () {

	var self = this;

};

export default VideoLoop;
