'use strict';
const PlopController = require("./.ploptemplates/plopfiles/PlopController.js");

// configuring plop
module.exports = function (plop) {

	var plopController = new PlopController(plop);
	plopController.setActionTypes();
	plopController.setGenerators();

};
