
import '../styles/app.scss';

window.easings = {};
window.easings.ease = "cubicBezier(0.25, 0.46, 0.45, 0.94)";
window.easings.andrew = "cubicBezier(0.77, 0, 0.175, 1)";
window.easings.feebles1 = "cubicBezier(.8,.03,.25,1)";
window.easings.feebles2 = "cubicBezier(.72,.01,.25,1)";
window.easings.ease2 = "cubicBezier(.48,.1,.48,.9)";

// Getting our breakpoint for javascript
window.Breakpoint = {};

Breakpoint.refreshValue = function(){
	this.value = window.getComputedStyle(document.querySelector('body'), ':before').getPropertyValue('content').replace(/\"/g, '');
};

$(window).resize(function(){ Breakpoint.refreshValue(); }).resize();


// Libs
import PubSub from "underpub-js";
import Sitewide from "./classes/Sitewide";
import ComponentsLoader from "./classes/ComponentsLoader";

// Components Import -- DO NOT REMOVE COMMENT!

$(document).ready(function(){

	var components = [
		// Components Loader -- DO NOT REMOVE COMMENT!
	];

	var sitewide = new Sitewide();
	sitewide.init();

	// Getting our components loading going
	window.componentsLoader = new ComponentsLoader({
		components: components
	});
	window.componentsLoader.initScreen();

	// setting our breakpoint value
	Breakpoint.refreshValue();

});
