var gitApp = angular.module("gitApp");

gitApp.controller("getIssueController", ['$scope','$http','$location','$routeParams','getUserRepoService',function($scope,$http,$location,$routeParams,getUserRepoService){
	
	var vm = this;
	
	vm.username='';
	vm.password='';
	vm.resData=[];
	vm.descriptions = [];
	vm.gitUser;
	vm.userData = [];
	vm.getInfoDisable = true;
	vm.resData = getUserRepoService.getRepoData();
	vm.checkInfo = function(){
		if(vm.username!="" && vm.password!=""){

			vm.getInfoDisable = false;
		}else {
			vm.getInfoDisable = true;
		}
	}
	
     vm.getIssue = function(sItem){
     	vm.userData = getUserRepoService.getUserData();
     	var username = vm.userData[0];
     	
     	$http.get("https://api.github.com/repos/"+username+"/"+sItem.name+"/issues").then(function(res) {
      		var issueData = res.data;	
      		
      		if(issueData.length>0){
	      		for(var i=0; i<issueData.length;i++){
	      			vm.descriptions.push([]);
	      			vm.descriptions[i].push(issueData[i].body);
      				vm.descriptions[i].push(issueData[i].title);
      				vm.descriptions[i].push(issueData[i].assignee);
      				vm.descriptions[i].push(issueData[i].number);
      				
	      		}
	      		getUserRepoService.storeDescription(vm.descriptions);
	  		}else {
	  			vm.descriptions.push("issue not found");
	  		}
	  			
      	});
     
      }
     
   
}]);
