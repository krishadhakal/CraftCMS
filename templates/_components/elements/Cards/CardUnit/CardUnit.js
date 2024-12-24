import PubSub from "underpub-js";
import gsap from 'gsap';

var CardUnit = function(options) {

	this.options = {
		$el: false,
		baseClass: 'el-CardUnit',
	};

	$.extend(true, this.options, options);

};

CardUnit.prototype.init = function() {

	var self = this;

	self.$image = self.options.$el.find(`.${self.options.baseClass}__image`);
	self.$content = self.options.$el.find(`.${self.options.baseClass}__content`);
	self.$button = self.options.$el.find(`.${self.options.baseClass}__button`);

	self.initAnimation();

	// invalidate timeline on resize so that height values update
	PubSub.subscribe("Sitewide:resized", function(){
		console.log('invalidate');
		self.hoverAnimationTl.invalidate();
	});

};

CardUnit.prototype.initAnimation = function() {

	var self = this;

	self.hoverAnimationTl = gsap
    .timeline({
        paused: true,
        defaults: {
            duration: 0.35,
			ease: "power3.out",
        }
    })
	.set(self.$button, {
		clearProps: "display,opacity"
	})
	.set(self.$content, {
		clearProps: "height"
	})
    .set(self.$content, {
		height: function() { return self.$content.outerHeight(); } // passing a function here, which will make GSAP re-evaluate this when invalidate() is called
	})
	.set(self.$button, {
		display: "block"
	})
	.to(self.$content, {
		height: "auto",
	})
	.to(self.$button, {
		opacity: 1,
	}, "<");

	self.options.$el.on('mouseenter', self.options.$el, function() {
		self.hoverAnimationTl.play();
	}).on('mouseleave', self.options.$el, function() {
		self.hoverAnimationTl.reverse();
	});

};

export default CardUnit;
