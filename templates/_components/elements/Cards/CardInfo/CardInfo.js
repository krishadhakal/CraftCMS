import PubSub from "underpub-js";
import gsap from 'gsap';

var CardInfo = function(options) {

	this.options = {
		$el: false,
		baseClass: 'el-CardInfo',
	};

	$.extend(true, this.options, options);

};

CardInfo.prototype.init = function() {

	var self = this;

};

export default CardInfo;
