import PubSub from "underpub-js";
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import tippy from 'tippy.js';
import 'tippy.js/animations/scale-subtle.css';

gsap.registerPlugin(ScrollTrigger);

var FloorPlansViewer = function (options) {

	this.options = {
		$el: false,
		baseClass: 'mol-FloorPlansViewer',
	};

	$.extend(true, this.options, options);

};

FloorPlansViewer.prototype.init = function () {

	const self = this;

	self.$allPopupMarkers = self.options.$el.find(`.${self.options.baseClass}__unit-marker`);
	self.activeFloor = 1;
	self.goToFloorTimeline = null;

	self.$nav = self.options.$el.find(`.${self.options.baseClass}__floorplans__nav`);
	self.$floorSelector = self.options.$el.find("[data-floorplans-selector-floor]");
	self.$availabilitySelector = self.options.$el.find("[data-floorplans-selector-availability]");
	self.$unitCategorySelector = self.options.$el.find("[data-floorplans-selector-unit-category]");

	self.$selectors = $([
		self.$availabilitySelector,
		self.$unitCategorySelector,
	]);

	self.initFilters();
	self.animateIn();

	self.$allPopupMarkers.each((i, marker) => {
		const $marker = $(marker);
		const $popup = $(`[data-popup-id="${$marker.attr('data-unit-id')}"]`);

		tippy($marker[0], {
			content: $popup[0],
			animation: 'scale-subtle',
			arrow: true,
			inertia: true,
			theme: "floorplansviewer-popup",
			maxWidth: "none",
			interactive: true,
			zIndex: 200,
		});
	})

};

FloorPlansViewer.prototype.initFilters = function () {

	var self = this;

	if (self.$floorSelector.length) {
		self.$floorSelector.on('change', () => {
			self.goToFloor(self.$floorSelector.val());
		})
	}

	self.$selectors.each((index, element) => {
		const $selector = $(element);

		if (!$selector.length) return;

		$selector.on('change', () => {
			self.updateActiveFilters();
			self.updateVisiblePopupMarkers();
		})
	})

	this.options.$el.find("[data-floorplans-reset]").on('click', function () {
		self.$selectors.each((index, element) => {
			const $selector = $(element);

			if (!$selector.length) return;

			$selector.val("");
		});

		self.updateActiveFilters();
		self.updateVisiblePopupMarkers();
	});

};

// this function updates the active state of the filters
FloorPlansViewer.prototype.updateActiveFilters = function () {

	const self = this;

	self.$selectors.each((index, element) => {
		const $selector = $(element);

		if (!$selector.length) return;

		$selector.attr("data-floorplans-selector-selected", $selector.val().length > 0)
	});

};

// this function filters the markers, and then runs the animations to show the correct markers
FloorPlansViewer.prototype.updateVisiblePopupMarkers = function () {

	var self = this;
	var filteredPopupMarkers = self.getFilteredPopupMarkers();

	self.popupMarkersInOut(filteredPopupMarkers.hide, filteredPopupMarkers.show);

};

// This filters through the popup markers, and returns the ones that should be visible and the ones that should be hidden
FloorPlansViewer.prototype.getFilteredPopupMarkers = function () {

	var self = this;

	const cleanUpValue = value => {
		if (typeof value == undefined) return "";

		return value.toString().toLowerCase();
	}

	let floorSelectorValue;
	let availabilitySelectorValue;
	let unitCategorySelectorValue;

	if (self.$floorSelector.length) {
		floorSelectorValue = cleanUpValue(self.$floorSelector.val());
	}

	if (self.$availabilitySelector.length) {
		availabilitySelectorValue = cleanUpValue(self.$availabilitySelector.val());
	}

	if (self.$unitCategorySelector.length) {
		unitCategorySelectorValue = cleanUpValue(self.$unitCategorySelector.val());
	}

	var popupMarkersToShow = [];
	var popupMarkersToHide = [];

	this.$allPopupMarkers.each((i, element) => {
		const $marker = $(element);

		const markerFloor = cleanUpValue($marker.attr('data-floor'));
		const markerAvailable = cleanUpValue($marker.attr('data-unit-availability'));
		const markerUnitCategory = cleanUpValue($marker.attr('data-unit-unit-category'));

		let showMarker;

		if (
			(floorSelectorValue && floorSelectorValue.length && floorSelectorValue != markerFloor) ||
			(availabilitySelectorValue && availabilitySelectorValue.length && availabilitySelectorValue != markerAvailable) ||
			(unitCategorySelectorValue && unitCategorySelectorValue.length && unitCategorySelectorValue != markerUnitCategory)) {
			showMarker = false;
		} else {
			showMarker = true;
		}

		if (showMarker) {
			popupMarkersToShow.push($marker);
		} else {
			popupMarkersToHide.push($marker)
		}
	});

	return {
		show: popupMarkersToShow,
		hide: popupMarkersToHide
	};

};

// This function takes an array of popup markers to hide and array of popup markers to show.
// It then hides any currently visible markers that should be hidden, and shows any currently hidden markers that should be visible.
// This is necessary so that gsap can get the timings right.
FloorPlansViewer.prototype.popupMarkersInOut = function ($popupMarkersToHide, $popupMarkersToShow) {

	var self = this;

	const $markersToHide = $popupMarkersToHide.filter(marker => $(marker).attr("data-popup-marker-visibility") != "hidden");
	const $markersToShow = $popupMarkersToShow.filter(marker => $(marker).attr("data-popup-marker-visibility") != "shown");

	// run our animations
	gsap.timeline()
		.to($markersToHide, {
			duration: 0.2,
			opacity: 0,
			scale: 0,
			yPercent: 25,
			stagger: {
				each: 0.025
			}
		})
		.to($markersToShow, {
			duration: 0.2,
			opacity: 1,
			scale: 1,
			yPercent: -50,
			stagger: {
				each: 0.05
			}
		}, "<")
		.add(() => $($markersToHide).each((i, marker) => $(marker).attr("data-popup-marker-visibility", "hidden")))
		.add(() => $($markersToShow).each((i, marker) => $(marker).attr("data-popup-marker-visibility", "shown")))

};

// this function changes the floor that is currently shown
FloorPlansViewer.prototype.goToFloor = function (floorId) {

	var self = this;

	// kill our animation in case it's still running from before
	if (this.goToFloorTimeline) {
		this.goToFloorTimeline.progress(1);
	}

	var $allPopupMarkers = self.options.$el.find(`.${self.options.baseClass}__unit-marker`);

	var $allImages = self.options.$el.find(`.${self.options.baseClass}__floorplan-image`);
	var $allContainers = self.options.$el.find(`.${self.options.baseClass}__floorplan-image-container`);

	var $newActiveImage = self.options.$el.find(`.${self.options.baseClass}__floorplan-image-container[data-floor-id="${floorId}"] .${self.options.baseClass}__floorplan-image`);
	var $newActiveContainer = self.options.$el.find(`.${self.options.baseClass}__floorplan-image-container[data-floor-id="${floorId}"]`);

	this.goToFloorTimeline = gsap.timeline({
			defaults: {
				ease: "power1.out",
			},
			onStart: () => {
				gsap.set(self.$nav, {
					pointerEvents: "none"
				})
			},
			onComplete: () => {
				gsap.set(self.$nav, {
					pointerEvents: "all"
				})
			}
		})
		// .timeScale(0.5)
		// we're handling colors using an active class so that we can keep all colors at the top of the scss file
		.add(function () {
			$(`[data-floor]`).attr("data-floor-active", "false");
			$(`[data-floor="${floorId}"]`).attr("data-floor-active", "true");
		})
		// old image
		.fromTo($allImages, {
			opacity: 1,
		}, {
			duration: 0.25,
			opacity: 0,
			scale: .95,
		})
		// old popup markers
		.to($allPopupMarkers, {
				duration: 0.15,
				opacity: 0,
				yPercent: 25,
				scale: 0
			},
			"<"
		)
		.set($allContainers, {
			display: "none"
		})
		.addLabel("oldFloorPlanHidden")
		// update newly active floor plan image
		.set($newActiveContainer, {
				display: "block"
			},
			"oldFloorPlanHidden"
		)
		.fromTo(self.options.$el, {
			height: self.options.$el.outerHeight()
		}, {
			duration: 0.3,
			height: "auto"
		})
		.addLabel("heightAdjusted")
		// image
		.fromTo($newActiveImage, {
				scale: .95,
				opacity: 0
			}, {
				duration: 0.3,
				scale: 1,
				opacity: 1
			},
			"heightAdjusted"
		)
		.add(() => self.updateVisiblePopupMarkers(), "heightAdjusted")
		.add(() => self.activeFloor = floorId);
};

// this function animates in the component
FloorPlansViewer.prototype.animateIn = function () {

	var self = this;

	// animate in when component is in viewport
	gsap.timeline({
			scrollTrigger: {
				trigger: self.options.$el,
				start: 'top bottom',
			},
			delay: 0,
		})
		.set(self.options.$el.find(`.${self.options.baseClass}__unit-marker`), {
			xPercent: -50
		})
		.to(self.options.$el.find(`.${self.options.baseClass}__floorplan-image`), {
				duration: 0.7,
				ease: "power1.out",
				scale: 1,
				//ease: "power1.out",
			},
			"<"
		)
		.add(function () {
			self.updateVisiblePopupMarkers();
		}, "<");

};

export default FloorPlansViewer;