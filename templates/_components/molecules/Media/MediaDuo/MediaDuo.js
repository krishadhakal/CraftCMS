import PubSub from "underpub-js";

var MediaDuo = function(options) {

	this.options = {
		$el: false,
		baseClass: 'mol-MediaDuo',
	};

	$.extend(true, this.options, options);

};

MediaDuo.prototype.init = function() {

	var self = this;

};

export default MediaDuo;
