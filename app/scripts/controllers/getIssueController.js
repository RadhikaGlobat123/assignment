var gitApp = angular.module("gitApp");

angular.module("gitApp").controller("getIssueController", ['$scope','$route','$http','$location','$routeParams','$window','$interval','getUserRepoService','getUserDataFactory',function($scope,$http,$route,$location,$routeParams,$window,$interval,getUserRepoService,getUserDataFactory){
	

	$scope.updateTodo = function(value) {
    console.log('Saving title ' + value);
    alert('Saving title ' + value);
  };
  
  $scope.cancelEdit = function(value) {
    console.log('Canceled editing', value);
    alert('Canceled editing of ' + value);
  };
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
   vm.repo = getUserDataFactory.getUserRepo();
   vm.descriptionsDisp = getUserDataFactory.getDescription();
  
	if(vm.resData.length == 0) {
		$location.path("/");
	}
	vm.logout = function(){
     $location.path("/");
  	}
}]);
