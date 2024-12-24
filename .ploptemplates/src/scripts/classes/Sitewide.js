
import PubSub from "underpub-js";

/**
 * Sitewide
 */
var Sitewide = function(){

};

/**
 * Init
 */
Sitewide.prototype.init = function(){

	var self = this;

	this.initEvents();

};

/**
 * Init'ing our global events, many of which we publish
 */
Sitewide.prototype.initEvents = function(){

		//
		// Resizing (at the start)
		//
		var windowThrottled = _.throttle(function(e){
				PubSub.publish('resize');
		}, 0, {trailing: false});
		window.addEventListener("resize", windowThrottled, false);

		//
		// Resized Event (at the end)
		//
		var windowResizeDebounce = _.debounce(function(e) {
				PubSub.publish('resized');
		}, 400);
		window.addEventListener("resize", windowResizeDebounce, false);

};

export default Sitewide;
