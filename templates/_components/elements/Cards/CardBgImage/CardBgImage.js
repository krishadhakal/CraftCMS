import PubSub from "underpub-js";
import gsap from 'gsap';

var CardBgImage = function(options) {

	this.options = {
		$el: false,
		baseClass: 'el-CardBgImage',
	};

	$.extend(true, this.options, options);

};

CardBgImage.prototype.init = function() {

	var self = this;

	self.$image = self.options.$el.find(`.${self.options.baseClass}__image`);
	self.$imageOverlay = self.options.$el.find(`.${self.options.baseClass}__image__overlay`);
	self.$heading = self.options.$el.find(`.${self.options.baseClass}__content__heading`);
	self.$copy = self.options.$el.find(`.${self.options.baseClass}__content__copy`);
	self.$button = self.options.$el.find(`.${self.options.baseClass}__content__button`);

	self.initAnimation();

};

CardBgImage.prototype.initAnimation = function() {

	var self = this;

	self.animationTl = gsap
		.timeline({
			paused: true,
			defaults: {
				duration: 0.5,
				ease: "power3.out"
			}
		})
		.fromTo(self.$image, 
			{
				scale: 1
			},
			{
				scale: 1.06
			}
		)
		.fromTo(self.$imageOverlay,
			{
				opacity: 0
			},
			{
				opacity: 1
			}
		, "<")
		.fromTo(self.$heading,
			{
				translateY: 12,
				opacity: 0
			},
			{
				translateY: 0,
				opacity: 1
			}
		, ">-=0.4")
		.fromTo(self.$copy,
			{
				translateY: 12,
				opacity: 0
			},
			{
				translateY: 0,
				opacity: 1
			}
		, ">-=0.4")
		.fromTo(self.$button,
			{
				translateY: 12,
				opacity: 0
			},
			{
				translateY: 0,
				opacity: 1
			}
		, ">-=0.4");

	self.options.$el.on('mouseover', self.options.$el, function() {
		self.animationTl.play();
	}).on('mouseout', self.options.$el, function() {
		self.animationTl.reverse();
	});

};

export default CardBgImage;
