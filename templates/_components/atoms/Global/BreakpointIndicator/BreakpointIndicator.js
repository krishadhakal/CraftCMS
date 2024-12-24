import PubSub from "underpub-js";

var BreakpointIndicator = function(options) {

	this.options = {
		$el: false,
		baseClass: 'atom-BreakpointIndicator',
	};

	$.extend(true, this.options, options);

};

BreakpointIndicator.prototype.init = function() {

	var self = this;

};

export default BreakpointIndicator;
