'use strict';

(function () {

    angular
		.module('')
		.config(function ($stateProvider, $urlRouterProvider) {
			var baseUrl = '/app/src/views';

			var projectIndex = {
				url: '/project',
				templateUrl: baseUrl + '/project/project-index.html',
				controller: 'ProjectIndexController',
				controllerAs: 'projectIndexCtrl'
			};

			var projectNew = {
				url: '/new',
				views: {
					'@': {
						templateUrl: baseUrl + '/project/newEdit/project-new-edit.html',				    		
						controller: 'ProjectNewEditController',
						controllerAs: 'projectNewEditCtrl'						    	
					}
				},
				data: {
					authorizedRoles: LOGIN_ROLES.authorizations.projectNew
				}
			};				

			$stateProvider
				.state('project', projectIndex)

			$urlRouterProvider
				.otherwise('/project');

		});

})();