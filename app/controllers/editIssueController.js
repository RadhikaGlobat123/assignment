var gitApp = angular.module("gitApp");

gitApp.controller("editIssueController", ['$scope','$http','$location','$routeParams','getUserRepoService',function($scope,$http,$location,$routeParams,getUserRepoService){
	

	var vm = this;
	vm.descriptions = getUserRepoService.getDescription();
	
	vm.repo = $routeParams.repo;
	vm.editissueTitle = vm.descriptions[$routeParams.id][0];
	vm.issueDesc = vm.descriptions[$routeParams.id][1];
	vm.assignee = vm.descriptions[$routeParams.id][2];
	vm.number = vm.descriptions[$routeParams.id][3];
	var userData = getUserRepoService.getUserData();
	
	vm.updateIssue = function(){
	var issueData = JSON.stringify({title:vm.editissueTitle,body:vm.issueDesc});
  
   var encodeStr = btoa( userData[0] +":"+ userData[1] );

    $http({
          url: "https://api.github.com/repos/"+userData[0]+"/"+vm.repo+"/issues/"+vm.number,
          method: 'POST',
          data: issueData,
          headers: {'Content-Type': 'application/json','Authorization': 'Basic '+encodeStr+"=" }
      }).then(function successCall(res){
    });
	}

	
}]);
