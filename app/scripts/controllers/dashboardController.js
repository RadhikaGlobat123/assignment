(function(){
  var gitApp = angular.module("gitApp");

gitApp.controller("dashboardController", ['$http','$routeParams','getUserRepoService','$timeout','$location','$window','getUserDataFactory','toaster',function($http,$routeParams,getUserRepoService,$timeout,$location,$window,getUserDataFactory,toaster){
 
  var vm = this;
  function initData(){
    vm.openIssue = '';
    vm.closeIssue = '';
  }

  initData();

  var username = getUserDataFactory.getUserName();
  var password = getUserDataFactory.getUserPassword();
  var repo = getUserDataFactory.getUserRepo();
 

  getUserRepoService.getOpenIssues(username,repo).then(function(res){
    vm.openIssue =  _.size(res);
    },function(errRes){
      vm.openIssue = 'Not found';
    });

     getUserRepoService.getClosedIssues(username,repo).then(function(res){
      vm.closeIssue =  _.size(res);
    },function(errRes){
      vm.closeIssue = 'Not found';
  });

}])
})();