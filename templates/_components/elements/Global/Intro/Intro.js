import PubSub from "underpub-js";

var Intro = function(options) {

	this.options = {
		$el: false,
		baseClass: 'el-Intro',
	};

	$.extend(true, this.options, options);

};

Intro.prototype.init = function() {

	var self = this;

};

export default Intro;
