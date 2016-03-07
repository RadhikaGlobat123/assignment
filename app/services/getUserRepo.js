var gitApp = angular.module("gitApp");
gitApp.service('getUserRepoService',function($http,$q) {
	
	var repo = this;
	var descarr = [];
	var userArr = [];
	var repoArr = [];
	repo.getUserRepo = function(name){
		var deffer = $q.defer();

		$http.get("https://api.github.com/users/"+name+"/repos").then(function suceessCall(response) {
			deffer.resolve(response.data);
      	},function errorCall(errResponse){
      		deffer.reject(errResponse.data);
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
	repo.setRepoData = function(repoData){
		repoArr = repoData;
	}
	repo.getRepoData = function(){
		return repoArr;
	}
});

