import PubSub from 'underpub-js';
import gsap from 'gsap';

var Hamburger = function (options) {
	this.options = {
		$el: false,
		baseClass: 'atom-Hamburger',
		isToggled: false,
	};

	$.extend(true, this.options, options);
};

Hamburger.prototype.init = function () {
	const self = this;

	self.$line = self.options.$el.find('.line');
	self.$top = self.options.$el.find('.top');
	self.$topLine = self.$top.find(self.$line);
	self.$bottom = self.options.$el.find('.bottom');
	self.$bottomLine = self.$bottom.find(self.$line);

	self.initAnimation();

	self.options.$el.on("click", () => {
		PubSub.publish("Hamburger:toggle");
	})

	PubSub.subscribe("Hamburger:toggle", () => self.toggle());
	PubSub.subscribe("Hamburger:toggleOn", () => self.toggleOn());
	PubSub.subscribe("Hamburger:toggleOff", () => self.toggleOff());
	PubSub.subscribe('Sitewide:resize', () => self.toggleOff())
};

Hamburger.prototype.initAnimation = function () {
	const self = this;

	self.animationTl = gsap
		.timeline({
			paused: true,
			reversed: true,
			onComplete: () => self.toggleState(),
			onReverseComplete: () => self.toggleState(),
		})
		.to(self.$line, {
			duration: 0.2,
			width: 0,
			stagger: 0.1,
		})
		.set([self.$top, self.$bottom], {
			left: "10%",
		})
		.set(self.$top, {
			top: "-3%"
		})
		.set(self.$bottom, {
			bottom: "-3%"
		})
		.set(self.$topLine, {
			rotation: 45
		})
		.set(self.$bottomLine, {
			rotation: -45
		})
		.add(() => self.options.$el.toggleClass(`${self.options.baseClass}--active`))
		.to([self.$topLine, self.$bottomLine], {
			duration: 0.25,
			width: '100%',
			stagger: 0.25,
		});
};

Hamburger.prototype.toggleState = function () {
	const self = this;

	self.options.isToggled = !self.options.isToggled;
};

Hamburger.prototype.toggleOn = function (speed = 1) {
	const self = this;

	// if (self.options.isToggled || self.animationTl.isActive()) return;

	PubSub.publish("ModalHeader:toggleOn");
	self.animationTl.timeScale(speed).play();
};

Hamburger.prototype.toggleOff = function (speed = 1.4) {
	const self = this;

	// if (!self.options.isToggled || self.animationTl.isActive()) return;

	PubSub.publish("ModalHeader:toggleOff");
	self.animationTl.timeScale(speed).reverse();
};

Hamburger.prototype.toggle = function () {
	const self = this;

	!self.options.isToggled ? self.toggleOn() : self.toggleOff();
};

export default Hamburger;