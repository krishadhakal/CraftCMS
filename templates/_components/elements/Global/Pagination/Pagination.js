import PubSub from "underpub-js";

var Pagination = function(options) {

	this.options = {
		$el: false,
		baseClass: 'el-Pagination',
	};

	$.extend(true, this.options, options);

};

Pagination.prototype.init = function() {

	var self = this;

};

export default Pagination;
