import PubSub from "underpub-js";

var ListingUnitsFilters = function(options) {

	this.options = {
		$el: false,
		baseClass: 'el-ListingUnitsFilters',
	};

	$.extend(true, this.options, options);

};

ListingUnitsFilters.prototype.init = function() {

	var self = this;

};

export default ListingUnitsFilters;
