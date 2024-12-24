import PubSub from "underpub-js";

var ListingFaq = function(options) {

	this.options = {
		$el: false,
		baseClass: 'mol-ListingFaq',
	};

	$.extend(true, this.options, options);

};

ListingFaq.prototype.init = function() {

	var self = this;

};

export default ListingFaq;
