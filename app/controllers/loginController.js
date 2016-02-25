var gitApp = angular.module("gitApp");

gitApp.controller("loginController", ['$scope','$http','$location','$routeParams','getUserRepoService',function($scope,$http,$location,$routeParams,getUserRepoService){
	
	var vm = this;
	vm.username = '';
	vm.password = '';
	vm.resData = [];
	vm.userData = [];
	vm.getInfo = function(){

		vm.userData.push(vm.username,vm.password);
		getUserRepoService.storeUserData(vm.userData);

		var encodeStr = btoa(vm.username+":"+vm.password);
		getUserRepoService.getUserRepo(vm.username).then(function(res){
			vm.gitUser = res;
			for(var i=0;i< vm.gitUser.length; i++){				
				vm.resData.push({name:vm.gitUser[i].name,value:vm.gitUser[i].name});
			}
			getUserRepoService.setRepoData(vm.resData);
			$location.path("/list");
		});
	}
	
}]);
