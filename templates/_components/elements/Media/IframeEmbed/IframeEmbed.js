import PubSub from "underpub-js";

var IframeEmbed = function(options) {

	this.options = {
		$el: false,
		baseClass: 'el-IframeEmbed',
	};

	$.extend(true, this.options, options);

};

IframeEmbed.prototype.init = function() {

	var self = this;

	self.$wrapper = self.options.$el.find(`.${self.options.baseClass}__embed`);
	self.$iframe = self.options.$el.find('iframe');
	self.maintainAspectRatioClass = `${self.options.baseClass}__embed--maintainAspectRatio`;

	self.sizeIFrame();

};

IframeEmbed.prototype.sizeIFrame = function() {

	var self = this;

	if (self.$iframe.length) {

		let width = self.$iframe.attr('width');
		let height = self.$iframe.attr('height');
		let aspectRatio = 16/9;

		if (width && width.includes("%")) {
			return;
		}

		if (width && height) {
			let aspectRatio = height + '/' + width;
		}

		self.$iframe.attr('width', '');
		self.$iframe.attr('height', '');

		self.$wrapper.addClass(self.maintainAspectRatioClass);
		self.$wrapper.css('aspect-ratio', aspectRatio);

	}

};

export default IframeEmbed;
