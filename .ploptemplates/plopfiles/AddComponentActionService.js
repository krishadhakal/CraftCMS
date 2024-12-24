var AddComponentActionService = function (actionData, plop) {
	this.data = actionData;
	this.plop = plop;
	this.actions = [];
};

AddComponentActionService.prototype.addComponent = function (jsFlavor) {
	if (jsFlavor === 'Vanilla') {
		this.addVanillaFiles();
	} else if (jsFlavor === 'React') {
		this.addReactFiles();
	}

	this.addSassFiles();
	this.addTwigFiles();
};

AddComponentActionService.prototype.addVanillaFiles = function () {
	this.actions.push({
		type: 'add',
		path: 'templates/_components/{{lowerCase type}}{{#if folderPath}}/{{properCase folderPath}}{{/if}}/{{properCase name}}/{{properCase name}}.js',
		templateFile: '.ploptemplates/src/components/component.js',
		skipIfExists: true,
	});

	this.actions.push({
		type: 'append',
		path: 'src/scripts/app.js',
		pattern: /(Components Import -- DO NOT REMOVE COMMENT!)/gi,
		template: 'import {{properCase name}} from "../../templates/_components/{{lowerCase type}}{{#if folderPath}}/{{properCase folderPath}}{{/if}}/{{properCase name}}/{{properCase name}}";',
	});

	this.actions.push({
		type: 'append',
		path: 'src/scripts/app.js',
		pattern: /(Components Loader -- DO NOT REMOVE COMMENT!)/gi,
		template: '{handle: ".{{lowerCase typeShortname}}-{{ properCase name}}", require: {{properCase name}} },',
	});
};

AddComponentActionService.prototype.addReactFiles = function () {
	this.actions.push({
		type: 'add',
		path: 'templates/_components/{{lowerCase type}}{{#if folderPath}}/{{properCase folderPath}}{{/if}}/{{properCase name}}/{{properCase name}}.jsx',
		templateFile: '.ploptemplates/src/components/component.jsx',
		skipIfExists: true,
	});
};

AddComponentActionService.prototype.addSassFiles = function () {
	this.actions.push({
		type: 'add',
		path: 'templates/_components/{{lowerCase type}}{{#if folderPath}}/{{properCase folderPath}}{{/if}}/{{properCase name}}/{{properCase name}}.scss',
		templateFile: '.ploptemplates/src/components/component.scss',
		skipIfExists: true,
	});
	this.actions.push({
		type: 'append',
		path: 'src/styles/includes/{{lowerCase type}}.scss',
		template: '@import "../../../templates/_components/{{lowerCase type}}{{#if folderPath}}/{{properCase folderPath}}{{/if}}/{{properCase name}}/{{properCase name}}.scss";',
		unique: true,
	});
};

AddComponentActionService.prototype.addTwigFiles = function () {
	this.actions.push({
		type: 'add',
		path: 'templates/_components/{{lowerCase type}}{{#if folderPath}}/{{properCase folderPath}}{{/if}}/{{properCase name}}/{{properCase name}}.twig',
		templateFile: '.ploptemplates/src/components/component.twig',
		skipIfExists: true,
	});

	if (this.data.type == 'Molecules' || this.data.type == "Elements" || this.data.type == "Layouts") {
		this.actions.push({
			type: 'add',
			path: 'templates/_components/{{lowerCase type}}{{#if folderPath}}/{{properCase folderPath}}{{/if}}/{{properCase name}}/{{properCase name}}.handler.twig',
			templateFile: '.ploptemplates/src/components/component.handler.twig',
			skipIfExists: true,
		});
	}
};

module.exports = AddComponentActionService;