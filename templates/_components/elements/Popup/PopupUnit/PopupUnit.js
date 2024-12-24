import PubSub from "underpub-js";

var PopupUnit = function(options) {

	this.options = {
		$el: false,
		baseClass: 'el-PopupUnit',
	};

	$.extend(true, this.options, options);

};

PopupUnit.prototype.init = function() {

	var self = this;

};

export default PopupUnit;
