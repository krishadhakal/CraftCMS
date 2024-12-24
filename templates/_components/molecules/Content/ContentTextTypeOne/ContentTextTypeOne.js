import PubSub from "underpub-js";

var ContentTextTypeOne = function(options) {

	this.options = {
		$el: false,
		baseClass: 'mol-ContentTextTypeOne',
	};

	$.extend(true, this.options, options);

};

ContentTextTypeOne.prototype.init = function() {

	var self = this;

};

export default ContentTextTypeOne;
