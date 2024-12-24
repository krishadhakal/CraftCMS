import PubSub from 'underpub-js';
import gsap from 'gsap';

var Loader = function (options) {
	this.options = {
		$el: false,
		baseClass: 'mol-Loader',
		hasLoaded: false,
	};

	$.extend(true, this.options, options);
};

Loader.prototype.init = function () {
	const self = this;

	self.$icon = self.options.$el.find(`.${self.options.baseClass}__icon`);

	self.initLoaderAnimation();
	self.initLoaderInAnimation();
	self.initLoaderOutAnimation();

	$(window).on('load', () => self.handleWindowLoad());

	setTimeout(() => !self.options.hasLoaded && $(window).trigger('load'), 2000);

};

Loader.prototype.initLoaderInAnimation = function () {
	const self = this;

	// the timeline that will play first and animate in the loader icon
	gsap.timeline()
		.set('body', {
			opacity: 1,
		})
		.fromTo(self.$icon, {
			scale: 0,
			opacity: 0,
		}, {
			scale: 1,
			opacity: 1,
			ease: "back.out(1.5)",
			duration: .3,
			delay: .1,
		})
		.call(self.playLoaderAnimation.bind(self));
};

Loader.prototype.killLoader = function () {
	const self = this;

	self.options.$el.hide();
	$('html').removeClass('loading');
	gsap.set('body', {
		clearProps: "opacity"
	})
	self.killLoaderAnimation();
};

Loader.prototype.initLoaderAnimation = function () {
	const self = this;

	// the timeline that should be used for animations that take place while the loader is on screen
	self.loaderTimeline = gsap
		.timeline({
			repeatDelay: 0,
			repeat: -1,
			repeatRefresh: true,
			delay: 0.1,
			paused: true,
			defaults: {
				ease: 'expo.out',
			},
		})
		.to(self.$icon,
			{
				// rotation: "+=90",
				duration: 0.8
			}
		);
	
};

Loader.prototype.initLoaderOutAnimation = function () {
	const self = this;

	// the timeline that plays when loading is complete
	self.loaderOutTimeline = gsap
		.timeline({
			delay: 1,
			paused: true,
			defaults: {
				ease: 'expo.out',
			},
			onStart: () => PubSub.publish('Sitewide:loaded'),
			onComplete: () => self.killLoader(),
		})
		.set(self.options.$el, {
			pointerEvents: "none",
		})
		.to(self.$icon, {
			ease: "back.out(1.5)",
			duration: 0.4,
			opacity: 0,
			scale: 0,
		})
		.to(
			self.options.$el, {
				duration: 1.5,
				opacity: 0,
			}, "-=.2"
		)
		.call(() => {
			PubSub.publish('Sitewide:loaderOutComplete');
		}, [], ">-=1");
		
};

Loader.prototype.playLoaderAnimation = function () {
	const self = this;

	self.loaderTimeline.play();
};

Loader.prototype.killLoaderAnimation = function () {
	const self = this;

	self.loaderTimeline.kill();
};

Loader.prototype.playLoaderOutAnimation = function () {
	const self = this;

	self.loaderOutTimeline.play();
};

Loader.prototype.handleWindowLoad = function () {
	const self = this;

	self.options.hasLoaded = true;
	self.playLoaderOutAnimation();
};

export default Loader;