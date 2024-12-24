import PubSub from "underpub-js";

var Banner = function(options) {

	this.options = {
		$el: false,
		baseClass: 'mol-Banner',
	};

	$.extend(true, this.options, options);

};

Banner.prototype.init = function() {

	var self = this;

};

export default Banner;
