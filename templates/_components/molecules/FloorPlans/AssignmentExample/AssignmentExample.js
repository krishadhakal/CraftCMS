import PubSub from "underpub-js";

var AssignmentExample = function(options) {

	this.options = {
		$el: false,
		baseClass: 'mol-AssignmentExample',
	};

	$.extend(true, this.options, options);

};

AssignmentExample.prototype.init = function() {

	var self = this;

};

export default AssignmentExample;
