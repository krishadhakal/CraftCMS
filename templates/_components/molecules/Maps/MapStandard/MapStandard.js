import PubSub from 'underpub-js';
import BBox from '@turf/bbox';
import ImgixClient from "@imgix/js-core";
import tippy from 'tippy.js';
import 'tippy.js/animations/scale-subtle.css';
import gsap from 'gsap';

const client = new ImgixClient({
	domain: 'authenticffamplify.imgix.net',
});

var MapStandard = function (options) {
	this.options = {
		$el: false,
		baseClass: 'mol-MapStandard',
		settings: {
			style: 'mapbox://styles/authenticff/clocs204800r201pbbcklf8ym',
			center: [-96, 40],
			zoom: 3,
		},
		colors: {
			featuredMarkerBackground: '#000000',
			markerBackground: '#000000',
			clusterBackground: '#000000',
			clusterText: '#FFFFFF',
		}
	};

	$.extend(true, this.options, options);
};

MapStandard.prototype.init = function () {

	const self = this;

	// colors
	let computedElementStyle = getComputedStyle(self.options.$el.get(0));
	self.options.colors.featuredMarkerBackground = computedElementStyle.getPropertyValue('--featured-marker-background-color');
	self.options.colors.markerBackground = computedElementStyle.getPropertyValue('--marker-background-color');
	self.options.colors.clusterBackground = computedElementStyle.getPropertyValue('--cluster-background-color');
	self.options.colors.clusterText = computedElementStyle.getPropertyValue('--cluster-number-color');

	self.mapPopupWrapperClass = `${self.options.baseClass}__popupWrapper`;
	self.mapPopupClass = `${self.options.baseClass}__popup`;
	self.mapPopupCloseClass = `${self.options.baseClass}__popup__close`;
	self.mapPopupButtonBaseClass = `atom-ButtonPrimary`;
	self.mapPopupButtonClasses = `
		${self.mapPopupButtonBaseClass}
		${self.mapPopupButtonBaseClass}--small
		${self.mapPopupButtonBaseClass}--${self.options.$el.data('theme')}
		${self.mapPopupButtonBaseClass}--filled
		${self.mapPopupButtonBaseClass}--hasText
	`;
	
	self.$map = self.options.$el.find(`.${self.options.baseClass}__map`);
	self.id = self.options.$el.attr('id');
	self.data = window[`MapData_${self.id}`]
	self.zoom = self.data.zoom;
	self.geoJson = self.data.geoJson;
	self.features = self.geoJson.features;
	self.featuredFeature = self.features.filter(f => f.properties.isFeatured == true)[0] || null;
	self.activePopupId = null;

	if (typeof self.zoom === "number") {
		self.options.settings.zoom = self.zoom;
	}

	if (self.featuredFeature && typeof self.featuredFeature !== "undefined") {
		self.options.settings.center = self.featuredFeature.geometry.coordinates;
	} else if (typeof self.features !== "undefined" && self.features.length) {
		self.options.settings.center = self.features[0].geometry.coordinates;
	}

	self.initMap();

	PubSub.subscribe("Sitewide:resized", function(){
		self.centerMapAroundFeatures();
	});

};

MapStandard.prototype.initMap = function () {
	const self = this;

	if (!self.features.length) return;

	mapboxgl.accessToken =
		'pk.eyJ1IjoiYXV0aGVudGljZmYiLCJhIjoiUmtjWTY2byJ9.QeHZuWdaMRJlobq_RgXngw';

	self.map = new mapboxgl.Map({
		container: self.$map.get(0),
		style: self.options.settings.style,
		zoom: self.options.settings.zoom,
		center: self.options.settings.center,
	});

	self.map.scrollZoom.disable();
	self.map.doubleClickZoom.disable();
	this.map.addControl(new mapboxgl.NavigationControl());

	self.centerMapAroundFeatures();

	self.map.on('load', function () {

		// load map icon images
		self.features.forEach(feature => {
			const featureIcon = feature.properties.icon;

			if (typeof featureIcon === "object" && featureIcon !== null) {
				const featureIconPath = featureIcon.path;
				const featureIconTitle = featureIcon.title;
				let featureIconUrl;
				let featureIconImgixUrl;

				if (typeof featureIconPath === "string" && featureIconPath.length > 0) {
					featureIconImgixUrl = client.buildURL(`/images/${featureIconPath}`, {
						width: 32,
						height: 32,
					})
				}

				if (featureIconImgixUrl.length) {
					featureIconUrl = featureIconImgixUrl;
				} else {
					featureIconUrl = featureIcon.url;
				}

				if (typeof featureIconUrl === "string") {
					self.map.loadImage(featureIconUrl, (error, image) => {
						if (error) throw error;

						if (!self.map.hasImage(featureIconTitle)) {
							self.map.addImage(featureIconTitle, image);
						}
					})
				}
			}
		});

		self.map.addSource('locations', {
			type: 'geojson',
			data: self.geoJson,
			cluster: true,
			clusterMaxZoom: 10,
			clusterRadius: 50,
		});

		self.map.addLayer({
			id: 'clusters',
			type: 'circle',
			source: 'locations',
			filter: ['has', 'point_count'],
			paint: {
				'circle-color': self.options.colors.clusterBackground,
				'circle-opacity': ['step', ['get', 'point_count'], 1, 20, 1, 50, 1],
				'circle-radius': ['step', ['get', 'point_count'], 20, 20, 30, 50, 40],
			},
		});

		self.map.addLayer({
			id: 'cluster-count',
			type: 'symbol',
			source: 'locations',
			filter: ['has', 'point_count'],
			layout: {
				'text-field': '{point_count_abbreviated}',
				'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
				'text-size': ['step', ['get', 'point_count'], 12, 20, 15, 50, 18],
			},
			paint: {
				'text-color': self.options.colors.clusterText,
			},
		});

		self.map.addLayer({
			id: 'unclustered-point',
			type: 'circle',
			source: 'locations',
			filter: [
				"all",
				['!', ['has', 'point_count']],
				['!=', ['get', 'isFeatured'], true]
			],
			paint: {
				'circle-color': self.options.colors.markerBackground,
				'circle-opacity': 1,
				'circle-radius': 16,
			},
		});

		self.map.addLayer({
			id: 'unclustered-point-image',
			type: 'symbol',
			source: 'locations',
			layout: {
				'icon-image': ['get', 'title', ['get', "icon"]],
				'icon-size': .5,
			}
		});

		self.map.addLayer({
			id: 'unclustered-point-featured',
			type: 'circle',
			source: 'locations',
			filter: [
				"all",
				['==', ['get', 'isFeatured'], true]
			],
			paint: {
				'circle-color': self.options.colors.featuredMarkerBackground,
				'circle-opacity': 1,
				'circle-radius': 16,
			},
		});

		self.map.addLayer({
			id: 'unclustered-point-featured-image',
			type: 'symbol',
			source: 'locations',
			filter: [
				"all",
				['==', ['get', 'isFeatured'], true]
			],
			layout: {
				'icon-image': ['get', 'title', ['get', "icon"]],
				'icon-size': .5,
			}
		});

		self.map.on('click', 'clusters', function (e) {
			const features = self.map.queryRenderedFeatures(e.point, {
				layers: ['clusters'],
			});
			const clusterId = features[0].properties.cluster_id;
			self.map
				.getSource('locations')
				.getClusterExpansionZoom(clusterId, function (err, zoom) {
					if (err) return;

					self.map.easeTo({
						center: features[0].geometry.coordinates,
						zoom: zoom,
					});
				});
		});

		// map popups
		self.features.forEach(feature => {

			const featureCoordinates = feature.geometry.coordinates;
			const featureProperties = feature.properties;
			const featureId = featureProperties.featureId;
			const featureHeading = featureProperties.heading;
			const featureCopy = featureProperties.copy;
			const featureButton = featureProperties.button;
			const featureButtonTarget = featureButton.target;
			const featureButtonUrl = featureButton.url;
			const featureButtonText = featureButton.text;
			let buttonMarkup = '';

			if (featureButtonUrl && featureButtonText) {
				buttonMarkup = `
					<div class="${self.mapPopupClass}__button">
						<a class="${self.mapPopupButtonClasses}" href="${featureButtonUrl}" target="${featureButtonTarget}">
							<span class="${self.mapPopupButtonBaseClass}__inner">
								<span class="${self.mapPopupButtonBaseClass}__text">${featureButtonText}</span>
							</span>
						</a>
					</div>
				`;
			}

			const popupMarkup = `
				<div class="${self.mapPopupWrapperClass}">
					<div class="${self.mapPopupClass}" id="${featureId}">
						<div class="${self.mapPopupClass}__close"></div>
						<div class="${self.mapPopupClass}__content">
							<h5 class="${self.mapPopupClass}__heading">
								${featureHeading}
							</h5>
							<div class="${self.mapPopupClass}__copy">
								${featureCopy}
							</div>
							${buttonMarkup}
						</div>
					</div>
				</div>
			`;

			const $popup = $(popupMarkup);

			// add popup to map
			let mapboxMarker = new mapboxgl.Marker({
				element: $popup[0],
				offset: [0, 0],
				anchor: 'bottom',
			})
			.setLngLat(featureCoordinates)
			.addTo(self.map);
			
		});

		// cluster hover
		self.map.on('mouseenter', 'clusters', function () {
			self.map.getCanvas().style.cursor = 'pointer';
		});

		self.map.on('mouseleave', 'clusters', function () {
			self.map.getCanvas().style.cursor = '';
		});

		// marker hover
		self.map.on('mouseenter', 'unclustered-point', function (e) {
			self.map.getCanvas().style.cursor = 'pointer';
		});

		self.map.on('mouseleave', 'unclustered-point', function (e) {
			self.map.getCanvas().style.cursor = '';
		});

		// marker click
		self.map.on('click', 'unclustered-point', function (e) {
			let featureId = e.features[0].properties.featureId;
			let featureLatLng = e.features[0].geometry.coordinates;
			self.showMapPopup(featureId, featureLatLng);
		});

		// featured marker hover
		self.map.on('mouseenter', 'unclustered-point-featured', function (e) {
			self.map.getCanvas().style.cursor = 'pointer';
		});

		self.map.on('mouseleave', 'unclustered-point-featured', function (e) {
			self.map.getCanvas().style.cursor = '';
		});

		// featured marker click
		self.map.on('click', 'unclustered-point-featured', function (e) {
			let featureId = e.features[0].properties.featureId;
			let featureLatLng = e.features[0].geometry.coordinates;
			self.showMapPopup(featureId, featureLatLng);
		});

	});

	self.options.$el.on('click', '.'+self.mapPopupCloseClass, function() {
		let $popup = $(this).closest('.'+self.mapPopupClass);
		let popupId = $popup.attr('id');
		self.hideMapPopup(popupId);
	});

};

MapStandard.prototype.centerMapAroundFeatures = function () {

	const self = this;

	let boundingBox = BBox({
		type: 'FeatureCollection',
		features: self.features,
	});

	let boundingBoxPaddingValue = $(window).width() >= 768 ? 100 : 60;
	let boundingBoxPadding = {
		top: boundingBoxPaddingValue,
		bottom: boundingBoxPaddingValue,
		left: boundingBoxPaddingValue,
		right: boundingBoxPaddingValue,
	};

	if (self.features.length > 1) {
		self.map.fitBounds(boundingBox, {
			padding: boundingBoxPadding,
		});
	} else if (self.features.length == 1) {
		self.map.flyTo({
			center: self.options.settings.center,
			zoom: self.options.settings.zoom,
		});
	}

};

MapStandard.prototype.showMapPopup = function(popupId, latLng) {

	const self = this;
	let $popup = $('#'+popupId);
	let $popupWrapper = $popup.closest('.'+self.mapPopupWrapperClass);

	if (latLng) {
		self.map.panTo(latLng);
	}

	if (self.activePopupId != popupId) {

		self.hideMapPopup(self.activePopupId);
		self.activePopupId = popupId;

		gsap
		.timeline()
		.set($popupWrapper, {
			zIndex: 1
		})
		.to($popup,
			{
				ease: "back.out(1.4)",
				duration: 0.3,
				scale: 1,
				opacity: 1,
			}
		);

	}

};

MapStandard.prototype.hideMapPopup = function(popupId) {

	if (!popupId) return;

	const self = this;
	let $popup = $('#'+popupId);
	let $popupWrapper = $popup.closest('.'+self.mapPopupWrapperClass);
	self.activePopupId = null;

	gsap
    .timeline()
    .to($popup,
        {
            duration: 0.3,
			scale: 0,
			opacity: 0,
        }
    )
	.set($popupWrapper, {
		zIndex: -1
	});

};



export default MapStandard;