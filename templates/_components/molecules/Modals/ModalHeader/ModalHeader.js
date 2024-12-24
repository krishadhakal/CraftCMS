import PubSub from "underpub-js";
import gsap from 'gsap';
import { 
	OverlayScrollbars, 
	ScrollbarsHidingPlugin, 
	SizeObserverPlugin, 
	ClickScrollPlugin 
} from 'overlayscrollbars';

var ModalHeader = function (options) {

	this.options = {
		$el: false,
		baseClass: 'mol-ModalHeader',
	};

	$.extend(true, this.options, options);

};

ModalHeader.prototype.init = function () {

	var self = this;

	self.$navigationPrimaryItems = self.options.$el.find(`.${self.options.baseClass}__navigation-primary li`);
	self.$navigationSecondaryItems = self.options.$el.find(`.${self.options.baseClass}__navigation-secondary li`);
	self.$allNavigationItems = self.options.$el.find(`.${self.options.baseClass}__navigation-primary li, .${self.options.baseClass}__navigation-secondary li`);

	// init overlayScrollBars
	self.scroller = OverlayScrollbars({ target: self.options.$el.get(0) }, {});

	self.initAnimation();
	PubSub.subscribe('ModalHeader:toggle', () => self.toggle());
	PubSub.subscribe('ModalHeader:toggleOn', () => self.toggleOn());
	PubSub.subscribe('ModalHeader:toggleOff', () => self.toggleOff());
	PubSub.subscribe('Sitewide:resize', () => self.toggleOff())

};

ModalHeader.prototype.initAnimation = function () {
	const self = this;

	self.animationTl = gsap
		.timeline({
			paused: true,
			reversed: true,
			defaults: {
				ease: "expo.out"
			},
			onStart: () => {
				PubSub.publish('Sitewide:disableScrolling');
			},
			onComplete: () => {
				self.toggleState()
			},
			onReverseComplete: () => {
				self.toggleState();
				PubSub.publish('Sitewide:enableScrolling');
			},
		})
		.set(self.options.$el, {
			visibility: "hidden",
			opacity: 0,
		})
		.to(self.options.$el, {
			visibility: 'visible',
			opacity: 1,
			duration: .7,
		})
		.from(self.$allNavigationItems, {
			duration: 0.8,
			opacity: 0,
			y: 20,
			stagger: 0.08,
		});
};

ModalHeader.prototype.toggleState = function () {
	const self = this;

	self.options.isToggled = !self.options.isToggled;
};

ModalHeader.prototype.toggleOn = function (speed = 1) {
	const self = this;

	// if (self.options.isToggled || self.animationTl.isActive()) return;

	gsap.timeline()
		// scroll to top before animating in header
		.to(window, {
			duration: 0.25,
			scrollTo: 0
		})
		.add(() => {
			self.animationTl.timeScale(speed).play();
		});

};

ModalHeader.prototype.toggleOff = function (speed = 2) {
	const self = this;

	// if (!self.options.isToggled || self.animationTl.isActive()) return;

	self.animationTl.timeScale(speed).reverse();
};

ModalHeader.prototype.toggle = function () {
	const self = this;

	self.animationTl.reversed() ? self.toggleOn() : self.toggleOff();
};

export default ModalHeader;