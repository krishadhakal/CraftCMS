import PubSub from "underpub-js";

var UnitTypeInformation = function(options) {

	this.options = {
		$el: false,
		baseClass: 'mol-UnitTypeInformation',
	};

	$.extend(true, this.options, options);

};

UnitTypeInformation.prototype.init = function() {

	var self = this;

};

export default UnitTypeInformation;
