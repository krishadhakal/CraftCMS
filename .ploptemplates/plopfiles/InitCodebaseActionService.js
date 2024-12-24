var InitCodebaseActionService = function (actionData, plop) {

	this.data = actionData;
	this.plop = plop;
	this.actions = [];

};

/**
 * Our main method that starts the process of init'ing a project
 * @param projectType | "Craft" or "Html
 * @param jsType | "Vanilla" or "React"
 */
InitCodebaseActionService.prototype.initProject = function(projectType, jsType){

	this.projectType = projectType;
	this.jsType = jsType;

	this.installAssets();
	this.installScss();

	// Install our javascript files
	if(this.jsType === "Vanilla"){
		this.installVanillaJs();
	}else if(this.jsType === "React"){
		this.installReactJs();
	}

	// Install our project type
	if(this.projectType === "Craft"){

		this.installCraft();
		this.installCraftEnvFiles();
		this.installCraftConfigFiles();
		this.installCraftScriptsDirectory();
		this.installCraftTwig();

		if(this.jsType === "Vanilla"){
			this.installCraftTwigWithVanilla();
		}else if(this.jsType === "React"){
			this.installCraftTwigWithReact();
		}

	}else if(this.projectType === "Html"){

		this.installHtmlTwig();

		if(this.jsType === "Vanilla"){
			this.installHtmlTwigWithVanilla()
		}else if(this.jsType === "React"){
			this.installHtmlTwigWithReact();
		}

	}

	this.installNpm();

};


/**
 * Craft Init'ing
 */

InitCodebaseActionService.prototype.installCraft = function(){

	this.actions.push({
		type: 'craftInstall'
	});

};

/**
 * Moving over our .env files
 */
InitCodebaseActionService.prototype.installCraftEnvFiles = function(){

	this.actions.push({
		type: 'add',
		path: '.env.example',
		templateFile: '.ploptemplates/.env.example',
		force: true
	});

};

/**
 * Installing codebase config files, and Craft config files
 */
InitCodebaseActionService.prototype.installCraftConfigFiles = function(){

	this.actions.push({
		type: 'add',
		path: '.gitignore',
		templateFile: '.ploptemplates/.gitignore',
		force: true
	});

	this.actions.push({
		type: 'add',
		force: true,
		path: 'config/general.php',
		templateFile: '.ploptemplates/craft/config/general.php'
	});

	this.actions.push({
		type: 'add',
		force: true,
		path: 'config/db.php',
		templateFile: '.ploptemplates/craft/config/db.php'
	});

	this.actions.push({
		type: 'add',
		path: 'config/imager.php',
		templateFile: '.ploptemplates/craft/config/imager.php'
	});

	this.actions.push({
		type: 'add',
		path: 'config/seomatic.php',
		templateFile: '.ploptemplates/craft/config/seomatic.php'
	});

};

/**
 * Adding the scripts directory
 */
InitCodebaseActionService.prototype.installCraftScriptsDirectory = function(){

};

/**
 * Installing our Craft twig files
 */
InitCodebaseActionService.prototype.installCraftTwig = function(){

	// template files
	this.actions.push({
		type: 'add',
		path: 'templates/_layout.twig',
		templateFile: '.ploptemplates/src/templates/_layout.twig'
	});

};

/**
 * Installing the index files that'll use react
 */
InitCodebaseActionService.prototype.installCraftTwigWithReact = function(){

	this.actions.push({
		type: 'add',
		force: true,
		path: 'templates/index.twig',
		templateFile: '.ploptemplates/src/templates/index.react.twig'
	});

};

InitCodebaseActionService.prototype.installCraftTwigWithVanilla = function(){

	this.actions.push({
		type: 'add',
		force: true,
		path: 'templates/index.twig',
		templateFile: '.ploptemplates/src/templates/index.vanilla.twig'
	});

};

/**
 * HTML Init'ing
 */

InitCodebaseActionService.prototype.installHtmlTwig = function(){

	this.actions.push({
		type: 'add',
		path: 'src/templates/_layout.twig',
		templateFile: '.ploptemplates/src/templates/_layout.twig'
	});

};

InitCodebaseActionService.prototype.installHtmlTwigWithReact = function(){

	this.actions.push({
		type: 'add',
		force: true,
		path: 'src/templates/index.twig',
		templateFile: '.ploptemplates/src/templates/index.react.twig'
	});

};

InitCodebaseActionService.prototype.installHtmlTwigWithVanilla = function(){

	this.actions.push({
		type: 'add',
		force: true,
		path: 'src/templates/index.twig',
		templateFile: '.ploptemplates/src/templates/index.vanilla.twig'
	});

};

/**
 * Shared Init'ing
 */
InitCodebaseActionService.prototype.installAssets = function(){

	this.actions.push({
		type: 'add',
		path: 'src/fonts/.ignore'
	});

	this.actions.push({
		type: 'add',
		path: 'src/images/.ignore'
	});

	this.actions.push({
		type: 'add',
		path: 'src/icons/.ignore'
	});

};

InitCodebaseActionService.prototype.installScss = function(){

	this.actions.push({
		type: 'add',
		path: 'src/styles/app.scss',
		templateFile: '.ploptemplates/src/styles/app.scss'
	});

	this.actions.push({
		type: 'add',
		path: 'src/styles/base/typography.scss'
	});

	this.actions.push({
		type: 'add',
		path: 'src/styles/includes/layouts.scss'
	});

	this.actions.push({
		type: 'add',
		path: 'src/styles/includes/molecules.scss'
	});

	this.actions.push({
		type: 'add',
		path: 'src/styles/includes/elements.scss'
	});

	this.actions.push({
		type: 'add',
		path: 'src/styles/includes/atoms.scss'
	});

	this.actions.push({
		type: 'add',
		path: 'src/styles/base/variables.scss'
	});

	this.actions.push({
		type: 'add',
		path: 'src/styles/base/clear.scss',
		templateFile: '.ploptemplates/src/styles/base/clear.scss'
	});

	this.actions.push({
		type: 'add',
		path: 'src/styles/base/mixins.scss',
		templateFile: '.ploptemplates/src/styles/base/mixins.scss'
	});

	// adding our grid scss files
	const gridFiles = [
		'.ploptemplates/src/styles/grid/grid.scss',
		'.ploptemplates/src/styles/grid/settings.scss',
		'.ploptemplates/src/styles/grid/javascript.scss',
		'.ploptemplates/src/styles/grid/mixins/breakpoint-mixins.scss',
	];

	this.actions.push({
		type: "addMany",
		destination: "src/styles/grid/{{lowerCase name}}",
		base: '.ploptemplates/src/styles/grid',
		templateFiles: gridFiles
	});

};

InitCodebaseActionService.prototype.installVanillaJs = function(){

	this.actions.push({
		type: 'add',
		path: 'package.json',
		templateFile: '.ploptemplates/package.vanilla.json'
	});

	this.actions.push({
		type: 'add',
		path: 'webpack.mix.js',
		templateFile: '.ploptemplates/webpack.vanilla.mix.js'
	});

	this.actions.push({
		type: 'add',
		path: 'src/scripts/app.js',
		templateFile: '.ploptemplates/src/scripts/app.vanilla.js'
	});

	this.actions.push({
		type: 'add',
		path: 'src/scripts/classes/ComponentsLoader.js',
		templateFile: '.ploptemplates/src/scripts/classes/ComponentsLoader.js'
	});

	this.actions.push({
		type: 'add',
		path: 'src/scripts/classes/Sitewide.js',
		templateFile: '.ploptemplates/src/scripts/classes/Sitewide.js'
	});

};

InitCodebaseActionService.prototype.installReactJs = function(){

	this.actions.push({
		type: 'add',
		path: 'package.json',
		templateFile: '.ploptemplates/package.react.json'
	});

	this.actions.push({
		type: 'add',
		path: 'webpack.mix.js',
		templateFile: '.ploptemplates/webpack.react.mix.js'
	});

	this.actions.push({
		type: 'add',
		path: 'src/scripts/app.js',
		templateFile: '.ploptemplates/src/scripts/app.react.js'
	});

};

InitCodebaseActionService.prototype.installNpm = function(){

	this.actions.push({
		type: 'npmInstall'
	});

};


// InitCodebaseService
// - initProject(isCraft, isReact)
// - installCraft
// - installCraftEnvFiles
// - installCraftConfigFiles
// - installCraftScriptsDirectory
// - installCraftTemplates
// - installHtmlTemplates
// - installIgnoreFiles
//
// - installVanillaJs
// - installVanillaIndexPage
//
// - installReactJs
// - installReactIndexPage
//
// - installScss
// - npmInstall

module.exports = InitCodebaseActionService;
