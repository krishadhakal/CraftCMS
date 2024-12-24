import PubSub from "underpub-js";

var MediaPrimary = function(options) {

	this.options = {
		$el: false,
		baseClass: 'mol-MediaPrimary',
	};

	$.extend(true, this.options, options);

};

MediaPrimary.prototype.init = function() {

	var self = this;

	self.$arrowPrev = self.options.$el.find(`.${self.options.baseClass}__arrow--prev`);
	self.$arrowNext = self.options.$el.find(`.${self.options.baseClass}__arrow--next`);

	self.$arrowPrev.on('click', function() {
		PubSub.publish("Carousel:previousSlideIfChild", {
			$parent: self.options.$el
		})
	});

	self.$arrowNext.on('click', function() {
		PubSub.publish("Carousel:nextSlideIfChild", {
			$parent: self.options.$el
		})
	});

};

export default MediaPrimary;
