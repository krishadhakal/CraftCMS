import PubSub from "underpub-js";

var ListingIconInfo = function (options) {

	this.options = {
		$el: false,
		baseClass: 'mol-ListingIconInfo',
	};

	$.extend(true, this.options, options);

};

ListingIconInfo.prototype.init = function () {

	var self = this;

};

export default ListingIconInfo;