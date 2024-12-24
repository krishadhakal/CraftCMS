import PubSub from 'underpub-js';
import gsap from 'gsap';
import ScrollToPlugin from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

var CardFaq = function (options) {
	this.options = {
		$el: false,
		baseClass: 'el-CardFaq',
		isToggled: false,
	};

	$.extend(true, this.options, options);
};

CardFaq.prototype.init = function () {
	var self = this;

	self.scrollToOnOpen = self.options.$el.attr("data-scroll-to-on-open");

	self.$toggle = self.options.$el.find(
		`.${self.options.baseClass}__toggle`,
	);
	self.$copy = self.options.$el.find(`.${self.options.baseClass}__copy`);
	self.$toggleButton = self.options.$el.find(
		`.${self.options.baseClass}__toggle__button`,
	);

	if (self.$copy.length && self.$toggle.length) {
		self.initAnimation();
		self.$toggle.on('click', () => self.toggle());
	}

	PubSub.subscribe('CardFaq:toggleOff', () => self.toggleOff(100));
};

CardFaq.prototype.initAnimation = function () {
	const self = this;

	const getHeightTween = () =>
		gsap.to(self.$copy, {
			height: self.options.isToggled ? 0 : 'auto',
			duration: 0.45,
			ease: 'expo.inout',
		});

	self.timeline = gsap
		.timeline({
			paused: true,
			reversed: true,
			onStart: () => {
				self.options.$el.addClass(`${self.options.baseClass}--active`);
			},
			onComplete: () => {
				self.toggleState();
				if (self.scrollToOnOpen == "true") {
					gsap.to(window, {
						scrollTo: {
							y: self.options.$el[0],
							offsetY: 10
						},
						duration: .5,
						ease: 'expo.inout',
					});
				}
			},
			onReverseComplete: () => {
				self.options.$el.removeClass(`${self.options.baseClass}--active`);
				self.toggleState()
			},
		})
		.to(self.$toggleButton, {
			rotation: 180,
			duration: .4,
			ease: 'expo.inout',
		})
		.add(getHeightTween, "<")
		.fromTo(
			self.$copy, {
				opacity: 0,
			}, {
				opacity: 1,
				duration: 0.4,
				delay: .2,
				ease: 'expo.inout',
			},
			'<.1',
		);
};

CardFaq.prototype.toggleState = function () {
	const self = this;

	self.options.isToggled = !self.options.isToggled;
};

CardFaq.prototype.toggleOn = function (speed = 1) {
	const self = this;

	// Close any other open navigation item first
	PubSub.publish("CardFaq:toggleOff");

	if (self.options.isToggled || self.timeline.isActive()) return;

	self.timeline.timeScale(speed).play();
};

CardFaq.prototype.toggleOff = function (speed = 2) {
	const self = this;

	if (!self.options.isToggled || self.timeline.isActive()) return;

	self.timeline.timeScale(speed).reverse();
};

CardFaq.prototype.toggle = function () {
	const self = this;

	self.timeline.reversed() ? self.toggleOn() : self.toggleOff();
};

export default CardFaq;