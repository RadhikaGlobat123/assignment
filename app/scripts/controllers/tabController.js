(function(){
  var gitApp = angular.module("gitApp");

gitApp.controller("TabController", ['$scope','$location',function($scope,$location){
   
    if($location.$$path=="/dashboard"){
      this.tab = 1;
    }else if($location.$$path=="/list"){
      this.tab = 2;
    }else if($location.$$path=="/create"){
      this.tab = 3;
    }
    this.setTab = function (tabId) {
      this.tab = tabId;
    };
    this.isSet = function (tabId) {
      return this.tab === tabId;
    };
  
}]);
})();