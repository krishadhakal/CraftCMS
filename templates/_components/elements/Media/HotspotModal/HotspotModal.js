import PubSub from "underpub-js";
import gsap from "gsap";

var HotspotModal = function (options) {

	this.options = {
		$el: false,
		baseClass: 'el-HotspotModal',
		isToggled: false,
	};

	$.extend(true, this.options, options);

};

HotspotModal.prototype.init = function () {

	var self = this;

	self.modalId = self.options.$el.attr("data-hotspot-modal-id");
	self.$inner = self.options.$el.find(`.${self.options.baseClass}__inner`);
	self.$close = self.options.$el.find(`.${self.options.baseClass}__close`);
	self.$overlay = self.options.$el.find(`.${self.options.baseClass}__overlay`);

	self.initAnimation();

	PubSub.subscribe("HotspotModal:toggleOn", data => {
		if (data.id == self.modalId) {
			self.toggleOn();
		}
	})

	$([self.$close]).each((i, el) => {
		$(el).on("click", () => self.toggleOff());
	})

};

HotspotModal.prototype.initAnimation = function () {
	const self = this;

	self.timeline = gsap
		.timeline({
			paused: true,
			reversed: true,
			defaults: {
				ease: "expo.out",
				duration: .4,
			},
			onComplete: () => {
				self.toggleState();
			},
			onReverseComplete: () => {
				self.toggleState();
				PubSub.publish("VideoPlayer:toggleOffIfChild", {
					$parent: self.options.$el
				})
			},
		})
		.set(self.options.$el, {
			visibility: "visible",
			"pointer-events": "all",
		})
		.fromTo(self.options.$el, {
			opacity: 0
		}, {
			opacity: 1,
		})
		.from(self.$inner, {
			y: 20,
			opacity: 0,
		}, "<.2");

	self.loadedTimeline = gsap.timeline({
		paused: true,
		defaults: {
			ease: "expo.out",
			duration: .6,
		}
	});
};

HotspotModal.prototype.toggleState = function () {
	const self = this;

	self.options.isToggled = !self.options.isToggled;
};

HotspotModal.prototype.toggleOn = function (speed = 1) {
	const self = this;

	if (self.options.isToggled || self.timeline.isActive()) return;

	self.timeline.timeScale(speed).play();
};

HotspotModal.prototype.toggleOff = function (speed = 3) {
	const self = this;

	if (!self.options.isToggled || self.timeline.isActive()) return;

	self.timeline.timeScale(speed).reverse(0);
};

HotspotModal.prototype.toggle = function () {
	const self = this;

	self.timeline.reversed() ? self.toggleOn() : self.toggleOff();
};

export default HotspotModal;