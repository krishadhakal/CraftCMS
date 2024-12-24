import PubSub from "underpub-js";

var MediaTakeover = function(options) {

	this.options = {
		$el: false,
		baseClass: 'el-MediaTakeover',
	};

	$.extend(true, this.options, options);

};

MediaTakeover.prototype.init = function() {

	var self = this;

};

export default MediaTakeover;
