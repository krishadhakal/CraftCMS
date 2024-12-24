<?php
return [

	// Should sitemaps be regenerated automatically?
	'regenerateSitemapsAutomatically' => getenv('SEOMATIC_REGENERATE_SITEMAPS_AUTOMATICALLY'),

	// The server environment, either `live`, `staging`, or `local`
	'environment' => getenv('ENVIRONMENT'),

];
