var gitApp = angular.module("gitApp");

gitApp.controller("editIssueController", ['$scope','$http','$location','$routeParams','$window','getUserRepoService','$timeout',function($scope,$http,$location,$routeParams,$window,getUserRepoService,$timeout){
	
	var vm = this;
	vm.password = '';
	vm.pwdErr = false;
	vm.wrongPwd = false;
	vm.descriptions = getUserRepoService.getDescription();
	
	vm.repo = $routeParams.repo;

	issueDescsplit = vm.descriptions[$routeParams.id][0].split("***");
 	vm.issueDesc = issueDescsplit[0];
  	vm.issueCreateDate = issueDescsplit[1];
	vm.editissueTitle = vm.descriptions[$routeParams.id][1];
	vm.assignee = vm.descriptions[$routeParams.id][2];
	vm.number = vm.descriptions[$routeParams.id][3];
	vm.selState = vm.descriptions[$routeParams.id][6];
	vm.states = [{issueState: "open"}, {issueState: "close"}]
	if(vm.selState=="open"){
		vm.selState = vm.states[0];
	}else {
		vm.selState = vm.states[1];
	}

	vm.successMsg = false;
	var username = $window.sessionStorage.getItem('username');
	vm.updateIssue = function(frm){
		console.log(vm.selState);
	if(frm.$valid){
		vm.pwdErr = false;
		var issueData = JSON.stringify({title:vm.editissueTitle,body:vm.issueDesc,state:vm.selState.issueState});
	  	var encodeStr = btoa( username +":"+ vm.password );

	    $http({
	          url: "https://api.github.com/repos/"+username+"/"+vm.repo+"/issues/"+vm.number,
	          method: 'POST',
	          data: issueData,
	          headers: {'Content-Type': 'application/json','Authorization': 'Basic '+encodeStr+"=" }
	      }).then(function successCall(res){
	      	vm.wrongPwd = false;
	        vm.successMsg = true;
	        $timeout(function(){
	          $location.path("/list");
	       },3000);
	    },function errorCall(errRes){
	    	vm.wrongPwd = true;

	    });
	}
	else{
		vm.pwdErr = true;
		vm.wrongPwd = false;
	}

	}
}]);
