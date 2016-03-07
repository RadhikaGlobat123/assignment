 var gitApp = angular.module("gitApp");

gitApp.config(function($routeProvider){
	$routeProvider.
		when("/",{
			templateUrl: 'views/login.html',
			controller: 'loginController',
			controllerAs: 'loginCtrl'
		}).
		when("/list",{
			templateUrl: 'views/get-issue.html',
			controller: 'getIssueController',
			controllerAs: 'getCtrl'
		})
		.when("/create",{
			templateUrl: 'views/create-issue.html',
			controller: 'createIssueCtrl',
			controllerAs: 'createCtrl'

		}).when("/edit/:id/:repo",{
			templateUrl: 'views/edit-issue.html',
			controller: 'editIssueController',
			controllerAs: 'editCtrl'

		}).when("/close/:id/:repo",{
			templateUrl: 'views/close-issue.html',
			controller: 'closeIssueController',
			controllerAs: 'closeCtrl'
		});
});

gitApp.run(function($templateCache) {
	$templateCache.removeAll();
});