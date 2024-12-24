const path = require('path');
const exec = require('child_process').exec;

const InitCodebaseActionService = require('./InitCodebaseActionService');
const AddComponentActionService = require('./AddComponentActionService');

var PlopController = function(plop) {
	this.plop = plop;
};

/**
 * Action Types are used for other bash commands we need to run during the process.
 */
PlopController.prototype.setActionTypes = function() {
	// creating an action type for installing npm
	this.plop.setActionType('npmInstall', function(data, config, plop) {
		return new Promise(function(resolve, reject) {
			exec('npm install', (err, stdout, stderr) => {
				err ? reject(stderr) : resolve(stdout);
			});
		});
	});

	// action for installing craft
	this.plop.setActionType('craftInstall', function(data, config, plop) {
		return new Promise(function(resolve, reject) {
			exec(
				'composer create-project craftcms/craft ./craftinstall --ignore-platform-reqs',
				(err, stdout, stderr) => {
					if (err) {
						reject(stderr);
					}
					exec('mv craftinstall/* craftinstall/.* .', () => {
						exec('rm -R craftinstall', () => {
							resolve(stdout);
						});
					});
				},
			);
		});
	});
};

PlopController.prototype.setGenerators = function() {
	var self = this;

	// create your generators here
	this.plop.setGenerator('Add Component', {
		description: 'This adds a component to the codebase.',
		prompts: [
			{
				type: 'list',
				choices: ['Molecules', 'Elements', 'Atoms', 'Layouts'],
				name: 'type',
				message: 'What type of component?',
			},
			{
				type: 'input',
				name: 'folderPath',
				message: 'What subfolder should this component be in? (optional)',
			},
			{
				type: 'input',
				name: 'name',
				message: 'Whats the name of the component?',
			},
			{
				type: 'list',
				choices: ['Vanilla', 'React'],
				name: 'jsFlavor',
				message: 'What flavor of JS?',
			},
		],
		actions: function(data) {
			var componentType = data.type;
			var componentName = data.name;
			var jsFlavor = data.jsFlavor;

			// set our class prefix
			if (componentType == 'Molecules') {
				data.typeShortname = 'mol';
			} else if (componentType == 'Elements') {
				data.typeShortname = 'el';
			} else if (componentType == 'Atoms') {
				data.typeShortname = 'atom';
			} else if (componentType == 'Layouts') {
				data.typeShortname = 'layout';
			}

			var addComponentService = new AddComponentActionService(data, self.plop);
			addComponentService.addComponent(jsFlavor);

			return addComponentService.actions;
		},
	});

	//
	// Init'codebase
	//
	this.plop.setGenerator('Init Codebase', {
		description: 'this sets up our initial file structure',
		prompts: [
			{
				type: 'list',
				choices: ['Html', 'Craft'],
				name: 'type',
				message: 'What type of project?',
			},
			{
				type: 'list',
				choices: ['Vanilla', 'React'],
				name: 'jsFlavor',
				message: 'What flavor of JS?',
			},
		],
		actions: function(data) {
			var projectType = data.type;
			var jsType = data.jsFlavor;

			var initCodebaseService = new InitCodebaseActionService(data, self.plop);
			initCodebaseService.initProject(projectType, jsType);

			return initCodebaseService.actions;
		},
	});
};

module.exports = PlopController;
