import PubSub from "underpub-js";
import gsap from "gsap";
import ImgixClient from "@imgix/js-core";
import { 
	OverlayScrollbars, 
	ScrollbarsHidingPlugin, 
	SizeObserverPlugin, 
	ClickScrollPlugin 
} from 'overlayscrollbars';

const client = new ImgixClient({
	domain: 'authenticffamplify.imgix.net',
});

var ModalUnit = function (options) {

	this.options = {
		$el: false,
		baseClass: 'mol-ModalUnit',
		isToggled: false,
	};

	$.extend(true, this.options, options);

};

ModalUnit.prototype.init = function () {

	const self = this;

	self.$outer = self.options.$el.find(`.${self.options.baseClass}__outer`);
	self.$inner = self.options.$el.find(`.${self.options.baseClass}__inner`);
	self.$error = self.options.$el.find(`.${self.options.baseClass}__error`);
	self.$container = self.options.$el.find(`.${self.options.baseClass}__container`);
	self.$loader = self.options.$el.find(`.${self.options.baseClass}__loader`);
	self.$loaderIcon = self.options.$el.find(`.${self.options.baseClass}__loader__icon`);
	self.dataContainerAttribute = "data-modal-unit-data-container";
	self.$dataContainers = self.options.$el.find(`[${self.dataContainerAttribute}]`);
	self.$hideTriggers = $('[data-modal-unit-hide]');
	self.$showTriggers = $('[data-modal-unit-show]');

	// init overlayScrollBars
	self.scroller = OverlayScrollbars({ target: self.$inner.get(0) }, {});

	self.initAnimation();

	self.$showTriggers.on('click', (e) => {
		const unitId = $(e.currentTarget).data("modal-unit-unit-id");
		self.toggleOn();

		if (typeof unitId == "number") {
			self.fetchData(unitId);
		}
	});
	self.$hideTriggers.on('click', () => self.toggleOff());

};

ModalUnit.prototype.resetData = function () {
	const self = this;

	self.$dataContainers.attr(self.dataContainerAttribute, "inactive");

	self.$dataContainers.each((index, element) => {
		const $dataContainer = $(element);

		if (!$dataContainer.children().length) {
			$dataContainer.text("");
		}

		if ($dataContainer.find(".el-Carousel").length) {
			PubSub.publish('Carousel:updateData', {
				container: $dataContainer,
				reset: true
			})
		}

		if ($dataContainer.children("li").not("[data-modal-unit-data-container]").length) {
			$dataContainer.children("li").not("[data-modal-unit-data-container]").remove();
		}
	});
}

ModalUnit.prototype.loadData = function (unitData) {
	const self = this;

	self.$error.attr(self.dataContainerAttribute, "inactive");
	self.$container.attr(self.dataContainerAttribute, "");

	self.$address = self.options.$el.find(`[data-modal-unit-address]`);
	self.$amenities = self.options.$el.find(`[data-modal-unit-amenities]`);
	self.$availability = self.options.$el.find(`[data-modal-unit-availability]`);
	self.$bedrooms = self.options.$el.find(`[data-modal-unit-bedrooms]`);
	self.$bathrooms = self.options.$el.find(`[data-modal-unit-bathrooms]`);
	self.$cost = self.options.$el.find(`[data-modal-unit-cost]`);
	self.$description = self.options.$el.find(`[data-modal-unit-description]`);
	self.$floorplanImage = self.options.$el.find(`[data-modal-unit-floorplan-image]`);
	self.$heading = self.options.$el.find(`[data-modal-unit-heading]`);
	self.$subheading = self.options.$el.find(`[data-modal-unit-subheading]`);
	self.$images = self.options.$el.find(`[data-modal-unit-images]`);
	self.$intro = self.options.$el.find(`[data-modal-unit-intro]`);
	self.$petPolicies = self.options.$el.find(`[data-modal-unit-petPolicies]`);
	self.$pdf = self.options.$el.find(`[data-modal-unit-pdf]`);
	self.$squareFeet = self.options.$el.find(`[data-modal-unit-squareFeet]`);

	const unitType = unitData.unitType;
	const unitTypeTitle = unitType.title;
	const unitTypeUrl = unitType.url;
	const address = unitData.address || unitType.address;
	const amenities = unitData.amenities.length ? unitData.amenities : unitType.amenities.length ? unitType.amenities : [];
	const applicationUrl = unitData.applicationUrl || unitType.applicationUrl;
	const availability = unitData.availability;
	const bathrooms = unitData.bathrooms || unitType.bathrooms;
	const bedrooms = unitData.bedrooms || unitType.bedrooms;
	const cost = unitData.cost || unitType.cost;
	const description = unitData.description || unitType.description;
	const images = unitData.images.length ? unitData.images : unitType.images.length ? unitType.images : [];
	const intro = unitData.intro || unitType.intro;
	const isAvailable = unitData.isAvailable;
	const petPolicies = unitData.petPolicies.length ? unitData.petPolicies : unitType.petPolicies.length ? unitType.petPolicies : [];
	const pdf = unitData.pdf || unitType.pdf;
	const squareFeet = unitData.squareFeet || unitType.squareFeet;
	const title = unitData.title;
	const youtubeVideoId = unitData.youtubeVideoId || unitType.youtubeVideoId;
	let floorPlanImage;

	if (unitType.floorPlanImage && unitType.floorPlanImage.length) {
		floorPlanImage = unitType.floorPlanImage[0];
	}

	const showDataContainer = element => {
		$(element).attr(self.dataContainerAttribute, "");
		$(element).parents(`[${self.dataContainerAttribute}]`).attr(self.dataContainerAttribute, "");
	}

	if (title && title.length) {
		self.$heading.text(title);
		showDataContainer(self.$heading);
	}

	if (unitTypeTitle && unitTypeTitle.length) {
		if (unitTypeUrl && unitTypeUrl.length) {
			self.$subheading.html(`<a href="${unitTypeUrl}">${unitTypeTitle}</a>`)
		} else {
			self.$subheading.text(unitTypeTitle);
		}
		showDataContainer(self.$subheading);
	}

	if (cost && cost.length && isAvailable) {
		self.$cost.text(cost);
		showDataContainer(self.$cost);
	}

	if (bedrooms && bedrooms.length) {
		self.$bedrooms.text(isNaN(bedrooms) ? bedrooms : `${bedrooms} bd`);
		showDataContainer(self.$bedrooms);
	}

	if (bathrooms && bathrooms.length) {
		self.$bathrooms.text(`${bathrooms} ba`);
		showDataContainer(self.$bathrooms);
	}

	if (description && description.length) {
		self.$description.html(description);
		showDataContainer(self.$description);
	}

	if (squareFeet && squareFeet.length) {
		self.$squareFeet.text(`${squareFeet} sqft.`);
		showDataContainer(self.$squareFeet);
	}

	if (intro && intro.length) {
		self.$intro.html(intro);
		showDataContainer(self.$intro);
	}

	if (address && address.length) {
		self.$address.text(address);
		showDataContainer(self.$address);
	}

	let availabilityText = "";

	if (isAvailable == true) {
		availabilityText = "Available";

		if (availability && typeof availability == "string" && availability.length > 0) {
			availabilityText += ` ${availability}`;
		}
	} else {
		availabilityText = "Unavailable";
	}

	if (availabilityText && availabilityText.length) {
		self.$availability.text(availabilityText);
		showDataContainer(self.$availability);
	}

	if (amenities && amenities.length) {
		showDataContainer(self.$amenities);

		amenities.forEach(amenity => {
			const amenityCopy = amenity.copy;
			self.$amenities.append(`<li>${amenityCopy}</li>`)
		})
	}

	if (petPolicies && petPolicies.length) {
		showDataContainer(self.$petPolicies);

		petPolicies.forEach(petPolicy => {
			const petPolicyCopy = petPolicy.copy;
			self.$petPolicies.append(`<li>${petPolicyCopy}</li>`)
		})
	}

	if (floorPlanImage) {
		let floorPlanImageUrl = floorPlanImage.url;
		const floorPlanImageAlt = floorPlanImage.alt;
		const floorPlanImageFocalPoint = floorPlanImage.focalPoint;
		const floorPlanImagePath = floorPlanImage.path;

		if (floorPlanImageFocalPoint && floorPlanImageFocalPoint.length && floorPlanImagePath && floorPlanImagePath.length) {
			const floorPlanImageX = floorPlanImageFocalPoint[0] || .5;
			const floorPlanImageY = floorPlanImageFocalPoint[1] || .5;
			const imgixFloorPlanImageUrl = client.buildURL(`/images/${floorPlanImagePath}`, {
				width: 1440,
				"fp-x": floorPlanImageX,
				"fp-y": floorPlanImageY,
			})

			if (imgixFloorPlanImageUrl && imgixFloorPlanImageUrl.length) {
				floorPlanImageUrl = imgixFloorPlanImageUrl;
			}
		}

		if (floorPlanImageUrl.length) {
			self.$floorplanImage.html(`<img src="${floorPlanImageUrl} alt="${floorPlanImageAlt} />`)

			showDataContainer(self.$floorplanImage);
		}
	}

	if ((images && images.length) || (youtubeVideoId && youtubeVideoId.length)) {
		showDataContainer(self.$images);

		const slides = [];

		if (images && images.length) {
			images.forEach(image => {
				let imageUrl = image.url;
				const imageAlt = image.title;
				const imageFocalPoint = image.focalPoint;
				const imagePath = image.path;

				if (imageFocalPoint && imageFocalPoint.length && imagePath && imagePath.length) {
					const imageX = imageFocalPoint[0] || .5;
					const imageY = imageFocalPoint[1] || .5;
					const imgixImageUrl = client.buildURL(`/images/${imagePath}`, {
						width: 1600,
						ar: 16 / 9,
						fit: "crop",
						"fp-x": imageX,
						"fp-y": imageY,
					})

					if (imgixImageUrl && imgixImageUrl.length) {
						imageUrl = imgixImageUrl;
					}
				}

				if (imageUrl.length) {
					slides.push({
						type: "image",
						url: imageUrl,
						alt: imageAlt,
					})
				}
			});
		}

		if (youtubeVideoId && youtubeVideoId.length) {
			const videoUrl = `https://www.youtube.com/embed/${youtubeVideoId}?origin=https://plyr.io&iv_load_policy=3&modestbranding=1&playsinline=1&showinfo=0&rel=0&enablejsapi=1`;

			slides.push({
				type: "video",
				url: videoUrl,
			})
		}

		if (pdf && pdf.length) {
			const pdfUrl = pdf[0].url;

			if (!pdfUrl.length) return;

			showDataContainer(self.$pdf);

			self.$pdf.find("a").attr("href", pdfUrl);

		}

		PubSub.publish('Carousel:updateData', {
			container: self.$images,
			slides: slides,
		})
	}

	self.$form = $("[data-modal-unit-form]");

	if (self.$form.length && isAvailable == true) {
		showDataContainer(self.$form);

		// Hidden fields are populated on submit to prevent browser detecting form changes and displaying an alert popup.
		self.$form.on('onBeforeFormieSubmit', () => {
			const $fieldUnit = self.$form.find(`[name="fields[unit]`);
			const $fieldUnitType = self.$form.find(`[name="fields[unitType]`);
			const $fieldApplicationUrl = self.$form.find(`[name="fields[applicationUrl]"]`);

			if ($fieldUnit.length && (title && title.length)) {
				$fieldUnit.val(title);
			}

			if ($fieldUnitType.length && (unitType.title && unitType.title.length)) {
				$fieldUnitType.val(unitType.title);
			}

			if ($fieldApplicationUrl.length && (applicationUrl && applicationUrl.length)) {
				$fieldApplicationUrl.val(applicationUrl);
			}
		})
	}

	self.loadedTimeout = setTimeout(() => {
		self.loadedTimeline.restart();
	}, 1000);
}

ModalUnit.prototype.fetchData = function (unitId) {
	const self = this;

	if (typeof unitId != "number") return;

	const unitQuery = `query MyQuery {
		entry(section: "units", id: "${unitId}") {
			... on units_unit_Entry {
				id
				url
				title
				address: unit_address
				applicationUrl: unit_applicationUrl
				availability:unit_availability
				bedrooms:unit_bedrooms
				bathrooms: unit_bathrooms
				cost:unit_cost
				description:unit_description
				intro: unit_intro
				isAvailable: unit_isAvailable
				securityDeposit: unit_securityDeposit
				squareFeet: unit_squareFeet
				petPolicies:unit_petPolicies {
					... on unit_petPolicies_petPolicy_BlockType {
						copy:petPolicy_copy
					}
				}
				amenities:unit_amenities {
					... on unit_amenities_amenity_BlockType {
						copy:amenity_copy
					}
				}
				youtubeVideoId:unit_youtubeVideoId
				images:unit_images {
					title
					url @transform(width: 1600, height: 900, immediately: true)
					focalPoint
					path
				}
				pdf:unit_pdf(limit:1) {
					url
				}
				unitType:unit_unitType {
					...on unitTypes_unitType_Entry {
						title
						url
						address: unit_address
						applicationUrl: unit_applicationUrl
						bedrooms: unit_bedrooms
						bathrooms: unit_bathrooms
						cost: unit_cost
						description: unit_description
						intro: unit_intro
						securityDeposit: unit_securityDeposit
						squareFeet: unit_squareFeet
						petPolicies: unit_petPolicies {
							...on unit_petPolicies_petPolicy_BlockType {
								copy: petPolicy_copy
							}
						}
						amenities: unit_amenities {
							...on unit_amenities_amenity_BlockType {
								copy: amenity_copy
							}
						}
						youtubeVideoId: unit_youtubeVideoId
						images: unit_images {
							title
							url @transform(width: 1600, height: 900, immediately: true)
							focalPoint
							path
						}
						floorPlanImage: unitType_floorPlanImage(limit: 1) {
							title
							url @transform(width: 1600, height: 900, immediately: true)
							focalPoint
							path
						}
						pdf: unit_pdf(limit: 1) {
							url
						}
					}
				}
			}
		}
	}`;

	$.ajax({
		type: 'POST',
		url: '/api',
		data: {
			query: unitQuery
		},
		success: (data) => {
			if (typeof data.data == "undefined") {
				console.log('There was an error loading unit details.', data);
				self.displayError();
				return;
			}

			const unitData = data.data.entry;

			if (!unitData) {
				self.displayError();
				return;
			}

			if (unitData.unitType.length) {
				unitData.unitType = unitData.unitType[0];
			}

			self.loadData(unitData);
		},
		error: (data) => {
			self.displayError();
			console.log('There was an error loading unit details.', data);
		},
	});
}

ModalUnit.prototype.displayError = function (heading, copy) {
	const self = this;

	self.loadedTimeout = setTimeout(() => {
		self.loadedTimeline.restart();
	}, 1000);

	self.$error.attr(self.dataContainerAttribute, "");
	self.$container.attr(self.dataContainerAttribute, "inactive");

}

ModalUnit.prototype.initAnimation = function () {
	const self = this;

	// const getContentHeightTween = () => gsap.fromTo(self.$outer, {
	// 	height: self.$outer.outerHeight(),
	// }, {
	// 	duration: .6,
	// 	ease: "expo.out",
	// 	height: "auto"
	// });

	self.loaderIconSpinningTimeline = gsap.timeline({
		paused: true
	}).to(
		self.$loaderIcon, {
			rotation: 360,
			duration: .6,
			repeat: -1,
		}, "<.2"
	)

	self.loadingTimeline = gsap
		.timeline({
			paused: true,
			reversed: true,
			defaults: {
				ease: "expo.out",
				duration: .4,
			},
			onStart: () => {
				PubSub.publish('Sitewide:disableScrolling');
			},
			onComplete: () => {
				self.toggleState();
			},
			onReverseComplete: () => {
				PubSub.publish('Sitewide:enableScrolling');
				self.toggleState();
				self.resetData();
				clearTimeout(self.loadedTimeout);
				self.loaderIconSpinningTimeline.pause(0);
				self.loadedTimeline.pause(0);
				gsap.set([self.$container, self.$error, self.$loader, self.$loaderIcon, self.$outer], {
					clearProps: "all"
				});
			},
		})
		.set([self.$container, self.$error, self.$loader, self.$loaderIcon, self.$outer], {
			clearProps: "all"
		})
		.set(self.$loaderIcon, {
			opacity: 0,
			scale: 0,
		})
		.set(self.options.$el, {
			visibility: "visible",
		})
		.fromTo(self.options.$el, {
			opacity: 0
		}, {
			opacity: 1,
		})
		.to(self.$outer, {
			y: 0,
			opacity: 1,
		}, "<.2")
		.to(self.$loaderIcon, {
			scale: 1,
			opacity: 1,
			ease: "back.out(1.5)",
			duration: .3,
			delay: .1,
		}, "<")
		.add(() => self.loaderIconSpinningTimeline.play(), "<");

	self.loadedTimeline = gsap.timeline({
			paused: true,
			defaults: {
				ease: "expo.out",
				duration: .6,
			}
		})
		// animate height of outer wrapper to auto
		.fromTo(self.$outer, {
			height: "70vh",
		}, {
			ease: "expo.out",
			height: "auto"
		})
		// fade out the loader icon
		.to(self.$loaderIcon, {
			opacity: 0,
			scale: 0,
			duration: .4,
		}, "<")
		// stop the loader spinning timeline
		.add(() => self.loaderIconSpinningTimeline.pause(0))
		// hide the loader wrapper
		.set(self.$loader, {
			opacity: 0,
			visibility: "hidden",
		})
		// animate in the inner wrapper
		.fromTo([self.$inner], {
			opacity: 0
		}, {
			duration: .5,
			ease: "power2.out",
			opacity: 1
		}, "<-=0.3")
};

ModalUnit.prototype.toggleState = function () {
	const self = this;

	self.options.isToggled = !self.options.isToggled;
};

ModalUnit.prototype.toggleOn = function (speed = 1) {
	const self = this;

	if (self.options.isToggled || self.loadingTimeline.isActive()) return;

	self.loadingTimeline.timeScale(speed).play();
};

ModalUnit.prototype.toggleOff = function (speed = 2) {
	const self = this;

	if (!self.options.isToggled || self.loadingTimeline.isActive()) return;

	self.loadingTimeline.timeScale(speed).reverse(0);
};

ModalUnit.prototype.toggle = function () {
	const self = this;

	self.loadingTimeline.reversed() ? self.toggleOn() : self.toggleOff();
};

export default ModalUnit;