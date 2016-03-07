var gitApp = angular.module("gitApp");

gitApp.controller("getIssueController", ['$scope','$http','$location','$routeParams','$window','$interval','getUserRepoService',function($scope,$http,$location,$routeParams,$window,$interval,getUserRepoService){
	
	var vm = this;
	
	vm.username='';
	vm.password='';
	vm.resData=[];
	vm.descriptions = [];
	vm.descriptionsDisp = [];
	vm.userData = [];
	vm.resData = getUserRepoService.getRepoData();
	vm.selectetdRepo = vm.resData[0].value;
	vm.showErrRow = false;
  
   var username = $window.sessionStorage.getItem('username');
   vm.descriptionsDisp = getUserRepoService.getDescription();
   console.log(vm.descriptionsDisp);
  
	if(vm.resData.length == 0) {
		$location.path("/");
	}
	
    vm.getIssue = function(sItem){
     	var arr = [];
     	$http.get("https://api.github.com/repos/"+username+"/"+sItem.name+"/issues?state=all").then(function(res) {
      		var issueData = res.data;	
      		
      		if(issueData.length>0){
	      		for(var i=0; i<issueData.length;i++){
	      			arr.push([]);
	      			
	      			var descDate = issueData[i].body.split("***");	
	      			var desc = descDate[0];
	      			var createDate = '';
	      			if(typeof descDate[1] === "undefined"){
	      				createDate = "N/A";
	      			}else{
      					createDate = descDate[1];
      				}
	
	      			arr[i].push(issueData[i].body);
      				arr[i].push(issueData[i].title);
      				arr[i].push(issueData[i].assignee);
      				arr[i].push(issueData[i].number);
      				arr[i].push(desc);
      				arr[i].push(createDate);
      				arr[i].push(issueData[i].state);	
	      		}
	      		vm.showErrRow = false;
	  		}else {
	  			vm.showErrRow = true;
	  		}
	  		
	  		vm.descriptions = arr;
	  		getUserRepoService.storeDescription(vm.descriptions);

      	});
     
      }   
}]);
