import PubSub from "underpub-js";
import gsap from 'gsap';
import ScrollToPlugin from 'gsap/ScrollToPlugin';
gsap.registerPlugin(ScrollToPlugin);

/**
 * Sitewide
 */
var Sitewide = function () {

};

/**
 * Init
 */
Sitewide.prototype.init = function () {

	var self = this;

	self.$body = $('body');
	self.scrollingDisabled = 0;

	this.initEvents();
	this.initSamePageAnchorLinks();

	PubSub.subscribe('Sitewide:enableScrolling', () => self.enableScrolling());
	PubSub.subscribe('Sitewide:disableScrolling', () => self.disableScrolling());

};

/**
 * Init'ing our global events, many of which we publish
 */
Sitewide.prototype.initEvents = function () {
	//
	// Resizing (at the start)
	//
	var windowThrottled = _.throttle(
		function (e) {
			PubSub.publish('Sitewide:resize');
		},
		200, {
			trailing: false
		},
	);
	window.addEventListener('resize', windowThrottled, false);

	//
	// Resized Event (at the end)
	//
	var windowResizeDebounce = _.debounce(function (e) {
		PubSub.publish('Sitewide:resized');
	}, 200);
	window.addEventListener('resize', windowResizeDebounce, false);

	$("a[href^='#']").on("click", (e) => {
		e.preventDefault();
	})

};

/**
 * Smooth scroll to anchor elements on same page
 */
Sitewide.prototype.initSamePageAnchorLinks = function () {

	$("a[href^='#']").on("click", function(e) {

		if ($(this).attr('href') == '#open-modal-form') return;

		// prevent page jump
		if(e) e.preventDefault();

		// make sure the anchor link is on the current page
		let link = $(this).get(0);
		if (
			link.protocol === window.location.protocol ||
			link.host === window.location.host ||
			link.pathname === window.location.pathname ||
			link.search === window.location.search
		)
		{
			// get scroll duration based on scroll distance
			let anchorLink = $(this).attr('href');
			let scrollDistance = Math.abs( $(anchorLink).scrollTop() - $(window).scrollTop() );
			let speed = 200;
			let duration = Math.max(0.8, scrollDistance / speed);

			// use gsap to scroll to the anchor
			gsap.to(window, {
				duration: duration,
				scrollTo: anchorLink
			});
		}

	});

};

// These scrolling functions allow scrolling to be enabled/disabled without losing scroll position
Sitewide.prototype.enableScrolling = function() {

	const self = this;

	self.scrollingDisabled--;

	if (self.scrollingDisabled > 0) return;

	let scrollY = self.$body.css("top");

	self.$body.css({
		position: "static",
		top: "auto",
	});

	window.scrollTo(0, parseInt(scrollY || '0') * -1);

}

Sitewide.prototype.disableScrolling = function() {

	const self = this;

	self.scrollingDisabled++;

	if (self.scrollingDisabled != 1) return;

	let top = `-${window.scrollY}px`;

	self.$body.css({
		position: "fixed",
		top: top,
	});

}

export default Sitewide;