import PubSub from "underpub-js";

var ContentTextMediaTypeOne = function (options) {

	this.options = {
		$el: false,
		baseClass: 'mol-ContentTextMediaTypeOne',
	};

	$.extend(true, this.options, options);

};

ContentTextMediaTypeOne.prototype.init = function () {

	var self = this;

};

export default ContentTextMediaTypeOne;