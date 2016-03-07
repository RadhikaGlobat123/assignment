var gitApp = angular.module("gitApp");

gitApp.controller("loginController", ['$scope','$http','$location','$routeParams','$window','getUserRepoService',function($scope,$http,$location,$routeParams,$window,getUserRepoService){
	
	var vm = this;
	vm.username = '';
	vm.password = '';
	vm.resData = [];
	vm.userData = [];
	vm.userErrMsg = false;
	vm.noRepoMsg = false;
	vm.noUserMsg = false;
	vm.getInfo = function(frm){

		if(frm.$valid){
			vm.userErrMsg = false;
			vm.noUserMsg = false;

			$window.sessionStorage.setItem('username',vm.username);
			var username = $window.sessionStorage.getItem('username');
			/*vm.userData.push(vm.username);
			getUserRepoService.storeUserData(vm.userData);*/

			getUserRepoService.getUserRepo(username).then(function(res){
				if(res.length==0){
					vm.noRepoMsg = true;
				}
				else{
					vm.noRepoMsg = false;
					vm.gitUser = res;
					for(var i=0;i< vm.gitUser.length; i++){				
						vm.resData.push({name:vm.gitUser[i].name,value:vm.gitUser[i].name});
					}
					getUserRepoService.setRepoData(vm.resData);
					$location.path("/list");
				}
			},function(errRes){
				vm.noRepoMsg = false;
				vm.userErrMsg = true;
				console.log(errRes);
			});
		}
		else{
			vm.noUserMsg = true;
		}
		/*vm.userData.push(vm.username,vm.password);
		getUserRepoService.storeUserData(vm.userData);

		var encodeStr = btoa(vm.username+":"+vm.password);
		getUserRepoService.getUserRepo(vm.username).then(function(res){

			vm.gitUser = res;
			for(var i=0;i< vm.gitUser.length; i++){				
				vm.resData.push({name:vm.gitUser[i].name,value:vm.gitUser[i].name});
			}
			getUserRepoService.setRepoData(vm.resData);
			$location.path("/list");
		},function(errRes){
			vm.userErrMsg = true;
			console.log(errRes);
		});*/
	}
	
}]);
