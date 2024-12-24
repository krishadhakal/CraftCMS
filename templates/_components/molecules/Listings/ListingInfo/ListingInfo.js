import PubSub from "underpub-js";

var ListingInfo = function(options) {

	this.options = {
		$el: false,
		baseClass: 'mol-ListingInfo',
	};

	$.extend(true, this.options, options);

};

ListingInfo.prototype.init = function() {

	var self = this;

};

export default ListingInfo;
