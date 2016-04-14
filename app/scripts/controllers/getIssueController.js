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
 		vm.checked = false;
 		vm.state = 'All';
 		vm.selected = 'All';
   		$(".dropdown-toggle").dropdown();
   		var date = new Date();
		var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
		var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
		vm.startdate = moment(firstDay).format("DD-MM-YYYY");
		vm.enddate = moment(lastDay).format("DD-MM-YYYY");
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
  	vm.setSelectedState = function(state){
  		vm.state = state;
  		vm.selected = state;
  	}
  	vm.isChecked = function(check) {
  		return vm.selected === check;
  	}
}]);

	