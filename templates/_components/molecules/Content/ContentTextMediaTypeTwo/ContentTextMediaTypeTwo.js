import PubSub from "underpub-js";

var ContentTextMediaTypeTwo = function(options) {

	this.options = {
		$el: false,
		baseClass: 'mol-ContentTextMediaTypeTwo',
	};

	$.extend(true, this.options, options);

};

ContentTextMediaTypeTwo.prototype.init = function() {

	var self = this;

};

export default ContentTextMediaTypeTwo;
