import PubSub from "underpub-js";
import gsap from "gsap";
import { 
	OverlayScrollbars, 
	ScrollbarsHidingPlugin, 
	SizeObserverPlugin, 
	ClickScrollPlugin 
} from 'overlayscrollbars';

var ModalForm = function (options) {

	this.options = {
		$el: false,
		baseClass: 'mol-ModalForm',
	};

	$.extend(true, this.options, options);

};

ModalForm.prototype.init = function () {

	var self = this;

	self.$openModalFormTrigger = $('[href="#open-modal-form"]');
	self.$wrapper = self.options.$el.find(`.${self.options.baseClass}__wrapper`);
	self.$overlay = self.options.$el.find(`.${self.options.baseClass}__overlay`);
	self.$close = self.options.$el.find(`.${self.options.baseClass}__close`);

	// init overlayScrollBars
	self.scroller = OverlayScrollbars({ target: self.$wrapper.get(0) }, {});

	self.initAnimation();
	PubSub.subscribe('ModalForm:toggle', () => self.toggle());
	PubSub.subscribe('ModalForm:toggleOn', () => self.toggleOn());
	PubSub.subscribe('ModalForm:toggleOff', () => self.toggleOff());
	PubSub.subscribe('Sitewide:resize', () => self.toggleOff());

	self.$openModalFormTrigger.on("click", (e) => {
		self.toggleOn();
	})
	self.$close.on("click", () => self.toggleOff());
	self.$overlay.on("click", () => self.toggleOff());
};

ModalForm.prototype.initAnimation = function () {
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
			onComplete: () => self.toggleState(),
			onReverseComplete: () => {
				self.toggleState();
				PubSub.publish('Sitewide:enableScrolling');
			},
		})
		.set(self.options.$el, {
			clearProps: "visibility,opacity"
		})
		.set(self.options.$el, {
			visibility: 'visible',
		})
		.fromTo(self.options.$el,
			{
				opacity: 0,
			},
			{
				opacity: 1,
				duration: .7,
			}
		)
		.fromTo(self.$wrapper, {
			xPercent: 100,
		},
		{
			duration: .7,
			xPercent: 0,
		}, "<.3");
};

ModalForm.prototype.toggleState = function () {
	const self = this;

	self.options.isToggled = !self.options.isToggled;
};

ModalForm.prototype.toggleOn = function (speed = 1) {
	const self = this;

	// if (self.options.isToggled || self.animationTl.isActive()) return;

	self.animationTl.timeScale(speed).play();
};

ModalForm.prototype.toggleOff = function (speed = 2) {
	const self = this;

	// if (!self.options.isToggled || self.animationTl.isActive()) return;

	self.animationTl.timeScale(speed).reverse();
};

ModalForm.prototype.toggle = function () {
	const self = this;

	self.animationTl.reversed() ? self.toggleOn() : self.toggleOff();
};

export default ModalForm;