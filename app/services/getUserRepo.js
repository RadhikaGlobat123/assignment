var gitApp = angular.module("gitApp");
gitApp.service('getUserRepoService',function($http,$q) {
	
	var repo = this;
	var descarr = [];
	var userArr = [];
	repo.getUserRepo = function(name){
		var deffer = $q.defer();

		$http.get("https://api.github.com/users/"+name+"/repos").then(function suceessCall(response) {
			deffer.resolve(response.data);
      	},function errorCall(errResponse){
      		deffer.reject(errResponse);
      	});	
      	return deffer.promise;	
	}

	repo.storeDescription = function(descArr){
		descarr = descArr;
	}
	repo.getDescription = function(){
		return descarr;
	}
	repo.storeUserData = function(userData){
		userArr = userData;
	}
	repo.getUserData = function(){
		return userArr;
	}
	
	return repo;

});

