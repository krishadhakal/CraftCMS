import PubSub from "underpub-js";

var Breadcrumbs = function(options) {

	this.options = {
		$el: false,
		baseClass: 'el-Breadcrumbs',
	};

	$.extend(true, this.options, options);

};

Breadcrumbs.prototype.init = function() {

	var self = this;

};

export default Breadcrumbs;
