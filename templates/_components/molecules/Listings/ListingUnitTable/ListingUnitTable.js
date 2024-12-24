import PubSub from "underpub-js";
import gsap from 'gsap';
import ScrollToPlugin from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

var ListingUnitTable = function (options) {

	this.options = {
		$el: false,
		baseClass: 'mol-ListingUnitTable',
	};

	$.extend(true, this.options, options);

};

ListingUnitTable.prototype.init = function () {

	var self = this;

	const urlParams = new URLSearchParams(window.location.search);

	PubSub.subscribe("Sitewide:loaded", () => {
		if (urlParams.has('filterUnits')) {
			gsap.to(window, {
				scrollTo: {
					y: self.options.$el[0],
				},
				duration: .5,
				ease: 'expo.inout',
			})
		}
	});
};

export default ListingUnitTable;