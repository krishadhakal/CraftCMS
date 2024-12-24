import PubSub from "underpub-js";
import Swiper from 'swiper';
import { Pagination, EffectFade } from 'swiper/modules';
Swiper.use([Pagination, EffectFade]);

var QuoteStandard = function (options) {

	this.options = {
		$el: false,
		baseClass: 'mol-QuoteStandard',
	};

	$.extend(true, this.options, options);

};

QuoteStandard.prototype.init = function () {

	var self = this;

	self.$items = self.options.$el.find(`.${self.options.baseClass}__items`);
	self.$dots = self.options.$el.find(`.${self.options.baseClass}__dots`);

	let swiperOptions = {

		loop: true,
		
		// dots
		pagination: {
		  el: self.$dots[0],
		  clickable: true,
		},
		
		// fade effect
		effect: 'fade',
		fadeEffect: {
			crossFade: true
		},
	  
	};

	// initialize swiper
	self.swiper = new Swiper(self.$items[0], swiperOptions);

};

export default QuoteStandard;