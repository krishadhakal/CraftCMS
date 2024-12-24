import PubSub from "underpub-js";
import tippy from 'tippy.js';
import 'tippy.js/animations/shift-toward.css';

var HeaderNavigation = function (options) {

	this.options = {
		$el: false,
		baseClass: 'el-HeaderNavigation',
	};

	$.extend(true, this.options, options);

};

HeaderNavigation.prototype.init = function () {

	var self = this;

	self.$items = self.options.$el.find(`.${self.options.baseClass}__item`);

	self.$items.each((i, el) => {
		const $item = $(el);
		const $link = $item.find(`.${self.options.baseClass}__item__link`);
		const $subitems = $item.find(`.${self.options.baseClass}__item__subitems`);

		if ($subitems.length) {
			$subitems.show();

			tippy($link[0], {
				content: $subitems[0],
				animation: 'shift-toward',
				arrow: true,
				inertia: true,
				theme: "headerNavigation-subitems",
				maxWidth: "none",
				interactive: true,
				zIndex: 200,
				offset: [0, 20],
				duration: [400, 200]
			});
		}
	})

};

export default HeaderNavigation;