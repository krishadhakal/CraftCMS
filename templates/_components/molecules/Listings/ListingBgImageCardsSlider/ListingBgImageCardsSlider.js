import PubSub from "underpub-js";
import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';
Swiper.use([Navigation]);

var ListingBgImageCardsSlider = function(options) {

	this.options = {
		$el: false,
		baseClass: 'mol-ListingBgImageCardsSlider',
	};

	$.extend(true, this.options, options);

};

ListingBgImageCardsSlider.prototype.init = function() {

	var self = this;

	self.centerSlides = self.options.$el.attr("data-center-slides") == "true";
	self.numberOfSlides = parseInt(self.options.$el.attr("data-number-of-slides"));
	self.$slides = self.options.$el.find(`.${self.options.baseClass}__cards`);
	self.$arrowPrev = self.options.$el.find(`.${self.options.baseClass}__arrow--prev`);
	self.$arrowNext = self.options.$el.find(`.${self.options.baseClass}__arrow--next`);

	self.initCarousel();

};

ListingBgImageCardsSlider.prototype.initCarousel = function() {

	var self = this;

	let swiperOptions = {

		loop: true,
		loopAdditionalSlides: 5,
		initialSlide: self.numberOfSlides,
		centeredSlides: true,
		slidesPerView: 'auto',

		// arrows
		navigation: {
		  nextEl: self.$arrowNext[0],
		  prevEl: self.$arrowPrev[0],
		},

		spaceBetween: 16,
		
	};

	if (!self.centerSlides) {
		
		swiperOptions = {
			...swiperOptions,
			breakpoints: {
				// small (>=560px)
				// 560: {
				// 	centeredSlides: true,
				// },
				// medium (>=768px)
				// 768: {
				// 	centeredSlides: false,
				// 	slidesPerView: 2,
				// },
				// large (>=1024px)
				1024: {
					centeredSlides: false,
					slidesPerView: 3,
				},
				// xlarge (>=1440px)
				1440: {
					centeredSlides: false,
					slidesPerView: 4
				}
			}
		};

	}


	self.swiper = new Swiper(self.$slides[0], swiperOptions);

};

export default ListingBgImageCardsSlider;
