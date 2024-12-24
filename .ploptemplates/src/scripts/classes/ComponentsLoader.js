

/**
 * A class to handle dynamically loading our components
 */

var ComponentsLoader = function(options){

	this.options = {
		components: []
	};

	$.extend(true, this.options, options);

	this.activeComponents = [];

};

/**
 * Initing all components on the screen, and sorting them by vertical position
 */
ComponentsLoader.prototype.initScreen = function(){

	var self = this;

	// might need some sort of unbinding here for removing active components
	this.activeComponents = [];

	$.each(this.options.components, function(){

		var componentObj = this;
		var $components = $(componentObj.handle);

		$components.each(function(){

			var individualComponent = this;
			var component = new componentObj.require({
				$el: $(this)
			});

			self.activeComponents.push(component);

		});

	});

	if(this.activeComponents.length > 1){

		// sorting them based on their vertical position on the screen
		this.activeComponents.sort(function(a, b){

			var aOffset = a.options.$el.offset().top;
			var bOffset = b.options.$el.offset().top;

			if(aOffset < bOffset){
				return -1;
			}

			if (aOffset > bOffset){
				return 1;
			}

			return 0;

		});

	}

	console.log(this.activeComponents);

	$.each(this.activeComponents, function(){

		if (!this.options.$el.data('initialized')) {
			this.options.$el.data('initialized', true);
			this.init();
			console.log("Component Loaded!", this);
		}
		
	});

};

export default ComponentsLoader;
