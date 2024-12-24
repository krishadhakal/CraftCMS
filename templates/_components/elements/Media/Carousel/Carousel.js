import PubSub from "underpub-js";
import Swiper from 'swiper';
import { Autoplay, Navigation, Pagination, EffectFade } from 'swiper/modules';
Swiper.use([Autoplay, Navigation, Pagination, EffectFade]);

var Carousel = function (options) {

	this.options = {
		$el: false,
		baseClass: 'el-Carousel',
	};

	$.extend(true, this.options, options);

};

Carousel.prototype.init = function () {

	var self = this;

	self.id = self.options.$el.data('id');
	self.$slides = self.options.$el.find(`.${self.options.baseClass}__slides`);
	self.$slidesWrapper = self.$slides.find(`.swiper-wrapper`);
	self.$arrowPrev = self.options.$el.find(`.${self.options.baseClass}__arrow--prev`);
	self.$arrowNext = self.options.$el.find(`.${self.options.baseClass}__arrow--next`);
	self.$dots = self.options.$el.find(`.${self.options.baseClass}__dots`);
	self.autoplay = self.options.$el.attr("data-autoplay");
	self.autoplaySpeed = parseInt(self.options.$el.attr("data-autoplay-speed"));

	self.initCarousel();

	PubSub.subscribe('Carousel:updateData', data => {
		if (!data) return;

		self.updateData(data);
	});

	// pubsub events for navigation that is not part of the carousel
	// PubSub.subscribe('Carousel:nextSlide', id => {
	// 	if ((!id) || (id != self.id)) return;
	// 	self.nextSlide();
	// });

	// PubSub.subscribe('Carousel:previousSlide', id => {
	// 	if ((!id) || (id != self.id)) return;
	// 	self.previousSlide();
	// });

	PubSub.subscribe('Carousel:previousSlideIfChild', data => {
		const $parent = data.$parent;
		if (self.options.$el.closest($parent).length) {
			self.previousSlide();
		}
	});

	PubSub.subscribe('Carousel:nextSlideIfChild', data => {
		const $parent = data.$parent;
		if (self.options.$el.closest($parent).length) {
			self.nextSlide();
		}
	});

	// stop any videos that are playing when slide is changed
	self.swiper.on('slideChange', function () {
		PubSub.publish("VideoPlayer:toggleOffIfChild", {
			$parent: self.options.$el
		})
	});
	

};

Carousel.prototype.initCarousel = function () {

	const self = this;

	let swiperOptions = {

		loop: true,
		allowTouchMove: false,
		
		// dots
		pagination: {
		  el: self.$dots[0],
		  clickable: true,
		},

		// arrows
		navigation: {
		  nextEl: self.$arrowNext[0],
		  prevEl: self.$arrowPrev[0],
		},
		
		// fade effect
		effect: 'fade',
		fadeEffect: {
			crossFade: true
		},
	  
	};

	// autoplay
	if (self.autoplay == "true") {
		
		swiperOptions = {
			...swiperOptions,
			autoplay: {
				delay: self.autoplaySpeed,
				disableOnInteraction: false,
				pauseOnMouseEnter: false,
			},
		};

	}

	// initialize swiper
	self.swiper = new Swiper(self.$slides[0], swiperOptions);

};

Carousel.prototype.nextSlide = function () {

	const self = this;

	self.swiper.slideNext();
	
};

Carousel.prototype.previousSlide = function () {

	const self = this;

	self.swiper.slidePrev();
	
};

Carousel.prototype.updateData = function (data) {
	const self = this;
	const container = data.container;
	const slides = data.slides;

	if (!container || !container.length) return;

	if (self.options.$el.parent($(container)).length) {

		// make sure that this carousel instance is the one inside the container
		const $carousel = $(container).find(self.options.$el);
		if (!$carousel.length) return;

		if (slides && slides.length) {
			self.generateSlides(slides);
		}
	}
};

Carousel.prototype.generateSlides = function (slides) {
	const self = this;

	if (!slides) return;

	self.$slides.hide();

	self.$slidesWrapper.empty(); // remove any slides currently in slider
	self.swiper.destroy(); // destroy the swiper instance

	// add all new slides to slider
	slides.forEach(slide => {
		const slideType = slide.type;

		if (!slideType || !slideType.length) return;

		let slideElement;

		switch (slideType) {
			case "image":
				slideElement = self.generateImageSlide(slide);
				break;
			case "video":
				slideElement = self.generateVideoSlide(slide);
				break;
			default:
				break;
		}

		if (slideElement && slideElement.length) {
			self.$slidesWrapper.append(slideElement);
		}
	});

	self.initCarousel(); // re-init the swiper instance
	self.$slides.show();
	
};

Carousel.prototype.generateImageSlide = function (data) {
	const self = this;

	if (!data) return;

	const url = data.url;
	const alt = data.alt;

	if (!url || !url.length) return;

	const slide = `
		<div class="${self.options.baseClass}__slide swiper-slide">
			<img class="atom-ResponsiveImage atom-ResponsiveImage--bgImage" src="${url}" alt="${alt}" />
		</div>
	`;

	return slide;
};

Carousel.prototype.generateVideoSlide = function (data) {
	const self = this;

	if (!data) return;

	const url = data.url;

	if (!url || !url.length) return;

	const slide = `
		<div class="${self.options.baseClass}__slide swiper-slide">
			<div class="${self.options.baseClass}__video">
				<div class="${self.options.baseClass}__video__inner">
					<iframe type="text/html" src="${url}" frameborder="0" allow="autoplay"></iframe>
				</div>
			</div>
		</div>
	`;

	return slide;
};

export default Carousel;