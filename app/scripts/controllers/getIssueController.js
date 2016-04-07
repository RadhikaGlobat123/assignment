var gitApp = angular.module("gitApp");

angular.module("gitApp").controller("getIssueController", ['$scope','$route','$http','$location','$routeParams','$window','$interval','getUserRepoService','getUserDataFactory',function($scope,$http,$route,$location,$routeParams,$window,$interval,getUserRepoService,getUserDataFactory){
	
	var vm = this;
	
	function initData(){
		vm.username='';
		vm.password='';
		vm.resData=[];
		vm.descriptions = [];
		vm.descriptionsDisp = [];
		vm.userData = [];
		vm.resData = getUserDataFactory.getRepoData();
		vm.selectetdRepo = vm.resData[0].value;
		vm.showErrRow = false;
		vm.comment='';
		vm.repo = '';
		vm.show = false;
		vm.showState;
		vm.sortType     = '6'; // set the default sort type
 		vm.sortReverse  = false;  // set the default sort order
 		vm.$route = $route;
	
	}
	
	initData();
   var username = getUserDataFactory.getUserName();
   vm.repo = getUserDataFactory.getUserRepo();;
   vm.descriptionsDisp = getUserDataFactory.getDescription();
  
	if(vm.resData.length == 0) {
		$location.path("/");
	}
	vm.logout = function(){
     $location.path("/");
  	}
	
    /*vm.getIssue = function(sItem){
     	var arr = [];
     	$http.get("https://api.github.com/repos/"+username+"/"+sItem.name+"/issues?state=all").then(function(res) {
      		var issueData = res.data;
  			vm.show = true;
  
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
      				
					if(issueData[i].state == 'closed'){
						vm.showState = true;
					}
					else{
						vm.showState = false;
					}
	      			arr[i].push(issueData[i].body);
      				arr[i].push(issueData[i].title);
      				arr[i].push(issueData[i].assignee);
      				arr[i].push(issueData[i].number);
      				arr[i].push(desc);
      				arr[i].push(createDate);
      				arr[i].push(issueData[i].state);	
      				arr[i].push(issueData[i].comments);
      				arr[i].push(vm.showState);
	      		}
	      		vm.showErrRow = false;
	  		}else if(issueData.length==0) {
	  			vm.showErrRow = true;
	  		}
	  		
	  		vm.descriptions = arr;
	  		getUserRepoService.storeDescription(vm.descriptions);

      	});
     
      }*/
}]);
