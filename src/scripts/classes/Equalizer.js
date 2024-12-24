/**
 * A class to handle equalizing heights/widths
 * 
 * Import example:

import Equalizer from "@/classes/Equalizer";

* 
 * Usage example:

this.eq = new Equalizer( self.options.$el.find(`<find_string>`) );

let equalizeForBreakpoints = ["large", "xlarge", "xxlarge"];

if ( equalizeForBreakpoints.indexOf(window.Breakpoint.value) + 1 ) {
	self.eq.equalizeHeights();
}
else {
	self.eq.resetHeights();
}

 * 
 * 
 */

var Equalizer = function( itemsToEqualize ){

	this.itemsToEqualize = itemsToEqualize;

};

Equalizer.prototype.init = function(){

	var self = this;

};

Equalizer.prototype.equalizeHeights = function() {

	var maxHeight = 0;

	this.itemsToEqualize.each(function() {

		$(this).css('min-height', '0px');

		var itemHeight = $(this).outerHeight();

		if (itemHeight > maxHeight)
		{
			maxHeight = itemHeight;
		}

	});

	this.itemsToEqualize.css('min-height', maxHeight);

};

Equalizer.prototype.equalizeWidths = function() {

	var maxWidth = 0;

	this.itemsToEqualize.each(function() {

		$(this).css('min-width', '0px');

		var itemWidth = $(this).outerWidth();

		if (itemWidth > maxWidth)
		{
			maxWidth = itemWidth;
		}

	});

	this.itemsToEqualize.css('min-width', maxWidth);

};

Equalizer.prototype.reset = function() {

	this.resetHeights();
	this.resetWidths();

};

Equalizer.prototype.resetHeights = function() {

	this.itemsToEqualize.each(function() {

		$(this).css('min-height', '0px');

	});

};

Equalizer.prototype.resetWidths = function() {

	this.itemsToEqualize.each(function() {

		$(this).css('min-width', '0px');

	});

};

export default Equalizer;
