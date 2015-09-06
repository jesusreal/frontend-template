'use strict';

require.config({
	//By default load any module IDs from js/lib
	baseUrl: '/src',
	//except, if the module ID starts with 'app',
	//load it from the js/app directory. paths
	//config is relative to the baseUrl, and
	//never includes a '.js' extension since
	//the paths config could be for a directory.
	paths: {
		'angular': '../bower_components/angular/angular',
		'angular-bootstrap': '../bower_components/angular-bootstrap/ui-bootstrap-tpls',
		'angular-cookies': '../bower_components/angular-cookies/angular-cookies',
        'angular-ui-router': '../bower_components/angular-ui-router/release/angular-ui-router'
	},

	shim: {
		'angular': [],
		'angular-bootstrap': ['angular'],
		'angular-cookies': ['angular'],
		'angular-ui-router': ['angular']
	}
});


require(['app'], function() {
 	angular.bootstrap(document, ['angularModule']);
});

