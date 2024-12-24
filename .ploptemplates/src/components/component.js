import PubSub from "underpub-js";

var {{name}} = function(options) {

	this.options = {
		$el: false,
		baseClass: '{{lowerCase typeShortname}}-{{properCase name}}',
	};

	$.extend(true, this.options, options);

};

{{name}}.prototype.init = function() {

	var self = this;

};

export default {{name}};
