(function(){
  var gitApp = angular.module("gitApp");

angular.module("gitApp").controller("createIssueCtrl", ['$scope','$route','$http','getUserRepoService','$timeout','$location','$window','getUserDataFactory','toaster',function($scope,$route,$http,getUserRepoService,$timeout,$location,$window,getUserDataFactory,toaster){
  var vm = this;

  function initData(){
    vm.gitUsername = '';
    vm.gitPasssword = '';
    vm.resData=[];
    vm.userData = [];
    vm.gitUser;
    vm.issueTitle = '';
    vm.issueDesc = '';
    vm.createDate ='';
    vm.comment = '';
    vm.successMsg = false;
    vm.wrongPwdMsg = false;
  


   /* vm.repoErrMsg = false;
    vm.pswdErrMsg = false;
    vm.titleErrMsg = false;
    vm.descErrMsg = false;
    vm.dateErrMsg = false;
    vm.wrongPwdMsg = false;*/
    vm.createSubmit = '';
    
    vm.resData = getUserDataFactory.getRepoData();
    getTodayDate();
    
  }
  function getTodayDate(){
    var minDate = new Date();
    var mm = minDate.getMonth()+1;
    vm.minDate = minDate.getFullYear()+'/'+mm+'/'+ minDate.getDate();
  }
  initData();

  var username = getUserDataFactory.getUserName();
  var password = getUserDataFactory.getUserPassword();

  var repoItem = getUserDataFactory.getUserRepo();

  
  

  vm.createIssue = function(frm){ 
  
    if(frm.$valid){
      vm.issueDescDate  =  vm.issueDesc+"***"+vm.createDate;
      var issueData = JSON.stringify({title:vm.issueTitle,body:vm.issueDescDate,comments:vm.comment});
      var encodeStr = btoa( username +":"+ password); 

      getUserRepoService.createIssueService(issueData,encodeStr,username,repoItem).then(function(res){
          vm.wrongPwdMsg = false;
            vm.successMsg = true;
             toaster.success({title: "success", body:"Issue created succesffuly"});
            $timeout(function(){
             $location.path("/list");
          },3000);
         },function(errRes){
            toaster.error("Error", "Wrong Password.Please logout and try again");
            vm.wrongPwdMsg = true;
        });
    }
    else{
      vm.createSubmit = true;
      /* console.log(vm.createDate);
      if(typeof repoItem === 'undefined'){
          vm.repoErrMsg = true;
      }
      if( vm.password ==''){
          vm.pswdErrMsg = true;
      }else {
        vm.pswdErrMsg = false;
      }if( vm.issueTitle ==''){
          vm.titleErrMsg = true;
      }else {
        vm.titleErrMsg = false;
      }if( vm.issueDesc ==''){
          vm.descErrMsg = true;
      }else {
        vm.descErrMsg = false;
      }if( vm.createDate ==''){
          vm.dateErrMsg = true;
      }else {
        vm.dateErrMsg = false;
      }
    }
*/
    }
  }
  vm.checkPassword = function(){
     vm.wrongPwdMsg = false;
  }
  vm.cancelIssue = function(){
    $location.path("/list");
  }
  vm.logout = function(){
     $location.path("/");
  }
}]);
})();