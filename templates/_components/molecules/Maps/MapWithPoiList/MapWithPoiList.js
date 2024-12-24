import PubSub from "underpub-js";
import { 
	OverlayScrollbars, 
	ScrollbarsHidingPlugin, 
	SizeObserverPlugin, 
	ClickScrollPlugin 
} from 'overlayscrollbars';
import BBox from '@turf/bbox';
import ImgixClient from "@imgix/js-core";
import gsap from 'gsap';
import ScrollToPlugin from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

const client = new ImgixClient({
	domain: 'authenticffamplify.imgix.net',
  });

var MapWithPoiList = function(options) {

	this.options = {
		$el: false,
		baseClass: 'mol-MapWithPoiList',
		settings: {
			style: 'mapbox://styles/authenticff/clisucqa201p901qh8l2nbp6d',
			center: [-96, 40],
			zoom: 3,
		},
		colors: {
			clusterBackground: '#000000',
			clusterText: '#FFFFFF',
			primaryMarkerBackground: '#000000',
			markerBackground: '#000000',
			markerText: '#FFFFFF',
			activeMarkerBackground: '#FFFFFF',
			activeMarkerText: '#000000',
		}
	};

	$.extend(true, this.options, options);

};

MapWithPoiList.prototype.init = function() {

	var self = this;

	// colors
	let computedElementStyle = getComputedStyle(self.options.$el.get(0));
	self.options.colors.clusterBackground = computedElementStyle.getPropertyValue('--cluster-background-color');
	self.options.colors.clusterText = computedElementStyle.getPropertyValue('--cluster-number-color');
	self.options.colors.primaryMarkerBackground = computedElementStyle.getPropertyValue('--primary-marker-background-color');
	self.options.colors.markerBackground = computedElementStyle.getPropertyValue('--marker-background-color');
	self.options.colors.markerText = computedElementStyle.getPropertyValue('--marker-text-color');
	self.options.colors.activeMarkerBackground = computedElementStyle.getPropertyValue('--marker-active-background-color');
	self.options.colors.activeMarkerText = computedElementStyle.getPropertyValue('--marker-active-text-color');

	self.$pointOfInterestListWrapper = self.options.$el.find(`.${self.options.baseClass}__poiList__itemGroups`);
	self.$map = self.options.$el.find(`.${self.options.baseClass}__map`);;
	self.id = self.options.$el.attr('id');
	self.data = window[`MapData_${self.id}`];
	self.allFeaturesGeoJson = self.data.allFeaturesGeoJson;
	self.allFeatures = self.data.allFeaturesGeoJson.features;
	self.primaryGeoJson = self.data.primaryGeoJson;
	self.primaryFeatures = self.data.primaryGeoJson.features;
	self.poiFeaturesGeoJson = self.data.poiFeaturesGeoJson;
	self.poiFeatures = self.data.poiFeaturesGeoJson.features;
	self.$poiListItems = self.options.$el.find(`.${self.options.baseClass}__poiList__item`);

	self.poiListScroller = OverlayScrollbars({ target: this.$pointOfInterestListWrapper.get(0) }, {});
	self.poiListScrollerViewport = self.poiListScroller.elements().viewport;

	if (typeof self.primaryGeoJson.features !== "undefined" && self.primaryGeoJson.features.length) {
		self.options.settings.center = self.primaryGeoJson.features[0].geometry.coordinates;
	} else if (typeof self.poiFeaturesGeoJson.features !== "undefined" && self.poiFeaturesGeoJson.features.length) {
		self.options.settings.center = self.poiFeaturesGeoJson.features[0].geometry.coordinates;
	}

	self.initMap();

	self.$poiListItems.on('click', function() {
		let pointId = $(this).data('itemId');
		self.highlightPoint(pointId);
	});

};

MapWithPoiList.prototype.initMap = function() {

	const self = this;

	mapboxgl.accessToken = 'pk.eyJ1IjoiYXV0aGVudGljZmYiLCJhIjoiUmtjWTY2byJ9.QeHZuWdaMRJlobq_RgXngw';

	self.map = new mapboxgl.Map({
		container: self.$map.get(0),
		style: self.options.settings.style,
		zoom: self.options.settings.zoom,
		center: self.options.settings.center,
	});

	self.map.scrollZoom.disable();
	self.map.doubleClickZoom.disable();
	this.map.addControl(new mapboxgl.NavigationControl());

	// bounding box
	self.boundingBox = BBox({
		type: 'FeatureCollection',
		features: self.allFeatures,
	});

	// const boundingBoxPaddingValue = $(window).width() >= 768 ? 200 : 100;
	self.boundingBoxPadding = {
		top: 64,
		bottom: 64,
		left: 64,
		right: 64,
	};

	self.zoomMapToBoundingBox();

	PubSub.subscribe('Sitewide:resized', function() {
		self.zoomMapToBoundingBox();
	});
	

	// add features to map
	self.map.on('load', function () {

		// POI features
		self.map.addSource('poiFeatureLocations', {
			type: 'geojson',
			data: self.poiFeaturesGeoJson,
			cluster: true,
			clusterMaxZoom: 17,
			clusterRadius: 50,
		});

		// clusters
		self.map.addLayer({
			id: 'clusters',
			type: 'circle',
			source: 'poiFeatureLocations',
			filter: ['has', 'point_count'],
			paint: {
				'circle-color': self.options.colors.clusterBackground,
				'circle-opacity': 0.65,
				'circle-radius': ['step', ['get', 'point_count'], 22, 20, 30, 50, 40],
			},
		});

		self.map.addLayer({
			id: 'cluster-count',
			type: 'symbol',
			source: 'poiFeatureLocations',
			filter: ['has', 'point_count'],
			layout: {
				'text-field': ['get', 'point_count_abbreviated'],
				'text-font': ['Open Sans Regular', 'Arial Unicode MS Bold'],
				'text-size': 18,
			},
			paint: {
				'text-color': self.options.colors.clusterText,
			},
		});

		// circles
		self.map.addLayer({
			id: 'circle-markers',
			type: 'circle',
			source: 'poiFeatureLocations',
			filter: ['!', ['has', 'point_count']],
			paint: {
				'circle-color': [
					'case',
					['boolean', ['feature-state', 'highlight'], false], self.options.colors.activeMarkerBackground,
					self.options.colors.markerBackground
				],
				'circle-opacity': 1,
				'circle-radius': 11,
			},
		});

		// circle feature numbers
		self.map.addLayer({
			id: 'circle-markers-text',
			type: 'symbol',
			source: 'poiFeatureLocations',
			filter: ['!', ['has', 'point_count']],
			layout: {
				'text-field': ['get', 'number'],
				'text-size': 11,
				'text-font': [
					'Open Sans Regular',
					'Arial Unicode MS Bold'
				],
				'text-allow-overlap': true,
			},
			paint: {
				'text-color': [
					'case',
					['boolean', ['feature-state', 'highlight'], false], self.options.colors.activeMarkerText,
					self.options.colors.markerText
				]
			}
		});

		// primary features
		self.map.addSource('primaryLocations', {
			type: 'geojson',
			data: self.primaryGeoJson,
		});

		// loop through and add our primary feature icon images to the map
		self.primaryFeatures.forEach(feature => {

			const featureIcon = feature.properties.icon;

			if (typeof featureIcon === "object" && featureIcon !== null) {
				const featureIconPath = featureIcon.path;
				const featureIconTitle = featureIcon.title;
				let featureIconUrl;
				let featureIconImgixUrl;

				if (typeof featureIconPath === "string" && featureIconPath.length > 0) {
					featureIconImgixUrl = client.buildURL(`/images/${featureIconPath}`, {
						width: 40,
						height: 40,
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
		})

		// primary feature circles
		self.map.addLayer({
			id: 'primary-locations-circles',
			type: 'circle',
			source: 'primaryLocations',
			paint: {
				'circle-color': self.options.colors.primaryMarkerBackground,
				'circle-opacity': 1,
				'circle-radius': 18,
			},
		});

		// primary feature icons
		self.map.addLayer({
			id: 'primary-locations-icons',
			type: 'symbol',
			source: 'primaryLocations',
			layout: {
				'icon-image': ['get', 'title', ['get', "icon"]],
				'icon-size': .5,
			}
		});

		// click events

		// on cluster click
		self.map.on('click', 'clusters', function (e) {
			const features = self.map.queryRenderedFeatures(e.point, {
				layers: ['clusters'],
			});
			const clusterId = features[0].properties.cluster_id;
			self.map
			.getSource('poiFeatureLocations')
			.getClusterExpansionZoom(clusterId, function (err, zoom) {
				if (err) return;

				self.map.easeTo({
					center: features[0].geometry.coordinates,
					zoom: zoom,
				});
			});
		});

		// on point click
		self.map.on('click', 'circle-markers', function (e) {

			const features = self.map.queryRenderedFeatures(e.point, {
				layers: ['circle-markers'],
			});

			const pointId = features[0].id;

			self.highlightPoint(pointId, true);
			
		});

		// cursors
		self.map.on('mouseenter', 'clusters', function () {
			self.map.getCanvas().style.cursor = 'pointer';
		});

		self.map.on('mouseleave', 'clusters', function () {
			self.map.getCanvas().style.cursor = '';
		});

		self.map.on('mouseenter', 'circle-markers', function () {
			self.map.getCanvas().style.cursor = 'pointer';
		});

		self.map.on('mouseleave', 'circle-markers', function () {
			self.map.getCanvas().style.cursor = '';
		});

	});

};

MapWithPoiList.prototype.zoomMapToBoundingBox = function() {

	const self = this;

	if (self.allFeatures.length > 1) {
		self.map.fitBounds(self.boundingBox, {
			padding: self.boundingBoxPadding,
		});
	} else if (self.allFeatures.length == 1) {
		self.map.flyTo({
			center: self.options.settings.center,
			zoom: 17,
		});
	}

};

MapWithPoiList.prototype.highlightPoint = function(pointId, scrollList = false) {

	const self = this;

	let $poiListItem = self.$pointOfInterestListWrapper.find(`.${self.options.baseClass}__poiList__item[data-item-id="${pointId}"]`);

	// clear feature states
	self.map.removeFeatureState({
		source: 'poiFeatureLocations'
	});

	// set highlight feature state on highlighted point
	self.map.setFeatureState(
		{
			source: 'poiFeatureLocations',
			id: pointId
		},
		{
			highlight: true
		}
	);

	// get the poi feature that was clicked
	let poiFeature = self.poiFeatures.filter(
		function(data) {
			return data.id == pointId;
		}	
	)[0];
	
	// fly to the feature on the map
	self.map.flyTo({
		center: poiFeature.geometry.coordinates,
		zoom: 18
	});

	if (scrollList) {
		// Since we're using overlayscrollbars, we need to calculate the position to scroll to because position().top is relative to current scroll position
		let poiListItemCurrentOffset = $poiListItem.position().top;
		let currentScrollPosition = $(self.poiListScrollerViewport).scrollTop();
		let poiListItemOffsetFromParent = poiListItemCurrentOffset + currentScrollPosition;
		let scrollOffset = self.$pointOfInterestListWrapper.height() / 2; // position the item in the middle

		// scroll the poi list to the feature
		gsap.to(self.poiListScrollerViewport,
			{duration: 1, scrollTo: {y: poiListItemOffsetFromParent, autoKill: true, offsetY: scrollOffset}, ease: "power2"}
		);
	}
	
	// highlight the poi item in the list
	self.$poiListItems.removeClass(`${self.options.baseClass}__poiList__item--highlight`);
	$poiListItem.addClass(`${self.options.baseClass}__poiList__item--highlight`);

};

export default MapWithPoiList;
