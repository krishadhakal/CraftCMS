import PubSub from 'underpub-js';
import gsap from 'gsap';
import Cookies from 'js-cookie';
import { 
	OverlayScrollbars, 
	ScrollbarsHidingPlugin, 
	SizeObserverPlugin, 
	ClickScrollPlugin 
} from 'overlayscrollbars';

var WidgetPopup = function (options) {
	this.options = {
		$el: false,
		baseClass: 'mol-WidgetPopup',
		isToggled: false,
		isContentToggled: false,
		hideDuration: 0,
	};

	$.extend(true, this.options, options);
};

WidgetPopup.prototype.init = function () {
	const self = this;

	self.$button = self.options.$el.find(`.${self.options.baseClass}__button`);
	self.$buttonClose = self.options.$el.find(`.${self.options.baseClass}__button--close`);
	self.$buttonCollapse = self.options.$el.find(`.${self.options.baseClass}__button--collapse`);
	self.$wrapper = self.options.$el.find(`.${self.options.baseClass}__wrapper`);
	self.$toggle = self.options.$el.find(`.${self.options.baseClass}__toggle`);
	self.$content = self.options.$el.find(`.${self.options.baseClass}__content`);
	self.$introduction = self.options.$el.find(`.${self.options.baseClass}__introduction`);
	self.$items = self.options.$el.find(`.${self.options.baseClass}__items`);
	self.$item = self.options.$el.find(`.${self.options.baseClass}__item`);
	self.$itemTriggers = $("[data-target-item-handle]");
	self.options.hideDuration = self.options.$el.attr("data-widget-popup-hide-duration");

	// init overlayScrollBars
	OverlayScrollbars({ target: self.$introduction.get(0) }, {});
	self.$item.each(function() {
		OverlayScrollbars({ target: $(this).get(0) }, {});
	});


	self.initAnimation();
	self.initContentAnimation();

	self.$itemTriggers.each((index, trigger) => {
		const $trigger = $(trigger);
		const targetItemHandle = $trigger.attr("data-target-item-handle");
		const $targetItem = self.options.$el.find(`[data-item-handle="${targetItemHandle}"]`);

		$trigger.on("click", () => self.showItem($targetItem));
	})

	if (self.getHideCookie() !== "true") {
		PubSub.subscribe("Sitewide:loaded", () => {
			gsap.delayedCall(.5, () => self.toggleOn())
		});
	}

	PubSub.subscribe("WidgetPopup:toggle", () => self.toggle());
	PubSub.subscribe("WidgetPopup:toggleOn", () => self.toggleOn());
	PubSub.subscribe("WidgetPopup:toggleOff", () => self.toggleOff());

	self.$buttonClose.on("click", () => self.toggleOff());
	self.$toggle.on("click", () => self.toggleContentOn());
	self.$buttonCollapse.on("click", () => {
		self.toggleContentOff();
	});
};

WidgetPopup.prototype.setElementActiveState = function ($element, state) {
	const self = this;

	$element.attr("data-active", state);
}

WidgetPopup.prototype.resetContent = function () {
	const self = this;

	self.setElementActiveState(self.$items, false);
	self.setElementActiveState(self.$item, false);
	self.setElementActiveState(self.$introduction, true);

	gsap.set([self.$item, self.$items, self.$introduction], {
		clearProps: "all"
	});
}

WidgetPopup.prototype.showItem = function ($item) {
	const self = this;

	gsap.timeline({
			defaults: {
				ease: "expo.out",
				duration: .7
			}
		})
		.call(() => {
			self.setElementActiveState(self.$items, true);
			self.setElementActiveState($item, true);
		})
		.to(self.$introduction, {
			opacity: 0
		})
		.from($item, {
			opacity: 0,
			duration: .7
		}, "<.2")
}

WidgetPopup.prototype.initAnimation = function () {
	const self = this;

	self.animationTimeline = gsap
		.timeline({
			defaults: {
				ease: "expo.out",
				duration: .7,
			},
			paused: true,
			reversed: true,
			onComplete: () => self.toggleState(),
			onReverseComplete: () => self.toggleState(),
		})
		.set(self.options.$el, {
			display: 'block'
		})
		.fromTo(self.$wrapper, {
			opacity: 0,
			y: 50
		}, {
			opacity: 1,
			y: 0
		})
		.fromTo(self.$button, {
			opacity: 0,
			y: 30
		}, {
			opacity: 1,
			y: 0
		}, "<.15")
		.set([self.$wrapper, self.$button], {
			clearProps: "opacity,transform"
		});

};

WidgetPopup.prototype.initContentAnimation = function () {
	const self = this;

	self.contentanimationTimeline = gsap
		.timeline({
			defaults: {
				ease: "expo.out",
				duration: .7,
			},
			paused: true,
			reversed: true,
			onComplete: () => self.toggleContentState(),
			onReverseComplete: () => {
				self.toggleContentState();
				self.resetContent();
			},
		})
		.to(self.$button, {
			opacity: 0,
			y: 30,
			ease: "expo.in",
		})
		.fromTo(self.$toggle, {
			opacity: 1,
			y: 0,
		}, {
			opacity: 0,
			y: 50,
			ease: "expo.in",
		}, "<.2")
		.call(() => {
			self.setElementActiveState(self.$toggle, self.options.isContentToggled);
			self.setElementActiveState(self.$buttonClose, self.options.isContentToggled);
			self.setElementActiveState(self.$buttonCollapse, !self.options.isContentToggled);
			self.setElementActiveState(self.$content, !self.options.isContentToggled);
		})
		.from(self.$content, {
			opacity: 0,
			y: 50,
		})
		.to(self.$button, {
			opacity: 1,
			y: 0
		}, "<.2")

};

WidgetPopup.prototype.setHideCookie = function () {
	const self = this;

	const cookieExpiryTime = new Date(new Date().getTime() + self.options.hideDuration * 60 * 1000);

	Cookies.set("hideWidgetPopup", "true", {
		expires: cookieExpiryTime,
	});
}

WidgetPopup.prototype.getHideCookie = function () {
	const self = this;

	return Cookies.get("hideWidgetPopup");
}

WidgetPopup.prototype.toggleContentState = function () {
	const self = this;

	self.options.isContentToggled = !self.options.isContentToggled;
};

WidgetPopup.prototype.toggleContentOn = function (speed = 1) {
	const self = this;

	if (self.options.isContentToggled || self.contentanimationTimeline.isActive()) return;

	self.contentanimationTimeline.timeScale(speed).play();
};

WidgetPopup.prototype.toggleContentOff = function (speed = 1.4) {
	const self = this;

	if (!self.options.isContentToggled || self.contentanimationTimeline.isActive()) return;

	self.contentanimationTimeline.timeScale(speed).reverse();
};

WidgetPopup.prototype.toggleState = function () {
	const self = this;

	self.options.isToggled = !self.options.isToggled;
};

WidgetPopup.prototype.toggleOn = function (speed = 1) {
	const self = this;

	if (self.options.isToggled || self.animationTimeline.isActive()) return;

	self.animationTimeline.timeScale(speed).play();
};

WidgetPopup.prototype.toggleOff = function (speed = 1.4) {
	const self = this;

	self.setHideCookie();

	if (!self.options.isToggled || self.animationTimeline.isActive()) return;

	self.animationTimeline.timeScale(speed).reverse();
};

WidgetPopup.prototype.toggle = function () {
	const self = this;

	!self.options.isToggled ? self.toggleOn() : self.toggleOff();
};

export default WidgetPopup;