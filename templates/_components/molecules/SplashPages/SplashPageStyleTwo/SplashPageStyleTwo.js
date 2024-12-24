import PubSub from "underpub-js";

var SplashPageStyleTwo = function(options) {

	this.options = {
		$el: false,
		baseClass: 'mol-SplashPageStyleTwo',
	};

	$.extend(true, this.options, options);

};

SplashPageStyleTwo.prototype.init = function() {

	var self = this;

	self.$carouselWrapper = self.options.$el.find(`.${self.options.baseClass}__carousel`);

	if ($('.mol-Banner').length) {

		$(window).on('load', () => self.adjustMaxCarouselHeight());

		PubSub.subscribe("Sitewide:resized", function(){
			self.adjustMaxCarouselHeight();
		});

	}

};

/*
This function is used when the sitewide banner is enabled. It adjusts the carousel
max height so to account for the space the banner takes up.
- Without this, the carousel grows and the component takes 100vh.
- With this, the carousel grows and the component takes 100vh - banner height
*/
SplashPageStyleTwo.prototype.adjustMaxCarouselHeight = function() {

	let self = this;

	let breakpoint = window.Breakpoint.value;

	if (breakpoint == 'large' || breakpoint == 'xlarge') {
		
		let bannerHeight = $('.mol-Banner').outerHeight();
		let maxHeight = `calc(100vh - ${bannerHeight}px)`;

		self.$carouselWrapper.css({ "maxHeight": maxHeight });

	}
	else {
		self.$carouselWrapper.css({ "maxHeight": "" });
	}

};

export default SplashPageStyleTwo;
