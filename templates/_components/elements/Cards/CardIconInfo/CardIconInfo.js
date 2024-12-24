import PubSub from "underpub-js";

var CardIconInfo = function(options) {

	this.options = {
		$el: false,
		baseClass: 'el-CardIconInfo',
	};

	$.extend(true, this.options, options);

};

CardIconInfo.prototype.init = function() {

	var self = this;

};

export default CardIconInfo;
