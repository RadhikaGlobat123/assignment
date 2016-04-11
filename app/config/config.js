 var gitApp = angular.module("gitApp");

angular.module("gitApp").config(function($routeProvider){
	$routeProvider.
		when("/",{
			templateUrl: 'views/login.html',
			controller: 'loginController',
			controllerAs: 'loginCtrl'
		}).
		when("/list",{
			templateUrl: 'views/get-issue.html',
			controller: 'getIssueController',
			controllerAs: 'getCtrl',
			activePage: 'list'
		})
		.when("/create",{
			templateUrl: 'views/create-issue.html',
			controller: 'createIssueCtrl',
			controllerAs: 'createCtrl',
			activePage: 'create'

		}).when("/edit/:id/:repo",{
			templateUrl: 'views/edit-issue.html',
			controller: 'editIssueController',
			controllerAs: 'editCtrl'

		}).when("/close/:id/:repo",{
			templateUrl: 'views/close-issue.html',
			controller: 'closeIssueController',
			controllerAs: 'closeCtrl'
		}).when("/view/:id/:repo",{
			templateUrl: 'views/view-issue.html',
			controller: 'viewIssueController',
			controllerAs: 'viewCtrl'
		}).when("/dashboard",{
			templateUrl: 'views/dashboard.html',
			controller: 'dashboardController',
			controllerAs: 'dashCtrl'
		}).otherwise({
			redirectTo: '/'
		});


});

angular.module("gitApp").run(['$route', function($route) { $route.reload(); }]);
