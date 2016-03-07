(function(){
  var gitApp = angular.module("gitApp");

gitApp.controller("closeIssueController", ['$scope','$http','$routeParams','getUserRepoService','$timeout','$location','$window',function($scope,$http,$routeParams,getUserRepoService,$timeout,$location,$window){
 
  var vm = this;
  
  vm.resData=[];
  vm.descriptions = [];
  vm.issueTitle = '';
  vm.issueDesc = '';
  vm.password ='';
  vm.closeSuccessMsg = false;
  vm.closepswdErrMsg = false;
  vm.titleErrMsg = false;
  vm.descErrMsg = false;
  vm.wrongPwdMsg = false;
  var issueDescsplit = [];

  vm.resData = getUserRepoService.getRepoData();
  vm.descriptions = getUserRepoService.getDescription();
  
  vm.repo = $routeParams.repo;
  vm.issueTitle = vm.descriptions[$routeParams.id][1];
  issueDescsplit = vm.descriptions[$routeParams.id][0].split("***");
  vm.issueDesc = issueDescsplit[0];
  vm.issueCreateDate = issueDescsplit[1] 
  vm.assignee = vm.descriptions[$routeParams.id][2];
  vm.number = vm.descriptions[$routeParams.id][3];

  var username = $window.sessionStorage.getItem('username');

  vm.closeIssue = function(frm){ 
   
    if(frm.$valid){
      vm.closepswdErrMsg = false;
      var issueData = JSON.stringify({title:vm.issueTitle,body:vm.issueDesc,state:'close'});
      var encodeStr = btoa( username +":"+ vm.password);
      console.log(issueData);   

       $http({
              url: "https://api.github.com/repos/"+username+"/"+vm.repo+"/issues/"+vm.number,
              method: 'POST',
              data: issueData,
              headers: {'Content-Type': 'application/json','Authorization': 'Basic '+encodeStr+"=" }
             }).then(function successCall(res){  
                  vm.closeSuccessMsg = true;
                  $location.path("/list");
             },function errorCall(errRes){
                  vm.wrongPwdMsg = true;
            });
    }
    else{
        if( vm.password == '' ){
            vm.closepswdErrMsg = true;
        }else {
          vm.closepswdErrMsg = false;
        }if( vm.issueTitle =='' ){
            vm.titleErrMsg = true;
        }else {
          vm.titleErrMsg = false;
        }if( vm.issueDesc =='' ){
            vm.descErrMsg = true;
        }else {
          vm.descErrMsg = false;
        }
      } 
    }
}]);
})();