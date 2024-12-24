import PubSub from "underpub-js";
import gsap from "gsap";
import Draggable from "gsap/Draggable";
import tippy from 'tippy.js';
import 'tippy.js/animations/scale-subtle.css';

gsap.registerPlugin(Draggable);

var Hotspots = function (options) {

	this.options = {
		$el: false,
		baseClass: 'mol-Hotspots',
	};

	$.extend(true, this.options, options);

};

Hotspots.prototype.init = function () {

	var self = this;

	self.$hotspots = self.options.$el.find(`.${self.options.baseClass}__hotspot`);

	self.$hotspots.each((i, hotspot) => {
		const $hotspot = $(hotspot);
		const hotspotId = $hotspot.attr('data-hotspot-id');
		const hotspotType = $hotspot.attr('data-hotspot-type');
		const $hotspotPopup = $(`[data-hotspot-popup-id="${hotspotId}"]`);
		const $hotspotModal = $(`[data-hotspot-modal-id="${hotspotId}"]`);

		if ($hotspotPopup.length) {
			tippy($hotspot[0], {
				content: $hotspotPopup[0],
				animation: 'scale-subtle',
				arrow: true,
				inertia: true,
				theme: "hotspots-hotspot-popup",
				maxWidth: "none",
				interactive: true,
				zIndex: 200,
			});
		}

		if ($hotspotModal.length) {
			if (hotspotType == "image360") {
				const $image360 = $hotspotModal.find(`.${self.options.baseClass}__hotspot-modal__image360`);
				const imageUrl = $image360.attr("data-hotspot-image360-imageUrl");

				$image360.append(`<a-scene embedded="true">
					<a-sky src="${imageUrl}" rotation="0 -130 0"></a-sky>
				</a-scene>`);
			}

			if (hotspotType == "imageBeforeAfter") {
				const $imageBeforeAfter = $hotspotModal.find(`.${self.options.baseClass}__hotspot-modal__imageBeforeAfter`);
				const $imageBeforeAfterHandle = $imageBeforeAfter.find(`.${self.options.baseClass}__hotspot-modal__imageBeforeAfter__handle`);
				const $imageBeforeAfterImageBefore = $imageBeforeAfter.find(`.${self.options.baseClass}__hotspot-modal__imageBeforeAfter__image--before`);
				const $imageBeforeAfterImageAfter = $imageBeforeAfter.find(`.${self.options.baseClass}__hotspot-modal__imageBeforeAfter__image--after`);

				let ratio;

				const adjustBeforeAfter = () => {
					var handlePosition = $imageBeforeAfterHandle.position().left;

					gsap.set($imageBeforeAfterImageAfter, {
						left: handlePosition + $imageBeforeAfterHandle.width() / 2
					});
				}

				const resetBeforeAfter = () => {
					gsap.set([$imageBeforeAfterImageAfter, ], {
						clearProps: "left"
					});

					gsap.set($imageBeforeAfterHandle, {
						clearProps: "all"
					});
				}

				Draggable.create($imageBeforeAfterHandle, {
					type: "x",
					edgeResistance: 1,
					bounds: $imageBeforeAfter,
					onDrag: adjustBeforeAfter
				});

				$(window).on("resize", resetBeforeAfter);
				$hotspot.on("click", resetBeforeAfter);
			}

			$hotspot.on("click", () => {
				PubSub.publish("HotspotModal:toggleOn", {
					id: hotspotId
				});
			});
		}
	})

};

export default Hotspots;