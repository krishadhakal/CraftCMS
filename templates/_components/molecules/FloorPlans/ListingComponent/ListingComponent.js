import PubSub from "underpub-js";

var ListingComponent = function(options) {

	this.options = {
		$el: false,
		baseClass: 'mol-ListingComponent',
	};

	$.extend(true, this.options, options);

};

ListingComponent.prototype.init = function() {

	var self = this;

};

export default ListingComponent;
