
  var gitApp = angular.module("gitApp");

angular.module("gitApp").controller("TabController", ['$scope','$location',function($scope,$location){
   
    if($location.$$path=="/list"){
      this.tab = 1;
    }else if($location.$$path=="/create"){
      this.tab = 2;
    }
    this.setTab = function (tabId) {
      console.log(tabId);
      this.tab = tabId;
    };
    this.isSet = function (tabId) {
      return this.tab === tabId;
    };
  
}]);
