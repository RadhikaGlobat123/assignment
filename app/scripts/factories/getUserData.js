var gitApp = angular.module("gitApp");
angular.module("gitApp").factory('getUserDataFactory',['$window',function($window) {
	
	var userData = {};
	var descarr = [];
	var userArr = [];
	var repoArr = [];
	var username = '';
	var password = '';
	var repository = '';

	userData.storeDescription = function(descArr){
		descarr = descArr;
	}
	userData.getDescription = function(){
		return descarr;
	}
	userData.storeUserData = function(userData){
		userArr = userData;
	}
	userData.getUserData = function(){
		return userArr;
	}
	userData.setRepoData = function(repoData){
		repoArr = repoData;
	}
	userData.getRepoData = function(){
		return repoArr;
	}
	userData.setUserName = function(username){
		$window.sessionStorage.setItem('username',username);
	}
	userData.getUserName = function(){
		username = $window.sessionStorage.getItem('username');
		return username;
	}
	userData.setUserPassword = function(password){
		$window.sessionStorage.setItem('password',password);
	}
	userData.getUserPassword = function(){
		password = $window.sessionStorage.getItem('password');
		return password;
	}
	userData.setUserRepo = function(repository){
		$window.sessionStorage.setItem('repository',repository);
	}
	userData.getUserRepo = function(){
		repository = $window.sessionStorage.getItem('repository');
		return repository;
	}

	return userData;
}]);

