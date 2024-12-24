import PubSub from "underpub-js";

var MediaTrio = function(options) {

	this.options = {
		$el: false,
		baseClass: 'mol-MediaTrio',
	};

	$.extend(true, this.options, options);

};

MediaTrio.prototype.init = function() {

	var self = this;

};

export default MediaTrio;
