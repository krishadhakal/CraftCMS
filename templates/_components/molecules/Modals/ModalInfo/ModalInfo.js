import PubSub from "underpub-js";
import gsap from "gsap";
import Cookies from 'js-cookie';
import { 
	OverlayScrollbars, 
	ScrollbarsHidingPlugin, 
	SizeObserverPlugin, 
	ClickScrollPlugin 
} from 'overlayscrollbars';

var ModalInfo = function (options) {

	this.options = {
		$el: false,
		baseClass: 'mol-ModalInfo',
		isToggled: false,
		hideDuration: 0,
	};

	$.extend(true, this.options, options);

};

ModalInfo.prototype.init = function () {

	const self = this;

	self.$inner = self.options.$el.find(`.${self.options.baseClass}__inner`);
	self.$hideTriggers = $('[data-modal-info-hide]');
	self.options.hideDuration = self.options.$el.attr("data-modal-info-hide-duration");

	// init overlayScrollBars
	self.scroller = OverlayScrollbars({ target: self.$inner.get(0) }, {});

	self.initAnimation();

	if (self.getHideCookie() !== "true") {
		PubSub.subscribe("Sitewide:loaded", () => {
			gsap.delayedCall(1, () => self.toggleOn())
		});
	}

	PubSub.subscribe("ModalInfo:toggle", () => self.toggle());
	PubSub.subscribe("ModalInfo:toggleOn", () => self.toggleOn());
	PubSub.subscribe("ModalInfo:toggleOff", () => self.toggleOff());

	self.$hideTriggers.on('click', () => self.toggleOff());
};

ModalInfo.prototype.setHideCookie = function () {
	const self = this;

	const cookieExpiryTime = new Date(new Date().getTime() + self.options.hideDuration * 60 * 1000);

	Cookies.set("hideModalInfo", "true", {
		expires: cookieExpiryTime,
	});
}

ModalInfo.prototype.getHideCookie = function () {
	const self = this;

	return Cookies.get("hideModalInfo");
}

ModalInfo.prototype.initAnimation = function () {
	const self = this;

	self.animationTimeline = gsap
		.timeline({
			paused: true,
			reversed: true,
			defaults: {
				ease: "expo.out",
				duration: .4,
			},
			onStart: () => {
				PubSub.publish('Sitewide:disableScrolling');
			},
			onComplete: () => {
				self.toggleState();
			},
			onReverseComplete: () => {
				self.toggleState();
				PubSub.publish('Sitewide:enableScrolling');
			},
		})
		.set(self.options.$el, {
			display: "block",
			visibility: "visible",
		})
		.fromTo(self.options.$el, {
			opacity: 0
		}, {
			opacity: 1,
		})
		.from(self.$inner, {
			y: 20,
			opacity: 0,
		}, "<.2")
};

ModalInfo.prototype.toggleState = function () {
	const self = this;

	self.options.isToggled = !self.options.isToggled;
};

ModalInfo.prototype.toggleOn = function (speed = 1) {
	const self = this;

	if (self.options.isToggled || self.animationTimeline.isActive()) return;

	self.animationTimeline.timeScale(speed).play();
};

ModalInfo.prototype.toggleOff = function (speed = 1.4) {
	const self = this;

	self.setHideCookie();

	if (!self.options.isToggled || self.animationTimeline.isActive()) return;

	self.animationTimeline.timeScale(speed).reverse();
};

ModalInfo.prototype.toggle = function () {
	const self = this;

	!self.options.isToggled ? self.toggleOn() : self.toggleOff();
};

export default ModalInfo;