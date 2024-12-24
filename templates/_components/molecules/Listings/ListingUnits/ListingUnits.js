import PubSub from "underpub-js";

var ListingUnits = function(options) {

	this.options = {
		$el: false,
		baseClass: 'mol-ListingUnits',
	};

	$.extend(true, this.options, options);

};

ListingUnits.prototype.init = function() {

	var self = this;

	self.$filtersDropdown = self.options.$el.find(`.${self.options.baseClass}__filters__dropdown`);
	self.$items = self.options.$el.find(`.${self.options.baseClass}__item`)

	self.$filtersDropdown.on("change", () => self.updateFilters());

};

ListingUnits.prototype.updateFilters = function () {
	const self = this;

	const selectedFilterValue = self.$filtersDropdown.val();

	console.log(selectedFilterValue);

	if (selectedFilterValue.length) {
		self.$activeItems = self.$items.filter((i, el) => {
			return $(el).find(`[data-unit-category="${selectedFilterValue}"]`).length;
		});
	} else {
		self.$activeItems = self.$items;
	}

	gsap.timeline({
			defaults: {
				ease: "expo.out",
				duration: 1,
			}
		})
		.to(self.$items, {
			duration: .4,
			opacity: 0,
		})
		.set(self.$items.not(self.$activeItems), {
			display: "none",
		})
		.set(self.$activeItems, {
			display: "block",
		})
		.to(self.$activeItems, {
			opacity: 1
		})
};

export default ListingUnits;
