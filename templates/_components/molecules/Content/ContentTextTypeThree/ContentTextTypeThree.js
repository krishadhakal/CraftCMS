import PubSub from "underpub-js";

var ContentTextTypeThree = function(options) {

	this.options = {
		$el: false,
		baseClass: 'mol-ContentTextTypeThree',
	};

	$.extend(true, this.options, options);

};

ContentTextTypeThree.prototype.init = function() {

	var self = this;

};

export default ContentTextTypeThree;
