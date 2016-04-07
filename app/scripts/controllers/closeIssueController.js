(function(){
  var gitApp = angular.module("gitApp");

angular.module("gitApp").controller("closeIssueController", ['$http','$routeParams','getUserRepoService','$timeout','$location','$window','getUserDataFactory','toaster',function($http,$routeParams,getUserRepoService,$timeout,$location,$window,getUserDataFactory,toaster){
 
  var vm = this;
  
  function initData(){
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
    var cissueDescsplit = [];

    vm.resData = getUserDataFactory.getRepoData();
    vm.number = $routeParams.id;
  }

  initData();

  var username = getUserDataFactory.getUserName();
  var password = getUserDataFactory.getUserPassword();
  var repo = getUserDataFactory.getUserRepo();

  getUserRepoService.getIssueService(username,repo,vm.number).then(function suceessCall(res) {
      vm.issueTitle = res.title;
      cissueDescsplit = res.body.split("***");
      vm.issueDesc = cissueDescsplit[0];
      vm.cissueCreateDate = cissueDescsplit[1];
      vm.assignee =  res.assignee;  
    },function failCall(errRes){
      console.log(errRes);
  });

  vm.closeIssue = function(frm){ 
   
    if(frm.$valid){
      vm.closepswdErrMsg = false;
      vm.issueDescDate  =  vm.issueDesc+"***"+vm.cissueCreateDate;
    
      var issueData = JSON.stringify({title:vm.issueTitle,body:vm.issueDescDate,state:'close'});

      var encodeStr = btoa( username +":"+ password);  

      getUserRepoService.closeIssueService(issueData,encodeStr,username,repo,vm.number).then(function(res){
          vm.closeSuccessMsg = true;
          toaster.success({title: "Close Issue", body:"Issue closed succesffuly"});
          $timeout(function(){
              $location.path("/list");
          },3000);
      },function(errRes){
          vm.wrongPwdMsg = true;
          toaster.error("Error", "Wrong Password.Please logout and try again");
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

    vm.cancelCloseIssue = function(){
      $location.path("/list");
    }

    vm.logout = function(){
      $location.path("/");
    }
}]);
})();