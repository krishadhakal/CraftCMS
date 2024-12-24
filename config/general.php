<?php
/**
 * General Configuration
 *
 * All of your system's general configuration settings go in here. You can see a
 * list of the available settings in vendor/craftcms/cms/src/config/GeneralConfig.php.
 *
 * @see \craft\config\GeneralConfig
 */
return [
	// Craft config settings from .env variables
	'aliases' => [
		'@web' => getenv('SITE_URL'),
	],
	'devMode' => (bool)getenv('DEV_MODE'),
	'allowUpdates' => (bool)getenv('ALLOW_UPDATES'),
	'allowAdminChanges' => (bool)getenv('ALLOW_ADMIN_CHANGES'),
	'backupOnUpdate' => (bool)getenv('BACKUP_ON_UPDATE'),
	'enableTemplateCaching' => (bool)getenv('ENABLE_TEMPLATE_CACHING'),
	'isSystemLive' => (bool)getenv('IS_SYSTEM_LIVE'),
	'runQueueAutomatically' => (bool)getenv('RUN_QUEUE_AUTOMATICALLY'),
	'securityKey' => getenv('SECURITY_KEY'),
	// Craft config settings from constants
	'cacheDuration' => false,
	'defaultSearchTermOptions' => [
		'subLeft' => true,
		'subRight' => true,
	],
	'enableCsrfProtection' => true,
	'errorTemplatePrefix' => '_errors/',
	'generateTransformsBeforePageLoad' => true,
	'maxCachedCloudImageSize' => 3000,
	'maxUploadFileSize' => '100M',
	'omitScriptNameInUrls' => true,
	'pageTrigger' => 'page/',
	'useEmailAsUsername' => true,
	'usePathInfo' => true,
];